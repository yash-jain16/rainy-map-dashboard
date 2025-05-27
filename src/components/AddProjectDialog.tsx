import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { GoogleMap, useJsApiLoader, Polygon } from '@react-google-maps/api';
import { Plus, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectFormData {
  name: string;
  cost: string;
  address: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface PolygonCoordinate {
  lat: number;
  lng: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '8px'
};

const defaultCenter = {
  lat: 30.2672,
  lng: -97.7431
};

interface AddProjectDialogProps {
  trigger?: React.ReactNode;
}

export const AddProjectDialog: React.FC<AddProjectDialogProps> = ({ trigger }) => {
  const [open, setOpen] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [polygonCoords, setPolygonCoords] = useState<PolygonCoordinate[]>([]);
  const [mapApiKey, setMapApiKey] = useState<string | null>(localStorage.getItem('google_maps_api_key'));
  
  const form = useForm<ProjectFormData>({
    defaultValues: {
      name: '',
      cost: '',
      address: '',
      description: '',
      startDate: '',
      endDate: ''
    }
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapApiKey || '',
    libraries: ['drawing']
  });

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!isDrawing || !event.latLng) return;
    
    const newCoord = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    
    setPolygonCoords(prev => [...prev, newCoord]);
  };

  const startDrawing = () => {
    setIsDrawing(true);
    setPolygonCoords([]);
    toast.info('Click on the map to draw your project area. Click "Finish Drawing" when done.');
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    if (polygonCoords.length >= 3) {
      toast.success('Project area defined successfully!');
    } else {
      toast.error('Please draw at least 3 points to create a valid area.');
    }
  };

  const clearPolygon = () => {
    setPolygonCoords([]);
    setIsDrawing(false);
  };

  const onSubmit = (data: ProjectFormData) => {
    if (polygonCoords.length < 3) {
      toast.error('Please draw a project area on the map before submitting.');
      return;
    }

    // Here you would typically save to your backend/database
    console.log('Project Data:', {
      ...data,
      polygonCoords,
      createdAt: new Date().toISOString()
    });

    toast.success('Project created successfully!');
    
    // Reset form and close dialog
    form.reset();
    setPolygonCoords([]);
    setIsDrawing(false);
    setOpen(false);
  };

  const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get('apiKey') as string;
    
    if (apiKey) {
      localStorage.setItem('google_maps_api_key', apiKey);
      setMapApiKey(apiKey);
      window.location.reload();
    }
  };

  if (!mapApiKey) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Google Maps API Key Required</DialogTitle>
          </DialogHeader>
          <div className="p-4 bg-secondary/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">
              To use the map drawing feature, please enter your Google Maps API key.
              You can get one from the <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Cloud Console</a>.
            </p>
            <form onSubmit={handleApiKeySubmit} className="space-y-2">
              <input 
                type="text" 
                name="apiKey" 
                placeholder="Enter Google Maps API Key" 
                className="w-full p-2 border rounded-md"
                required
              />
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md w-full">
                Save API Key
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium mb-2 block">Project Area</Label>
              {isLoaded ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={isDrawing ? "destructive" : "default"}
                      size="sm"
                      onClick={isDrawing ? finishDrawing : startDrawing}
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      {isDrawing ? 'Finish Drawing' : 'Draw Area'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={clearPolygon}
                      disabled={polygonCoords.length === 0}
                    >
                      Clear
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      mapContainerClassName={isDrawing ? 'cursor-crosshair' : 'cursor-default'}
                      center={defaultCenter}
                      zoom={12}
                      onClick={handleMapClick}
                      onLoad={(map) => { mapRef.current = map; }}
                      options={{
                        mapTypeControl: false,
                        streetViewControl: false
                      }}
                    >
                      {polygonCoords.length > 0 && (
                        <Polygon
                          paths={polygonCoords}
                          options={{
                            fillColor: '#3b82f6',
                            fillOpacity: 0.2,
                            strokeColor: '#3b82f6',
                            strokeOpacity: 1,
                            strokeWeight: 2
                          }}
                        />
                      )}
                    </GoogleMap>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    {polygonCoords.length > 0 
                      ? `${polygonCoords.length} points drawn`
                      : 'Click "Draw Area" and then click on the map to define your project boundaries'
                    }
                  </p>
                </div>
              ) : (
                <div className="h-[300px] bg-muted/50 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Loading map...</p>
                </div>
              )}
            </div>
          </div>

          {/* Form Section */}
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: 'Project name is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  rules={{ required: 'Address is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cost"
                  rules={{ required: 'Project cost is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Cost</FormLabel>
                      <FormControl>
                        <Input placeholder="$0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    rules={{ required: 'Start date is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    rules={{ required: 'End date is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter project description" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Create Project
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
