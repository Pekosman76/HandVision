import type { PalmReading } from "@/lib/palm-reading/types";

export function createShareText(reading: PalmReading) {
  return `Palm Reader AI revealed my ${reading.aura} aura. ${reading.summary} ${reading.disclaimer}`;
}
