import Link from "next/link";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-midnight text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.34),transparent_30rem),radial-gradient(circle_at_85%_15%,rgba(248,217,137,0.18),transparent_26rem),linear-gradient(145deg,#070812_0%,#12091f_45%,#211033_100%)]" />
      <div className="fixed left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-wide" aria-label="Palm Reader AI home">
          <span className="grid size-10 place-items-center rounded-2xl border border-gold/30 bg-gold/15 text-lg shadow-glow">✋</span>
          <span>Palm Reader AI</span>
        </Link>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-purple-100">Entertainment only</span>
      </header>
      {children}
    </div>
  );
}
