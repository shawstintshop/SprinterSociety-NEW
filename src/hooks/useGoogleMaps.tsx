import { useEffect, useState, useRef } from 'react';
import { googleMapsLoader, vanLifeMapStyle, locationTypeConfig, LocationType } from '@/lib/googleMaps';

interface Location {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  type: LocationType;
  amenities?: string[];
  rating?: number;
}

interface UseGoogleMapsProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  locations?: Location[];
  onLocationClick?: (location: Location) => void;
}

export const useGoogleMaps = ({
  center = { lat: 39.8283, lng: -98.5795 }, // Center of USA
  zoom = 5,
  locations = [],
  onLocationClick
}: UseGoogleMapsProps = {}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Initialize Google Maps
  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      try {
        await googleMapsLoader.load();
        
        if (!isMounted || !mapRef.current) return;

        const googleMap = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          styles: vanLifeMapStyle,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        });

        setMap(googleMap);
        setIsLoaded(true);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps');
      }
    };

    initMap();

    return () => {
      isMounted = false;
    };
  }, [center.lat, center.lng, zoom]);

  // Update markers when locations change
  useEffect(() => {
    if (!map || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    locations.forEach((location) => {
      const config = locationTypeConfig[location.type] || locationTypeConfig.poi;
      
      const marker = new google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map,
        title: location.name,
        icon: {
          url: config.icon,
          scaledSize: new google.maps.Size(32, 32),
        },
      });

      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="max-width: 250px; padding: 8px;">
            <h3 style="margin: 0 0 8px 0; color: ${config.color}; font-size: 16px; font-weight: bold;">
              ${location.name}
            </h3>
            <p style="margin: 0 0 8px 0; color: #666; font-size: 14px; line-height: 1.4;">
              ${location.description || 'No description available'}
            </p>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="background: ${config.color}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                ${config.label}
              </span>
              ${location.rating ? `
                <span style="color: #666; font-size: 12px;">
                  ⭐ ${location.rating}/5
                </span>
              ` : ''}
            </div>
            ${location.amenities && location.amenities.length > 0 ? `
              <div style="font-size: 12px; color: #888;">
                Amenities: ${location.amenities.slice(0, 3).join(', ')}${location.amenities.length > 3 ? '...' : ''}
              </div>
            ` : ''}
          </div>
        `,
      });

      // Add click listener
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        if (onLocationClick) {
          onLocationClick(location);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all markers if there are any
    if (locations.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach(location => {
        bounds.extend({ lat: location.latitude, lng: location.longitude });
      });
      map.fitBounds(bounds);
      
      // Don't zoom in too much for single locations
      google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
        if (map.getZoom()! > 12) {
          map.setZoom(12);
        }
      });
    }
  }, [map, isLoaded, locations, onLocationClick]);

  return {
    mapRef,
    map,
    isLoaded,
    error,
  };
};