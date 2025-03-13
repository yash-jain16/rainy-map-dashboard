
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon, CalendarIcon, CloudRainIcon, TrendingUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    location: string;
    predictedRainyDays: number;
    actualRainyDays: number;
    daysRemaining: number;
    payoutStatus: 'pending' | 'triggered' | 'paid';
    lastRainfall: {
      date: string;
      amount: number;
    };
  };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const isPayoutTriggered = project.actualRainyDays > project.predictedRainyDays;
  
  const getPayoutStatusInfo = () => {
    switch (project.payoutStatus) {
      case 'pending':
        return { label: 'Pending', className: 'bg-muted text-muted-foreground' };
      case 'triggered':
        return { label: 'Payout Triggered', className: 'bg-warning-light text-warning-dark' };
      case 'paid':
        return { label: 'Paid', className: 'bg-success-light text-success-dark' };
      default:
        return { label: 'Unknown', className: 'bg-muted text-muted-foreground' };
    }
  };
  
  const statusInfo = getPayoutStatusInfo();
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md glass-card glass-card-hover">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={cn("chip", statusInfo.className)}>
                {statusInfo.label}
              </Badge>
            </div>
            <CardTitle className="text-xl font-medium">{project.name}</CardTitle>
          </div>
          {isPayoutTriggered && (
            <div className="flex items-center text-warning">
              <TrendingUpIcon size={18} className="mr-1" />
              <span className="text-sm font-medium">Payout Alert</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPinIcon size={16} className="mr-1.5" />
          <span className="text-sm">{project.location}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-secondary/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Predicted</div>
            <div className="text-2xl font-semibold flex items-center">
              {project.predictedRainyDays}
              <span className="text-xs text-muted-foreground ml-1">days</span>
            </div>
          </div>
          <div className={cn(
            "rounded-lg p-3",
            isPayoutTriggered ? "bg-warning-light" : "bg-secondary/50"
          )}>
            <div className="text-xs text-muted-foreground mb-1">Actual</div>
            <div className={cn(
              "text-2xl font-semibold flex items-center",
              isPayoutTriggered ? "text-warning-dark" : ""
            )}>
              {project.actualRainyDays}
              <span className="text-xs text-muted-foreground ml-1">days</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <CalendarIcon size={14} className="mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">{project.daysRemaining} days remaining</span>
          </div>
          <div className="flex items-center">
            <CloudRainIcon size={14} className="mr-1 text-rain" />
            <span>
              Last: <span className="font-medium">{project.lastRainfall.amount}mm</span>
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3 flex justify-between">
        <div className="text-xs text-muted-foreground">
          Last updated: {project.lastRainfall.date}
        </div>
        <a 
          href={`/projects/${project.id}`} 
          className="text-xs text-primary font-medium hover:underline"
        >
          View Details
        </a>
      </CardFooter>
    </Card>
  );
};
