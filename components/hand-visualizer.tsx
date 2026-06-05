"use client";

import { Camera, Hand, ScanLine, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const points = [
  [50, 76], [42, 60], [36, 44], [31, 28], [26, 16],
  [49, 55], [48, 37], [47, 20], [46, 7],
  [59, 56], [64, 38], [69, 23], [74, 11],
  [67, 63], [79, 52], [88, 42], [96, 33],
  [39, 72], [28, 70], [18, 69], [8, 68]
];

export function HandVisualizer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const confidence = useMemo(() => (cameraEnabled ? 97 : 88), [cameraEnabled]);

  useEffect(() => {
    if (!cameraEnabled || !videoRef.current) {
      return;
    }

    let stream: MediaStream;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setCameraEnabled(false);
        setCameraError("Camera access was blocked. The animated model preview is still available.");
      }
    }

    void startCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [cameraEnabled]);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-teal-950/40">
      <div className="absolute inset-0 hand-grid opacity-40" aria-hidden="true" />
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={cn("absolute inset-0 h-full w-full object-cover opacity-40", !cameraEnabled && "hidden")}
          aria-label="Live camera preview"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-transparent to-violet-950/50" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-float p-8" role="img" aria-label="Animated hand landmark preview">
          <polyline points="50,76 42,60 36,44 31,28 26,16" fill="none" stroke="rgba(20,184,166,.75)" strokeWidth="1.1" />
          <polyline points="50,76 49,55 48,37 47,20 46,7" fill="none" stroke="rgba(20,184,166,.75)" strokeWidth="1.1" />
          <polyline points="50,76 59,56 64,38 69,23 74,11" fill="none" stroke="rgba(20,184,166,.75)" strokeWidth="1.1" />
          <polyline points="50,76 67,63 79,52 88,42 96,33" fill="none" stroke="rgba(20,184,166,.75)" strokeWidth="1.1" />
          <polyline points="50,76 39,72 28,70 18,69 8,68" fill="none" stroke="rgba(20,184,166,.75)" strokeWidth="1.1" />
          {points.map(([x, y], index) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={index === 0 ? 3 : 2.1} fill={index === 0 ? "#a78bfa" : "#5eead4"}>
              <animate attributeName="opacity" values="0.45;1;0.45" dur={`${1.8 + index * 0.04}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-400/10 px-4 py-2 text-sm text-teal-50 backdrop-blur">
          <ScanLine className="size-4" /> {confidence}% confidence
        </div>
      </div>

      <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
        <StatusPill icon={<Hand className="size-4" />} label="6 gestures" />
        <StatusPill icon={<ShieldCheck className="size-4" />} label="Local-first" />
        <button
          type="button"
          onClick={() => setCameraEnabled((value) => !value)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-100"
        >
          <Camera className="size-4" /> {cameraEnabled ? "Stop camera" : "Try camera"}
        </button>
      </div>
      {cameraError ? <p className="relative mt-3 text-sm text-amber-200">{cameraError}</p> : null}
    </section>
  );
}

function StatusPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-slate-200">
      {icon}
      {label}
    </div>
  );
}
