
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BellRing, CloudRain, MailCheck, Shield, UserCircle } from 'lucide-react';

const Settings = () => {
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
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-3xl font-bold">Settings</div>
        <p className="text-muted-foreground">Configure your dashboard preferences.</p>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-background border">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="rainfall">Rainfall Settings</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and contact information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Acme Construction Inc." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job title</Label>
                  <Input id="jobTitle" placeholder="Project Manager" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BellRing className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Rainfall alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when rainfall exceeds threshold
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Email</Button>
                      <Button size="sm">Push</Button>
                      <Button variant="outline" size="sm">SMS</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Payout notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when payouts are triggered or processed
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm">Email</Button>
                      <Button variant="outline" size="sm">Push</Button>
                      <Button size="sm">SMS</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Weekly reports</h4>
                      <p className="text-sm text-muted-foreground">
                        Weekly summary of rainfall and project status
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm">Email</Button>
                      <Button variant="outline" size="sm">Push</Button>
                      <Button variant="outline" size="sm">SMS</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Monthly forecast</h4>
                      <p className="text-sm text-muted-foreground">
                        Monthly rainfall predictions and payout estimates
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm">Email</Button>
                      <Button variant="outline" size="sm">Push</Button>
                      <Button variant="outline" size="sm">SMS</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save notification preferences</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MailCheck className="h-5 w-5" />
                  Email Settings
                </CardTitle>
                <CardDescription>
                  Customize your email notification format and frequency.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="emailFormat">Email format</Label>
                  <div className="flex space-x-2">
                    <Button variant="outline">HTML</Button>
                    <Button variant="outline">Plain Text</Button>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="emailFrequency">Email frequency</Label>
                  <div className="flex space-x-2">
                    <Button variant="outline">Immediate</Button>
                    <Button>Daily Digest</Button>
                    <Button variant="outline">Weekly Digest</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Update email preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="rainfall" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudRain className="h-5 w-5" />
                  Rainfall Configuration
                </CardTitle>
                <CardDescription>
                  Configure rainfall thresholds and payout settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rainfallThreshold">Rainy day threshold (mm)</Label>
                  <div className="flex space-x-2">
                    <Input id="rainfallThreshold" type="number" placeholder="5" defaultValue="5" />
                    <Button>Apply</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    A day with rainfall above this threshold is considered a "rainy day" for payout calculations.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dataSource">Weather data source</Label>
                  <div className="flex space-x-2">
                    <Button>National Weather Service</Button>
                    <Button variant="outline">Weather Company</Button>
                    <Button variant="outline">OpenWeather</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="updateFrequency">Weather data update frequency</Label>
                  <div className="flex space-x-2">
                    <Button>Hourly</Button>
                    <Button variant="outline">Every 3 hours</Button>
                    <Button variant="outline">Daily</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultLocation">Default map location</Label>
                  <Input id="defaultLocation" placeholder="Austin, TX" defaultValue="Austin, TX" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save rainfall settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Security
                </CardTitle>
                <CardDescription>
                  Manage your password and security settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                
                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-4">Two-factor authentication</h4>
                  <div className="flex space-x-2">
                    <Button variant="outline">Enable 2FA</Button>
                    <Button variant="outline">Reset recovery codes</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  Delete account
                </Button>
                <Button>Update password</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Manage API keys for accessing the weather data API.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex space-x-2">
                    <Input id="apiKey" value="•••••••••••••••••••••••••••••" readOnly />
                    <Button variant="outline">Show</Button>
                    <Button variant="outline">Copy</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input id="webhookUrl" placeholder="https://your-server.com/api/webhook" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhookEvents">Webhook events</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">Rainfall events</Button>
                    <Button size="sm">Payout events</Button>
                    <Button size="sm">Threshold alerts</Button>
                    <Button variant="outline" size="sm">Forecast updates</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="destructive">Revoke key</Button>
                <Button>Generate new key</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
