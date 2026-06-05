"use client";

import { BriefcaseBusiness, Coins, Heart, RotateCcw, Share2, Sparkles, Star, WandSparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { MysticCard } from "@/components/mystic-card";
import { PrimaryButton } from "@/components/primary-button";
import type { PalmReading } from "@/lib/palm-reading/types";
import { createShareText } from "@/lib/share";
import { clearPalmSession, getPalmImage, getPalmReading } from "@/lib/storage";

const categoryConfig = [
  { key: "personality", title: "Personality", Icon: Sparkles, symbol: "✦" },
  { key: "love", title: "Love", Icon: Heart, symbol: "♡" },
  { key: "career", title: "Career", Icon: BriefcaseBusiness, symbol: "☽" },
  { key: "money", title: "Money", Icon: Coins, symbol: "♢" },
  { key: "luck", title: "Luck", Icon: Star, symbol: "★" }
] as const;

export default function ResultPage() {
  const router = useRouter();
  const [reading, setReading] = useState<PalmReading | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const shareText = useMemo(() => (reading ? createShareText(reading) : ""), [reading]);

  useEffect(() => {
    const storedReading = getPalmReading();
    const storedImage = getPalmImage();
    setReading(storedReading);
    setImage(storedImage);
  }, []);

  const startAgain = () => {
    clearPalmSession();
    router.push("/camera");
  };

  const shareResult = async () => {
    if (!reading) return;
    setShareStatus(null);

    try {
      if (navigator.share) {
        await navigator.share({ title: "My Palm Reader AI result", text: shareText });
        setShareStatus("Shared successfully.");
        return;
      }

      await navigator.clipboard.writeText(shareText);
      setShareStatus("Result copied to clipboard.");
    } catch {
      setShareStatus("Sharing was not completed. You can try copying again.");
    }
  };

  if (!reading) {
    return (
      <AppShell>
        <main className="mx-auto grid min-h-[70vh] w-full max-w-xl place-items-center px-5 pb-14 text-center">
          <MysticCard>
            <WandSparkles className="mx-auto size-10 text-gold" aria-hidden="true" />
            <h1 className="mt-4 text-3xl font-semibold">No reading found</h1>
            <p className="mt-3 text-purple-100/75">Capture or upload a palm photo first to generate your entertainment reading.</p>
            <PrimaryButton onClick={() => router.push("/camera")} className="mt-6" type="button">
              Start Palm Reading
            </PrimaryButton>
          </MysticCard>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Your reading</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-5xl">{reading.aura} aura</h1>
          </div>
          <p className="max-w-md text-sm leading-6 text-purple-100/75">{reading.disclaimer}</p>
        </div>

        <section className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <MysticCard className="overflow-hidden p-3">
            <div className="aspect-[3/4] overflow-hidden rounded-[1.35rem] bg-black sm:aspect-square lg:aspect-[3/4]">
              {image ? <img src={image} alt="Palm used for this reading" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-purple-100/70">Palm image unavailable</div>}
            </div>
          </MysticCard>

          <div className="grid gap-5">
            <MysticCard className="relative overflow-hidden">
              <div className="absolute right-0 top-0 size-40 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-sm text-gold">Overall aura</div>
                <p className="text-xl leading-8 text-white sm:text-2xl">{reading.summary}</p>
                <p className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-purple-50">{reading.advice}</p>
              </div>
            </MysticCard>

            <div className="grid gap-4 sm:grid-cols-2">
              {categoryConfig.map(({ key, title, Icon, symbol }) => (
                <MysticCard key={key}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-2xl bg-gold/15 text-gold">{symbol}</span>
                      <h2 className="text-lg font-semibold">{title}</h2>
                    </div>
                    <Icon className="size-5 text-purple-200" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-purple-100/78">{reading[key]}</p>
                </MysticCard>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:max-w-xl">
          <button onClick={startAgain} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10" type="button">
            <RotateCcw className="size-4" aria-hidden="true" /> Start Again
          </button>
          <PrimaryButton onClick={shareResult} type="button">
            <Share2 className="size-5" aria-hidden="true" /> Share Result
          </PrimaryButton>
        </div>
        {shareStatus && <p className="mt-3 text-sm text-purple-100/80" role="status">{shareStatus}</p>}
      </main>
    </AppShell>
  );
}
