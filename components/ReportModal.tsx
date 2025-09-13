
import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import Spinner from './Spinner';

interface ReportModalProps {
    contentId: string;
    contentType: 'video' | 'comment';
    closeModal: () => void;
}

const reportReasons = [
    "Spam or misleading",
    "Sexual content",
    "Hate speech or symbols",
    "Violent or graphic content",
    "Harassment or bullying",
    "Copyright violation",
];

const ReportModal: React.FC<ReportModalProps> = ({ contentId, contentType, closeModal }) => {
    const [reason, setReason] = useState(reportReasons[0]);
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            await apiService.post('/reports', { contentId, contentType, reason, comments });
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Failed to submit report.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
         <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 rounded-lg shadow-xl w-full max-w-lg border border-zinc-700">
                 <div className="flex items-center justify-between p-4 border-b border-zinc-700">
                    <h2 className="text-lg font-semibold text-white">Report {contentType}</h2>
                    <button onClick={closeModal} className="text-zinc-400 text-2xl leading-none hover:text-white">&times;</button>
                </div>
                {success ? (
                    <div className="p-8 text-center">
                        <h3 className="text-xl font-bold text-green-400">Thank You!</h3>
                        <p className="text-zinc-300 mt-2">Your report has been submitted. We will review it shortly.</p>
                        <button onClick={closeModal} className="mt-6 bg-netflix-red px-6 py-2 rounded-md font-semibold">Close</button>
                    </div>
                ) : (
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Reason for reporting</label>
                            <select value={reason} onChange={e => setReason(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white">
                                {reportReasons.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-zinc-300 mb-1">Additional Comments (optional)</label>
                            <textarea value={comments} onChange={e => setComments(e.target.value)} rows={4} className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-4 text-white"/>
                        </div>
                         {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                     <div className="flex justify-end p-4 bg-zinc-800 border-t border-zinc-700 rounded-b-lg gap-3">
                        <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md hover:bg-zinc-700 font-semibold">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-md bg-netflix-red hover:bg-red-700 font-semibold w-28 flex justify-center">
                            {isSubmitting ? <Spinner/> : 'Submit'}
                        </button>
                    </div>
                </form>
                )}
            </div>
        </div>
    );
};

export default ReportModal;
