
import React, { useState } from 'react';

type Tab = 'Account' | 'Notifications' | 'Playback' | 'Privacy';

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('Account');

    const renderContent = () => {
        switch (activeTab) {
            case 'Account':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-white">Profile Information</h3>
                            <p className="text-sm text-zinc-400">Update your account's profile information and email address.</p>
                        </div>
                        <div className="space-y-4">
                            <input type="text" defaultValue="Alex Wilton" className="w-full max-w-sm bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white" />
                            <input type="email" defaultValue="alex.wilton@example.com" className="w-full max-w-sm bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white" />
                        </div>
                         <button className="bg-netflix-red text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-red-700">Save Changes</button>
                    </div>
                );
            case 'Notifications':
                 return <p className="text-zinc-400">Manage your notification preferences here.</p>;
            case 'Playback':
                return <p className="text-zinc-400">Manage your video playback settings here.</p>;
            case 'Privacy':
                return <p className="text-zinc-400">Manage your privacy and data settings here.</p>;
            default:
                return null;
        }
    }

    const TabButton: React.FC<{ tabName: Tab }> = ({ tabName }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === tabName ? 'bg-netflix-red text-white' : 'text-zinc-300 hover:bg-zinc-700'}`}
        >
            {tabName}
        </button>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <nav className="flex md:flex-col gap-2">
                   <TabButton tabName="Account"/>
                   <TabButton tabName="Notifications"/>
                   <TabButton tabName="Playback"/>
                   <TabButton tabName="Privacy"/>
                </nav>
                <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
