// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  occupation: string;
  monthlyIncome: number;
  monthlyContribution: number;
  currentCorpus: number;
  expectedReturn: number;
  retirementAge: number;
  riskAppetite: 'low' | 'moderate' | 'high' | 'very-high';
}

export interface UserPreferences {
  language: string;
  emailNotifications: boolean;
  monthlySummary: boolean;
  whatsappAlerts: boolean;
  aiInsights: boolean;
}

// Chat Types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Source[];
  audio?: string;
}

export interface Source {
  title: string;
  url: string;
}

// Forecast Types
export interface ForecastInputs {
  age: number;
  monthlyIncome: number;
  monthlyContribution: number;
  expectedReturn: number;
  retirementAge: number;
}

export interface ForecastResults {
  projectedCorpus: number;
  lumpSumAmount: number;
  annuityAmount: number;
  monthlyPension: number;
  timeline: TimelinePoint[];
}

export interface TimelinePoint {
  age: number;
  corpus: number;
  contribution: number;
}

// Simulation Types
export interface SimulationInputs {
  age: number;
  retirementAge: number;
  monthlyContribution: number;
  expectedReturn: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
}

export interface SimulationResults {
  worstCase: number;
  medianCase: number;
  bestCase: number;
  probabilityDistribution: DistributionPoint[];
}

export interface DistributionPoint {
  range: string;
  probability: number;
  isMedian: boolean;
}

// Policy Types
export interface PolicyDocument {
  id: string;
  title: string;
  category: string;
  source: string;
  summary: string;
  content: string;
  pdfUrl: string;
  publishedDate: string;
}

// Investment Advice Types
export interface InvestmentRecommendation {
  scheme: string;
  description: string;
  benefits: string[];
  assetAllocation: AssetAllocation;
}

export interface AssetAllocation {
  equity: number;
  corporateBonds: number;
  governmentBonds: number;
}

export interface ContributionAdvice {
  current: number;
  recommended: number;
  increase: number;
  impact: number;
}

// UI Types
export interface NavItem {
  icon: string;
  label: string;
  path: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
}
