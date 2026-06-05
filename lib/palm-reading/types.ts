export type PalmReadingCategory = "personality" | "love" | "career" | "money" | "luck";

export type PalmReading = {
  id: string;
  createdAt: string;
  aura: string;
  summary: string;
  personality: string;
  love: string;
  career: string;
  money: string;
  luck: string;
  advice: string;
  disclaimer: string;
};

export type PalmAnalysisInput = {
  imageDataUrl: string;
};

export type PalmAnalysisService = (input: PalmAnalysisInput) => Promise<PalmReading>;
