
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, CloudRain, Droplets, Thermometer, Wind } from 'lucide-react';

// Mock weather data for different locations
const locationData = [
  {
    id: 1,
    name: 'Austin, TX',
    rainfall: 12.5,
    temperature: 28,
    humidity: 65,
    windSpeed: 8,
    status: 'Partly Cloudy',
    forecast: [
      { day: 'Mon', rainfall: 0, temp: 29 },
      { day: 'Tue', rainfall: 8.3, temp: 27 },
      { day: 'Wed', rainfall: 5.2, temp: 26 },
      { day: 'Thu', rainfall: 0, temp: 28 },
      { day: 'Fri', rainfall: 2.1, temp: 30 },
    ]
  },
  {
    id: 2,
    name: 'Houston, TX',
    rainfall: 3.2,
    temperature: 31,
    humidity: 72,
    windSpeed: 6,
    status: 'Sunny',
    forecast: [
      { day: 'Mon', rainfall: 0, temp: 32 },
      { day: 'Tue', rainfall: 0, temp: 33 },
      { day: 'Wed', rainfall: 12.1, temp: 29 },
      { day: 'Thu', rainfall: 7.6, temp: 28 },
      { day: 'Fri', rainfall: 1.3, temp: 30 },
    ]
  },
  {
    id: 3,
    name: 'Cedar Park, TX',
    rainfall: 7.8,
    temperature: 27,
    humidity: 68,
    windSpeed: 10,
    status: 'Rainy',
    forecast: [
      { day: 'Mon', rainfall: 9.5, temp: 26 },
      { day: 'Tue', rainfall: 4.2, temp: 27 },
      { day: 'Wed', rainfall: 0, temp: 29 },
      { day: 'Thu', rainfall: 0, temp: 30 },
      { day: 'Fri', rainfall: 3.7, temp: 28 },
    ]
  }
];

const Weather = () => {
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
              <BreadcrumbPage>Weather Data</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-3xl font-bold">Weather Data</div>
        <p className="text-muted-foreground">View and analyze rainfall data for all your projects.</p>
        
        <Tabs defaultValue="austin" className="w-full">
          <TabsList className="mb-6 bg-background border">
            {locationData.map(location => (
              <TabsTrigger key={location.id} value={location.name.toLowerCase().split(',')[0]}>
                {location.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {locationData.map(location => (
            <TabsContent key={location.id} value={location.name.toLowerCase().split(',')[0]} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Rainfall (24h)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-blue-500" />
                        <span className="text-2xl font-bold">{location.rainfall} mm</span>
                      </div>
                      {location.rainfall >= 5 && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          Rainy Day
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Temperature</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-orange-500" />
                      <span className="text-2xl font-bold">{location.temperature}°C</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Humidity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <CloudRain className="w-5 h-5 text-cyan-500" />
                      <span className="text-2xl font-bold">{location.humidity}%</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Wind Speed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Wind className="w-5 h-5 text-green-500" />
                      <span className="text-2xl font-bold">{location.windSpeed} km/h</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>5-Day Forecast</span>
                    <span className="text-sm font-normal text-muted-foreground">{location.status}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-4">
                    {location.forecast.map((day, index) => (
                      <div key={index} className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                        <span className="text-sm font-medium">{day.day}</span>
                        <span className="text-xl font-bold mt-1">{day.temp}°C</span>
                        <div className="flex items-center gap-1 mt-2">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{day.rainfall} mm</span>
                        </div>
                        {day.rainfall >= 5 && (
                          <span className="mt-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            Rainy
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <a href="/forecast" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                  View detailed forecast <ArrowUpRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Weather;
