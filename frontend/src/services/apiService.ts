import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export interface UserProfile {
  age?: number;
  salary?: number;
  monthly_contribution?: number;
  risk_preference?: string;
  years_of_service?: number;
  government_employee?: boolean;
  retirement_age?: number;
  expected_return?: number;
  volatility?: number;
}

export interface ApiResponse {
  intent: string;
  response: string;
  sources: string[];
  financial_data: any;
}

export const apiService = {
  askQuery: async (query: string, userProfile?: UserProfile): Promise<ApiResponse> => {
    const response = await axios.post(`${API_BASE_URL}/ask`, {
      query,
      user_profile: userProfile || {}
    });
    return response.data;
  },

  getForecast: async (userProfile: UserProfile): Promise<ApiResponse> => {
    const response = await axios.post(`${API_BASE_URL}/forecast`, userProfile);
    return response.data;
  },

  runSimulation: async (userProfile: UserProfile): Promise<ApiResponse> => {
    const response = await axios.post(`${API_BASE_URL}/simulate`, userProfile);
    return response.data;
  },

  getRecommendation: async (userProfile: UserProfile): Promise<ApiResponse> => {
    const response = await axios.post(`${API_BASE_URL}/recommend`, userProfile);
    return response.data;
  },

  askTextQuery: async (text: string, language: string, userProfile?: UserProfile): Promise<ApiResponse> => {
    const response = await axios.post(`${API_BASE_URL}/text_query`, {
      text,
      language,
      user_profile: userProfile || {}
    });
    return response.data;
  },

  askVoiceQuery: async (audioBase64: string, language: string, userProfile?: UserProfile): Promise<ApiResponse & { audio_response?: string }> => {
    const response = await axios.post(`${API_BASE_URL}/voice_query`, {
      audio_base64: audioBase64,
      language,
      user_profile: userProfile || {}
    });
    return response.data;
  }
};

