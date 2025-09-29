import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, Youtube } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VideoUploadProps {
  onVideoSubmit: (url: string) => void;
  isAnalyzing: boolean;
}

export const VideoUpload = ({ onVideoSubmit, isAnalyzing }: VideoUploadProps) => {
  const [videoUrl, setVideoUrl] = useState("");

  const validateYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateYouTubeUrl(videoUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    onVideoSubmit(videoUrl);
  };

  return (
    <Card className="p-8 shadow-[var(--shadow-soft)] border-0 bg-gradient-to-br from-card to-muted/30">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-[var(--shadow-soft)]">
            <Youtube className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold">Analyze YouTube Comments</h2>
          <p className="text-muted-foreground">
            Enter your YouTube video URL to get AI-powered sentiment analysis and suggestions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="pl-12 h-12 text-base border-2 focus:border-primary transition-[var(--transition-smooth)]"
              disabled={isAnalyzing}
            />
            <Youtube className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)]"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                Analyzing Comments...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Analyze Video
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          <p>Supports YouTube video URLs and shorts</p>
        </div>
      </div>
    </Card>
  );
};