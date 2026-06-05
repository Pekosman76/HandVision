import { NextResponse } from "next/server";

import { createGestureEvents, gestureMetrics, getEnvironmentLabel } from "@/lib/gestures";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    app: "HandVision",
    environment: getEnvironmentLabel(),
    generatedAt: new Date().toISOString(),
    metrics: gestureMetrics,
    events: createGestureEvents()
  });
}
