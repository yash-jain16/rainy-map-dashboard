
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUpIcon, CheckIcon, BanknoteIcon, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PayoutStatusProps {
  monthlyPayouts: {
    month: string;
    predicted: number;
    actual: number;
    status: 'pending' | 'triggered' | 'paid';
    amount?: number;
    date?: string;
  }[];
}

export const PayoutStatus: React.FC<PayoutStatusProps> = ({ monthlyPayouts }) => {
  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium">Payout History</CardTitle>
          <Badge variant="outline" className="chip bg-secondary flex items-center">
            <CalendarIcon size={12} className="mr-1" />
            <span>Last 6 months</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {monthlyPayouts.map((payout) => {
            const isTriggered = payout.status === 'triggered' || payout.status === 'paid';
            const isPaid = payout.status === 'paid';
            
            return (
              <div 
                key={payout.month}
                className={cn(
                  "p-3 rounded-lg border flex items-center justify-between",
                  isTriggered ? "border-warning-light bg-warning-light/20" : "border-border"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    isPaid ? "bg-success-light text-success-dark" : 
                    isTriggered ? "bg-warning-light text-warning-dark" : 
                    "bg-secondary text-muted-foreground"
                  )}>
                    {isPaid ? (
                      <CheckIcon size={18} />
                    ) : isTriggered ? (
                      <TrendingUpIcon size={18} />
                    ) : (
                      <BanknoteIcon size={18} />
                    )}
                  </div>
                  
                  <div>
                    <div className="font-medium">{payout.month}</div>
                    <div className="text-xs text-muted-foreground">
                      {payout.actual} / {payout.predicted} rainy days
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  {isTriggered ? (
                    <>
                      <div className={cn(
                        "font-semibold",
                        isPaid ? "text-success-dark" : "text-warning-dark"
                      )}>
                        ${payout.amount?.toLocaleString()}
                      </div>
                      <Badge variant="outline" className={cn(
                        "mt-1",
                        isPaid ? "bg-success-light text-success-dark" : "bg-warning-light text-warning-dark"
                      )}>
                        {isPaid ? 'Paid' : 'Pending Payment'}
                      </Badge>
                    </>
                  ) : (
                    <Badge variant="outline" className="bg-muted text-muted-foreground">
                      No Payout
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
