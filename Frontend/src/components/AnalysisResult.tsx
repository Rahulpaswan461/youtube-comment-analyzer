import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, TrendingUp, Users, MessageCircle } from "lucide-react";

interface AnalysisData {
  videoTitle: string;
  totalComments: number;
  sentimentScore: {
    positive: number;
    negative: number;
    neutral: number;
  };
  topKeywords: string[];
  overallSentiment: "positive" | "negative" | "neutral";
}

interface AnalysisResultsProps {
  data: AnalysisData;
}

export const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "success";
      case "negative":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border-0 shadow-[var(--shadow-card)]">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{data.videoTitle}</h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {data.totalComments} comments
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Overall: {data.overallSentiment}
                </div>
              </div>
            </div>
            <Badge 
              variant={getSentimentColor(data.overallSentiment) === "success" ? "default" : "destructive"}
              className="capitalize"
            >
              {data.overallSentiment}
            </Badge>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-0 shadow-[var(--shadow-card)] bg-gradient-to-br from-success/10 to-success/5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ThumbsUp className="w-5 h-5 text-success" />
                <span className="font-medium">Positive</span>
              </div>
              <span className="text-2xl font-bold text-success">{data.sentimentScore.positive}%</span>
            </div>
            <Progress value={data.sentimentScore.positive} className="h-2" />
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-[var(--shadow-card)] bg-gradient-to-br from-muted/50 to-muted/20">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Neutral</span>
              </div>
              <span className="text-2xl font-bold text-muted-foreground">{data.sentimentScore.neutral}%</span>
            </div>
            <Progress value={data.sentimentScore.neutral} className="h-2" />
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-[var(--shadow-card)] bg-gradient-to-br from-destructive/10 to-destructive/5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ThumbsDown className="w-5 h-5 text-destructive" />
                <span className="font-medium">Negative</span>
              </div>
              <span className="text-2xl font-bold text-destructive">{data.sentimentScore.negative}%</span>
            </div>
            <Progress value={data.sentimentScore.negative} className="h-2" />
          </div>
        </Card>
      </div>

      <Card className="p-6 border-0 shadow-[var(--shadow-card)]">
        <h4 className="font-semibold mb-4">Top Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {data.topKeywords.map((keyword, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {keyword}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
};