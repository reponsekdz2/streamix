export interface Channel {
  name: string;
  avatarUrl: string;
  subscribers: number;
}

export interface Video {
  id: string;
  thumbnailUrl: string;
  title: string;
  channel: Channel;
  views: number;
  uploadedAt: string;
  duration: string;
  description: string;
  watchedPercentage?: number;
}

export interface Comment {
    username: string;
    userImage: string;
    text: string;
    likes: number;
    timestamp: string;
}

export interface User {
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
}

// FIX: Add missing VideoIdea interface
export interface VideoIdea {
  title: string;
  description: string;
  visuals: string;
}
