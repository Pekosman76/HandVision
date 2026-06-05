import { Activity, Braces, Radio, WandSparkles } from "lucide-react";

const steps = [
  {
    icon: Radio,
    title: "Capture",
    body: "Use the browser camera permission flow or connect a prerecorded stream for repeatable testing."
  },
  {
    icon: Activity,
    title: "Interpret",
    body: "Normalize hand landmarks into confident, product-ready gestures and interaction states."
  },
  {
    icon: Braces,
    title: "Integrate",
    body: "Consume the included API route to prototype dashboards, demos, and telemetry pipelines."
  },
  {
    icon: WandSparkles,
    title: "Experience",
    body: "Design touchless controls for kiosks, accessibility tools, education, and immersive apps."
  }
];

export function Workflow() {
  return (
    <section id="workflow" className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-200">Workflow</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Everything needed to go from camera input to gesture-aware UI.
        </h2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <article key={step.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="rounded-2xl bg-teal-300/10 p-3 text-teal-200">
                  <Icon className="size-5" />
                </span>
                <span className="font-mono text-sm text-slate-500">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{step.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
