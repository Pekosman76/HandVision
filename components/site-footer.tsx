import { Github, Sparkles } from "lucide-react";

import { getEnvironmentLabel } from "@/lib/gestures";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-teal-200" />
          <span>HandVision · {getEnvironmentLabel()}</span>
        </div>
        <a href="https://github.com" className="inline-flex items-center gap-2 transition hover:text-white" rel="noreferrer" target="_blank">
          <Github className="size-4" /> Ready for your GitHub repository
        </a>
      </div>
    </footer>
  );
}
