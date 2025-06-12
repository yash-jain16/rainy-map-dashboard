
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Notifications = () => {
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
              <BreadcrumbPage>Notifications</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-3xl font-bold">Notifications</div>
        <p className="text-muted-foreground">Stay updated with the latest activity and alerts.</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <p className="font-medium">New rainfall data available</p>
                <span className="text-xs text-muted-foreground">5 minutes ago</span>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Project status updated</p>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Payment processed successfully</p>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Notifications;
