
import React from 'react';
import VideoGrid from '../components/VideoGrid';
import { MOCK_VIDEOS, CollectionIcon } from '../constants';

const SubscriptionsPage: React.FC = () => {
  // In a real app, this would be videos from subscribed channels
  const subscriptionVideos = MOCK_VIDEOS.slice(0, 8);

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
            <CollectionIcon className="w-8 h-8 text-netflix-red"/>
            <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
        </div>
      <VideoGrid videos={subscriptionVideos} title="Latest from your subscriptions" />
    </div>
  );
};

export default SubscriptionsPage;
