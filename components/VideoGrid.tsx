
import React from 'react';
import { Video } from '../types';
import VideoCard from './VideoCard';
import VideoCardSkeleton from './VideoCardSkeleton';

interface VideoGridProps {
  videos: Video[];
  title?: string;
  isLoading?: boolean;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, title, isLoading = false }) => {
  if (isLoading) {
    return (
      <div>
        {title && <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <VideoCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
        <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-zinc-400">No videos found.</h2>
            <p className="text-zinc-500 mt-2">Try adjusting your search or check back later.</p>
        </div>
    );
  }

  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
