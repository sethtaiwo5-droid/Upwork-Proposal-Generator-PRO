export interface ProposalInputs {
  jobPost: string;
  background: string;
  rate: string;
  portfolio: string;
  approach?: string;
  tone: ToneType;
}

export enum ToneType {
  PROFESSIONAL = 'Professional & Direct',
  CONSULTATIVE = 'Consultative & Strategic',
  FRIENDLY = 'Friendly & Enthusiastic',
  TECHNICAL = 'Highly Technical',
  AUTO = 'Let AI Decide'
}

export interface GeneratedResult {
  rawText: string;
  sections: {
    proposal: string;
    analysis: string;
    alternatives: string;
    checklist: string;
  };
}

export enum LoadingState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}