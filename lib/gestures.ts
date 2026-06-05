export type GestureStatus = "active" | "calibrating" | "idle";

export type GestureMetric = {
  label: string;
  value: string;
  trend: string;
};

export type GestureEvent = {
  id: string;
  gesture: string;
  confidence: number;
  status: GestureStatus;
  timestamp: string;
};

export const gestureMetrics: GestureMetric[] = [
  { label: "Latency", value: "18ms", trend: "edge-ready inference" },
  { label: "Gestures", value: "12", trend: "trained interaction set" },
  { label: "Privacy", value: "100%", trend: "browser-side camera flow" }
];

export const supportedGestures = [
  "Open palm",
  "Pinch",
  "Point",
  "Swipe left",
  "Swipe right",
  "Thumbs up"
];

export function createGestureEvents(): GestureEvent[] {
  const now = new Date();

  return supportedGestures.slice(0, 4).map((gesture, index) => ({
    id: `${gesture.toLowerCase().replaceAll(" ", "-")}-${index}`,
    gesture,
    confidence: 94 - index * 7,
    status: index === 0 ? "active" : index === 1 ? "calibrating" : "idle",
    timestamp: new Date(now.getTime() - index * 45_000).toISOString()
  }));
}

export function getEnvironmentLabel(): string {
  return process.env.NEXT_PUBLIC_APP_ENV ?? "development";
}
