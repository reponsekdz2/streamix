const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = 'your-very-secret-key-that-is-long-and-secure';
const PORT = 3001;

// --- MOCK DATABASE ---
let db = {
  users: [
    { id: 'user-1', name: 'Jane Doe', username: 'janedoe', avatarUrl: 'https://i.pravatar.cc/150?u=user1', email: 'jane.doe@example.com', passwordHash: bcrypt.hashSync('password123', 10), subscriptions: ['channel-2'], blockedUsers: [], playbackSettings: { autoplay: true, defaultQuality: '1080p' } },
    { id: 'user-2', name: 'John Smith', username: 'johnsmith', avatarUrl: 'https://i.pravatar.cc/150?u=user2', email: 'john.smith@example.com', passwordHash: bcrypt.hashSync('password123', 10), subscriptions: ['channel-1'], blockedUsers: [], playbackSettings: { autoplay: false, defaultQuality: '720p' } },
  ],
  channels: [
    { id: 'channel-1', userId: 'user-1', name: 'Jane\'s Tech World', username: 'janedoe', avatarUrl: 'https://i.pravatar.cc/150?u=user1', subscribers: 125000, description: 'Exploring the latest in tech, programming, and AI. Join me on this journey!', bannerUrl: 'https://source.unsplash.com/random/1200x300?tech' },
    { id: 'channel-2', userId: 'user-2', name: 'Cooking with John', username: 'johnsmith', avatarUrl: 'https://i.pravatar.cc/150?u=user2', subscribers: 250000, description: 'Simple recipes for delicious home-cooked meals.', bannerUrl: 'https://source.unsplash.com/random/1200x300?food' },
  ],
  videos: [
    { id: 'video-1', channelId: 'channel-1', title: 'Ultimate Guide to React Hooks in 2024', thumbnailUrl: 'https://source.unsplash.com/random/400x225?react', duration: '18:24', views: 1500000, uploadedAt: '2 days ago', description: 'A deep dive into React Hooks.', likes: 45000, dislikes: 200, tags: ['react', 'javascript', 'webdev'], videoUrl: 'https://www.youtube.com/watch?v=TNhaISOUy6Q', qualities: ['1080p', '720p', '480p'], isLive: false, chapters: [{ timestamp: '0:00', title: 'Intro' }, { timestamp: '2:30', title: 'useState' }, { timestamp: '8:15', title: 'useEffect' }], privacy: 'public', isShort: false },
    { id: 'video-2', channelId: 'channel-2', title: 'The Perfect Sourdough Bread', thumbnailUrl: 'https://source.unsplash.com/random/400x225?bread', duration: '12:55', views: 2200000, uploadedAt: '1 week ago', description: 'Master the art of sourdough.', likes: 82000, dislikes: 500, tags: ['baking', 'cooking', 'sourdough'], videoUrl: 'https://www.youtube.com/watch?v=TNhaISOUy6Q', qualities: ['1080p', '720p'], isLive: false, chapters: [{ timestamp: '0:00', title: 'Making the Starter' }, { timestamp: '5:00', title: 'Baking' }], privacy: 'public', isShort: false },
    { id: 'video-3', channelId: 'channel-1', title: 'Building a Full-Stack App with Node.js', thumbnailUrl: 'https://source.unsplash.com/random/400x225?code', duration: '45:10', views: 890000, uploadedAt: '3 weeks ago', description: 'From setup to deployment.', likes: 32000, dislikes: 150, tags: ['nodejs', 'fullstack', 'tutorial'], videoUrl: 'https://www.youtube.com/watch?v=TNhaISOUy6Q', qualities: ['1080p', '720p'], isLive: false, chapters: [], privacy: 'public', isShort: false },
    { id: 'video-4', channelId: 'channel-2', title: '15-Minute Weeknight Pasta', thumbnailUrl: 'https://source.unsplash.com/random/400x225?pasta', duration: '09:30', views: 5300000, uploadedAt: '1 month ago', description: 'Quick, easy, and delicious.', likes: 150000, dislikes: 800, tags: ['pasta', 'recipe', 'quickmeals'], videoUrl: 'https://www.youtube.com/watch?v=TNhaISOUy6Q', qualities: ['1080p'], isLive: false, chapters: [], privacy: 'public', isShort: false },
    { id: 'video-5', channelId: 'channel-1', title: 'What is WASM?', thumbnailUrl: 'https://source.unsplash.com/random/400x225?technology', duration: '0:58', views: 750000, uploadedAt: '2 days ago', description: 'WebAssembly explained in under a minute.', likes: 15000, dislikes: 50, tags: ['wasm', 'webassembly', 'shorts'], videoUrl: 'https://www.youtube.com/watch?v=TNhaISOUy6Q', qualities: ['1080p'], isLive: false, chapters: [], privacy: 'public', isShort: true },
    { id: 'video-6', channelId: 'channel-2', title: 'Kitchen Gadget Must-Haves', thumbnailUrl: 'https://source.unsplash.com/random/400x225?kitchen', duration: '0:45', views: 1200000, uploadedAt: '5 days ago', description: 'My top 5 kitchen gadgets!', likes: 45000, dislikes: 200, tags: ['kitchen', 'gadgets', 'shorts'], videoUrl: 'https://www.youtube.com/watch?v=TNhaISOUy6Q', qualities: ['1080p'], isLive: false, chapters: [], privacy: 'public', isShort: true },
    { id: 'video-7', channelId: 'channel-1', title: 'LIVE: Q&A and Coding Session', thumbnailUrl: 'https://source.unsplash.com/random/400x225?live', duration: 'LIVE', views: 5200, uploadedAt: 'now', description: 'Join me for a live coding session!', likes: 1200, dislikes: 5, tags: ['live', 'coding'], videoUrl: 'https://www.youtube.com/watch?v=TNhaISOUy6Q', qualities: ['1080p'], isLive: true, chapters: [], privacy: 'public', isShort: false },
  ],
  comments: [
    { id: 'comment-1', videoId: 'video-1', userId: 'user-2', text: 'This was so helpful, thank you!', likes: 150, timestamp: new Date(Date.now() - 3600000).toISOString(), parentId: null },
    { id: 'comment-2', videoId: 'video-1', userId: 'user-1', text: 'Glad you liked it!', likes: 25, timestamp: new Date(Date.now() - 3500000).toISOString(), parentId: 'comment-1' },
    { id: 'comment-3', videoId: 'video-2', userId: 'user-1', text: 'My bread turned out amazing!', likes: 300, timestamp: new Date(Date.now() - 86400000).toISOString(), parentId: null },
  ],
  playlists: [
    { id: 'pl-1', userId: 'user-1', name: 'My Favorite Tech Talks', videoIds: ['video-1', 'video-3'] },
    { id: 'pl-2', userId: 'user-1', name: 'Quick Recipes', videoIds: [] },
  ],
  communityPosts: [
      { id: 'post-1', channelId: 'channel-1', text: 'Just released a new video on React Hooks! Let me know what you think.', likes: 2300, timestamp: new Date(Date.now() - 172800000).toISOString() },
      { id: 'post-2', channelId: 'channel-1', text: 'Big tutorial coming next week. Get ready!', likes: 1200, timestamp: new Date(Date.now() - 604800000).toISOString() },
  ],
  notifications: [
      { id: 'notif-1', userId: 'user-2', type: 'new_video', text: 'Jane\'s Tech World uploaded: Ultimate Guide to React Hooks in 2024', timestamp: '2 days ago', read: false, link: '/watch/video-1' },
      { id: 'notif-2', userId: 'user-1', type: 'comment', text: 'John Smith replied to your comment.', timestamp: '1 hour ago', read: false, link: '/watch/video-1' },
      { id: 'notif-3', userId: 'user-2', type: 'mention', text: 'You were mentioned in a comment on "The Perfect Sourdough Bread".', timestamp: '1 day ago', read: true, link: '/watch/video-2' },
      { id: 'notif-4', userId: 'user-1', type: 'new_subscriber', text: 'A new user subscribed to your channel!', timestamp: '3 hours ago', read: false, link: `/profile/janedoe` },
  ],
  reports: [],
  watchHistory: {
    'user-1': ['video-2', 'video-4'],
    'user-2': ['video-1', 'video-3'],
  },
  watchLater: {
    'user-1': ['video-3'],
    'user-2': ['video-4'],
  },
  userReactions: { // userId-videoId: 'like' | 'dislike'
    'user-1-video-2': 'like',
    'user-2-video-1': 'like',
    'user-2-video-2': 'dislike',
  },
  liveChatMessages: {
    'video-7': [
        { user: { name: 'Chatter1' }, text: 'Hey everyone!' },
        { user: { name: 'DevDude' }, text: 'Excited for this session!' },
    ]
  },
  studioAnalytics: {
      'channel-1': {
          viewsLast28Days: 56789,
          subscribersLast28Days: 1234,
          watchTimeHoursLast28Days: 2100,
          trafficSources: [{source: 'Browse features', percentage: 45}, {source: 'YouTube search', percentage: 25}, {source: 'Suggested videos', percentage: 20}, {source: 'Other', percentage: 10}],
          audienceDemographics: [{label: 'Ages 18-24', percentage: 35}, {label: 'Ages 25-34', percentage: 40}, {label: 'Ages 35-44', percentage: 15}, {label: 'Other', percentage: 10}],
      }
  }
};

// --- HELPERS ---
const getVideoWithChannel = (video) => {
    const channel = db.channels.find(c => c.id === video.channelId);
    return { ...video, channel };
};

const getCommentWithUser = (comment) => {
    const user = db.users.find(u => u.id === comment.userId);
    return { ...comment, user: { id: user.id, name: user.name, username: user.username, avatarUrl: user.avatarUrl } };
}

const nestComments = (comments) => {
    const commentMap = {};
    const nestedComments = [];

    comments.forEach(comment => {
        const fullComment = getCommentWithUser(comment);
        commentMap[fullComment.id] = { ...fullComment, replies: [] };
    });

    for (const commentId in commentMap) {
        const comment = commentMap[commentId];
        if (comment.parentId) {
            if (commentMap[comment.parentId]) {
                 commentMap[comment.parentId].replies.push(comment);
            }
        } else {
            nestedComments.push(comment);
        }
    }
    return nestedComments;
};

// --- MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = db.users.find(u => u.id === user.id);
    if (!req.user) return res.sendStatus(403);
    next();
  });
};


// --- ROUTES ---

// Auth
app.post('/api/auth/register', (req, res) => {
    const { email, username, password } = req.body;
    if (db.users.some(u => u.email === email)) return res.status(400).json({ message: 'Email already in use.' });
    if (db.users.some(u => u.username === username)) return res.status(400).json({ message: 'Username already taken.' });

    const newUser = {
        id: `user-${Date.now()}`,
        name: username,
        username,
        email,
        passwordHash: bcrypt.hashSync(password, 10),
        avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`,
        subscriptions: [],
        blockedUsers: [],
        playbackSettings: { autoplay: true, defaultQuality: '1080p' }
    };
    db.users.push(newUser);
    
    // Also create a channel for the new user
    const newChannel = { id: `channel-${Date.now()}`, userId: newUser.id, name: `${username}'s Channel`, username, avatarUrl: newUser.avatarUrl, subscribers: 0, description: 'Welcome to my channel!' };
    db.channels.push(newChannel);

    const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token, user: { id: newUser.id, name: newUser.name, username: newUser.username, avatarUrl: newUser.avatarUrl } });
});

app.post('/api/auth/login', (req, res) => {  
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, name: user.name, username: user.username, avatarUrl: user.avatarUrl } });
});


// Videos
app.get('/api/videos', (req, res) => {
    const videos = db.videos.filter(v => !v.isShort && !v.isLive).map(getVideoWithChannel);
    res.json(videos);
});

app.get('/api/videos/trending', (req, res) => {
    const videos = [...db.videos]
        .filter(v => !v.isShort && !v.isLive)
        .sort((a, b) => b.views - a.views)
        .slice(0, 10)
        .map(getVideoWithChannel);
    res.json(videos);
});

app.get('/api/videos/:id', (req, res) => {
  const video = db.videos.find(v => v.id === req.params.id);
  if (video) {
    // Add to history if user is authenticated
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader && authHeader.split(' ')[1];
      jwt.verify(token, SECRET_KEY, (err, user) => {
        if (!err) {
           if (!db.watchHistory[user.id]) db.watchHistory[user.id] = [];
           const history = db.watchHistory[user.id];
           if (!history.includes(video.id)) {
               history.unshift(video.id);
               db.watchHistory[user.id] = history.slice(0, 50); // Keep history to 50 items
           }
        }
      });
    }
    res.json(getVideoWithChannel(video));
  } else {
    res.status(404).json({ message: 'Video not found' });
  }
});

app.get('/api/videos/:id/related', (req, res) => {
    const video = db.videos.find(v => v.id === req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const related = db.videos
        .filter(v => v.id !== req.params.id && !v.isShort && !v.isLive && (v.tags.some(tag => video.tags.includes(tag)) || v.channelId === video.channelId))
        .slice(0, 10)
        .map(getVideoWithChannel);
    res.json(related);
});

// Shorts
app.get('/api/shorts', (req, res) => {
    const shorts = db.videos.filter(v => v.isShort).map(getVideoWithChannel);
    res.json(shorts);
});

// Live
app.get('/api/live', (req, res) => {
    const liveStreams = db.videos.filter(v => v.isLive).map(getVideoWithChannel);
    res.json(liveStreams);
});

app.get('/api/live/:streamId/chat', (req, res) => {
    const messages = db.liveChatMessages[req.params.streamId] || [];
    res.json(messages);
});

app.post('/api/live/:streamId/chat', authenticateToken, (req, res) => {
    const { text } = req.body;
    if (!db.liveChatMessages[req.params.streamId]) {
        db.liveChatMessages[req.params.streamId] = [];
    }
    const newMessage = { user: { name: req.user.name, avatarUrl: req.user.avatarUrl }, text };
    db.liveChatMessages[req.params.streamId].push(newMessage);
    res.status(201).json(newMessage);
});

// Search
app.get('/api/search', (req, res) => {
    const query = (req.query.q || '').toLowerCase();
    const sortBy = req.query.sortBy || 'relevance';
    const duration = req.query.duration || 'any';

    let results = db.videos.filter(v => 
        v.title.toLowerCase().includes(query) || 
        v.description.toLowerCase().includes(query) ||
        v.tags.some(t => t.toLowerCase().includes(query))
    );

    // Filter by duration
    if (duration === 'short') {
        results = results.filter(v => parseInt(v.duration.split(':')[0], 10) < 4);
    } else if (duration === 'long') {
        results = results.filter(v => parseInt(v.duration.split(':')[0], 10) > 20);
    }

    // Sort results
    if (sortBy === 'date') {
        // This is tricky with string dates like "2 days ago", so we'll simulate
        results.sort((a, b) => b.id.localeCompare(a.id)); 
    } else if (sortBy === 'views') {
        results.sort((a, b) => b.views - a.views);
    }

    res.json(results.map(getVideoWithChannel));
});

// Comments
app.get('/api/videos/:id/comments', (req, res) => {
    const videoComments = db.comments.filter(c => c.videoId === req.params.id);
    res.json(nestComments(videoComments));
});

app.post('/api/videos/:id/comments', authenticateToken, (req, res) => {
    const { text, parentId = null } = req.body;
    const newComment = {
        id: `comment-${Date.now()}`,
        videoId: req.params.id,
        userId: req.user.id,
        text,
        likes: 0,
        timestamp: new Date().toISOString(),
        parentId
    };
    db.comments.push(newComment);
    
    // Create notification for video owner
    const video = db.videos.find(v => v.id === req.params.id);
    const channel = db.channels.find(c => c.id === video.channelId);
    if (channel.userId !== req.user.id) {
        db.notifications.unshift({
            id: `notif-${Date.now()}`,
            userId: channel.userId,
            type: parentId ? 'comment' : 'comment', // Could differentiate reply vs new comment
            text: `${req.user.name} commented: "${text.substring(0, 20)}..."`,
            timestamp: new Date().toISOString(), read: false, link: `/watch/${video.id}`
        });
    }

    res.status(201).json(getCommentWithUser(newComment));
});

app.put('/api/comments/:id', authenticateToken, (req, res) => {
    const comment = db.comments.find(c => c.id === req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    comment.text = req.body.text;
    res.json(getCommentWithUser(comment));
});

app.delete('/api/comments/:id', authenticateToken, (req, res) => {
    const commentIndex = db.comments.findIndex(c => c.id === req.params.id);
    if (commentIndex === -1) return res.status(404).json({ message: "Comment not found" });
    
    const comment = db.comments[commentIndex];
    if (comment.userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    // Also delete replies
    const replies = db.comments.filter(c => c.parentId === req.params.id);
    const replyIds = replies.map(r => r.id);
    db.comments = db.comments.filter(c => c.id !== req.params.id && !replyIds.includes(c.id));
    
    res.sendStatus(204);
});

app.post('/api/comments/:id/like', authenticateToken, (req, res) => {
    const comment = db.comments.find(c => c.id === req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    comment.likes++; // Simple increment for now
    res.json(comment);
});


// Channels / Profiles
app.get('/api/channels/u/:username', (req, res) => {
  const channel = db.channels.find(c => c.username === req.params.username);
  if (channel) {
    const videos = db.videos.filter(v => v.channelId === channel.id);
    res.json({ ...channel, videos: videos.map(getVideoWithChannel) });
  } else {
    res.status(404).json({ message: 'Channel not found' });
  }
});

// User-specific routes
app.get('/api/users/me', authenticateToken, (req, res) => {
  res.json({ id: req.user.id, name: req.user.name, username: req.user.username, avatarUrl: req.user.avatarUrl });
});

app.get('/api/users/me/subscriptions', authenticateToken, (req, res) => {
    const subscribedChannelIds = req.user.subscriptions;
    const videos = db.videos
        .filter(v => subscribedChannelIds.includes(v.channelId))
        .sort((a,b) => b.id.localeCompare(a.id)) // simulate latest
        .map(getVideoWithChannel);
    res.json(videos);
});

app.get('/api/users/me/history', authenticateToken, (req, res) => {
    const videoIds = db.watchHistory[req.user.id] || [];
    const videos = videoIds.map(id => db.videos.find(v => v.id === id)).filter(Boolean);
    res.json(videos.map(getVideoWithChannel));
});

app.get('/api/users/me/watch-later', authenticateToken, (req, res) => {
    const videoIds = db.watchLater[req.user.id] || [];
    const videos = videoIds.map(id => db.videos.find(v => v.id === id)).filter(Boolean);
    res.json(videos.map(getVideoWithChannel));
});

app.post('/api/users/me/watch-later', authenticateToken, (req, res) => {
    const { videoId } = req.body;
    if (!db.watchLater[req.user.id]) db.watchLater[req.user.id] = [];
    const list = db.watchLater[req.user.id];
    if (!list.includes(videoId)) {
        list.unshift(videoId);
    }
    res.status(201).json({ success: true });
});

app.delete('/api/users/me/watch-later/:videoId', authenticateToken, (req, res) => {
    const { videoId } = req.params;
    if (!db.watchLater[req.user.id]) db.watchLater[req.user.id] = [];
    db.watchLater[req.user.id] = db.watchLater[req.user.id].filter(id => id !== videoId);
    res.status(204).send();
});


// User Interactions (likes, subscriptions)
app.post('/api/videos/:id/reaction', authenticateToken, (req, res) => {
    const { reaction } = req.body; // 'like' or 'dislike'
    const videoId = req.params.id;
    const video = db.videos.find(v => v.id === videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    
    const reactionKey = `${req.user.id}-${videoId}`;
    const existingReaction = db.userReactions[reactionKey];

    // If a reaction exists, undo it first
    if (existingReaction === 'like') video.likes--;
    if (existingReaction === 'dislike') video.dislikes--;

    // Set the new reaction
    if (reaction === 'like') {
        video.likes++;
        db.userReactions[reactionKey] = 'like';
    } else if (reaction === 'dislike') {
        video.dislikes++;
        db.userReactions[reactionKey] = 'dislike';
    } else {
        delete db.userReactions[reactionKey]; // Clear reaction
    }
    
    res.json({ likes: video.likes, dislikes: video.dislikes });
});


app.post('/api/channels/:id/subscribe', authenticateToken, (req, res) => {
    const channelId = req.params.id;
    const channel = db.channels.find(c => c.id === channelId);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    if (!req.user.subscriptions.includes(channelId)) {
        req.user.subscriptions.push(channelId);
        channel.subscribers++;

        // Create notification for channel owner
         db.notifications.unshift({
            id: `notif-${Date.now()}`, userId: channel.userId, type: 'new_subscriber',
            text: `${req.user.name} has subscribed to your channel!`,
            timestamp: new Date().toISOString(), read: false, link: `/profile/${req.user.username}`
        });
    }
    res.json({ subscribed: true, subscribers: channel.subscribers });
});

app.post('/api/channels/:id/unsubscribe', authenticateToken, (req, res) => {
    const channelId = req.params.id;
    const channel = db.channels.find(c => c.id === channelId);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    if (req.user.subscriptions.includes(channelId)) {
        req.user.subscriptions = req.user.subscriptions.filter(id => id !== channelId);
        channel.subscribers--;
    }
    res.json({ subscribed: false, subscribers: channel.subscribers });
});


// Playlists
app.get('/api/playlists', authenticateToken, (req, res) => {
    const userPlaylists = db.playlists.filter(p => p.userId === req.user.id);
    res.json(userPlaylists);
});

app.post('/api/playlists', authenticateToken, (req, res) => {
    const { name } = req.body;
    const newPlaylist = {
        id: `pl-${Date.now()}`,
        userId: req.user.id,
        name,
        videoIds: []
    };
    db.playlists.push(newPlaylist);
    res.status(201).json(newPlaylist);
});

app.get('/api/playlists/:id', authenticateToken, (req, res) => {
    const playlist = db.playlists.find(p => p.id === req.params.id);
    if (!playlist || playlist.userId !== req.user.id) {
        return res.status(404).json({ message: 'Playlist not found' });
    }
    const videos = playlist.videoIds.map(vid => db.videos.find(v => v.id === vid)).filter(Boolean);
    res.json({ ...playlist, videos: videos.map(getVideoWithChannel) });
});


app.post('/api/playlists/:id/videos', authenticateToken, (req, res) => {
    const { videoId } = req.body;
    const playlist = db.playlists.find(p => p.id === req.params.id);
    if (!playlist || playlist.userId !== req.user.id) return res.status(404).json({ message: 'Playlist not found' });
    if (!playlist.videoIds.includes(videoId)) {
        playlist.videoIds.push(videoId);
    }
    res.status(201).json(playlist);
});

app.delete('/api/playlists/:id/videos/:videoId', authenticateToken, (req, res) => {
    const { id, videoId } = req.params;
    const playlist = db.playlists.find(p => p.id === id);
    if (!playlist || playlist.userId !== req.user.id) return res.status(404).json({ message: 'Playlist not found' });
    playlist.videoIds = playlist.videoIds.filter(vid => vid !== videoId);
    res.sendStatus(204);
});

// Community Posts
app.get('/api/channels/:id/posts', (req, res) => {
    const posts = db.communityPosts.filter(p => p.channelId === req.params.id);
    const postsWithUser = posts.map(post => {
        const channel = db.channels.find(c => c.id === post.channelId);
        const user = db.users.find(u => u.id === channel.userId);
        return { ...post, user: { id: user.id, name: user.name, username: user.username, avatarUrl: user.avatarUrl } };
    });
    res.json(postsWithUser);
});

app.post('/api/channels/:id/posts', authenticateToken, (req, res) => {
    const channel = db.channels.find(c => c.id === req.params.id);
    if (!channel || channel.userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    const newPost = {
        id: `post-${Date.now()}`,
        channelId: req.params.id,
        text: req.body.text,
        likes: 0,
        timestamp: new Date().toISOString()
    };
    db.communityPosts.unshift(newPost);
    res.status(201).json({ ...newPost, user: { id: req.user.id, name: req.user.name, username: req.user.username, avatarUrl: req.user.avatarUrl }});
});


// User Settings
app.get('/api/users/me/settings', authenticateToken, (req, res) => {
    res.json(req.user.playbackSettings);
});

app.put('/api/users/me/settings', authenticateToken, (req, res) => {
    req.user.playbackSettings = { ...req.user.playbackSettings, ...req.body };
    res.json(req.user.playbackSettings);
});


// Channel Customization
app.put('/api/channels/me', authenticateToken, (req, res) => {
    const { name, username, description } = req.body;
    const channel = db.channels.find(c => c.userId === req.user.id);
    if (!channel) return res.status(404).json({ message: "Channel not found for user" });

    // check if username is taken by another user
    if (db.channels.some(c => c.username === username && c.userId !== req.user.id)) {
        return res.status(400).json({ message: "Username is already taken." });
    }

    channel.name = name;
    channel.username = username;
    channel.description = description;

    // Also update user record
    req.user.name = name;
    req.user.username = username;
    
    res.json(channel);
});

// Notifications
app.get('/api/notifications', authenticateToken, (req, res) => {
    const userNotifications = db.notifications.filter(n => n.userId === req.user.id);
    res.json(userNotifications);
});

app.post('/api/notifications/read', authenticateToken, (req, res) => {
    const { ids } = req.body; // ids can be a single id string or an array of ids
    const idsToMark = Array.isArray(ids) ? ids : [ids];
    
    db.notifications.forEach(n => {
        if (n.userId === req.user.id && (idsToMark.includes(n.id) || idsToMark.includes('all'))) {
            n.read = true;
        }
    });
    res.json({ success: true });
});


// Reporting
app.post('/api/reports', authenticateToken, (req, res) => {
    const { contentId, contentType, reason, comments } = req.body;
    const newReport = {
        id: `report-${Date.now()}`,
        reporterId: req.user.id,
        contentId,
        contentType,
        reason,
        comments,
        timestamp: new Date().toISOString(),
        status: 'received'
    };
    db.reports.push(newReport);
    res.status(201).json({ message: "Report received. Thank you." });
});

// --- CREATOR STUDIO ---

app.get('/api/studio/dashboard', authenticateToken, (req, res) => {
    const channel = db.channels.find(c => c.userId === req.user.id);
    if (!channel) return res.status(404).json({ message: "Channel not found for user" });
    const stats = db.studioAnalytics[channel.id] || { viewsLast28Days: 0, subscribersLast28Days: 0, watchTimeHoursLast28Days: 0 };
    res.json({ ...stats, totalSubscribers: channel.subscribers });
});

app.get('/api/studio/content', authenticateToken, (req, res) => {
    const channel = db.channels.find(c => c.userId === req.user.id);
    if (!channel) return res.status(404).json({ message: "Channel not found for user" });
    const videos = db.videos.filter(v => v.channelId === channel.id);
    res.json(videos);
});

app.put('/api/studio/videos/:id', authenticateToken, (req, res) => {
    const video = db.videos.find(v => v.id === req.params.id);
    const channel = db.channels.find(c => c.userId === req.user.id);
    if (!video || !channel || video.channelId !== channel.id) {
        return res.status(403).json({ message: "Forbidden" });
    }
    const { title, description, privacy, tags } = req.body;
    video.title = title;
    video.description = description;
    video.privacy = privacy;
    video.tags = tags;
    res.json(video);
});

app.delete('/api/studio/videos/:id', authenticateToken, (req, res) => {
    const videoIndex = db.videos.findIndex(v => v.id === req.params.id);
    const channel = db.channels.find(c => c.userId === req.user.id);
    if (videoIndex === -1 || !channel || db.videos[videoIndex].channelId !== channel.id) {
        return res.status(403).json({ message: "Forbidden or Not Found" });
    }
    db.videos.splice(videoIndex, 1);
    // Also delete comments for that video
    db.comments = db.comments.filter(c => c.videoId !== req.params.id);
    res.sendStatus(204);
});

app.get('/api/studio/analytics', authenticateToken, (req, res) => {
    const channel = db.channels.find(c => c.userId === req.user.id);
    if (!channel) return res.status(404).json({ message: "Channel not found for user" });
    const analytics = db.studioAnalytics[channel.id] || { trafficSources: [], audienceDemographics: [] };
    res.json(analytics);
});

app.get('/api/studio/comments', authenticateToken, (req, res) => {
    const channel = db.channels.find(c => c.userId === req.user.id);
    if (!channel) return res.status(404).json({ message: "Channel not found for user" });

    const creatorVideoIds = db.videos.filter(v => v.channelId === channel.id).map(v => v.id);
    const comments = db.comments
        .filter(c => creatorVideoIds.includes(c.videoId))
        .map(c => {
            const video = db.videos.find(v => v.id === c.videoId);
            return { ...getCommentWithUser(c), videoTitle: video.title };
        })
        .sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json(comments);
});


app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
