
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, UmbrellaIcon, BuildingIcon, AlertTriangleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompanyStatsProps {
  totalProjects: number;
  activeProjects: number;
  totalPayoutsTriggered: number;
  totalPayoutAmount: number;
  averageRainyDays: number;
  highRiskProjects: number;
}

export const CompanyStats: React.FC<CompanyStatsProps> = ({
  totalProjects,
  activeProjects,
  totalPayoutsTriggered,
  totalPayoutAmount,
  averageRainyDays,
  highRiskProjects,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-x-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
              <h2 className="text-3xl font-bold">{totalProjects}</h2>
            </div>
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <BuildingIcon size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {activeProjects} currently active
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-x-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Payouts Triggered</p>
              <h2 className="text-3xl font-bold">{totalPayoutsTriggered}</h2>
            </div>
            <div className="p-2 bg-warning/10 rounded-full text-warning">
              <AlertTriangleIcon size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            ${totalPayoutAmount.toLocaleString()} total amount
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-x-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Rainy Days</p>
              <h2 className="text-3xl font-bold">{averageRainyDays}</h2>
            </div>
            <div className="p-2 bg-rain/10 rounded-full text-rain">
              <UmbrellaIcon size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {highRiskProjects} high-risk projects
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
