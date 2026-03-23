// Navigation items
export const NAV_ITEMS = [
  { icon: 'LayoutDashboard', label: 'Dashboard', path: '/dashboard' },
  { icon: 'Bot', label: 'AI Assistant', path: '/ai-assistant' },
  { icon: 'Calculator', label: 'Pension Simulator', path: '/simulator' },
  { icon: 'TrendingUp', label: 'Retirement Forecast', path: '/forecast' },

  { icon: 'BookOpen', label: 'Policy Knowledge', path: '/policy' },
  { icon: 'User', label: 'Account', path: '/account' },
];

// Languages supported
export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
];

// Risk levels
export const RISK_LEVELS = [
  { value: 'low', label: 'Low', description: 'Conservative - Focus on capital preservation' },
  { value: 'moderate', label: 'Moderate', description: 'Balanced - Mix of growth and stability' },
  { value: 'high', label: 'High', description: 'Aggressive - Higher growth potential' },
  { value: 'very-high', label: 'Very High', description: 'Very Aggressive - Maximum growth potential' },
];

// Occupations
export const OCCUPATIONS = [
  'Private Sector Employee',
  'Government Employee',
  'Self-Employed',
  'Business Owner',
  'Freelancer',
  'Professional',
  'Retired',
  'Student',
  'Homemaker',
  'Other',
];

// Expected returns by risk level
export const EXPECTED_RETURNS = {
  low: 7,
  moderate: 9,
  high: 11,
  'very-high': 13,
};

// Asset allocation by risk level
export const ASSET_ALLOCATION = {
  low: { equity: 25, corporateBonds: 25, governmentBonds: 50 },
  moderate: { equity: 50, corporateBonds: 25, governmentBonds: 25 },
  high: { equity: 75, corporateBonds: 15, governmentBonds: 10 },
  'very-high': { equity: 85, corporateBonds: 10, governmentBonds: 5 },
};

// Policy categories
export const POLICY_CATEGORIES = [
  'All',
  'NPS',
  'UPS',
  'Tax',
  'Withdrawal',
  'Annuity',
  'Regulations',
];

// Suggested questions for AI assistant
export const SUGGESTED_QUESTIONS = [
  'What is NPS and how does it work?',
  'What are the tax benefits of NPS?',
  'What are the withdrawal rules?',
  'Compare NPS vs UPS',
  'How much should I contribute monthly?',
  'What is the minimum investment?',
];

// Default user profile
export const DEFAULT_PROFILE = {
  age: 32,
  monthlyIncome: 80000,
  monthlyContribution: 15000,
  currentCorpus: 350000,
  expectedReturn: 10,
  retirementAge: 60,
  riskAppetite: 'moderate' as const,
};

// Color palette
export const COLORS = {
  primary: {
    900: '#1e3a5f',
    700: '#2d5a87',
    500: '#3b82f6',
    300: '#93c5fd',
    100: '#dbeafe',
  },
  secondary: {
    500: '#10b981',
    300: '#6ee7b7',
    100: '#d1fae5',
  },
  accent: {
    500: '#f59e0b',
    300: '#fcd34d',
    100: '#fef3c7',
  },
  semantic: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  neutral: {
    900: '#111827',
    700: '#374151',
    500: '#6b7280',
    300: '#d1d5db',
    200: '#e5e7eb',
    100: '#f3f4f6',
    50: '#f9fafb',
  },
};

// Chart colors
export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  accent: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
  purple: '#8b5cf6',
  pink: '#ec4899',
  orange: '#f97316',
};
