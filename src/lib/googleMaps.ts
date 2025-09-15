import { Loader } from '@googlemaps/js-api-loader';

// Google Maps API configuration
export const GOOGLE_MAPS_API_KEY = 'AIzaSyCs3lHwBgOZwKC08c608ElygTBRt04vSYY';

export const googleMapsLoader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places', 'geometry'],
});

// Van life themed map styles
export const vanLifeMapStyle = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }]
  },
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#444444' }]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{ color: '#f2f2f2' }]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ddd2b8' }]
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#c5d6a8' }, { visibility: 'on' }]
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [{ saturation: -100 }, { lightness: 45 }]
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [{ visibility: 'simplified' }]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{ color: '#46bcec' }, { visibility: 'on' }]
  }
];

// Location type colors and icons
export const locationTypeConfig = {
  campsite: {
    color: '#22c55e', // green
    icon: 'https://cdn-icons-png.flaticon.com/32/1086/1086581.png', // tent icon
    label: 'Campsite'
  },
  meetup: {
    color: '#f59e0b', // amber
    icon: 'https://cdn-icons-png.flaticon.com/32/1256/1256650.png', // people icon
    label: 'Meetup'
  },
  vendor: {
    color: '#3b82f6', // blue
    icon: 'https://cdn-icons-png.flaticon.com/32/684/684908.png', // shop icon
    label: 'Business'
  },
  poi: {
    color: '#ef4444', // red
    icon: 'https://cdn-icons-png.flaticon.com/32/684/684908.png', // star icon
    label: 'Point of Interest'
  }
};

export type LocationType = keyof typeof locationTypeConfig;