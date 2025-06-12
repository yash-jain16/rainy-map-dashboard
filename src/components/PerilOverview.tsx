
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CloudRainIcon, 
  MessageCircleIcon
} from 'lucide-react';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

interface PerilOverviewProps {
  data: {
    name: string;
    active: number;
    triggered: number;
    coverage: string;
    purchased: boolean;
  }[];
}

export const PerilOverview: React.FC<PerilOverviewProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleContactTeam = (perilName: string) => {
    toast.success(`Our team will contact you about ${perilName} coverage`);
  };

  const handlePerilClick = (perilName: string) => {
    navigate(`/peril-insights/${perilName.toLowerCase()}`);
  };

  // Filter to show only rainfall/precipitation data for version 1
  const rainfallData = data.filter(peril => 
    peril.name.toLowerCase().includes('rainfall') || 
    peril.name.toLowerCase().includes('precipitation')
  );

  return (
    <Card className="glass-card hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Precipitation Coverage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rainfallData.map((peril) => {
            return (
              <div 
                key={peril.name} 
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:scale-105 ${
                  peril.purchased ? 'bg-secondary/30 hover:bg-secondary/40 cursor-pointer' : 'bg-gray-50/50 border-dashed hover:bg-gray-50/70'
                }`}
                onClick={peril.purchased ? () => handlePerilClick(peril.name) : undefined}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-full transition-opacity text-blue-600 bg-blue-100 ${!peril.purchased ? 'opacity-60' : ''}`}>
                    <CloudRainIcon size={16} />
                  </div>
                  <h3 className={`font-medium text-sm ${!peril.purchased ? 'text-muted-foreground' : ''}`}>
                    {peril.name}
                  </h3>
                  {!peril.purchased && (
                    <Badge variant="outline" className="text-xs">Available</Badge>
                  )}
                </div>
                
                {peril.purchased ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Active</span>
                      <Badge variant="outline" className="text-xs">{peril.active}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Triggered</span>
                      <Badge 
                        variant={peril.triggered > 0 ? "destructive" : "outline"} 
                        className="text-xs"
                      >
                        {peril.triggered}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Coverage</span>
                      <span className="text-xs font-medium">{peril.coverage}</span>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">Click for detailed insights</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Expand your protection with {peril.name.toLowerCase()} coverage
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs h-8 hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContactTeam(peril.name);
                      }}
                    >
                      <MessageCircleIcon size={12} className="mr-1" />
                      Contact Our Team
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerilOverview;
