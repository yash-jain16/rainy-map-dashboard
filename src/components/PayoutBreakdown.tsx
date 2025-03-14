
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface PayoutBreakdownProps {
  data: {
    name: string;
    value: number;
    color: string;
    count: number;
  }[];
  totalAmount: number;
  currency: string;
}

export const PayoutBreakdown: React.FC<PayoutBreakdownProps> = ({ 
  data, 
  totalAmount,
  currency = 'USD'
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-black p-3 rounded-md shadow-md border border-border text-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-foreground">{`Amount: ${formatCurrency(payload[0].value)}`}</p>
          <p className="text-muted-foreground">{`${payload[0].payload.count} projects`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-xl font-medium">Payout Breakdown</CardTitle>
          <Badge variant="outline" className="bg-secondary">
            Total: {formatCurrency(totalAmount)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry, index) => (
                  <span className="text-sm">{value} ({data[index].count})</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
