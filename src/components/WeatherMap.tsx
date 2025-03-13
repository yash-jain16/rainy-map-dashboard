
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPinIcon } from 'lucide-react';

// Mock component since we can't use Mapbox without an API key
export const WeatherMap: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium">Project Areas</CardTitle>
          <Badge variant="outline" className="chip bg-secondary">3 Active Locations</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-full h-[300px] rounded-lg" />
        ) : (
          <div className="relative w-full h-[300px] bg-secondary/30 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-97.7431,30.2672,11,0/600x300@2x?access_token=placeholder')] bg-cover bg-center"></div>
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="flex justify-end">
                <div className="glass-card p-2 text-xs flex items-center">
                  <span className="w-3 h-3 rounded-full bg-rain mr-1.5"></span>
                  Rain Activity
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="glass-card p-3 max-w-[180px]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPinIcon size={14} className="text-primary" />
                    <span className="font-medium text-sm">Highway 290 Project</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Current rainfall: 3.2mm</div>
                </div>
              </div>
            </div>
            
            {/* Project location markers */}
            <div className="absolute left-[30%] top-[40%] w-4 h-4 rounded-full bg-primary animate-pulse"></div>
            <div className="absolute left-[45%] top-[60%] w-4 h-4 rounded-full bg-primary animate-pulse"></div>
            <div className="absolute left-[70%] top-[30%] w-4 h-4 rounded-full bg-rain animate-pulse"></div>

            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
              For demo purposes only
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
