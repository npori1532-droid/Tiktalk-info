import { APIResponse, TikTokUser, TikTokStats } from '../types';

// Using TikWM API as the data source
const API_BASE_URL = 'https://www.tikwm.com/api/user/info';

const mapTikWMResponse = (json: any): APIResponse => {
  if (json.code !== 0) {
    throw new Error(json.msg || 'User not found or private account.');
  }

  if (!json.data || !json.data.user) {
    throw new Error('Invalid API response structure');
  }

  const userData = json.data.user;
  const statsData = json.data.stats;

  const user: TikTokUser = {
    id: userData.id,
    uniqueId: userData.uniqueId,
    nickname: userData.nickname,
    avatarLarger: userData.avatarLarger,
    avatarMedium: userData.avatarMedium,
    avatarThumb: userData.avatarThumb,
    signature: userData.signature,
    createTime: userData.createTime || 0,
    verified: userData.verified,
    secUid: userData.secUid,
    relation: userData.relation || 0,
    openFavorite: userData.openFavorite || false,
    privateAccount: userData.privateAccount || false,
    isADVirtual: userData.isADVirtual || false,
    roomId: userData.roomId || "",
    language: userData.language || userData.region || 'N/A' 
  };

  const stats: TikTokStats = {
    followerCount: statsData.followerCount,
    followingCount: statsData.followingCount,
    heart: statsData.heart,
    heartCount: statsData.heartCount,
    videoCount: statsData.videoCount,
    diggCount: statsData.diggCount,
    friendCount: statsData.friendCount || 0
  };

  return {
    status: true,
    creator: "Tech Master",
    result: {
      user,
      stats,
      itemList: []
    }
  };
};

export const fetchTikTokData = async (username: string): Promise<APIResponse> => {
  // Clean username input
  const cleanUsername = username.trim().replace('@', '');
  const targetUrl = `${API_BASE_URL}?unique_id=${cleanUsername}`;
  
  // Strategy 1: AllOrigins (JSONP style wrapper)
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}&timestamp=${Date.now()}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error(`AllOrigins status: ${response.status}`);
    
    const wrapper = await response.json();
    if (!wrapper.contents) throw new Error('Empty proxy response');
    
    const json = JSON.parse(wrapper.contents);
    return mapTikWMResponse(json);
  } catch (err: any) {
    console.warn("Primary proxy (AllOrigins) failed, attempting backup...", err.message);
  }

  // Strategy 2: CorsProxy.io (Direct Proxy)
  try {
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error(`CorsProxy status: ${response.status}`);
    
    const json = await response.json();
    return mapTikWMResponse(json);
  } catch (err: any) {
    console.warn("Secondary proxy (CorsProxy) failed, attempting tertiary...", err.message);
  }

  // Strategy 3: CodeTabs (Direct Proxy)
  try {
     const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`;
     const response = await fetch(proxyUrl);
     if (!response.ok) throw new Error(`CodeTabs status: ${response.status}`);
     
     const json = await response.json();
     return mapTikWMResponse(json);
  } catch (err: any) {
      console.warn("Tertiary proxy (CodeTabs) failed:", err.message);
  }

  throw new Error("Network error: Unable to connect to TikTok data service. Please check your internet connection or try again later.");
};