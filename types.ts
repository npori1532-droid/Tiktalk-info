export interface TikTokUser {
  id: string;
  uniqueId: string;
  nickname: string;
  avatarLarger: string;
  avatarMedium: string;
  avatarThumb: string;
  signature: string;
  createTime: number;
  verified: boolean;
  secUid: string;
  relation: number;
  openFavorite: boolean;
  privateAccount: boolean;
  isADVirtual: boolean;
  roomId: string;
}

export interface TikTokStats {
  followerCount: number;
  followingCount: number;
  heart: number;
  heartCount: number;
  videoCount: number;
  diggCount: number;
  friendCount: number;
}

export interface TikTokResult {
  user: TikTokUser;
  stats: TikTokStats;
  itemList?: any[];
}

export interface APIResponse {
  status: boolean;
  creator: string;
  result: TikTokResult;
}