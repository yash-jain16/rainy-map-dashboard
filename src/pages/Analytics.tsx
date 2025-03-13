
import React from 'react';
import { Layout } from '@/components/Layout';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';

const Analytics = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Analytics</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-3xl font-bold">Analytics</div>
        <p className="text-muted-foreground">Analyze rainfall patterns and payout trends.</p>
        
        <div className="h-[400px] flex items-center justify-center bg-secondary/30 rounded-lg border border-border">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-2">Analytics Content</h3>
            <p className="text-muted-foreground max-w-md">
              This is a placeholder for the Analytics page. Detailed content will be added soon.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
