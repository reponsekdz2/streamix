import React from 'react';
import AIVideoIdeaSuggester from '../components/AIVideoIdeaSuggester';

const MonetizationPage: React.FC = () => {
    const subscribers = 850;
    const watchHours = 2750;

    const subscriberGoal = 1000;
    const watchHoursGoal = 4000;

    const subscriberProgress = Math.min((subscribers / subscriberGoal) * 100, 100);
    const watchHoursProgress = Math.min((watchHours / watchHoursGoal) * 100, 100);

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Creator Monetization</h1>
            <p className="text-zinc-400 mb-8">Track your earnings and eligibility for the Streamix Partner Program.</p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                    <h3 className="text-sm font-medium text-zinc-400">Estimated Revenue</h3>
                    <p className="text-3xl font-bold text-white mt-1">$1,234.56</p>
                    <p className="text-sm text-zinc-500">last 28 days</p>
                </div>
                <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                    <h3 className="text-sm font-medium text-zinc-400">RPM</h3>
                    <p className="text-3xl font-bold text-white mt-1">$5.80</p>
                     <p className="text-sm text-zinc-500">per 1,000 views</p>
                </div>
                <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                    <h3 className="text-sm font-medium text-zinc-400">Playback-based CPM</h3>
                    <p className="text-3xl font-bold text-white mt-1">$12.45</p>
                     <p className="text-sm text-zinc-500">per 1,000 playbacks</p>
                </div>
            </div>

            <AIVideoIdeaSuggester />

            <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800">
                <h2 className="text-xl font-bold text-white">Join the Partner Program</h2>
                <p className="text-zinc-400 mt-2">To get into the Streamix Partner Program, your channel needs to meet these requirements:</p>
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div>
                        <p className="font-semibold text-white">{subscribers.toLocaleString()} / {subscriberGoal.toLocaleString()} subscribers</p>
                        <div className="w-full bg-zinc-700 rounded-full h-2.5 mt-2">
                            <div className="bg-netflix-red h-2.5 rounded-full" style={{ width: `${subscriberProgress}%` }}></div>
                        </div>
                    </div>
                     <div>
                        <p className="font-semibold text-white">{watchHours.toLocaleString()} / {watchHoursGoal.toLocaleString()} public watch hours</p>
                        <div className="w-full bg-zinc-700 rounded-full h-2.5 mt-2">
                            <div className="bg-netflix-red h-2.5 rounded-full" style={{ width: `${watchHoursProgress}%` }}></div>
                        </div>
                    </div>
                </div>
                <button className="bg-netflix-red text-white font-semibold px-6 py-2 rounded-md text-sm mt-8 hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed" disabled={subscriberProgress < 100 || watchHoursProgress < 100}>
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default MonetizationPage;
