export interface MarketOpportunity {
  demand_level: string;
  market_size: string;
  timing: string;
}

export interface TargetAudience {
  primary_users: string[];
  secondary_users: string[];
  customer_profile: string;
}

export interface Competitor {
  name: string;
  strength: string;
  weakness: string;
}

export interface Risks {
  technical: string;
  business: string;
  adoption: string;
}

export interface Swot {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface Roadmap {
  phase_1: string[];
  phase_2: string[];
  phase_3: string[];
}

export interface ValidationReport {
  startup_name_suggestion: string;
  one_line_summary: string;
  viability_score: number;
  market_opportunity: MarketOpportunity;
  target_audience: TargetAudience;
  competitors: Competitor[];
  revenue_models: string[];
  risks: Risks;
  mvp_features: string[];
  swot: Swot;
  roadmap: Roadmap;
  verdict: 'Strong Opportunity' | 'Worth Testing' | 'High Risk' | 'Not Recommended' | string;
  reasoning: string;
}

export interface HistoryItem {
  id: string;
  idea: string;
  timestamp: number;
  report: ValidationReport;
}
