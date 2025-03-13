
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';

interface RainfallChartProps {
  data: {
    date: string;
    rainfall: number;
    isRainyDay: boolean;
  }[];
  threshold: number;
}

export const RainfallChart: React.FC<RainfallChartProps> = ({ data, threshold }) => {
  const maxRainfall = Math.max(...data.map((day) => day.rainfall)) * 1.2;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isRainyDay = payload[0].payload.isRainyDay;
      return (
        <div className="bg-white dark:bg-black p-3 rounded-md shadow-md border border-border text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-primary font-semibold">{`${payload[0].value} mm`}</p>
          <Badge 
            variant="outline"
            className={`mt-1 ${isRainyDay ? 'bg-rain-light text-rain-dark' : 'bg-muted'}`}
          >
            {isRainyDay ? 'Rainy Day' : 'Not a Rainy Day'}
          </Badge>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium">Rainfall Data</CardTitle>
          <Badge variant="outline" className="chip bg-secondary">
            <span className="text-muted-foreground mr-1">Threshold:</span>
            <span>{threshold} mm</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#a0a0a0" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis 
                stroke="#a0a0a0" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                domain={[0, maxRainfall]}
                tickCount={5}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
              <ReferenceLine 
                y={threshold} 
                stroke="#F97316" 
                strokeDasharray="3 3" 
                strokeWidth={2}
                label={{ 
                  value: 'Rainy Day Threshold', 
                  position: 'insideTopLeft',
                  fill: '#F97316',
                  fontSize: 12
                }}
              />
              <Bar
                dataKey="rainfall"
                radius={[4, 4, 0, 0]}
                barSize={30}
                fill={(entry) => entry.isRainyDay ? '#0EA5E9' : '#D3E4FD'}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
