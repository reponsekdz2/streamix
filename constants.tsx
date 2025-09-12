
import React from 'react';
import { Video, Comment, User } from './types';

export const MOCK_USER: User = {
    name: 'Alex Wilton',
    username: 'alexwilton',
    email: 'alex.wilton@example.com',
    avatarUrl: 'https://picsum.photos/seed/user/40/40',
};

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    thumbnailUrl: 'https://picsum.photos/seed/1/640/360',
    title: 'Exploring the Cosmos: A Journey to the Stars',
    channel: { name: 'Cosmic Wonders', avatarUrl: 'https://picsum.photos/seed/cw/40/40', subscribers: 1250000 },
    views: 2300000,
    uploadedAt: '2 weeks ago',
    duration: '15:45',
    description: 'Join us on an epic journey through distant galaxies, nebulae, and star systems. We explore the latest discoveries from the James Webb Space Telescope and ponder the mysteries of our universe. Is there life out there? What secrets do black holes hold? Prepare to be amazed.',
    watchedPercentage: 75,
  },
  {
    id: '2',
    thumbnailUrl: 'https://picsum.photos/seed/2/640/360',
    title: 'The Ultimate Guide to AI-Powered Cooking',
    channel: { name: 'Future Foods', avatarUrl: 'https://picsum.photos/seed/ff/40/40', subscribers: 780000 },
    views: 980000,
    uploadedAt: '5 days ago',
    duration: '22:10',
    description: 'Can an AI create a better recipe than a master chef? We put it to the test! In this video, we use cutting-edge AI to generate unique recipes and cooking instructions. The results are surprising, delicious, and sometimes... a little weird. Get ready to cook in the 21st century.',
    watchedPercentage: 20,
  },
  {
    id: '3',
    thumbnailUrl: 'https://picsum.photos/seed/3/640/360',
    title: 'Deep Ocean Mysteries: Creatures of the Abyss',
    channel: { name: 'AquaVerse', avatarUrl: 'https://picsum.photos/seed/av/40/40', subscribers: 3100000 },
    views: 5400000,
    uploadedAt: '1 month ago',
    duration: '35:20',
    description: 'Venture into the darkest depths of the ocean where sunlight never reaches. Discover bizarre and beautiful creatures that thrive in extreme pressure and cold. From the elusive giant squid to bioluminescent wonders, the abyss is full of secrets waiting to be uncovered.'
  },
  {
    id: '4',
    thumbnailUrl: 'https://picsum.photos/seed/4/640/360',
    title: 'Building a Smart Home from Scratch',
    channel: { name: 'TechBuilds', avatarUrl: 'https://picsum.photos/seed/tb/40/40', subscribers: 2200000 },
    views: 1800000,
    uploadedAt: '3 weeks ago',
    duration: '45:00',
    description: 'I turned my entire house into a futuristic smart home, and you can too! This is a complete step-by-step guide on how to choose devices, set up automations, and build a truly intelligent living space. From voice-controlled lighting to automated security, this project has it all.'
  },
  {
    id: '5',
    thumbnailUrl: 'https://picsum.photos/seed/5/640/360',
    title: 'The History of Ancient Rome in 20 Minutes',
    channel: { name: 'History Explained', avatarUrl: 'https://picsum.photos/seed/he/40/40', subscribers: 4500000 },
    views: 8900000,
    uploadedAt: '2 months ago',
    duration: '19:58',
    description: 'From the founding of the city to the fall of the empire, this video covers the entire saga of Ancient Rome in a fast-paced, engaging, and easy-to-understand format. Learn about the Republic, the Caesars, the Colosseum, and the lasting legacy of Rome on the modern world.'
  },
  {
    id: '6',
    thumbnailUrl: 'https://picsum.photos/seed/6/640/360',
    title: 'Lo-Fi Beats to Relax/Study to',
    channel: { name: 'ChillHop Cow', avatarUrl: 'https://picsum.photos/seed/chc/40/40', subscribers: 11200000 },
    views: 150000000,
    uploadedAt: '3 years ago',
    duration: '2:30:00',
    description: 'A continuous stream of relaxing lo-fi hip hop beats perfect for studying, working, or just chilling out. Let the smooth melodies and calm rhythm help you focus and de-stress. Art by amazing artists from around the world.',
    watchedPercentage: 95,
  },
  {
    id: '7',
    thumbnailUrl: 'https://picsum.photos/seed/7/640/360',
    title: 'How to Master Digital Painting in Procreate',
    channel: { name: 'ArtJourney', avatarUrl: 'https://picsum.photos/seed/aj/40/40', subscribers: 950000 },
    views: 750000,
    uploadedAt: '6 days ago',
    duration: '28:15',
    description: 'Unlock your artistic potential with this comprehensive tutorial on digital painting with Procreate. We cover everything from basic brushes and layers to advanced techniques like lighting, texture, and color theory. Perfect for beginners and intermediate artists alike.'
  },
  {
    id: '8',
    thumbnailUrl: 'https://picsum.photos/seed/8/640/360',
    title: 'Urban Exploration: Abandoned Theme Park',
    channel: { name: 'ExploreMore', avatarUrl: 'https://picsum.photos/seed/em/40/40', subscribers: 1500000 },
    views: 3200000,
    uploadedAt: '1 week ago',
    duration: '18:40',
    description: 'We snuck into the forgotten "Joyland" theme park, which has been abandoned for over 20 years. Witness the creepy and beautiful decay of roller coasters, carousels, and attractions that once brought joy to thousands. This is a journey back in time.',
    watchedPercentage: 100,
  }
];

export const MOCK_COMMENTS: Comment[] = [
    {
        username: 'TechGuru42',
        userImage: 'https://picsum.photos/seed/u1/40/40',
        text: 'This is an amazing breakdown! I learned so much. Can you do a follow-up on quantum computing?',
        likes: 1200,
        timestamp: '3 days ago'
    },
    {
        username: 'SpaceExplorer',
        userImage: 'https://picsum.photos/seed/u2/40/40',
        text: 'Wow, the visuals are absolutely stunning. Felt like I was actually traveling through space. Incredible work!',
        likes: 2500,
        timestamp: '1 week ago'
    },
    {
        username: 'SkepticalSam',
        userImage: 'https://picsum.photos/seed/u3/40/40',
        text: 'A bit sensationalist, don\'t you think? Some of these theories are not widely accepted in the scientific community.',
        likes: 150,
        timestamp: '2 days ago'
    },
    {
        username: 'JaneDoe',
        userImage: 'https://picsum.photos/seed/u4/40/40',
        text: 'What was that music at 10:45? It\'s beautiful! Someone please tell me.',
        likes: 85,
        timestamp: '5 hours ago'
    },
    {
        username: 'Just Kidding',
        userImage: 'https://picsum.photos/seed/u5/40/40',
        text: 'I came here to learn about the cosmos, but now I just feel really, really small. Thanks for the existential crisis! 😂',
        likes: 732,
        timestamp: '1 day ago'
    }
];

// SVG Icons
export const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
    </svg>
);

export const FireIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.362-3.797A8.33 8.33 0 0 1 12 2.25c1.153 0 2.243.3 3.224.862a8.33 8.33 0 0 1 .138 2.102Z" />
    </svg>
);

export const CollectionIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12.75 9 5.25 9-5.25M2.25 7.5l9 5.25 9-5.25M12 21.75l-9-5.25V7.5l9 5.25 9-5.25v9l-9 5.25Z" />
    </svg>
);

export const HistoryIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
);

export const VideoCameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
    </svg>
);

export const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const BellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export const LikeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H5.904c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125h2.084c.391 0 .758.115 1.05.31l3.114 1.04a.5.5 0 0 1 0 .884l-3.114 1.04a4.5 4.5 0 0 0-1.05.31H5.904c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125h.478c.625 0 1.226-.24 1.685-.658l2.9-2.9a1.125 1.125 0 0 1 1.591 0l2.9 2.9c.459.418 1.06.658 1.685.658h.478c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125h-2.084a4.5 4.5 0 0 0-1.05-.31l-3.114-1.04a.5.5 0 0 1 0-.884l3.114-1.04c.292-.097.659-.214 1.05-.31h2.084c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125Z" />
    </svg>
);

export const DislikeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.367 13.75c-.806 0-1.533.446-2.031 1.08a9.041 9.041 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 0 0-.322 1.672V21.25a.75.75 0 0 1-.75.75 2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282m0 0H3.874c-1.026 0-1.945-.694-2.054-1.715-.045-.422-.068-.85-.068-1.285a11.95 11.95 0 0 1 2.649-7.521c.388-.482.987-.729 1.605-.729h4.042c.483 0 .964.078 1.423.23l3.114 1.04a4.501 4.501 0 0 0 1.423.23h2.084m-10.598 9.75h12.194c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125h-2.084a4.5 4.5 0 0 0-1.05-.31l-3.114-1.04a.5.5 0 0 1 0-.884l3.114-1.04c.292-.097.659-.214 1.05-.31h2.084c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125h-.478c-.625 0-1.226.24-1.685.658l-2.9 2.9a1.125 1.125 0 0 1-1.591 0l-2.9-2.9c-.459-.418-1.06-.658-1.685-.658h-.478c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125h2.084c.391 0 .758.115 1.05.31l3.114 1.04a.5.5 0 0 1 0 .884l-3.114 1.04a4.5 4.5 0 0 0-1.05.31H7.096c-.621 0-1.125.504-1.125 1.125v4.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
);

export const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.186 2.25 2.25 0 0 0-3.933 2.186Z" />
    </svg>
);

export const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 21.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
);

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const CogIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-1.226.554-.22 1.19-.22 1.745 0 .56.22 1.02.684 1.11 1.226M15.002 11.196a4.5 4.5 0 1 0-6.004 0M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    </svg>
);

export const DollarSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182.577-.438 1.341-.659 2.122-.659 1.171 0 2.261.649 2.75 1.659" />
    </svg>
);

export const LogoutIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
);
