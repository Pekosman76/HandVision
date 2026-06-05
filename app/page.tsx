import { ArrowRight, Camera, Sparkles, Stars } from "lucide-react";
import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { MysticCard } from "@/components/mystic-card";

const featureCards = [
  { Icon: Camera, title: "Camera-ready", body: "Works in modern mobile and desktop browsers with upload fallback." },
  { Icon: Stars, title: "Mock AI magic", body: "Varied entertainment readings now, with a service layer ready for Vision later." },
  { Icon: Sparkles, title: "Mobile-first", body: "Large touch targets, clear guidance, and polished dark mystical styling." }
];

const steps = [
  "Take a clear photo of your open palm.",
  "Let the mock AI-style reader create a mystical interpretation.",
  "Read, share, or start again whenever you want."
];

export default function Home() {
  return (
    <AppShell>
      <main className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-16 pt-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-14">
        <section className="relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm text-gold">
            <Sparkles className="size-4" aria-hidden="true" /> Premium mystical palm readings
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Hand Vision IA for playful palm insight.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-purple-100/85">
            Take a photo of your palm and receive a fun AI-style palm reading with a luminous aura, personality notes, and gentle guidance.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/camera"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-amber-200 to-purple-200 px-7 py-4 font-semibold text-slate-950 shadow-lg shadow-purple-950/30 transition hover:scale-[1.01] hover:brightness-105"
            >
              Start Palm Reading <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <div className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-purple-100">
              For entertainment purposes only.
            </div>
          </div>
        </section>

        <MysticCard className="relative overflow-hidden p-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(248,217,137,0.25),transparent_18rem)]" />
          <div className="relative p-6 sm:p-8">
            <div className="mx-auto grid aspect-square max-w-sm place-items-center rounded-full border border-gold/20 bg-purple-950/30 shadow-glow">
              <div className="grid size-52 animate-float place-items-center rounded-full border border-white/10 bg-white/5 text-8xl shadow-2xl" aria-hidden="true">
                ✋
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-purple-50">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">{index + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </MysticCard>

        <section className="grid gap-4 lg:col-span-2 sm:grid-cols-3">
          {featureCards.map(({ Icon, title, body }) => (
            <MysticCard key={title}>
              <Icon className="size-7 text-gold" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-purple-100/75">{body}</p>
            </MysticCard>
          ))}
        </section>
      </main>
    </AppShell>
  );
}
