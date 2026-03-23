import type { UserProfile } from '../types/userProfile';

// Global user profile store as requested
export const globalUserProfile: UserProfile = {
  age: 30,
  salary: 80000,
  monthly_contribution: 5000,
  risk_preference: 'balanced',
  years_of_service: 5,
  government_employee: false,
  retirement_age: 60,
  expected_return: 0.10,
  volatility: 0.15
};
