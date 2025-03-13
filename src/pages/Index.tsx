
import React from 'react';
import { Layout } from '@/components/Layout';
import { ProjectCard } from '@/components/ProjectCard';
import { RainfallChart } from '@/components/RainfallChart';
import { WeatherMap } from '@/components/WeatherMap';
import { RainyDayTracker } from '@/components/RainyDayTracker';
import { PayoutStatus } from '@/components/PayoutStatus';

// Mock data
const projects = [
  {
    id: '1',
    name: 'Highway 290 Project',
    location: 'Austin, TX',
    predictedRainyDays: 8,
    actualRainyDays: 10,
    daysRemaining: 12,
    payoutStatus: 'triggered' as const,
    lastRainfall: {
      date: '2023-06-15',
      amount: 12.5,
    },
  },
  {
    id: '2',
    name: 'Downtown Bridge',
    location: 'Houston, TX',
    predictedRainyDays: 12,
    actualRainyDays: 8,
    daysRemaining: 10,
    payoutStatus: 'pending' as const,
    lastRainfall: {
      date: '2023-06-16',
      amount: 3.2,
    },
  },
  {
    id: '3',
    name: 'Lakeline Boulevard',
    location: 'Cedar Park, TX',
    predictedRainyDays: 6,
    actualRainyDays: 9,
    daysRemaining: 5,
    payoutStatus: 'paid' as const,
    lastRainfall: {
      date: '2023-06-14',
      amount: 7.8,
    },
  },
];

const rainfallData = [
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
  { date: "Jun 14", rainfall: 5.9, isRainyDay: true },
  { date: "Jun 15", rainfall: 0.2, isRainyDay: false },
  { date: "Jun 16", rainfall: 3.2, isRainyDay: false },
];

const monthlyPayouts = [
  { month: 'January 2023', predicted: 8, actual: 12, status: 'paid', amount: 3500, date: '2023-02-05' },
  { month: 'February 2023', predicted: 6, actual: 9, status: 'paid', amount: 2800, date: '2023-03-05' },
  { month: 'March 2023', predicted: 9, actual: 8, status: 'pending', amount: 0 },
  { month: 'April 2023', predicted: 7, actual: 10, status: 'paid', amount: 3200, date: '2023-05-05' },
  { month: 'May 2023', predicted: 8, actual: 14, status: 'paid', amount: 4100, date: '2023-06-05' },
  { month: 'June 2023', predicted: 8, actual: 10, status: 'triggered', amount: 3500 },
];

const Index = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="font-medium text-3xl leading-tight">Weather Dashboard</h1>
        <p className="text-muted-foreground mt-1 mb-0">Monitor rainfall and weather conditions across your construction projects</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {projects.map((project) => (
          <div key={project.id} className="animate-fade-up" style={{ animationDelay: `${projects.indexOf(project) * 100}ms` }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
          <WeatherMap />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
          <RainfallChart data={rainfallData} threshold={5} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="animate-fade-up" style={{ animationDelay: '500ms' }}>
          <RainyDayTracker 
            predicted={8} 
            actual={10} 
            totalDays={30} 
            daysRemaining={12} 
          />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: '600ms' }}>
          <PayoutStatus monthlyPayouts={monthlyPayouts} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
