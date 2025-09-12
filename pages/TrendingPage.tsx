
import React from 'react';
import VideoGrid from '../components/VideoGrid';
import { MOCK_VIDEOS, FireIcon } from '../constants';

const TrendingPage: React.FC = () => {
  // In a real app, you'd fetch trending videos
  const trendingVideos = [...MOCK_VIDEOS].sort((a, b) => b.views - a.views);

  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
            <FireIcon className="w-8 h-8 text-netflix-red"/>
            <h1 className="text-3xl font-bold text-white">Trending</h1>
        </div>
      <VideoGrid videos={trendingVideos} />
    </div>
  );
};

export default TrendingPage;
