
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

const Projects = () => {
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
              <BreadcrumbPage>Projects Map</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-3xl font-bold">Projects Map</div>
        <p className="text-muted-foreground">Interactive map view of all construction projects.</p>
        
        <div className="h-[400px] flex items-center justify-center bg-secondary/30 rounded-lg border border-border">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-2">Projects Map Content</h3>
            <p className="text-muted-foreground max-w-md">
              This is a placeholder for the Projects Map page. Detailed content will be added soon.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
