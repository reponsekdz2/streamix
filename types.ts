
export interface User {
  name: string;
  username: string;
  avatarUrl: string;
  email: string;
}

export interface Channel {
    name: string;
    avatarUrl:string;
}

export interface Video {
  id: string;
  thumbnailUrl: string;
  title: string;
  duration: string;
  channel: Channel;
  views: number;
  uploadedAt: string;
  description: string;
}

export interface Notification {
    id: string;
    user: { name: string, avatarUrl: string };
    video: { title: string };
    type: 'upload' | 'comment';
    time: string;
    read: boolean;
}

export interface Comment {
    username: string;
    userImage: string;
    text: string;
    likes: number;
    timestamp: string;
}

export interface VideoIdea {
    title: string;
    description: string;
    visuals: string;
}
