
import React from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_VIDEOS, MOCK_USER } from '../constants';
import VideoGrid from '../components/VideoGrid';
import { formatNumber } from '../utils/formatters';

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  
  // In a real app, you would fetch user data based on the username.
  // Here, we'll just display the mock user's data.
  const user = MOCK_USER; 
  const userVideos = MOCK_VIDEOS.slice(3, 7); // Mock videos uploaded by this user

  return (
    <div>
      <div className="h-48 bg-zinc-800 rounded-lg">
        <img src="https://picsum.photos/seed/banner/1200/300" alt="Channel banner" className="w-full h-full object-cover rounded-lg" />
      </div>

      <div className="flex items-center -mt-12 px-8">
        <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-netflix-dark bg-netflix-dark" />
        <div className="ml-6 mt-12">
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <div className="flex items-center space-x-4 text-zinc-400 text-sm">
                <span>@{user.username}</span>
                <span>{formatNumber(123000)} subscribers</span>
                <span>{userVideos.length} videos</span>
            </div>
        </div>
        <div className="ml-auto mt-12">
             <button className="bg-zinc-800 text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-zinc-700 transition-colors">Customize channel</button>
        </div>
      </div>
      
      <div className="mt-8 border-t border-zinc-800">
         <div className="mt-6">
            <VideoGrid videos={userVideos} title="Uploads" />
         </div>
      </div>
    </div>
  );
};

export default ProfilePage;
