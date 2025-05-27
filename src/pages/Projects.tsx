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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Calendar, CloudRain, AlertCircle } from 'lucide-react';
import { WeatherMap } from '@/components/WeatherMap';
import { AddProjectDialog } from '@/components/AddProjectDialog';

// Mock project data
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
    lastIncident: '2023-06-15'
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
    lastIncident: '2023-06-16'
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
    lastIncident: '2023-06-14'
  },
  {
    id: '4',
    name: 'Riverside Drive Expansion',
    location: 'Austin, TX',
    coordinates: '30.2459° N, 97.7603° W',
    startDate: '2023-04-05',
    endDate: '2023-11-20',
    status: 'active',
    rainyDays: {
      predicted: 9,
      actual: 7,
      remaining: 15
    },
    riskLevel: 'medium',
    lastIncident: '2023-06-10'
  },
  {
    id: '5',
    name: 'North Loop Reconstruction',
    location: 'San Antonio, TX',
    coordinates: '29.4241° N, 98.4936° W',
    startDate: '2023-05-12',
    endDate: '2023-12-01',
    status: 'active',
    rainyDays: {
      predicted: 7,
      actual: 5,
      remaining: 18
    },
    riskLevel: 'low',
    lastIncident: '2023-06-08'
  }
];

const getRiskBadgeColor = (risk: string) => {
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
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              className="pl-10" 
              placeholder="Search projects by name or location..."
            />
          </div>
          <Button variant="outline">Filter</Button>
          <AddProjectDialog />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeatherMap />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Project List</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            {projects.map(project => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 pb-4">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>
                        {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <CloudRain className="h-4 w-4 mr-1 text-blue-500" />
                      <span>
                        {project.rainyDays.actual}/{project.rainyDays.predicted} rainy days
                      </span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRiskBadgeColor(project.riskLevel)}`}>
                        {project.riskLevel.charAt(0).toUpperCase() + project.riskLevel.slice(1)} risk
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
