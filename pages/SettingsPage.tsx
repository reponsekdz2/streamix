
import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
      
      <div className="space-y-10">
        {/* Account Section */}
        <div>
          <h2 className="text-xl font-semibold text-white border-b border-zinc-700 pb-2 mb-4">Account</h2>
          <div className="space-y-4">
             <div className="flex flex-col">
                <label className="text-sm font-medium text-zinc-400 mb-1">Email Address</label>
                <input type="email" defaultValue="jane.doe@example.com" className="bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-white" />
             </div>
             <div className="flex flex-col">
                <label className="text-sm font-medium text-zinc-400 mb-1">Username</label>
                <input type="text" defaultValue="janedoe" className="bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-white" />
             </div>
              <button className="text-sm text-netflix-red hover:text-red-400">Change Password</button>
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <h2 className="text-xl font-semibold text-white border-b border-zinc-700 pb-2 mb-4">Notifications</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-white">New video uploads from subscriptions</p>
                <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                </label>
            </div>
             <div className="flex items-center justify-between">
                <p className="text-white">Comments on your videos</p>
                <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                </label>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-white">Promotional emails</p>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label>
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <div>
          <h2 className="text-xl font-semibold text-white border-b border-zinc-700 pb-2 mb-4">Theme</h2>
            <div className="flex items-center gap-4">
                <button className="border-2 border-netflix-red bg-zinc-800 px-4 py-2 rounded-md text-white font-semibold">Dark Mode</button>
                <button className="border-2 border-transparent bg-zinc-700 px-4 py-2 rounded-md text-zinc-400 font-semibold">Light Mode</button>
            </div>
        </div>
        
         <div className="pt-4">
            <button className="bg-netflix-red text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors">Save Changes</button>
        </div>
      </div>
       <style>{`
        .switch { position: relative; display: inline-block; width: 40px; height: 24px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #4d4d4d; transition: .4s; }
        .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 4px; background-color: white; transition: .4s; }
        input:checked + .slider { background-color: #E50914; }
        input:checked + .slider:before { transform: translateX(16px); }
        .slider.round { border-radius: 34px; }
        .slider.round:before { border-radius: 50%; }
      `}</style>
    </div>
  );
};

export default SettingsPage;
