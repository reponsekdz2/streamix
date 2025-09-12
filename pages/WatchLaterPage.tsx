
import React from 'react';
import VideoGrid from '../components/VideoGrid';
import { MOCK_VIDEOS, ClockIcon } from '../constants';

const WatchLaterPage: React.FC = () => {
  // In a real app, this would come from user data context
  const watchLaterVideos = MOCK_VIDEOS.slice(2, 6);

  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
            <ClockIcon className="w-8 h-8 text-netflix-red"/>
            <h1 className="text-3xl font-bold text-white">Watch Later</h1>
        </div>
      <VideoGrid videos={watchLaterVideos} />
    </div>
  );
};

export default WatchLaterPage;
