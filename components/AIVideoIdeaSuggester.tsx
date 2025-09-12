
import React, { useState } from 'react';
import { generateVideoIdeas } from '../services/geminiService';
// FIX: Corrected import path for types.
import { VideoIdea } from '../types';
import Spinner from './Spinner';

const AIVideoIdeaSuggester: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [ideas, setIdeas] = useState<VideoIdea[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateIdeas = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setIsLoading(true);
        setError(null);
        setIdeas([]);

        try {
            const result = await generateVideoIdeas(topic);
            setIdeas(result);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 my-8">
            <h2 className="text-2xl font-bold text-white mb-2">AI Video Idea Generator</h2>
            <p className="text-zinc-400 mb-4">Stuck for ideas? Enter a topic and let our AI brainstorm for you!</p>

            <form onSubmit={handleGenerateIdeas} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., 'sustainable living' or 'history of video games'"
                    className="flex-grow bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="bg-netflix-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors disabled:bg-red-900 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={isLoading || !topic.trim()}
                >
                    {isLoading ? <Spinner /> : 'Generate Ideas'}
                </button>
            </form>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {ideas.length > 0 && (
                <div className="mt-6 space-y-4">
                    {ideas.map((idea, index) => (
                        <div key={index} className="bg-zinc-800 p-4 rounded-md border border-zinc-700">
                            <h3 className="font-bold text-netflix-red text-lg">{idea.title}</h3>
                            <p className="text-zinc-300 mt-1">{idea.description}</p>
                            <p className="text-zinc-400 mt-2 text-sm"><strong className="text-zinc-300">Visuals:</strong> {idea.visuals}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AIVideoIdeaSuggester;