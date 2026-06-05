import type { PalmReading } from "@/lib/palm-reading/types";

const IMAGE_KEY = "palm-reader-ai:image";
const READING_KEY = "palm-reader-ai:reading";

export function savePalmSession(imageDataUrl: string, reading: PalmReading) {
  window.localStorage.setItem(IMAGE_KEY, imageDataUrl);
  window.localStorage.setItem(READING_KEY, JSON.stringify(reading));
}

export function getPalmImage() {
  return window.localStorage.getItem(IMAGE_KEY);
}

export function getPalmReading(): PalmReading | null {
  const raw = window.localStorage.getItem(READING_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as PalmReading;
  } catch {
    return null;
  }
}

export function clearPalmSession() {
  window.localStorage.removeItem(IMAGE_KEY);
  window.localStorage.removeItem(READING_KEY);
}
