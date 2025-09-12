
import React from 'react';
import VideoGrid from '../components/VideoGrid';
import { MOCK_VIDEOS, HistoryIcon } from '../constants';

const HistoryPage: React.FC = () => {
  // In a real app, this would come from user data context
  const historyVideos = MOCK_VIDEOS.slice(5, 10);

  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
            <HistoryIcon className="w-8 h-8 text-netflix-red"/>
            <h1 className="text-3xl font-bold text-white">Watch History</h1>
        </div>
      <VideoGrid videos={historyVideos} />
    </div>
  );
};

export default HistoryPage;
