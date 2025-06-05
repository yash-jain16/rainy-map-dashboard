
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CloudRainIcon, 
  ThermometerIcon, 
  SnowflakeIcon, 
  WindIcon, 
  FlameIcon,
  TrendingUpIcon,
  AlertTriangleIcon
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Mock data for different perils
const perilData = {
  rainfall: { 
    risk: 'high', 
    projects: 32, 
    triggered: 8, 
    trend: '+15%',
    forecast: [
      { day: 'Mon', probability: 75 },
      { day: 'Tue', probability: 45 },
      { day: 'Wed', probability: 89 },
      { day: 'Thu', probability: 62 },
      { day: 'Fri', probability: 34 },
    ]
  },
  temperature: { 
    risk: 'medium', 
    projects: 18, 
    triggered: 3, 
    trend: '+8%',
    forecast: [
      { day: 'Mon', probability: 25 },
      { day: 'Tue', probability: 67 },
      { day: 'Wed', probability: 45 },
      { day: 'Thu', probability: 78 },
      { day: 'Fri', probability: 56 },
    ]
  },
  snowfall: { 
    risk: 'low', 
    projects: 12, 
    triggered: 2, 
    trend: '-3%',
    forecast: [
      { day: 'Mon', probability: 12 },
      { day: 'Tue', probability: 23 },
      { day: 'Wed', probability: 8 },
      { day: 'Thu', probability: 34 },
      { day: 'Fri', probability: 19 },
    ]
  },
  wind: { 
    risk: 'medium', 
    projects: 8, 
    triggered: 1, 
    trend: '+5%',
    forecast: [
      { day: 'Mon', probability: 45 },
      { day: 'Tue', probability: 67 },
      { day: 'Wed', probability: 34 },
      { day: 'Thu', probability: 78 },
      { day: 'Fri', probability: 23 },
    ]
  },
  fire: { 
    risk: 'low', 
    projects: 5, 
    triggered: 0, 
    trend: '0%',
    forecast: [
      { day: 'Mon', probability: 15 },
      { day: 'Tue', probability: 8 },
      { day: 'Wed', probability: 23 },
      { day: 'Thu', probability: 12 },
      { day: 'Fri', probability: 34 },
    ]
  }
};

const RiskManagement = () => {
  const [selectedPeril, setSelectedPeril] = useState('rainfall');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerilIcon = (peril: string) => {
    switch (peril) {
      case 'rainfall':
        return CloudRainIcon;
      case 'temperature':
        return ThermometerIcon;
      case 'snowfall':
        return SnowflakeIcon;
      case 'wind':
        return WindIcon;
      case 'fire':
        return FlameIcon;
      default:
        return CloudRainIcon;
    }
  };

  const currentData = perilData[selectedPeril as keyof typeof perilData];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="font-medium text-3xl leading-tight">Risk Management Hub</h1>
        <p className="text-muted-foreground mt-1 mb-0">Monitor and manage weather-related risks across all perils</p>
      </div>

      <Tabs value={selectedPeril} onValueChange={setSelectedPeril} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="rainfall" className="flex items-center gap-2">
            <CloudRainIcon size={16} />
            Rainfall
          </TabsTrigger>
          <TabsTrigger value="temperature" className="flex items-center gap-2">
            <ThermometerIcon size={16} />
            Temperature
          </TabsTrigger>
          <TabsTrigger value="snowfall" className="flex items-center gap-2">
            <SnowflakeIcon size={16} />
            Snowfall
          </TabsTrigger>
          <TabsTrigger value="wind" className="flex items-center gap-2">
            <WindIcon size={16} />
            Wind
          </TabsTrigger>
          <TabsTrigger value="fire" className="flex items-center gap-2">
            <FlameIcon size={16} />
            Fire Risk
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                  <Badge className={getRiskColor(currentData.risk)}>
                    {currentData.risk.toUpperCase()}
                  </Badge>
                </div>
                <AlertTriangleIcon className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                  <h2 className="text-3xl font-bold">{currentData.projects}</h2>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  {React.createElement(getPerilIcon(selectedPeril), { size: 20, className: "text-primary" })}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payouts Triggered</p>
                  <h2 className="text-3xl font-bold">{currentData.triggered}</h2>
                </div>
                <TrendingUpIcon className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Risk Trend</p>
                  <h2 className="text-3xl font-bold">{currentData.trend}</h2>
                </div>
                <div className="text-sm text-muted-foreground">vs last month</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>5-Day Risk Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentData.forecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Risk Probability']} />
                    <Line 
                      type="monotone" 
                      dataKey="probability" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Risk Mitigation Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Immediate Actions</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Review high-risk project thresholds</li>
                    <li>• Update client notifications</li>
                    <li>• Prepare claim processing workflows</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Strategic Recommendations</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Consider premium adjustments</li>
                    <li>• Evaluate coverage limits</li>
                    <li>• Review reinsurance needs</li>
                  </ul>
                </div>
                
                <Button className="w-full">
                  Generate Risk Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </Layout>
  );
};

export default RiskManagement;
