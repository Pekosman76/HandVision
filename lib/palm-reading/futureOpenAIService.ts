import type { PalmAnalysisInput, PalmReading } from "./types";

// Add the OpenAI Vision implementation behind a server-side API route and keep this typed return contract stable.
export async function generateOpenAIPalmReading(_input: PalmAnalysisInput): Promise<PalmReading> {
  throw new Error(
    "OpenAI Vision integration is not enabled in this version. Add a server-side API route that reads OPENAI_API_KEY and returns the PalmReading shape."
  );
}
