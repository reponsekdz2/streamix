
export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  playbackSettings?: {
    autoplay: boolean;
    defaultQuality: string;
  };
  blockedUsers?: string[];
}

export interface Channel {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  subscribers: number;
  videos?: Video[];
  description?: string;
  bannerUrl?: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  likes: number;
  timestamp: string;
  replies?: Comment[];
  parentId: string | null;
  // FIX: Add optional videoId for studio comments page
  videoId?: string;
  videoTitle?: string; // For studio comments page
}

export interface VideoChapter {
    timestamp: string;
    title: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
  uploadedAt: string;
  channel: Channel;
  description: string;
  comments: Comment[];
  likes: number;
  dislikes: number;
  tags: string[];
  videoUrl: string;
  qualities: string[];
  isLive: boolean;
  chapters: VideoChapter[];
  privacy: 'public' | 'private' | 'unlisted';
  isShort: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  videoIds: string[];
  videos?: Video[];
}

export interface CommunityPost {
  id: string;
  user: User;
  text: string;
  likes: number;
  timestamp: string;
}

export interface Notification {
  id: string;
  type: 'new_video' | 'comment' | 'mention' | 'new_subscriber';
  text: string;
  timestamp: string;
  read: boolean;
  link: string;
}

export interface Report {
    contentId: string;
    contentType: 'video' | 'comment';
    reason: string;
    comments: string;
}
