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
  driveway: {
    color: '#8b5cf6', // purple
    icon: 'https://cdn-icons-png.flaticon.com/32/25/25694.png', // house icon
    label: 'Driveway Surfing'
  },
  meetup: {
    color: '#f59e0b', // amber
    icon: 'https://cdn-icons-png.flaticon.com/32/1256/1256650.png', // people icon
    label: 'Member Meetup'
  },
  business: {
    color: '#3b82f6', // blue
    icon: 'https://cdn-icons-png.flaticon.com/32/684/684908.png', // shop icon
    label: 'Van Friendly Business'
  },
  event: {
    color: '#ec4899', // pink
    icon: 'https://cdn-icons-png.flaticon.com/32/3652/3652191.png', // event icon
    label: 'Van Life Event'
  },
  poi: {
    color: '#ef4444', // red
    icon: 'https://cdn-icons-png.flaticon.com/32/854/854866.png', // star icon
    label: 'Point of Interest'
  },
  live_member: {
    color: '#10b981', // emerald
    icon: 'https://cdn-icons-png.flaticon.com/32/1077/1077114.png', // location icon
    label: 'Live Member'
  }
};

export type LocationType = keyof typeof locationTypeConfig;