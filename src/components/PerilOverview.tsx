
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CloudRainIcon, 
  ThermometerIcon, 
  SnowflakeIcon, 
  WindIcon, 
  FlameIcon,
  PhoneIcon,
  FileTextIcon
} from 'lucide-react';
import { toast } from "sonner";

interface PerilOverviewProps {
  data: {
    name: string;
    active: number;
    triggered: number;
    coverage: string;
    purchased: boolean;
  }[];
}

const getPerilIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'rainfall':
      return CloudRainIcon;
    case 'temperature':
      return ThermometerIcon;
    case 'snowfall':
      return SnowflakeIcon;
    case 'wind':
      return WindIcon;
    case 'fire risk':
      return FlameIcon;
    default:
      return CloudRainIcon;
  }
};

const getPerilColor = (name: string) => {
  switch (name.toLowerCase()) {
    case 'rainfall':
      return 'text-blue-600 bg-blue-100';
    case 'temperature':
      return 'text-orange-600 bg-orange-100';
    case 'snowfall':
      return 'text-cyan-600 bg-cyan-100';
    case 'wind':
      return 'text-gray-600 bg-gray-100';
    case 'fire risk':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-blue-600 bg-blue-100';
  }
};

export const PerilOverview: React.FC<PerilOverviewProps> = ({ data }) => {
  const handleRequestQuote = (perilName: string) => {
    toast.success(`Quote request submitted for ${perilName} coverage`);
  };

  const handleSetupCall = (perilName: string) => {
    toast.success(`Call scheduled to discuss ${perilName} coverage`);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Weather Peril Coverage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.map((peril) => {
            const IconComponent = getPerilIcon(peril.name);
            const colorClass = getPerilColor(peril.name);
            
            return (
              <div 
                key={peril.name} 
                className={`p-4 rounded-lg border ${
                  peril.purchased ? 'bg-secondary/30' : 'bg-gray-50/50 border-dashed'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-full ${colorClass} ${!peril.purchased ? 'opacity-60' : ''}`}>
                    <IconComponent size={16} />
                  </div>
                  <h3 className={`font-medium text-sm ${!peril.purchased ? 'text-muted-foreground' : ''}`}>
                    {peril.name}
                  </h3>
                  {!peril.purchased && (
                    <Badge variant="outline" className="text-xs">Not Purchased</Badge>
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
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground mb-3">
                      Protect your projects with {peril.name.toLowerCase()} coverage
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full text-xs h-7"
                        onClick={() => handleRequestQuote(peril.name)}
                      >
                        <FileTextIcon size={12} className="mr-1" />
                        Request Quote
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="w-full text-xs h-7"
                        onClick={() => handleSetupCall(peril.name)}
                      >
                        <PhoneIcon size={12} className="mr-1" />
                        Setup Call
                      </Button>
                    </div>
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
