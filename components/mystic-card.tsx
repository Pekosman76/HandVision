import { clsx } from "clsx";
import type { ReactNode } from "react";

export function MysticCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/25 backdrop-blur-xl", className)}>
      {children}
    </div>
  );
}
