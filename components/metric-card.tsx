import type { GestureMetric } from "@/lib/gestures";

export function MetricCard({ metric }: { metric: GestureMetric }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-glow backdrop-blur">
      <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{metric.label}</p>
      <p className="mt-3 text-4xl font-semibold text-white">{metric.value}</p>
      <p className="mt-2 text-sm text-teal-100/80">{metric.trend}</p>
    </article>
  );
}
