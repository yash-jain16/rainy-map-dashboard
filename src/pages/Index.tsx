
import React from 'react';
import { Layout } from '@/components/Layout';
import { ProjectCard } from '@/components/ProjectCard';
import { WeatherMap } from '@/components/WeatherMap';
import { PayoutStatus } from '@/components/PayoutStatus';
import { CompanyStats } from '@/components/CompanyStats';
import { RegionalOverview } from '@/components/RegionalOverview';
import { PayoutBreakdown } from '@/components/PayoutBreakdown';
import { PerilOverview } from '@/components/PerilOverview';

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

const monthlyPayouts = [
  { month: 'January 2023', predicted: 8, actual: 12, status: 'paid' as const, amount: 3500, date: '2023-02-05' },
  { month: 'February 2023', predicted: 6, actual: 9, status: 'paid' as const, amount: 2800, date: '2023-03-05' },
  { month: 'March 2023', predicted: 9, actual: 8, status: 'pending' as const, amount: 0 },
  { month: 'April 2023', predicted: 7, actual: 10, status: 'paid' as const, amount: 3200, date: '2023-05-05' },
  { month: 'May 2023', predicted: 8, actual: 14, status: 'paid' as const, amount: 4100, date: '2023-06-05' },
  { month: 'June 2023', predicted: 8, actual: 10, status: 'triggered' as const, amount: 3500, date: '' },
];

// New mock data for company statistics
const companyStats = {
  totalProjects: 32,
  activeProjects: 24,
  totalPayoutsTriggered: 8,
  totalPayoutAmount: 42000,
  averageRainyDays: 9.5,
  highRiskProjects: 5,
};

// Regional overview data
const regionalData = [
  { region: 'Austin', projects: 8, rainyDays: 12, payoutRisk: 'high' as const },
  { region: 'Houston', projects: 6, rainyDays: 9, payoutRisk: 'medium' as const },
  { region: 'Dallas', projects: 5, rainyDays: 6, payoutRisk: 'low' as const },
  { region: 'San Antonio', projects: 7, rainyDays: 8, payoutRisk: 'medium' as const },
  { region: 'El Paso', projects: 3, rainyDays: 4, payoutRisk: 'low' as const },
  { region: 'Corpus Christi', projects: 3, rainyDays: 11, payoutRisk: 'high' as const },
];

// Payout breakdown data
const payoutBreakdownData = [
  { name: 'Paid', value: 18200, color: '#10B981', count: 12 },
  { name: 'Triggered', value: 14500, color: '#F59E0B', count: 5 },
  { name: 'Pending', value: 9300, color: '#6B7280', count: 7 },
];

// New peril overview data
const perilData = [
  { name: 'Rainfall', active: 32, triggered: 8, coverage: '€2.4M' },
  { name: 'Temperature', active: 18, triggered: 3, coverage: '€1.8M' },
  { name: 'Snowfall', active: 12, triggered: 2, coverage: '€950K' },
  { name: 'Wind', active: 8, triggered: 1, coverage: '€600K' },
  { name: 'Fire Risk', active: 5, triggered: 0, coverage: '€1.2M' },
];

const Index = () => {
  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
            <div className="w-5 h-5 bg-white rounded-sm relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-sm"></div>
              <div className="absolute top-1 left-1 w-2.5 h-1 bg-blue-600 rounded-sm"></div>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-3xl leading-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Weather risk intelligence for construction projects</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <CompanyStats 
          totalProjects={companyStats.totalProjects}
          activeProjects={companyStats.activeProjects}
          totalPayoutsTriggered={companyStats.totalPayoutsTriggered}
          totalPayoutAmount={companyStats.totalPayoutAmount}
          averageRainyDays={companyStats.averageRainyDays}
          highRiskProjects={companyStats.highRiskProjects}
        />
      </div>
      
      <div className="mb-8 animate-fade-up" style={{ animationDelay: '150ms' }}>
        <PerilOverview data={perilData} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {projects.map((project) => (
          <div key={project.id} className="animate-fade-up" style={{ animationDelay: `${projects.indexOf(project) * 100 + 200}ms` }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="animate-fade-up" style={{ animationDelay: '500ms' }}>
          <RegionalOverview data={regionalData} />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: '600ms' }}>
          <PayoutBreakdown 
            data={payoutBreakdownData} 
            totalAmount={42000} 
            currency="USD" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="animate-fade-up" style={{ animationDelay: '700ms' }}>
          <WeatherMap />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: '800ms' }}>
          <PayoutStatus monthlyPayouts={monthlyPayouts} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
