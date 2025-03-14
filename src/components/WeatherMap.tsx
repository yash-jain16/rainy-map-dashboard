
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPinIcon } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

// Map container styles
const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '8px'
};

// Default center position (Austin, TX)
const center = {
  lat: 30.2672,
  lng: -97.7431
};

// Mock project locations
const projectLocations = [
  { id: 1, name: 'Highway 290 Project', lat: 30.2672, lng: -97.7431, rainfall: '3.2mm' },
  { id: 2, name: 'Downtown Bridge', lat: 30.3172, lng: -97.7631, rainfall: '1.5mm' },
  { id: 3, name: 'Lakeline Boulevard', lat: 30.2372, lng: -97.7131, rainfall: '4.7mm' },
];

export const WeatherMap: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [mapApiKey, setMapApiKey] = useState<string | null>(localStorage.getItem('google_maps_api_key'));
  
  // Load Google Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapApiKey || ''
  });

  useEffect(() => {
    // Simulate loading if API key is present
    if (mapApiKey) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [mapApiKey]);

  const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get('apiKey') as string;
    
    if (apiKey) {
      localStorage.setItem('google_maps_api_key', apiKey);
      setMapApiKey(apiKey);
      window.location.reload(); // Reload to apply new API key
    }
  };

  if (!mapApiKey) {
    return (
      <Card className="glass-card h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium">Project Areas Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-secondary/10 rounded-lg">
            <h3 className="font-medium mb-2">Google Maps API Key Required</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To display the map, please enter your Google Maps API key.
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
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium">Project Areas</CardTitle>
          <Badge variant="outline" className="chip bg-secondary">{projectLocations.length} Active Locations</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading || !isLoaded ? (
          <Skeleton className="w-full h-[300px] rounded-lg" />
        ) : (
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={11}
              options={{
                mapTypeControl: false,
                streetViewControl: false
              }}
            >
              {projectLocations.map((location) => (
                <Marker
                  key={location.id}
                  position={{ lat: location.lat, lng: location.lng }}
                  onClick={() => setSelectedMarker(location.id)}
                  animation={window.google.maps.Animation.DROP}
                />
              ))}
              
              {selectedMarker !== null && (
                <InfoWindow
                  position={{
                    lat: projectLocations.find(loc => loc.id === selectedMarker)?.lat || 0,
                    lng: projectLocations.find(loc => loc.id === selectedMarker)?.lng || 0
                  }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="p-2">
                    <h3 className="font-medium text-sm">
                      {projectLocations.find(loc => loc.id === selectedMarker)?.name}
                    </h3>
                    <p className="text-xs mt-1">
                      Current rainfall: {projectLocations.find(loc => loc.id === selectedMarker)?.rainfall}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>

            <div className="absolute top-3 right-3 z-10">
              <div className="glass-card p-2 text-xs flex items-center">
                <span className="w-3 h-3 rounded-full bg-rain mr-1.5"></span>
                Rain Activity
              </div>
            </div>

            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
              Weather data overlay
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
