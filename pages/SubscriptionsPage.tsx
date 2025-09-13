
import React, { useState, useEffect } from 'react';
import VideoGrid from '../components/VideoGrid';
// FIX: Corrected import paths.
import { CollectionIcon } from '../constants';
import { Video } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';

const SubscriptionsPage: React.FC = () => {
  const [subscriptionVideos, setSubscriptionVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        setSubscriptionVideos([]);
        return;
      }
      setIsLoading(true);
      try {
        const data = await apiService.get<Video[]>('/users/me/subscriptions');
        setSubscriptionVideos(data);
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubscriptions();
  }, [isAuthenticated]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
            <CollectionIcon className="w-8 h-8 text-netflix-red"/>
            <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
        </div>
      <VideoGrid videos={subscriptionVideos} isLoading={isLoading} title="Latest from your subscriptions" />
    </div>
  );
};

export default SubscriptionsPage;