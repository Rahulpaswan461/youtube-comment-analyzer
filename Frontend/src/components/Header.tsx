import { Youtube, BarChart3 } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-card to-card/95 border-b border-border/50 shadow-[var(--shadow-card)]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-[var(--shadow-soft)]">
              <Youtube className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">YouTube Analyzer</h1>
              <p className="text-sm text-muted-foreground">AI-powered comment sentiment analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm font-medium">Analytics Dashboard</span>
          </div>
        </div>
      </div>
    </header>
  );
};