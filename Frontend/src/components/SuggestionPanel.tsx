import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface Suggestion {
  type: "improvement" | "warning" | "success" | "insight";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface SuggestionPanelProps {
  suggestions: Suggestion[];
}

export const SuggestionPanel = ({ suggestions }: SuggestionPanelProps) => {
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "improvement":
        return <TrendingUp className="w-5 h-5 text-primary" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      default:
        return <Lightbulb className="w-5 h-5 text-accent-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="p-6 border-0 shadow-[var(--shadow-card)]">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">AI Suggestions</h3>
        </div>
        
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-border/50 bg-gradient-to-r from-card to-muted/20 hover:shadow-[var(--shadow-card)] transition-[var(--transition-smooth)]"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getSuggestionIcon(suggestion.type)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-card-foreground">{suggestion.title}</h4>
                    <Badge 
                      variant={getPriorityColor(suggestion.priority) as any}
                      className="text-xs capitalize"
                    >
                      {suggestion.priority} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {suggestions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No suggestions available yet</p>
            <p className="text-sm">Analyze a video to get AI-powered insights</p>
          </div>
        )}
      </div>
    </Card>
  );
};