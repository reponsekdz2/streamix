
import React from 'react';
import { useMiniplayer } from '../contexts/MiniplayerContext';
import { Link } from 'react-router-dom';

const Miniplayer: React.FC = () => {
    const { activeVideo, isMiniplayerActive, deactivateMiniplayer } = useMiniplayer();

    if (!isMiniplayerActive || !activeVideo) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 w-80 bg-zinc-800 rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col animate-slide-in">
            <div className="relative aspect-video">
                 <img src={activeVideo.thumbnailUrl} alt={activeVideo.title} className="w-full h-full object-cover" />
                 <div className="absolute top-0 right-0 p-1">
                    <button onClick={deactivateMiniplayer} className="text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-75">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                 </div>
            </div>
            <Link to={`/watch/${activeVideo.id}`} className="p-3 hover:bg-zinc-700">
                <p className="text-white font-semibold text-sm truncate">{activeVideo.title}</p>
                <p className="text-zinc-400 text-xs truncate">{activeVideo.channel.name}</p>
            </Link>
        </div>
    );
};

export default Miniplayer;
