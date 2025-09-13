
import React from 'react';
import VideoGrid from '../components/VideoGrid';
// FIX: Corrected import path.
import { DownloadIcon } from '../constants';
// FIX: Corrected import path.
import { Video } from '../types';

const DownloadsPage: React.FC = () => {
  // In a real app, this would be a list of user-downloaded videos
  // FIX: MOCK_VIDEOS has been removed, so using an empty array.
  const downloadedVideos: Video[] = [];

  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
            <DownloadIcon className="w-8 h-8 text-netflix-red"/>
            <h1 className="text-3xl font-bold text-white">Your Downloads</h1>
        </div>
        <p className="text-zinc-400 mb-8">Videos you've downloaded will appear here, ready to watch offline.</p>
        <VideoGrid videos={downloadedVideos} />
    </div>
  );
};

export default DownloadsPage;