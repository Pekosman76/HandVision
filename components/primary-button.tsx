import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export function PrimaryButton({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      className={clsx(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-amber-200 to-purple-200 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-purple-950/30 transition hover:scale-[1.01] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
