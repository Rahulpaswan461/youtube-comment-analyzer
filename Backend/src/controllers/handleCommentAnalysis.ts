import { type Request, type Response } from "express"
import axios from "axios";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("YOUTUBE_API_KEY:", YOUTUBE_API_KEY ? "Loaded" : "Missing");
console.log("GEMINI_API_KEY:", GEMINI_API_KEY ? "Loaded" : "Missing");



export const handleCommentAnalysis = async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        console.info({ url })

        console.log("YOUTUBE_API_KEY:", YOUTUBE_API_KEY ? "Loaded" : "Missing");
        console.log("GEMINI_API_KEY:", GEMINI_API_KEY ? "Loaded" : "Missing");

        const comments = await fetchComments(url);
        const videoTitle = await fetchVideoTitle(url);

        console.log("✅ Comments fetched successfully", comments.length);
        const analysis = await analyzeComments(comments, videoTitle);
        console.log("📊 Analysis Result:", JSON.stringify(analysis, null, 2));
        return res.json(analysis)
    }
    catch (error) {
        console.error("❌ Error in handleCommentAnalysis:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const getVideoId = (url: string): { videoId: string | undefined | null } => {
    const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
    const videoId = match ? match[1] : null;
    return { videoId };

}
const fetchComments = async (url: string, maxResults = 50) => {
    const videoId = getVideoId(url);
    console.log("vide: ", videoId.videoId)
    if (!videoId) throw new Error("Invalid YouTube URL");

    const apiUrl: string = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId.videoId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;

    const response = await axios.get(apiUrl);

    const comments = response.data.items.map((
        item: any) => item.snippet.topLevelComment.snippet.textDisplay
    );

    return comments;

}

const fetchVideoTitle = async (videoUrl: string) => {
    const videoId = getVideoId(videoUrl);
    console.log("videoId: ", videoId)
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId.videoId}&key=${YOUTUBE_API_KEY}`;

    const response = await axios.get(apiUrl);
    return response.data.items[0]?.snippet?.title || "Untitled Video";
}

const analyzeComments = async (comments: string[], videoTitle: string) => {
    const prompt = `
Analyze these YouTube comments and return the result strictly in the following JSON format:

{
  "videoTitle": "<string>",
  "totalComments": <number>,
  "sentimentScore": {
    "positive": <number>,
    "negative": <number>,
    "neutral": <number>
  },
  "topKeywords": ["<string>", "<string>", "<string>"],
  "overallSentiment": "positive" | "negative" | "neutral",
  "suggestions": [
    {
      "type": "success" | "improvement" | "insight" | "warning",
      "title": "<short summary>",
      "description": "<detailed explanation>",
      "priority": "low" | "medium" | "high"
    }
  ]
}

Comments: 
${comments.join("\n")}
`;

    const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
        {
            contents: [{ parts: [{ text: prompt }] }]
        },
        {
            headers: { "Content-Type": "application/json" },
            params: { key: GEMINI_API_KEY }
        }
    );

    const rawText = response.data.candidates[0].content.parts[0].text.trim();
    const text = rawText.replace(/```json|```/g, "").trim();
    const cleanedText = text.match(/\{[\s\S]*\}/);

    let parsed;
    try {
        parsed = JSON.parse(cleanedText);
    } catch (err) {
        console.error("Failed to parse Gemini response:", rawText);
        throw new Error("Invalid JSON from AI");
    }

    parsed.videoTitle = videoTitle || parsed.videoTitle || "Untitled Video";
    parsed.totalComments = comments.length;

    return parsed;
}