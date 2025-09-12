
import React from 'react';

const VideoCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="relative bg-zinc-700 rounded-lg aspect-video"></div>
      <div className="flex items-start mt-3">
        <div className="h-9 w-9 rounded-full mr-3 bg-zinc-700"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-zinc-700 rounded w-5/6"></div>
          <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
          <div className="h-3 bg-zinc-700 rounded w-1/2 mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardSkeleton;
