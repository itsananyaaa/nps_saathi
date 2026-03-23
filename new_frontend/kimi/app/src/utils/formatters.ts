// Currency formatting for Indian Rupees
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Large number abbreviation (Indian system)
export const abbreviateNumber = (num: number): string => {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
  return `₹${num}`;
};

// Format percentage
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

// Format age
export const formatAge = (age: number): string => {
  return `${age} years`;
};

// Format date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

// Format time
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Calculate retirement readiness score (0-100)
export const calculateReadinessScore = (
  currentAge: number,
  retirementAge: number,
  monthlyContribution: number,
  monthlyIncome: number,
  currentCorpus: number
): number => {
  const yearsToRetirement = retirementAge - currentAge;
  const contributionRatio = monthlyContribution / monthlyIncome;
  
  // Base score from contribution ratio (max 40 points)
  const contributionScore = Math.min(contributionRatio * 200, 40);
  
  // Age factor (max 30 points) - earlier start is better
  const ageScore = Math.max(0, 30 - (currentAge - 25) * 1.5);
  
  // Corpus factor (max 30 points)
  const expectedCorpus = monthlyContribution * 12 * yearsToRetirement;
  const corpusRatio = currentCorpus / expectedCorpus;
  const corpusScore = Math.min(corpusRatio * 50, 30);
  
  return Math.min(100, Math.round(contributionScore + ageScore + corpusScore));
};

// Get readiness label
export const getReadinessLabel = (score: number): string => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good Progress';
  if (score >= 40) return 'Getting There';
  return 'Needs Attention';
};

// Get readiness color
export const getReadinessColor = (score: number): string => {
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#3b82f6';
  if (score >= 40) return '#f59e0b';
  return '#ef4444';
};
