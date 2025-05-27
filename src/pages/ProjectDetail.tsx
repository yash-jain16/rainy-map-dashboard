
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbSeparator,
  BreadcrumbPage 
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RainfallChart } from '@/components/RainfallChart';
import { RainyDayTracker } from '@/components/RainyDayTracker';
import { ClaimForm } from '@/components/ClaimForm';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, CloudRain, TrendingUp, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock project data - in a real app, this would come from an API or store
const projects = [
  {
    id: '1',
    name: 'Highway 290 Project',
    location: 'Austin, TX',
    coordinates: '30.2672° N, 97.7431° W',
    startDate: '2023-01-15',
    endDate: '2023-08-30',
    status: 'active',
    rainyDays: {
      predicted: 8,
      actual: 10,
      remaining: 12
    },
    riskLevel: 'medium',
    lastIncident: '2023-06-15',
    rainfall: [
      { date: "Jun 1", rainfall: 0.5, isRainyDay: false },
      { date: "Jun 2", rainfall: 7.2, isRainyDay: true },
      { date: "Jun 3", rainfall: 12.5, isRainyDay: true },
      { date: "Jun 4", rainfall: 0.3, isRainyDay: false },
      { date: "Jun 5", rainfall: 2.1, isRainyDay: false },
      { date: "Jun 6", rainfall: 8.7, isRainyDay: true },
      { date: "Jun 7", rainfall: 5.2, isRainyDay: true },
      { date: "Jun 8", rainfall: 0.8, isRainyDay: false },
      { date: "Jun 9", rainfall: 6.3, isRainyDay: true },
      { date: "Jun 10", rainfall: 9.5, isRainyDay: true },
      { date: "Jun 11", rainfall: 4.2, isRainyDay: false },
      { date: "Jun 12", rainfall: 2.8, isRainyDay: false },
      { date: "Jun 13", rainfall: 7.1, isRainyDay: true },
      { date: "Jun 14", rainfall: 5.9, isRainyDay: true }
    ]
  },
  {
    id: '2',
    name: 'Downtown Bridge',
    location: 'Houston, TX',
    coordinates: '29.7604° N, 95.3698° W',
    startDate: '2023-02-20',
    endDate: '2023-10-15',
    status: 'active',
    rainyDays: {
      predicted: 12,
      actual: 8,
      remaining: 10
    },
    riskLevel: 'low',
    lastIncident: '2023-06-16',
    rainfall: [
      { date: "Jun 1", rainfall: 1.5, isRainyDay: false },
      { date: "Jun 2", rainfall: 5.2, isRainyDay: true },
      { date: "Jun 3", rainfall: 8.5, isRainyDay: true },
      { date: "Jun 4", rainfall: 1.3, isRainyDay: false },
      { date: "Jun 5", rainfall: 0.1, isRainyDay: false },
      { date: "Jun 6", rainfall: 6.7, isRainyDay: true },
      { date: "Jun 7", rainfall: 3.2, isRainyDay: false },
      { date: "Jun 8", rainfall: 2.8, isRainyDay: false },
      { date: "Jun 9", rainfall: 4.3, isRainyDay: false },
      { date: "Jun 10", rainfall: 7.5, isRainyDay: true },
      { date: "Jun 11", rainfall: 2.2, isRainyDay: false },
      { date: "Jun 12", rainfall: 1.8, isRainyDay: false },
      { date: "Jun 13", rainfall: 6.1, isRainyDay: true },
      { date: "Jun 14", rainfall: 3.9, isRainyDay: false }
    ]
  },
  {
    id: '3',
    name: 'Lakeline Boulevard',
    location: 'Cedar Park, TX',
    coordinates: '30.5217° N, 97.8208° W',
    startDate: '2023-03-10',
    endDate: '2023-07-25',
    status: 'active',
    rainyDays: {
      predicted: 6,
      actual: 9,
      remaining: 5
    },
    riskLevel: 'high',
    lastIncident: '2023-06-14',
    rainfall: [
      { date: "Jun 1", rainfall: 2.5, isRainyDay: false },
      { date: "Jun 2", rainfall: 8.2, isRainyDay: true },
      { date: "Jun 3", rainfall: 10.5, isRainyDay: true },
      { date: "Jun 4", rainfall: 0.8, isRainyDay: false },
      { date: "Jun 5", rainfall: 3.1, isRainyDay: false },
      { date: "Jun 6", rainfall: 9.7, isRainyDay: true },
      { date: "Jun 7", rainfall: 6.2, isRainyDay: true },
      { date: "Jun 8", rainfall: 1.8, isRainyDay: false },
      { date: "Jun 9", rainfall: 8.3, isRainyDay: true },
      { date: "Jun 10", rainfall: 10.5, isRainyDay: true },
      { date: "Jun 11", rainfall: 5.2, isRainyDay: true },
      { date: "Jun 12", rainfall: 3.8, isRainyDay: false },
      { date: "Jun 13", rainfall: 8.1, isRainyDay: true },
      { date: "Jun 14", rainfall: 6.9, isRainyDay: true }
    ]
  }
];

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects">
            <Button>
              <ArrowLeft className="mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const isPayoutTriggered = project.rainyDays.actual > project.rainyDays.predicted;
  
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
              <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {project.location} ({project.coordinates})
            </div>
          </div>
          <Badge className={`px-3 py-1 ${
            project.riskLevel === 'high' ? 'bg-red-100 text-red-800' : 
            project.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-green-100 text-green-800'
          }`}>
            {project.riskLevel.charAt(0).toUpperCase() + project.riskLevel.slice(1)} Risk
          </Badge>
        </div>

        {isPayoutTriggered && (
          <ClaimForm
            projectName={project.name}
            actualRainyDays={project.rainyDays.actual}
            predictedRainyDays={project.rainyDays.predicted}
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Start Date</div>
                  <div className="font-medium">{new Date(project.startDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">End Date</div>
                  <div className="font-medium">{new Date(project.endDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="font-medium capitalize">{project.status}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Last Incident</div>
                  <div className="font-medium">{new Date(project.lastIncident).toLocaleDateString()}</div>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="text-sm text-muted-foreground mb-2">Rainy Days</div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted/40 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Predicted</div>
                    <div className="text-xl font-semibold">{project.rainyDays.predicted}</div>
                  </div>
                  <div className={`p-3 rounded-md ${isPayoutTriggered ? 'bg-warning-light text-warning-dark' : 'bg-muted/40'}`}>
                    <div className="text-xs text-muted-foreground">Actual</div>
                    <div className="text-xl font-semibold">{project.rainyDays.actual}</div>
                  </div>
                  <div className="bg-muted/40 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Remaining</div>
                    <div className="text-xl font-semibold">{project.rainyDays.remaining}</div>
                  </div>
                </div>
              </div>
              
              {isPayoutTriggered && (
                <div className="bg-warning-light p-4 rounded-md mt-4 flex items-center">
                  <TrendingUp className="text-warning-dark mr-2 h-5 w-5" />
                  <div>
                    <div className="font-medium text-warning-dark">Payout Triggered</div>
                    <div className="text-sm">Actual rainy days have exceeded predictions</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Rainy Day Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <RainyDayTracker 
                predicted={project.rainyDays.predicted}
                actual={project.rainyDays.actual}
                totalDays={30}
                daysRemaining={project.rainyDays.remaining}
              />
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Rainfall Data</CardTitle>
            <CardDescription>Daily rainfall amounts for the past 14 days</CardDescription>
          </CardHeader>
          <CardContent>
            <RainfallChart data={project.rainfall} threshold={5} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
