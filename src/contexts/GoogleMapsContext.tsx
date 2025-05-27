
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

interface GoogleMapsContextType {
  isLoaded: boolean;
  mapApiKey: string | null;
  setMapApiKey: (key: string) => void;
}

const GoogleMapsContext = createContext<GoogleMapsContextType | undefined>(undefined);

const libraries: ("drawing" | "geometry" | "localContext" | "places" | "visualization")[] = ['drawing'];

export const GoogleMapsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mapApiKey, setMapApiKeyState] = useState<string | null>(
    localStorage.getItem('google_maps_api_key')
  );

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapApiKey || '',
    libraries
  });

  const setMapApiKey = (key: string) => {
    localStorage.setItem('google_maps_api_key', key);
    setMapApiKeyState(key);
    window.location.reload();
  };

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, mapApiKey, setMapApiKey }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => {
  const context = useContext(GoogleMapsContext);
  if (context === undefined) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
};
