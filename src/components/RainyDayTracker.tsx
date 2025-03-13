
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarIcon, CloudRainIcon, CheckIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RainyDayTrackerProps {
  predicted: number;
  actual: number;
  totalDays: number;
  daysRemaining: number;
}

export const RainyDayTracker: React.FC<RainyDayTrackerProps> = ({
  predicted,
  actual,
  totalDays,
  daysRemaining,
}) => {
  const daysPassed = totalDays - daysRemaining;
  const progress = (daysPassed / totalDays) * 100;
  const isPredictionExceeded = actual > predicted;
  
  // Generate calendar days for visual representation
  const calendarDays = Array.from({ length: totalDays }, (_, i) => {
    const isPast = i < daysPassed;
    const isRainy = i < actual;
    
    return {
      day: i + 1,
      isPast,
      isRainy,
      isExceeded: isRainy && i >= predicted,
    };
  });
  
  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium">Monthly Rainy Day Tracker</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="chip bg-secondary flex items-center">
              <CalendarIcon size={12} className="mr-1" />
              <span>{daysRemaining} days remaining</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 mt-2">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-muted-foreground">Month Progress</div>
            <div className="text-sm font-medium">{Math.round(progress)}%</div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-5 mb-6">
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Predicted Rainy Days</div>
            <div className="text-3xl font-semibold">{predicted}</div>
          </div>
          
          <div className={cn(
            "rounded-lg p-4",
            isPredictionExceeded ? "bg-warning-light" : "bg-secondary/50"
          )}>
            <div className="text-sm text-muted-foreground mb-1">Actual Rainy Days</div>
            <div className={cn(
              "text-3xl font-semibold flex items-center gap-2",
              isPredictionExceeded ? "text-warning-dark" : ""
            )}>
              {actual}
              {isPredictionExceeded && (
                <Badge variant="outline" className="ml-1 bg-warning text-warning-foreground">
                  +{actual - predicted}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-medium">Daily Breakdown</div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rain-light"></span>
                <span className="text-xs text-muted-foreground">Regular</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-warning-light"></span>
                <span className="text-xs text-muted-foreground">Exceeded</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1.5">
            {calendarDays.map((day) => (
              <div 
                key={day.day}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-md text-xs transition-all",
                  !day.isPast && "opacity-50",
                  day.isPast && !day.isRainy && "bg-secondary",
                  day.isRainy && !day.isExceeded && "bg-rain-light text-rain-dark",
                  day.isExceeded && "bg-warning-light text-warning-dark"
                )}
              >
                {day.isRainy ? (
                  <CloudRainIcon size={12} />
                ) : (
                  day.day
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              isPredictionExceeded ? "bg-warning-light text-warning-dark" : "bg-success-light text-success-dark"
            )}>
              {isPredictionExceeded ? <CheckIcon size={16} /> : <XIcon size={16} />}
            </div>
            <div>
              <div className={cn(
                "font-medium",
                isPredictionExceeded ? "text-warning-dark" : "text-success-dark"
              )}>
                {isPredictionExceeded ? "Payout Triggered" : "No Payout"}
              </div>
              <div className="text-xs text-muted-foreground">
                Monthly Status
              </div>
            </div>
          </div>
          
          {isPredictionExceeded && (
            <Badge variant="outline" className="chip bg-warning-light text-warning-dark">
              Customer Eligible
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
