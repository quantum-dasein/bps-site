"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Contact form powered by Web3Forms — submissions are emailed straight to the
 * agency inbox, no server needed (works on a static Vercel deploy).
 *
 * SETUP: get a free access key at https://web3forms.com (enter the target
 * email, e.g. info@bestpracticesolution.uz) and paste it below or set
 * NEXT_PUBLIC_WEB3FORMS_KEY in Vercel → Project → Settings → Environment Variables.
 */
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "Новая заявка с сайта BPS");
    formData.append("from_name", "BEST PRACTICE SOLUTION");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Не удалось отправить. Попробуйте позже.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Ошибка сети. Проверьте соединение и попробуйте снова.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="glass-card flex flex-col items-center gap-4 p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="text-gold-300" size={42} />
        <h3 className="font-display text-2xl font-semibold text-white">
          Заявка отправлена
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)]">
          Спасибо! Мы свяжемся с вами в ближайшее время. Все обращения
          обрабатываются строго конфиденциально.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-ghost mt-2"
          type="button"
        >
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-7 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Имя" name="name" placeholder="Как к вам обращаться" required />
        <Field label="Компания" name="company" placeholder="Название компании" />
      </div>
      <div className="mt-4">
        <Field
          label="Email или телефон"
          name="email"
          type="text"
          placeholder="Для обратной связи"
          required
        />
      </div>
      <div className="mt-4">
        <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted-2)]">
          Задача
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Опишите позицию, регион и сроки — кратко"
          className="w-full resize-none rounded-xl border border-[var(--border)] bg-white/[0.02] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold-400/50"
        />
      </div>

      {status === "error" && (
        <p
          className="mt-4 flex items-center gap-2 text-sm text-red-400"
          role="alert"
        >
          <AlertCircle size={16} />
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-gold mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Отправляем…
          </>
        ) : (
          <>
            Написать нам
            <Send size={15} />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-[11px] text-[var(--muted-2)]">
        Нажимая «Написать нам», вы соглашаетесь на обработку обращения. Строго
        конфиденциально.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted-2)]">
        {label} {required && <span className="text-gold-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[var(--border)] bg-white/[0.02] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold-400/50"
      />
    </div>
  );
}
