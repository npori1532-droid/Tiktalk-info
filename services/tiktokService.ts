import { APIResponse } from '../types';

const API_BASE_URL = 'https://free-enyme-hub.vercel.app/api/tiktok';

export const fetchTikTokData = async (username: string): Promise<APIResponse> => {
  // Clean username input
  const cleanUsername = username.trim().replace('@', '');
  
  try {
    const response = await fetch(`${API_BASE_URL}?username=${cleanUsername}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data: APIResponse = await response.json();
    
    if (!data.status || !data.result) {
      throw new Error('User not found or private account.');
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch TikTok data:", error);
    throw error;
  }
};