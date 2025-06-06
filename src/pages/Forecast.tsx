
import React, { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  CloudRain, 
  CloudDrizzle, 
  CloudSun, 
  CloudLightning, 
  Sun, 
  ArrowRight, 
  Calendar,
  Download,
  MapPin
} from 'lucide-react';
import { ChartContainer, ChartLegend } from '@/components/ui/chart';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Available locations
const locations = [
  { id: 'austin-tx', name: 'Austin, TX', region: 'Central Texas' },
  { id: 'houston-tx', name: 'Houston, TX', region: 'Southeast Texas' },
  { id: 'dallas-tx', name: 'Dallas, TX', region: 'North Texas' },
  { id: 'san-antonio-tx', name: 'San Antonio, TX', region: 'South Texas' },
  { id: 'cedar-park-tx', name: 'Cedar Park, TX', region: 'Central Texas' },
];

// Mock forecast data by location
const forecastDataByLocation = {
  'austin-tx': {
    monthly: [
      { month: 'Jul', rainfall: 82, rainyDays: 10, avgTemp: 30 },
      { month: 'Aug', rainfall: 95, rainyDays: 12, avgTemp: 31 },
      { month: 'Sep', rainfall: 110, rainyDays: 14, avgTemp: 29 },
      { month: 'Oct', rainfall: 75, rainyDays: 9, avgTemp: 26 },
      { month: 'Nov', rainfall: 60, rainyDays: 8, avgTemp: 22 },
      { month: 'Dec', rainfall: 45, rainyDays: 6, avgTemp: 18 },
    ],
    weekly: [
      { day: 'Mon', date: 'Jun 19', rainfall: 0, description: 'Sunny', temp: 32, icon: Sun },
      { day: 'Tue', date: 'Jun 20', rainfall: 0, description: 'Partly Cloudy', temp: 30, icon: CloudSun },
      { day: 'Wed', date: 'Jun 21', rainfall: 8.5, description: 'Light Rain', temp: 28, icon: CloudDrizzle },
      { day: 'Thu', date: 'Jun 22', rainfall: 12.3, description: 'Heavy Rain', temp: 26, icon: CloudRain },
      { day: 'Fri', date: 'Jun 23', rainfall: 5.2, description: 'Light Rain', temp: 27, icon: CloudDrizzle },
      { day: 'Sat', date: 'Jun 24', rainfall: 0, description: 'Partly Cloudy', temp: 29, icon: CloudSun },
      { day: 'Sun', date: 'Jun 25', rainfall: 0, description: 'Sunny', temp: 31, icon: Sun },
    ],
  },
  'houston-tx': {
    monthly: [
      { month: 'Jul', rainfall: 105, rainyDays: 13, avgTemp: 33 },
      { month: 'Aug', rainfall: 118, rainyDays: 15, avgTemp: 34 },
      { month: 'Sep', rainfall: 125, rainyDays: 16, avgTemp: 32 },
      { month: 'Oct', rainfall: 88, rainyDays: 11, avgTemp: 28 },
      { month: 'Nov', rainfall: 72, rainyDays: 9, avgTemp: 24 },
      { month: 'Dec', rainfall: 58, rainyDays: 7, avgTemp: 20 },
    ],
    weekly: [
      { day: 'Mon', date: 'Jun 19', rainfall: 2.5, description: 'Light Rain', temp: 35, icon: CloudDrizzle },
      { day: 'Tue', date: 'Jun 20', rainfall: 0, description: 'Partly Cloudy', temp: 33, icon: CloudSun },
      { day: 'Wed', date: 'Jun 21', rainfall: 15.2, description: 'Heavy Rain', temp: 29, icon: CloudRain },
      { day: 'Thu', date: 'Jun 22', rainfall: 18.7, description: 'Thunderstorms', temp: 27, icon: CloudLightning },
      { day: 'Fri', date: 'Jun 23', rainfall: 8.1, description: 'Light Rain', temp: 30, icon: CloudDrizzle },
      { day: 'Sat', date: 'Jun 24', rainfall: 0, description: 'Sunny', temp: 32, icon: Sun },
      { day: 'Sun', date: 'Jun 25', rainfall: 0, description: 'Partly Cloudy', temp: 34, icon: CloudSun },
    ],
  },
  'dallas-tx': {
    monthly: [
      { month: 'Jul', rainfall: 65, rainyDays: 8, avgTemp: 28 },
      { month: 'Aug', rainfall: 72, rainyDays: 9, avgTemp: 29 },
      { month: 'Sep', rainfall: 85, rainyDays: 11, avgTemp: 27 },
      { month: 'Oct', rainfall: 58, rainyDays: 7, avgTemp: 24 },
      { month: 'Nov', rainfall: 45, rainyDays: 6, avgTemp: 20 },
      { month: 'Dec', rainfall: 32, rainyDays: 4, avgTemp: 16 },
    ],
    weekly: [
      { day: 'Mon', date: 'Jun 19', rainfall: 0, description: 'Sunny', temp: 30, icon: Sun },
      { day: 'Tue', date: 'Jun 20', rainfall: 0, description: 'Sunny', temp: 31, icon: Sun },
      { day: 'Wed', date: 'Jun 21', rainfall: 3.2, description: 'Light Rain', temp: 26, icon: CloudDrizzle },
      { day: 'Thu', date: 'Jun 22', rainfall: 7.8, description: 'Light Rain', temp: 24, icon: CloudDrizzle },
      { day: 'Fri', date: 'Jun 23', rainfall: 0, description: 'Partly Cloudy', temp: 27, icon: CloudSun },
      { day: 'Sat', date: 'Jun 24', rainfall: 0, description: 'Sunny', temp: 29, icon: Sun },
      { day: 'Sun', date: 'Jun 25', rainfall: 0, description: 'Sunny', temp: 32, icon: Sun },
    ],
  },
  'san-antonio-tx': {
    monthly: [
      { month: 'Jul', rainfall: 70, rainyDays: 9, avgTemp: 31 },
      { month: 'Aug', rainfall: 78, rainyDays: 10, avgTemp: 32 },
      { month: 'Sep', rainfall: 92, rainyDays: 12, avgTemp: 30 },
      { month: 'Oct', rainfall: 68, rainyDays: 8, avgTemp: 27 },
      { month: 'Nov', rainfall: 52, rainyDays: 7, avgTemp: 23 },
      { month: 'Dec', rainfall: 38, rainyDays: 5, avgTemp: 19 },
    ],
    weekly: [
      { day: 'Mon', date: 'Jun 19', rainfall: 0, description: 'Sunny', temp: 33, icon: Sun },
      { day: 'Tue', date: 'Jun 20', rainfall: 0, description: 'Partly Cloudy', temp: 31, icon: CloudSun },
      { day: 'Wed', date: 'Jun 21', rainfall: 6.5, description: 'Light Rain', temp: 29, icon: CloudDrizzle },
      { day: 'Thu', date: 'Jun 22', rainfall: 11.2, description: 'Heavy Rain', temp: 27, icon: CloudRain },
      { day: 'Fri', date: 'Jun 23', rainfall: 4.8, description: 'Light Rain', temp: 28, icon: CloudDrizzle },
      { day: 'Sat', date: 'Jun 24', rainfall: 0, description: 'Sunny', temp: 30, icon: Sun },
      { day: 'Sun', date: 'Jun 25', rainfall: 0, description: 'Sunny', temp: 32, icon: Sun },
    ],
  },
  'cedar-park-tx': {
    monthly: [
      { month: 'Jul', rainfall: 78, rainyDays: 9, avgTemp: 29 },
      { month: 'Aug', rainfall: 88, rainyDays: 11, avgTemp: 30 },
      { month: 'Sep', rainfall: 102, rainyDays: 13, avgTemp: 28 },
      { month: 'Oct', rainfall: 72, rainyDays: 8, avgTemp: 25 },
      { month: 'Nov', rainfall: 58, rainyDays: 7, avgTemp: 21 },
      { month: 'Dec', rainfall: 42, rainyDays: 5, avgTemp: 17 },
    ],
    weekly: [
      { day: 'Mon', date: 'Jun 19', rainfall: 0, description: 'Sunny', temp: 31, icon: Sun },
      { day: 'Tue', date: 'Jun 20', rainfall: 0, description: 'Partly Cloudy', temp: 29, icon: CloudSun },
      { day: 'Wed', date: 'Jun 21', rainfall: 7.2, description: 'Light Rain', temp: 27, icon: CloudDrizzle },
      { day: 'Thu', date: 'Jun 22', rainfall: 10.8, description: 'Heavy Rain', temp: 25, icon: CloudRain },
      { day: 'Fri', date: 'Jun 23', rainfall: 4.5, description: 'Light Rain', temp: 26, icon: CloudDrizzle },
      { day: 'Sat', date: 'Jun 24', rainfall: 0, description: 'Partly Cloudy', temp: 28, icon: CloudSun },
      { day: 'Sun', date: 'Jun 25', rainfall: 0, description: 'Sunny', temp: 30, icon: Sun },
    ],
  },
};

const projectsByLocation = {
  'austin-tx': [
    { 
      id: '1', 
      name: 'Highway 290 Project',
      location: 'Austin, TX',
      predictions: [
        { month: 'Jul', predicted: 8, confidence: 85 },
        { month: 'Aug', predicted: 10, confidence: 75 },
        { month: 'Sep', predicted: 12, confidence: 65 },
      ]
    },
  ],
  'houston-tx': [
    { 
      id: '2', 
      name: 'Downtown Bridge',
      location: 'Houston, TX',
      predictions: [
        { month: 'Jul', predicted: 11, confidence: 80 },
        { month: 'Aug', predicted: 13, confidence: 70 },
        { month: 'Sep', predicted: 15, confidence: 60 },
      ]
    },
  ],
  'cedar-park-tx': [
    { 
      id: '3', 
      name: 'Lakeline Boulevard',
      location: 'Cedar Park, TX',
      predictions: [
        { month: 'Jul', predicted: 7, confidence: 90 },
        { month: 'Aug', predicted: 9, confidence: 80 },
        { month: 'Sep', predicted: 11, confidence: 70 },
      ]
    },
  ],
  'dallas-tx': [],
  'san-antonio-tx': [],
};

const chartConfig = {
  rainfall: {
    label: "Rainfall",
    color: "#3b82f6",
  },
  rainyDays: {
    label: "Rainy Days",
    color: "#0ea5e9",
  },
  avgTemp: {
    label: "Avg. Temp",
    color: "#f97316",
  },
};

const Forecast = () => {
  const [selectedLocation, setSelectedLocation] = useState('austin-tx');
  
  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);
  const forecastData = forecastDataByLocation[selectedLocation] || forecastDataByLocation['austin-tx'];
  const projects = projectsByLocation[selectedLocation] || [];

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
              <BreadcrumbPage>Forecast</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-3xl font-bold">Weather Forecast</div>
            <p className="text-muted-foreground">Future rainfall predictions for your projects.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[280px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{location.name}</span>
                      <span className="text-xs text-muted-foreground">{location.region}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="weekly" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-background border">
              <TabsTrigger value="weekly">7-Day Forecast</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Outlook</TabsTrigger>
              <TabsTrigger value="projects">Project Predictions</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
          
          <TabsContent value="weekly" className="space-y-6">
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Current Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedLocationData?.name} - {selectedLocationData?.region}</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              {forecastData.weekly.slice(0, 4).map((day, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className={`pb-2 ${day.rainfall >= 5 ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">{day.day}</CardTitle>
                        <p className="text-xs text-muted-foreground">{day.date}</p>
                      </div>
                      <day.icon className={`h-10 w-10 ${
                        day.icon === Sun ? 'text-amber-500' : 
                        day.icon === CloudSun ? 'text-amber-400' : 
                        day.icon === CloudDrizzle ? 'text-blue-400' :
                        day.icon === CloudRain ? 'text-blue-500' :
                        day.icon === CloudLightning ? 'text-purple-500' :
                        'text-gray-400'
                      }`} />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold">{day.temp}°C</div>
                      <div className="text-sm text-muted-foreground">{day.description}</div>
                    </div>
                    <div className="flex items-center mt-2">
                      <CloudRain className="h-4 w-4 mr-1 text-blue-500" />
                      <span className="text-sm">{day.rainfall} mm</span>
                      {day.rainfall >= 5 && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          Rainy Day
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>7-Day Rainfall Forecast - {selectedLocationData?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={chartConfig}>
                  <BarChart data={forecastData.weekly}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rainfall" name="Rainfall (mm)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
                <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                  <div>Rainy day threshold: 5mm</div>
                  <div>Source: National Weather Service</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>6-Month Weather Outlook - {selectedLocationData?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <ChartContainer className="h-[300px]" config={chartConfig}>
                    <LineChart data={forecastData.monthly}>
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="rainfall" name="Total Rainfall (mm)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                      <Line yAxisId="left" type="monotone" dataKey="rainyDays" name="Rainy Days" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
                      <Line yAxisId="right" type="monotone" dataKey="avgTemp" name="Avg. Temperature (°C)" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ChartContainer>
                  <ChartLegend className="mt-4 justify-center" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {forecastData.monthly.map((month, index) => (
                    <Card key={index} className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{month.month} 2023</span>
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Rainfall:</span>
                            <span className="font-medium">{month.rainfall} mm</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Rainy Days:</span>
                            <span className="font-medium">{month.rainyDays} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Avg. Temp:</span>
                            <span className="font-medium">{month.avgTemp}°C</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-6">
            {projects.length > 0 ? (
              projects.map(project => (
                <Card key={project.id} className="mb-6">
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{project.location}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {project.predictions.map((prediction, index) => (
                        <Card key={index} className="bg-muted/30">
                          <CardContent className="p-4">
                            <div className="flex flex-col">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="font-medium">{prediction.month} 2023</h3>
                                <span className={`px-2 py-0.5 text-xs rounded-full ${
                                  prediction.confidence >= 80 ? 'bg-green-100 text-green-800' :
                                  prediction.confidence >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-orange-100 text-orange-800'
                                }`}>
                                  {prediction.confidence}% confidence
                                </span>
                              </div>
                              <div className="flex flex-col items-center justify-center py-4">
                                <div className="text-5xl font-bold mb-2">{prediction.predicted}</div>
                                <div className="text-sm text-muted-foreground">Predicted Rainy Days</div>
                              </div>
                              {index < project.predictions.length - 1 && (
                                <div className="flex justify-end mt-2">
                                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <MapPin className="h-12 w-12 text-muted-foreground/50" />
                    <div>
                      <h3 className="text-lg font-medium mb-2">No Projects in {selectedLocationData?.name}</h3>
                      <p className="text-muted-foreground">
                        There are currently no active projects in this location. Select a different location or add projects to see predictions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Forecast;
