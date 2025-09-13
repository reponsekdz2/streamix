
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LiveChat: React.FC = () => {
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { user: 'Alice', text: 'Hello everyone!' },
        { user: 'Bob', text: 'Hey, great stream!' },
    ]);
    
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && user) {
            setChatMessages(prev => [...prev, { user: user.name, text: message }]);
            setMessage('');
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg h-[70vh] flex flex-col">
            <div className="p-4 border-b border-zinc-800">
                <h3 className="font-semibold text-white">Live Chat</h3>
            </div>
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                    <div key={index}>
                        <span className="font-semibold text-zinc-400 text-sm mr-2">{msg.user}:</span>
                        <span className="text-white text-sm">{msg.text}</span>
                    </div>
                ))}
            </div>
            {user && (
                <div className="p-4 border-t border-zinc-800">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Say something..."
                            className="flex-grow bg-zinc-800 border border-zinc-700 rounded-full py-2 px-4 text-white placeholder-zinc-500 focus:outline-none"
                        />
                        <button type="submit" className="bg-netflix-red rounded-full p-2 text-white">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 0010 16h.008a1 1 0 00.724-.288l5-5a1 1 0 000-1.414l-7-7z" /></svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LiveChat;
