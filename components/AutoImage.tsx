"use client";

import { ReactNode, useEffect, useState } from "react";

/**
 * Renders <img src> only once it has successfully preloaded. While probing or
 * if the file is missing (404), it renders `fallback` instead — so dropping a
 * file into /public/images automatically upgrades the visual with zero broken
 * image flashes and no code changes.
 */
export default function AutoImage({
  src,
  alt,
  className,
  fallback = null,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback?: ReactNode;
}) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let mounted = true;
    const img = new window.Image();
    img.onload = () => mounted && setOk(true);
    img.onerror = () => mounted && setOk(false);
    img.src = src;
    return () => {
      mounted = false;
    };
  }, [src]);

  if (!ok) return <>{fallback}</>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
}
