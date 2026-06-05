"use client";

import { Camera, ImageUp, Loader2, RefreshCcw, Sparkles, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { MysticCard } from "@/components/mystic-card";
import { PrimaryButton } from "@/components/primary-button";
import { SecondaryLink } from "@/components/secondary-link";
import { generateMockPalmReading } from "@/lib/palm-reading/mockPalmAnalysis";
import { savePalmSession } from "@/lib/storage";

const guidance = ["Place your palm inside the frame", "Use good lighting", "Keep your hand open"];

export default function CameraPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    setIsStarting(true);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera access is not available in this browser. Upload a palm photo instead.");
      setIsStarting(false);
      return;
    }

    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 1280 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setError("Camera permission was blocked or no camera was found. You can still upload a palm photo below.");
    } finally {
      setIsStarting(false);
    }
  }, [stopCamera]);

  useEffect(() => {
    void startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) {
      setError("The camera is still warming up. Please try again in a moment.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      setError("Your browser could not capture the image. Please try the upload option.");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL("image/jpeg", 0.86));
    stopCamera();
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file of your palm.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCapturedImage(String(reader.result));
      setError(null);
      stopCamera();
    };
    reader.onerror = () => setError("The image could not be read. Please choose another file.");
    reader.readAsDataURL(file);
  };

  const retakePhoto = async () => {
    setCapturedImage(null);
    await startCamera();
  };

  const analyzePalm = async () => {
    if (!capturedImage) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const reading = await generateMockPalmReading({ imageDataUrl: capturedImage });
      savePalmSession(capturedImage, reading);
      router.push("/result");
    } catch {
      setError("The palm reading could not be generated. Please try again.");
      setIsAnalyzing(false);
    }
  };

  return (
    <AppShell>
      <main className="mx-auto grid w-full max-w-5xl gap-6 px-5 pb-14 sm:px-8 lg:grid-cols-[1fr_0.72fr]">
        <section>
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Camera</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Capture your palm</h1>
            <p className="mt-3 text-purple-100/75">A clear, well-lit photo helps the mock reader create a more polished entertainment result.</p>
          </div>

          <MysticCard className="overflow-hidden p-3">
            <div className="camera-frame relative aspect-[3/4] overflow-hidden rounded-[1.35rem] border border-gold/20 bg-black sm:aspect-[4/3]">
              {capturedImage ? (
                <img src={capturedImage} alt="Captured palm preview" className="h-full w-full object-cover" />
              ) : (
                <video ref={videoRef} playsInline muted autoPlay className="h-full w-full object-cover" aria-label="Live camera preview" />
              )}

              {!capturedImage && (
                <div className="pointer-events-none absolute inset-8 rounded-[2rem] border-2 border-dashed border-gold/55 shadow-[0_0_50px_rgba(248,217,137,0.18)]" aria-hidden="true" />
              )}

              {isStarting && !capturedImage && (
                <div className="absolute inset-0 grid place-items-center bg-black/55 text-purple-50">
                  <Loader2 className="mr-2 inline size-5 animate-spin" aria-hidden="true" /> Requesting camera permission...
                </div>
              )}
            </div>
          </MysticCard>

          {error && (
            <div role="alert" className="mt-4 flex gap-3 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
              <TriangleAlert className="size-5 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {capturedImage ? (
              <>
                <button onClick={retakePhoto} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10" type="button">
                  <RefreshCcw className="size-4" aria-hidden="true" /> Retake photo
                </button>
                <PrimaryButton onClick={analyzePalm} disabled={isAnalyzing} type="button">
                  {isAnalyzing ? <Loader2 className="size-5 animate-spin" aria-hidden="true" /> : <Sparkles className="size-5" aria-hidden="true" />}
                  {isAnalyzing ? "Reading your palm..." : "Analyze palm"}
                </PrimaryButton>
              </>
            ) : (
              <PrimaryButton onClick={capturePhoto} disabled={isStarting} className="sm:col-span-2" type="button">
                <Camera className="size-5" aria-hidden="true" /> Capture photo
              </PrimaryButton>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          <MysticCard>
            <h2 className="text-xl font-semibold">Palm photo tips</h2>
            <div className="mt-4 grid gap-3">
              {guidance.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 text-sm text-purple-50">
                  <span className="grid size-8 place-items-center rounded-full bg-gold/15 text-gold">✦</span>
                  {item}
                </div>
              ))}
            </div>
          </MysticCard>

          <MysticCard>
            <h2 className="flex items-center gap-2 text-xl font-semibold"><ImageUp className="size-5 text-gold" aria-hidden="true" /> Upload fallback</h2>
            <p className="mt-3 text-sm leading-6 text-purple-100/75">If camera permission is unavailable, upload a palm image from your device.</p>
            <label className="mt-4 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Choose image
              <input type="file" accept="image/*" className="sr-only" onChange={handleUpload} aria-label="Upload palm image" />
            </label>
          </MysticCard>

          <SecondaryLink href="/">Back home</SecondaryLink>
        </aside>
      </main>
    </AppShell>
  );
}
