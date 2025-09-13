
import React from 'react';

const DashboardPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Channel Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-zinc-800 p-6 rounded-lg">
                    <h3 className="text-zinc-400">Current Subscribers</h3>
                    <p className="text-3xl font-bold text-white mt-2">1,234</p>
                </div>
                <div className="bg-zinc-800 p-6 rounded-lg">
                    <h3 className="text-zinc-400">Views (last 28 days)</h3>
                    <p className="text-3xl font-bold text-white mt-2">56,789</p>
                </div>
                <div className="bg-zinc-800 p-6 rounded-lg">
                    <h3 className="text-zinc-400">Watch Time (hours)</h3>
                    <p className="text-3xl font-bold text-white mt-2">2,100</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
