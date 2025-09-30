import { useState } from "react";
import { Header } from "@/components/Header";
import { VideoUpload } from "@/components/VideoUpload";
import { AnalysisResults } from "@/components/AnalysisResult";
import { SuggestionPanel } from "@/components/SuggestionPanel";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

// Mock data for demonstration
const mockAnalysisData1 = {
  videoTitle: "Amazing React Tutorial - Complete Beginner's Guide",
  totalComments: 247,
  sentimentScore: {
    positive: 72,
    negative: 15,
    neutral: 13
  },
  topKeywords: ["helpful", "great tutorial", "beginner friendly", "clear explanation", "awesome", "thanks"],
  overallSentiment: "positive" as const
};

const mockSuggestions1 = [
  {
    type: "success" as const,
    title: "Strong Positive Engagement",
    description: "Your video has excellent positive feedback! Viewers appreciate the clear explanations and beginner-friendly approach. Consider creating more content in this style.",
    priority: "low" as const
  },
  {
    type: "improvement" as const,
    title: "Address Common Concerns",
    description: "Some viewers mentioned wanting more advanced examples. Consider creating a follow-up video or adding timestamps for different skill levels.",
    priority: "medium" as const
  },
  {
    type: "insight" as const,
    title: "Popular Keywords",
    description: "Terms like 'helpful' and 'beginner friendly' appear frequently in positive comments. Use these in your video descriptions and titles for better discoverability.",
    priority: "medium" as const
  },
  {
    type: "warning" as const,
    title: "Technical Issues Mentioned",
    description: "A few comments mention audio quality issues around the 15-minute mark. Consider reviewing your audio setup for future recordings.",
    priority: "high" as const
  }
];

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<typeof mockAnalysisData1 | null>(null);
  const [suggestions, setSuggestions] = useState<typeof mockSuggestions1>([]);

  const handleVideoSubmit = async (url: string) => {
    setIsAnalyzing(true);

    try {
      const response = await axios.post("https://youtube-comment-analyzer-1-vb72.onrender.com/api/comments/analyze",{url}) 
      console.log("response from api: ", response.data)

      const { suggestions, ...rest } = response.data
      const mockAnalysisData = {
        ...rest,
        overallSentiment: rest.overallSentiment
      };

      const mockSuggestions = suggestions.map((s: any) => ({
        ...s,
        type: s.type,
        priority: s.priority
      }));

      setAnalysisData(mockAnalysisData);
      setSuggestions(mockSuggestions);

      toast({
        title: "Analysis Complete",
        description: "Your video comments have been successfully analyzed!",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-background)]">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Upload Section */}
          <div className="max-w-2xl mx-auto">
            <VideoUpload
              onVideoSubmit={handleVideoSubmit}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {/* Results Section */}
          {analysisData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <AnalysisResults data={analysisData} />
              </div>
              <div>
                <SuggestionPanel suggestions={suggestions} />
              </div>
            </div>
          )}

          {/* Loading State */}
          {isAnalyzing && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <h3 className="text-lg font-semibold mb-2">Analyzing Comments...</h3>
              <p className="text-muted-foreground">This may take a few moments</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
