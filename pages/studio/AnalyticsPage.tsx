
import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import Spinner from '../../components/Spinner';

interface AnalyticsData {
    trafficSources: { source: string; percentage: number }[];
    audienceDemographics: { label: string; percentage: number }[];
}

const ChartCard: React.FC<{ title: string; data: { label: string; percentage: number }[] }> = ({ title, data }) => (
    <div className="bg-zinc-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="space-y-3">
            {data.map(item => (
                <div key={item.label}>
                    <div className="flex justify-between text-sm text-zinc-300 mb-1">
                        <span>{item.label}</span>
                        <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2.5">
                        <div className="bg-netflix-red h-2.5 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


const AnalyticsPage: React.FC = () => {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setIsLoading(true);
            try {
                const data = await apiService.get<AnalyticsData>('/studio/analytics');
                setAnalytics(data);
            } catch (error) {
                console.error("Failed to fetch analytics:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (isLoading) return <div className="flex justify-center mt-10"><Spinner/></div>

    if (!analytics) return <p className="text-zinc-400">Could not load analytics data.</p>

    return (
         <div>
            <h1 className="text-3xl font-bold text-white mb-6">Channel Analytics</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartCard title="Traffic Sources" data={analytics.trafficSources.map(d => ({label: d.source, percentage: d.percentage}))} />
                <ChartCard title="Audience Demographics" data={analytics.audienceDemographics} />
            </div>
        </div>
    );
};

export default AnalyticsPage;
