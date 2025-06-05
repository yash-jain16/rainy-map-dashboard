
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUpIcon, 
  TrendingDownIcon, 
  UsersIcon, 
  DollarSignIcon,
  ShieldIcon,
  AlertTriangleIcon,
  PieChartIcon,
  BarChart3Icon
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// Mock data for admin dashboard
const portfolioMetrics = [
  { title: 'Total Portfolio Value', value: '€24.8M', change: '+12.3%', trend: 'up' },
  { title: 'Active Clients', value: '147', change: '+8.2%', trend: 'up' },
  { title: 'Claims Ratio', value: '23.7%', change: '-2.1%', trend: 'down' },
  { title: 'Premium Income', value: '€3.2M', change: '+15.7%', trend: 'up' },
];

const revenueData = [
  { month: 'Jan', revenue: 280000, claims: 67000 },
  { month: 'Feb', revenue: 320000, claims: 89000 },
  { month: 'Mar', revenue: 290000, claims: 56000 },
  { month: 'Apr', revenue: 350000, claims: 123000 },
  { month: 'May', revenue: 380000, claims: 78000 },
  { month: 'Jun', revenue: 420000, claims: 145000 },
];

const perilDistribution = [
  { name: 'Rainfall', value: 45, color: '#3B82F6' },
  { name: 'Temperature', value: 25, color: '#F59E0B' },
  { name: 'Wind', value: 15, color: '#6B7280' },
  { name: 'Snowfall', value: 10, color: '#06B6D4' },
  { name: 'Fire Risk', value: 5, color: '#EF4444' },
];

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="font-medium text-3xl leading-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1 mb-0">Comprehensive portfolio management and business intelligence</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {portfolioMetrics.map((metric) => (
          <Card key={metric.title} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <h2 className="text-2xl font-bold">{metric.value}</h2>
                  <div className="flex items-center mt-2">
                    {metric.trend === 'up' ? (
                      <TrendingUpIcon className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDownIcon className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <DollarSignIcon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue and Claims Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Revenue vs Claims Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `€${(value as number).toLocaleString()}`} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={3} 
                    name="Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="claims" 
                    stroke="#EF4444" 
                    strokeWidth={3} 
                    name="Claims"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Peril Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={perilDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {perilDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {perilDistribution.map((peril) => (
                <div key={peril.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: peril.color }}
                  ></div>
                  <span className="text-sm">{peril.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Management Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldIcon className="h-5 w-5" />
              Risk Exposure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">High Risk</span>
                <Badge variant="destructive">€8.2M</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Medium Risk</span>
                <Badge className="bg-yellow-100 text-yellow-800">€12.1M</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Low Risk</span>
                <Badge className="bg-green-100 text-green-800">€4.5M</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangleIcon className="h-5 w-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-800">High rainfall alert</p>
                <p className="text-xs text-red-600">Austin region - 5 projects affected</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm font-medium text-yellow-800">Temperature spike</p>
                <p className="text-xs text-yellow-600">Houston region - 3 projects affected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Claims Processed</span>
                <span className="font-medium">127 / 135</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Response Time</span>
                <span className="font-medium">2.3 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Customer Satisfaction</span>
                <span className="font-medium">4.7 / 5.0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
