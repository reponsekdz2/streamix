
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// FIX: Corrected import paths.
import { Channel } from '../types';
import { apiService } from '../services/apiService';
import Spinner from '../components/Spinner';
import VideoGrid from '../components/VideoGrid';
import { useAuth } from '../contexts/AuthContext';
import CustomizeProfileModal from '../components/CustomizeProfileModal';
import CommunityTab from '../components/CommunityTab';

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCustomizeModalOpen, setCustomizeModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');

  const isOwner = user?.username === username;

  useEffect(() => {
    const fetchChannel = async () => {
      if (!username) return;
      setIsLoading(true);
      try {
        const data = await apiService.get<Channel>(`/channels/u/${username}`);
        setChannel(data);
      } catch (error) {
        console.error("Failed to fetch channel data:", error);
        setChannel(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChannel();
  }, [username]);

  // FIX: Add handler for when channel is updated via modal
  const handleChannelUpdate = (updatedChannel: Channel) => {
    setChannel(updatedChannel);
    if (updatedChannel.username !== username) {
      navigate(`/profile/${updatedChannel.username}`, { replace: true });
    }
  };

  const TabLink: React.FC<{ tabName: string; label: string }> = ({ tabName, label }) => (
    <button
        onClick={() => setActiveTab(tabName)}
        className={`px-4 py-2 font-semibold text-sm rounded-md ${activeTab === tabName ? 'bg-netflix-red text-white' : 'text-zinc-300 hover:bg-zinc-800'}`}
    >
        {label}
    </button>
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }

  if (!channel) {
    return <div className="text-center text-white text-2xl mt-20">Channel not found.</div>;
  }

  return (
    <div>
      <div className="h-48 bg-zinc-800 rounded-lg">
        {/* Banner Image would go here */}
      </div>
      <div className="px-4 sm:px-8 -mt-16">
        <div className="flex items-end gap-6">
          <img src={channel.avatarUrl} alt={channel.name} className="w-32 h-32 rounded-full border-4 border-netflix-dark" />
          <div className="pb-4 flex-grow">
            <h1 className="text-3xl font-bold text-white">{channel.name}</h1>
            <div className="flex items-center gap-4 text-zinc-400 text-sm">
              <span>@{channel.username}</span>
              <span>{channel.subscribers.toLocaleString()} subscribers</span>
              <span>{channel.videos?.length || 0} videos</span>
            </div>
          </div>
          <div className="pb-4">
              {isOwner ? (
                <button onClick={() => setCustomizeModalOpen(true)} className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2 px-4 rounded-md">
                    Customize Channel
                </button>
              ) : (
                <button className="bg-netflix-red hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md">
                    Subscribe
                </button>
              )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 border-b border-zinc-800">
          <nav className="flex items-center gap-4 px-4 sm:px-8">
            <TabLink tabName="videos" label="Videos" />
            <TabLink tabName="community" label="Community" />
            <TabLink tabName="about" label="About" />
          </nav>
      </div>

      <div className="mt-8">
        {activeTab === 'videos' && <VideoGrid videos={channel.videos || []} />}
        {activeTab === 'community' && <CommunityTab channelId={channel.id} isOwner={isOwner} />}
        {activeTab === 'about' && (
            <div className="max-w-2xl text-zinc-300 whitespace-pre-wrap bg-zinc-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                {channel.description}
            </div>
        )}
      </div>

      {isCustomizeModalOpen && <CustomizeProfileModal closeModal={() => setCustomizeModalOpen(false)} onUpdate={handleChannelUpdate} />}
    </div>
  );
};

export default ProfilePage;
