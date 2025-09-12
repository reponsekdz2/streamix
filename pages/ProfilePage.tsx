
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_USER, MOCK_VIDEOS } from '../constants';
import VideoGrid from '../components/VideoGrid';
import CustomizeProfileModal from '../components/CustomizeProfileModal';

const ProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // In a real app, you'd fetch user data based on the username param
    const user = MOCK_USER; 
    const userVideos = MOCK_VIDEOS.slice(0, 8); // Mock videos for this user

    return (
        <div>
            <div className="relative h-48 bg-zinc-800 rounded-lg">
                <img src="https://picsum.photos/seed/banner/1200/200" alt="Channel banner" className="w-full h-full object-cover rounded-lg" />
            </div>

            <div className="flex items-end -mt-16 sm:-mt-20 px-8">
                <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-netflix-dark bg-black" />
                <div className="ml-6 flex-grow pb-2">
                    <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                    <p className="text-zinc-400">@{user.username} &middot; 2.3M subscribers &middot; 123 videos</p>
                </div>
                 <div className="flex gap-2 pb-2">
                    <button onClick={() => setIsModalOpen(true)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-4 py-2 rounded-full text-sm">
                        Customize Channel
                    </button>
                    <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-4 py-2 rounded-full text-sm">
                        Manage Videos
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold text-white mb-4">Uploads</h2>
                <VideoGrid videos={userVideos} />
            </div>

            {isModalOpen && <CustomizeProfileModal closeModal={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default ProfilePage;
