import { Bot, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InsightCardProps {
  insights: string[];
  onAction?: () => void;
  actionLabel?: string;
}

export function InsightCard({ insights, onAction, actionLabel = 'View All' }: InsightCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Bot className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900">AI Insights</h3>
        </div>

        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">{insight}</p>
            </div>
          ))}
        </div>

        {onAction && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onAction}
            className="mt-4 w-full flex items-center justify-center gap-1 text-blue-600 hover:text-blue-700"
          >
            {actionLabel}
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
