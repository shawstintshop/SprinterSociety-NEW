import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Users, Crown, Tent, Coffee } from "lucide-react";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";

const MapPreview = () => {
  // Sample locations for the preview
  const sampleLocations = [
    {
      id: "1",
      name: "Moab BLM Camping",
      description: "Free dispersed camping with stunning red rock views",
      latitude: 38.5733,
      longitude: -109.5498,
      type: "campsite" as const,
      amenities: ["free_camping", "scenic_views"],
      rating: 4.8
    },
    {
      id: "2", 
      name: "Quartzsite Meetup",
      description: "Van life community gathering",
      latitude: 33.6639,
      longitude: -114.2251,
      type: "meetup" as const,
      amenities: ["community", "networking"],
      rating: 4.5
    }
  ];

  // Initialize Google Maps for preview
  const { mapRef, isLoaded } = useGoogleMaps({
    center: { lat: 38.5733, lng: -109.5498 }, // Moab area
    zoom: 8,
    locations: sampleLocations
  });

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Interactive </span>
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Adventure Map
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover hidden gems, connect with fellow van lifers, and plan your next adventure 
            with our comprehensive interactive map
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Container - Now with real Google Maps */}
          <div className="relative">
            <div className="bg-gradient-card rounded-2xl p-6 shadow-hero">
              {/* Real Google Map */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                {!isLoaded ? (
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center">
                    <p className="text-muted-foreground">Loading interactive map...</p>
                  </div>
                ) : (
                  <div 
                    ref={mapRef} 
                    className="w-full h-full rounded-xl"
                  />
                )}
              </div>

              {/* Map Controls */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    Campsites
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    Members
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Navigation className="w-3 h-3 mr-1" />
                    Routes
                  </Button>
                </div>
                <Button variant="hero" size="sm">
                  Explore Map
                </Button>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-sunset rounded-xl flex items-center justify-center shadow-glow">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Real Locations</h3>
                <p className="text-muted-foreground">
                  Browse actual camping spots, verified locations, and community-submitted 
                  gems across North America
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-forest rounded-xl flex items-center justify-center shadow-glow">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Live Member Finder</h3>
                <p className="text-muted-foreground">
                  Connect with nearby van lifers in real-time, coordinate meetups, 
                  and find travel companions
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-glow">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Route Planning</h3>
                <p className="text-muted-foreground">
                  Plan epic road trips with van-friendly routes, fuel stops, 
                  and overnight parking recommendations
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-sunset rounded-xl flex items-center justify-center shadow-glow">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Interactive Features</h3>
                <p className="text-muted-foreground">
                  Full Google Maps integration with street view, satellite imagery, 
                  and detailed location information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPreview;