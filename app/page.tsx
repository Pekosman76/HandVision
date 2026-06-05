import { ArrowRight, CheckCircle2, Code2, Eye, LockKeyhole, Zap } from "lucide-react";

import { HandVisualizer } from "@/components/hand-visualizer";
import { MetricCard } from "@/components/metric-card";
import { SiteFooter } from "@/components/site-footer";
import { Workflow } from "@/components/workflow";
import { gestureMetrics, supportedGestures } from "@/lib/gestures";

const capabilities = [
  {
    icon: Eye,
    title: "Live landmark preview",
    body: "An animated hand skeleton communicates model state even before a user enables camera access."
  },
  {
    icon: LockKeyhole,
    title: "Privacy-first UX",
    body: "The demo keeps camera interaction in the browser and exposes mock-safe API metrics for backend prototyping."
  },
  {
    icon: Code2,
    title: "Typed API surface",
    body: "Reusable TypeScript models power both UI cards and the /api/metrics route for consistent integrations."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:pt-16">
        <div className="absolute left-1/2 top-0 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
        <nav className="col-span-full flex items-center justify-between rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur">
          <a href="#top" className="flex items-center gap-2 text-lg font-semibold text-white">
            <span className="grid size-9 place-items-center rounded-full bg-teal-300 text-slate-950">HV</span>
            HandVision
          </a>
          <a href="#workflow" className="hidden text-sm text-slate-300 transition hover:text-white sm:inline-flex">
            Explore workflow
          </a>
        </nav>

        <div id="top">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-sm text-teal-100">
            <Zap className="size-4" /> Real-time gesture intelligence starter
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Build touchless products with hand-aware interfaces.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            HandVision is a complete Next.js application for demonstrating camera-based gesture recognition,
            landmark visualization, telemetry, and product storytelling in one self-contained repository.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/api/metrics" className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-200">
              View API payload <ArrowRight className="size-4" />
            </a>
            <a href="#gestures" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Supported gestures
            </a>
          </div>
        </div>

        <HandVisualizer />
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-3">
        {gestureMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 py-20 md:grid-cols-3">
        {capabilities.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/50 p-7">
              <Icon className="size-8 text-teal-200" />
              <h2 className="mt-5 text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 leading-7 text-slate-300">{item.body}</p>
            </article>
          );
        })}
      </section>

      <section id="gestures" className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-200">Gesture set</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {supportedGestures.map((gesture) => (
              <div key={gesture} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-slate-100">
                <CheckCircle2 className="size-5 text-teal-200" />
                {gesture}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Workflow />
      <SiteFooter />
    </main>
  );
}
