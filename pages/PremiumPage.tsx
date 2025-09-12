
import React from 'react';

const PremiumPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto text-center py-12">
      <h1 className="text-5xl font-extrabold text-white">
        Upgrade to <span className="text-netflix-red">Streamix Premium</span>
      </h1>
      <p className="text-xl text-zinc-300 mt-4 max-w-2xl mx-auto">
        Enjoy an enhanced experience with exclusive features, no ads, and more.
      </p>
      <button className="bg-netflix-red text-white font-bold text-lg px-12 py-4 rounded-lg mt-8 hover:bg-red-700 transition-transform hover:scale-105">
        Get Premium
      </button>

      <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white">Ad-Free Viewing</h3>
          <p className="text-zinc-400 mt-2">
            Watch all your favorite videos without any interruptions.
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white">Offline Downloads</h3>
          <p className="text-zinc-400 mt-2">
            Save videos to watch later on your device, even without an internet connection.
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white">Background Play</h3>
          <p className="text-zinc-400 mt-2">
            Keep videos playing in the background while you use other apps or when your screen is off.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
