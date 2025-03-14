
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface RegionalOverviewProps {
  data: {
    region: string;
    projects: number;
    rainyDays: number;
    payoutRisk: 'low' | 'medium' | 'high';
  }[];
}

export const RegionalOverview: React.FC<RegionalOverviewProps> = ({ data }) => {
  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low':
        return 'text-success-dark bg-success-light';
      case 'medium':
        return 'text-warning-dark bg-warning-light';
      case 'high':
        return 'text-destructive-foreground bg-destructive/30';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-black p-3 rounded-md shadow-md border border-border text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-primary">{`Projects: ${payload[0].value}`}</p>
          <p className="text-rain">{`Rainy Days: ${payload[1].value}`}</p>
          <Badge 
            variant="outline"
            className={`mt-1 ${getRiskColor(payload[0].payload.payoutRisk)}`}
          >
            {`${payload[0].payload.payoutRisk.charAt(0).toUpperCase()}${payload[0].payload.payoutRisk.slice(1)} Risk`}
          </Badge>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Regional Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="region" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                stroke="#a0a0a0"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{ value: 'Projects', angle: -90, position: 'insideLeft', offset: -5, fontSize: 12, fill: '#a0a0a0' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#a0a0a0"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{ value: 'Avg. Rainy Days', angle: 90, position: 'insideRight', offset: 0, fontSize: 12, fill: '#a0a0a0' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="projects" 
                fill="#D3E4FD" 
                name="Projects" 
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar 
                yAxisId="right" 
                dataKey="rainyDays" 
                fill="#0EA5E9" 
                name="Avg. Rainy Days" 
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
