import type { PalmAnalysisInput, PalmReading } from "./types";

const summaries = [
  "Your palm gives off a warm, magnetic energy with a balance of intuition and steady ambition.",
  "The lines suggest a curious spirit: thoughtful, adaptable, and quietly courageous when change appears.",
  "Your hand carries the vibe of someone who notices details others miss and turns them into meaningful momentum.",
  "There is a bright, creative current here, with an earthy streak that keeps your dreams practical."
];

const auras = ["Violet Moon", "Golden Ember", "Starlit Sage", "Rose Quartz", "Silver Lantern", "Cosmic Cedar"];

const personality = [
  "You seem like a reflective person who prefers authentic connections over surface-level noise. Your best decisions often come when you trust both logic and instinct.",
  "Your reading points to a generous but discerning personality. You may give a lot, yet you thrive when your boundaries are clear and respected.",
  "There is a playful intelligence in this palm. You likely enjoy learning through experience and become especially persuasive when you care about an idea.",
  "This palm hints at a calm observer with a bold inner spark. You may surprise people by moving decisively after a long period of quiet planning."
];

const love = [
  "In relationships, you are drawn to warmth, honesty, and emotional consistency. A little patience helps your heart feel safe enough to be fully expressive.",
  "Your romantic energy favors slow-blooming trust over dramatic intensity. The most nourishing connections are likely the ones that make everyday life feel softer.",
  "You may love through thoughtful gestures and careful listening. Letting others see your needs as clearly as your kindness can deepen your bonds.",
  "The love lines feel tender and loyal. Keep choosing connections where affection is mutual, relaxed, and rooted in respect."
];

const career = [
  "Career energy looks strongest when creativity meets structure. You may shine in roles where you can improve systems, tell stories, or guide people with care.",
  "Your palm suggests a builder mindset: you can turn vague ideas into practical next steps. Momentum grows when you focus on one meaningful project at a time.",
  "Work feels best when it includes autonomy and purpose. You may do especially well when trusted to solve problems in your own thoughtful style.",
  "A steady ambition appears here. Small, consistent improvements may bring more satisfaction than chasing every new opportunity at once."
];

const money = [
  "Your money energy favors mindful choices and long-range thinking. Treat this as encouragement to stay curious, compare options, and avoid impulsive pressure.",
  "The reading points to resourcefulness rather than risk. You may feel most abundant when your spending reflects your values and your plans stay flexible.",
  "There is a practical streak around finances. Celebrate progress, keep learning, and remember that calm decisions tend to serve you better than rushed ones.",
  "Your palm gives a balanced signal: generosity is part of your nature, but your future self appreciates thoughtful limits and clear priorities."
];

const luck = [
  "Luck seems to arrive through conversations, timing, and saying yes to small invitations that feel quietly exciting.",
  "Your lucky current is subtle but persistent. Look for signs in repeated themes, helpful introductions, and chances to revisit an old idea with fresh energy.",
  "Fortune favors you when you prepare before the spotlight appears. Your best lucky breaks may look like opportunities you were already ready for.",
  "A bright thread of luck surrounds creative risks and sincere self-expression. The more honestly you show up, the more doors may feel open."
];

const advice = [
  "Move gently, choose clearly, and let your intuition be a compass rather than a command.",
  "Protect your energy, then spend it on the people and plans that make you feel expansive.",
  "Trust gradual progress; even a small ritual of focus can change the feeling of your week.",
  "Stay open to wonder, but keep both feet on the ground while you make your next move."
];

function pick<T>(items: T[], seed: number): T {
  return items[Math.abs(seed) % items.length];
}

function createSeed(imageDataUrl: string): number {
  let hash = imageDataUrl.length;
  for (let index = 0; index < imageDataUrl.length; index += Math.max(1, Math.floor(imageDataUrl.length / 128))) {
    hash = (hash * 31 + imageDataUrl.charCodeAt(index)) | 0;
  }
  return hash + Math.floor(Math.random() * 10000);
}

export async function generateMockPalmReading({ imageDataUrl }: PalmAnalysisInput): Promise<PalmReading> {
  const seed = createSeed(imageDataUrl);

  await new Promise((resolve) => window.setTimeout(resolve, 1400));

  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `reading-${Date.now()}`,
    createdAt: new Date().toISOString(),
    aura: pick(auras, seed),
    summary: pick(summaries, seed + 3),
    personality: pick(personality, seed + 7),
    love: pick(love, seed + 11),
    career: pick(career, seed + 13),
    money: pick(money, seed + 17),
    luck: pick(luck, seed + 19),
    advice: pick(advice, seed + 23),
    disclaimer: "This reading is generated for entertainment only and does not predict the future."
  };
}
