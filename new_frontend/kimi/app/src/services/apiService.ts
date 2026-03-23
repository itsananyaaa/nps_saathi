import axios from 'axios';
import type { UserProfile } from '../types/userProfile';

const API_BASE = 'http://127.0.0.1:8000/api/v1';
export interface ApiResponse {
  intent: string;
  response: string;
  sources: string[];
  financial_data: any;
  audio_response?: string;
}

export const askQuery = async (query: string, profile?: UserProfile): Promise<ApiResponse> => {
  const res = await axios.post(`${API_BASE}/ask`, { query, user_profile: profile || {} });
  return res.data;
};

export const getForecast = async (profile: UserProfile): Promise<ApiResponse> => {
  const res = await axios.post(`${API_BASE}/forecast`, profile);
  return res.data;
};

export const runSimulation = async (profile: UserProfile): Promise<ApiResponse> => {
  const res = await axios.post(`${API_BASE}/simulate`, profile);
  return res.data;
};

export const getRecommendation = async (profile: UserProfile): Promise<ApiResponse> => {
  const res = await axios.post(`${API_BASE}/recommend`, profile);
  return res.data;
};

export const askVoiceQuery = async (audioBase64: string, language: string, profile?: UserProfile): Promise<ApiResponse> => {
  const res = await axios.post(`${API_BASE}/voice_query`, {
    audio_base64: audioBase64,
    language,
    user_profile: profile || {}
  });
  return res.data;
};

export const askTextQuery = async (text: string, language: string, profile?: UserProfile): Promise<ApiResponse> => {
  const res = await axios.post(`${API_BASE}/text_query`, {
    text,
    language,
    user_profile: profile || {}
  });
  return res.data;
};
