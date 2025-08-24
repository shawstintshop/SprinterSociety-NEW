import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Users, Crown, Tent, Coffee } from "lucide-react";

const MapPreview = () => {
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
          {/* Map Mockup */}
          <div className="relative">
            <div className="bg-gradient-card rounded-2xl p-6 shadow-hero">
              {/* Map Container */}
              <div className="aspect-[4/3] bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl relative overflow-hidden">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-primary to-accent"></div>
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                                     radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                {/* Map Pins */}
                <div className="absolute top-[20%] left-[30%] group cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-sunset rounded-full flex items-center justify-center shadow-glow animate-pulse">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background px-3 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <span className="text-sm font-medium">Secret Beach Camp</span>
                  </div>
                </div>

                <div className="absolute top-[40%] right-[25%] group cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-forest rounded-full flex items-center justify-center shadow-glow">
                    <Tent className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background px-3 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <span className="text-sm font-medium">Mountain Retreat</span>
                  </div>
                </div>

                <div className="absolute bottom-[30%] left-[45%] group cursor-pointer">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-glow">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background px-3 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <span className="text-sm font-medium">Van Life Meetup</span>
                  </div>
                </div>

                <div className="absolute top-[60%] right-[40%] group cursor-pointer">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center shadow-glow">
                    <Coffee className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-background px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <span className="text-xs font-medium">Van Friendly Cafe</span>
                  </div>
                </div>

                {/* Premium Area Overlay */}
                <div className="absolute top-4 right-4 bg-gradient-sunset px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium Only
                </div>
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
                <h3 className="text-xl font-semibold mb-2">25K+ Camp Spots</h3>
                <p className="text-muted-foreground">
                  Discover free camping, premium locations, and secret member-only spots 
                  across North America
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
                <h3 className="text-xl font-semibold mb-2">Premium Features</h3>
                <p className="text-muted-foreground">
                  Access exclusive locations, offline maps, weather alerts, 
                  and advanced filtering options
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