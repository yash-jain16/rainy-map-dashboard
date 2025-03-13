
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, DollarSign, CalendarDays, CloudRain, Percent, Download, Filter } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';

// Mock data for analytics
const analyticsData = {
  summary: {
    totalProjects: 5,
    totalPayouts: 12350,
    averageRainyDays: 9.2,
    payoutRate: 68,
    trend: {
      payouts: 'up',
      rainyDays: 'up'
    }
  },
  monthly: [
    { month: 'Jan', rainyDays: 8, predicted: 6, payout: 2800 },
    { month: 'Feb', rainyDays: 6, predicted: 5, payout: 1500 },
    { month: 'Mar', rainyDays: 10, predicted: 7, payout: 3200 },
    { month: 'Apr', rainyDays: 12, predicted: 8, payout: 4100 },
    { month: 'May', rainyDays: 8, predicted: 9, payout: 0 },
    { month: 'Jun', rainyDays: 10, predicted: 8, payout: 3500 },
  ],
  projects: [
    { name: 'Highway 290 Project', rainyDays: 10, predicted: 8, payout: 3500, percentage: 30 },
    { name: 'Downtown Bridge', rainyDays: 8, predicted: 12, payout: 0, percentage: 0 },
    { name: 'Lakeline Boulevard', rainyDays: 9, predicted: 6, payout: 3200, percentage: 25 },
    { name: 'Riverside Drive Expansion', rainyDays: 7, predicted: 9, payout: 0, percentage: 0 },
    { name: 'North Loop Reconstruction', rainyDays: 5, predicted: 7, payout: 0, percentage: 0 },
  ],
  byRegion: [
    { name: 'Austin', value: 6700 },
    { name: 'Houston', value: 3200 },
    { name: 'Cedar Park', value: 2450 },
    { name: 'San Antonio', value: 0 },
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const chartConfig = {
  rainyDays: {
    label: "Actual Rainy Days",
    color: "#3b82f6",
  },
  predicted: {
    label: "Predicted Rainy Days",
    color: "#9333ea",
  },
  payout: {
    label: "Payout Amount",
    color: "#22c55e",
  },
};

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
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Tabs defaultValue="overview" className="w-[400px]">
            <TabsList className="bg-background border">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">By Project</TabsTrigger>
              <TabsTrigger value="region">By Region</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold">${analyticsData.summary.totalPayouts}</span>
                </div>
                <div className={`flex items-center ${analyticsData.summary.trend.payouts === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {analyticsData.summary.trend.payouts === 'up' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  <span className="text-xs font-medium">12%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Rainy Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-5 w-5 text-blue-500" />
                  <span className="text-2xl font-bold">{analyticsData.summary.averageRainyDays}</span>
                </div>
                <div className={`flex items-center ${analyticsData.summary.trend.rainyDays === 'up' ? 'text-blue-500' : 'text-red-500'}`}>
                  {analyticsData.summary.trend.rainyDays === 'up' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  <span className="text-xs font-medium">8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Payout Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-purple-500" />
                  <span className="text-2xl font-bold">{analyticsData.summary.payoutRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-orange-500" />
                  <span className="text-2xl font-bold">{analyticsData.summary.totalProjects}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Rainfall vs. Predictions</CardTitle>
                <CardDescription>Comparing actual rainy days to predictions and resulting payouts</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[350px]" config={chartConfig}>
                  <BarChart data={analyticsData.monthly}>
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 'dataMax + 1000']} />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="rainyDays" name="Actual Rainy Days" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="predicted" name="Predicted Rainy Days" fill="#9333ea" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="payout" name="Payout Amount ($)" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Analysis</CardTitle>
                  <CardDescription>Rainy days trend over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]" config={chartConfig}>
                    <LineChart data={analyticsData.monthly}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="rainyDays" name="Actual Rainy Days" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="predicted" name="Predicted Rainy Days" stroke="#9333ea" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payout Distribution</CardTitle>
                  <CardDescription>Payouts by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analyticsData.byRegion}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {analyticsData.byRegion.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value}`, 'Payout Amount']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Project Performance</CardTitle>
                <CardDescription>Rainfall and payout analysis by project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analyticsData.projects.map((project, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{project.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            Rainy Days: {project.rainyDays}/{project.predicted}
                          </span>
                          <span className="text-sm font-medium">
                            ${project.payout}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${project.rainyDays > project.predicted ? 'bg-blue-500' : 'bg-green-500'}`}
                          style={{ width: `${(project.rainyDays / 15) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Actual: {project.rainyDays} days</span>
                        <span>Predicted: {project.predicted} days</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="region">
            <Card>
              <CardHeader>
                <CardTitle>Regional Analysis</CardTitle>
                <CardDescription>Payout distribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analyticsData.byRegion}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {analyticsData.byRegion.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value}`, 'Payout Amount']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-6">
                    {analyticsData.byRegion.map((region, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{region.name}</h3>
                          <span className="text-sm font-medium">
                            ${region.value}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full"
                            style={{ 
                              width: `${(region.value / analyticsData.summary.totalPayouts) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Region total: ${region.value}</span>
                          <span>{((region.value / analyticsData.summary.totalPayouts) * 100).toFixed(1)}% of total</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
