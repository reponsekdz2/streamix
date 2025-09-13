
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';
import Spinner from '../components/Spinner';

type PlaybackSettings = {
    autoplay: boolean;
    defaultQuality: string;
}

const SettingsPage: React.FC = () => {
    const { user } = useAuth();
    const [settings, setSettings] = useState<PlaybackSettings | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true);
            try {
                const data = await apiService.get<PlaybackSettings>('/users/me/settings');
                setSettings(data);
            } catch (error) {
                console.error("Failed to fetch settings:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!settings) return;
        setIsSaving(true);
        setSaveMessage('');
        try {
            await apiService.put('/users/me/settings', settings);
            setSaveMessage('Settings saved successfully!');
            setTimeout(() => setSaveMessage(''), 3000);
        } catch (error) {
            console.error("Failed to save settings:", error);
            setSaveMessage('Failed to save settings.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading || !settings) {
        return <div className="flex justify-center items-center h-64"><Spinner/></div>
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
            <form onSubmit={handleSave}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg">
                    <div className="p-6 border-b border-zinc-800">
                        <h2 className="text-xl font-semibold text-white">Playback</h2>
                        <p className="text-zinc-400 mt-1">Manage your video viewing experience.</p>
                        <div className="mt-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-white">Autoplay</h3>
                                    <p className="text-sm text-zinc-400">Play the next video automatically.</p>
                                </div>
                                <label htmlFor="autoplay-toggle" className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="autoplay-toggle" className="sr-only peer"
                                        checked={settings.autoplay}
                                        onChange={e => setSettings(s => s ? {...s, autoplay: e.target.checked} : null)}
                                    />
                                    <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-netflix-red"></div>
                                </label>
                            </div>
                            <div>
                                <label htmlFor="quality" className="block text-sm font-medium text-white mb-2">Default Video Quality</label>
                                <select 
                                    id="quality" 
                                    value={settings.defaultQuality}
                                    onChange={e => setSettings(s => s ? {...s, defaultQuality: e.target.value} : null)}
                                    className="bg-zinc-800 border border-zinc-700 rounded-md text-white text-sm focus:ring-netflix-red w-full max-w-xs"
                                >
                                    <option value="1080p">1080p (Full HD)</option>
                                    <option value="720p">720p (HD)</option>
                                    <option value="480p">480p (Standard)</option>
                                    <option value="auto">Auto</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Placeholder for other setting sections */}
                    <div className="p-6 border-b border-zinc-800">
                        <h2 className="text-xl font-semibold text-white">Account</h2>
                    </div>
                    <div className="p-6 flex justify-end items-center gap-4">
                        {saveMessage && <p className="text-sm text-green-400">{saveMessage}</p>}
                        <button type="submit" disabled={isSaving} className="bg-netflix-red text-white font-semibold px-6 py-2 rounded-md hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed">
                            {isSaving ? <Spinner/> : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;
