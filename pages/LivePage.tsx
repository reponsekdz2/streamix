
import React from 'react';
import LiveChat from '../components/LiveChat';

const LivePage: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-grow lg:w-2/3">
                <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                    <p className="text-white text-2xl font-bold">LIVE</p>
                </div>
                <div className="mt-4">
                    <h1 className="text-2xl font-bold text-white">Live Stream Title</h1>
                    <p className="text-zinc-400">1,234 watching now</p>
                </div>
            </div>
            <div className="lg:w-1/3">
                <LiveChat />
            </div>
        </div>
    );
};

export default LivePage;
