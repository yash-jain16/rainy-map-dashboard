
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CloudRainIcon, 
  ThermometerIcon, 
  SnowflakeIcon, 
  WindIcon, 
  FlameIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  ArrowLeftIcon
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';

// Mock data for peril insights
const perilInsightsData = {
  rainfall: {
    title: 'Rainfall Coverage Insights',
    icon: CloudRainIcon,
    color: 'text-blue-600 bg-blue-100',
    activeProjects: 32,
    totalCoverage: '€2.4M',
    triggeredPayouts: 8,
    riskLevel: 'high',
    trend: '+15%',
    forecast: [
      { day: 'Mon', probability: 75, coverage: 240000 },
      { day: 'Tue', probability: 45, coverage: 180000 },
      { day: 'Wed', probability: 89, coverage: 320000 },
      { day: 'Thu', probability: 62, coverage: 200000 },
      { day: 'Fri', probability: 34, coverage: 150000 },
    ],
    monthlyPayouts: [
      { month: 'Jan', amount: 45000 },
      { month: 'Feb', amount: 32000 },
      { month: 'Mar', amount: 67000 },
      { month: 'Apr', amount: 23000 },
      { month: 'May', amount: 89000 },
      { month: 'Jun', amount: 56000 },
    ]
  },
  temperature: {
    title: 'Temperature Coverage Insights',
    icon: ThermometerIcon,
    color: 'text-orange-600 bg-orange-100',
    activeProjects: 18,
    totalCoverage: '€1.8M',
    triggeredPayouts: 3,
    riskLevel: 'medium',
    trend: '+8%',
    forecast: [
      { day: 'Mon', probability: 25, coverage: 180000 },
      { day: 'Tue', probability: 67, coverage: 240000 },
      { day: 'Wed', probability: 45, coverage: 160000 },
      { day: 'Thu', probability: 78, coverage: 280000 },
      { day: 'Fri', probability: 56, coverage: 200000 },
    ],
    monthlyPayouts: [
      { month: 'Jan', amount: 23000 },
      { month: 'Feb', amount: 15000 },
      { month: 'Mar', amount: 34000 },
      { month: 'Apr', amount: 12000 },
      { month: 'May', amount: 45000 },
      { month: 'Jun', amount: 28000 },
    ]
  },
  snowfall: {
    title: 'Snowfall Coverage Insights',
    icon: SnowflakeIcon,
    color: 'text-cyan-600 bg-cyan-100',
    activeProjects: 12,
    totalCoverage: '€950K',
    triggeredPayouts: 2,
    riskLevel: 'low',
    trend: '-3%',
    forecast: [
      { day: 'Mon', probability: 12, coverage: 95000 },
      { day: 'Tue', probability: 23, coverage: 120000 },
      { day: 'Wed', probability: 8, coverage: 80000 },
      { day: 'Thu', probability: 34, coverage: 150000 },
      { day: 'Fri', probability: 19, coverage: 100000 },
    ],
    monthlyPayouts: [
      { month: 'Jan', amount: 12000 },
      { month: 'Feb', amount: 8000 },
      { month: 'Mar', amount: 15000 },
      { month: 'Apr', amount: 5000 },
      { month: 'May', amount: 18000 },
      { month: 'Jun', amount: 9000 },
    ]
  },
  wind: {
    title: 'Wind Coverage Insights',
    icon: WindIcon,
    color: 'text-gray-600 bg-gray-100',
    activeProjects: 8,
    totalCoverage: '€600K',
    triggeredPayouts: 1,
    riskLevel: 'medium',
    trend: '+5%',
    forecast: [
      { day: 'Mon', probability: 45, coverage: 60000 },
      { day: 'Tue', probability: 67, coverage: 80000 },
      { day: 'Wed', probability: 34, coverage: 50000 },
      { day: 'Thu', probability: 78, coverage: 90000 },
      { day: 'Fri', probability: 23, coverage: 40000 },
    ],
    monthlyPayouts: [
      { month: 'Jan', amount: 8000 },
      { month: 'Feb', amount: 5000 },
      { month: 'Mar', amount: 12000 },
      { month: 'Apr', amount: 3000 },
      { month: 'May', amount: 15000 },
      { month: 'Jun', amount: 7000 },
    ]
  },
  'fire-risk': {
    title: 'Fire Risk Coverage Insights',
    icon: FlameIcon,
    color: 'text-red-600 bg-red-100',
    activeProjects: 5,
    totalCoverage: '€1.2M',
    triggeredPayouts: 0,
    riskLevel: 'low',
    trend: '0%',
    forecast: [
      { day: 'Mon', probability: 15, coverage: 120000 },
      { day: 'Tue', probability: 8, coverage: 80000 },
      { day: 'Wed', probability: 23, coverage: 150000 },
      { day: 'Thu', probability: 12, coverage: 100000 },
      { day: 'Fri', probability: 34, coverage: 180000 },
    ],
    monthlyPayouts: [
      { month: 'Jan', amount: 0 },
      { month: 'Feb', amount: 0 },
      { month: 'Mar', amount: 0 },
      { month: 'Apr', amount: 0 },
      { month: 'May', amount: 0 },
      { month: 'Jun', amount: 0 },
    ]
  }
};

const getRiskColor = (risk: string) => {
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

const PerilInsights = () => {
  const { perilType } = useParams<{ perilType: string }>();
  const navigate = useNavigate();

  if (!perilType || !perilInsightsData[perilType as keyof typeof perilInsightsData]) {
    return <Navigate to="/" replace />;
  }

  const data = perilInsightsData[perilType as keyof typeof perilInsightsData];
  const IconComponent = data.icon;

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon size={16} />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-3 rounded-xl ${data.color}`}>
            <IconComponent size={24} />
          </div>
          <div>
            <h1 className="font-semibold text-3xl leading-tight text-foreground">{data.title}</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Portfolio performance and risk analysis</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                <Badge className={getRiskColor(data.riskLevel)}>
                  {data.riskLevel.toUpperCase()}
                </Badge>
              </div>
              <AlertTriangleIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <h2 className="text-3xl font-bold">{data.activeProjects}</h2>
              </div>
              <div className={`p-2 rounded-full ${data.color}`}>
                <IconComponent size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Coverage</p>
                <h2 className="text-3xl font-bold">{data.totalCoverage}</h2>
              </div>
              <TrendingUpIcon className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payouts Triggered</p>
                <h2 className="text-3xl font-bold">{data.triggeredPayouts}</h2>
              </div>
              <div className="text-sm text-muted-foreground">{data.trend} trend</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>5-Day Risk Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.forecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Risk Probability']} />
                  <Line 
                    type="monotone" 
                    dataKey="probability" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Monthly Payouts (€)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.monthlyPayouts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`€${value}`, 'Payout Amount']} />
                  <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PerilInsights;
