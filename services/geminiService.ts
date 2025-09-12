
import { GoogleGenAI, Type } from "@google/genai";
// FIX: Corrected import path for types.
import { Comment, VideoIdea } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const commentSchema = {
    type: Type.OBJECT,
    properties: {
        username: { type: Type.STRING, description: "A creative and fitting username for a commenter."},
        userImage: { type: Type.STRING, description: "A URL to a random 40x40 placeholder image from picsum.photos." },
        text: { type: Type.STRING, description: "The content of the comment." },
        likes: { type: Type.INTEGER, description: "A random number of likes between 0 and 1000." },
        timestamp: { type: Type.STRING, description: "A relative time like '2 hours ago' or '3 days ago'." }
    },
    required: ['username', 'userImage', 'text', 'likes', 'timestamp']
};

const videoIdeaSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A catchy, SEO-friendly video title."},
        description: { type: Type.STRING, description: "A brief, one-paragraph summary of the video content." },
        visuals: { type: Type.STRING, description: "A short description of the key visuals or scenes in the video." }
    },
     required: ['title', 'description', 'visuals']
};

export const generateCommentsForVideo = async (videoTitle: string): Promise<Comment[]> => {
    if (!process.env.API_KEY) return [];
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate 8 realistic, diverse, and engaging YouTube comments for a video titled "${videoTitle}". The comments should reflect a mix of opinions: some positive, some critical, some funny, and some asking questions.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: commentSchema
                },
            },
        });

        const jsonText = response.text.trim();
        const comments = JSON.parse(jsonText);
        return comments as Comment[];

    } catch (error) {
        console.error("Error generating comments:", error);
        throw new Error("Failed to generate AI comments. The model may be overloaded. Please try again later.");
    }
};


export const generateVideoIdeas = async (topic: string): Promise<VideoIdea[]> => {
     if (!process.env.API_KEY) return [];
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate 3 creative and distinct video ideas based on the topic: "${topic}". For each idea, provide a title, a short description, and a suggestion for key visuals.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: videoIdeaSchema
                },
            },
        });

        const jsonText = response.text.trim();
        const ideas = JSON.parse(jsonText);
        return ideas as VideoIdea[];

    } catch (error) {
        console.error("Error generating video ideas:", error);
        throw new Error("Failed to generate AI video ideas. The model may be overloaded. Please try again later.");
    }
};