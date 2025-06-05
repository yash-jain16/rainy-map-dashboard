
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DatabaseIcon, 
  TrendingUpIcon, 
  AlertTriangleIcon, 
  CheckCircleIcon,
  ClockIcon,
  BarChart3Icon
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

// Mock data for actuarial analysis
const riskModels = [
  { id: 1, name: 'Rainfall Model v2.3', status: 'approved', accuracy: '94.2%', lastUpdated: '2024-01-15' },
  { id: 2, name: 'Temperature Model v1.8', status: 'pending', accuracy: '91.7%', lastUpdated: '2024-01-14' },
  { id: 3, name: 'Combined Peril Model v1.0', status: 'draft', accuracy: '89.1%', lastUpdated: '2024-01-13' },
];

const dataQualityMetrics = [
  { metric: 'Data Completeness', value: 98.7, target: 95, status: 'good' },
  { metric: 'Data Accuracy', value: 94.2, target: 90, status: 'good' },
  { metric: 'Timeliness', value: 87.3, target: 85, status: 'good' },
  { metric: 'Consistency', value: 82.1, target: 85, status: 'warning' },
];

const ActuarialWorkspace = () => {
  const [selectedTab, setSelectedTab] = useState('models');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricStatus = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="font-medium text-3xl leading-tight">Actuarial Workspace</h1>
        <p className="text-muted-foreground mt-1 mb-0">Risk model development and data analysis before customer deployment</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models">Risk Models</TabsTrigger>
          <TabsTrigger value="data">Data Quality</TabsTrigger>
          <TabsTrigger value="validation">Model Validation</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Models</p>
                    <h2 className="text-3xl font-bold">12</h2>
                  </div>
                  <DatabaseIcon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                    <h2 className="text-3xl font-bold">3</h2>
                  </div>
                  <ClockIcon className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Accuracy</p>
                    <h2 className="text-3xl font-bold">92.1%</h2>
                  </div>
                  <TrendingUpIcon className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Risk Model Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskModels.map((model) => (
                  <div key={model.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-medium">{model.name}</h3>
                        <p className="text-sm text-muted-foreground">Last updated: {model.lastUpdated}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">Accuracy: {model.accuracy}</span>
                      <Badge className={getStatusColor(model.status)}>
                        {model.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Data Quality Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dataQualityMetrics.map((metric) => (
                  <div key={metric.metric} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{metric.metric}</h3>
                      <span className={`text-2xl font-bold ${getMetricStatus(metric.status)}`}>
                        {metric.value}%
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Target: {metric.target}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full ${metric.status === 'good' ? 'bg-green-600' : 'bg-yellow-600'}`}
                        style={{ width: `${(metric.value / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Model Validation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3Icon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Validation Suite</h3>
                <p className="text-muted-foreground">
                  Comprehensive backtesting and stress testing results will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Pricing Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUpIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Pricing Models</h3>
                <p className="text-muted-foreground">
                  Risk-based pricing analysis and premium optimization tools
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ActuarialWorkspace;
