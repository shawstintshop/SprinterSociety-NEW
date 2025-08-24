import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation, 
  Users, 
  Crown, 
  Tent, 
  Coffee,
  Search,
  Filter,
  Star,
  Wifi,
  Fuel,
  Bath,
  Zap
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const mapFilters = [
    { id: "all", name: "All Locations", icon: MapPin },
    { id: "camping", name: "Camp Spots", icon: Tent },
    { id: "members", name: "Members", icon: Users },
    { id: "businesses", name: "Van Friendly", icon: Coffee },
    { id: "events", name: "Events", icon: Star },
    { id: "premium", name: "Premium Only", icon: Crown }
  ];

  const nearbyLocations = [
    {
      id: 1,
      name: "Hidden Valley Campground",
      type: "Free Camping",
      distance: "2.3 miles",
      rating: 4.8,
      reviews: 234,
      amenities: ["Wifi", "Water", "Toilets"],
      coordinates: [34.0522, -118.4437],
      isPremium: false,
      description: "Secluded boondocking spot with amazing sunset views"
    },
    {
      id: 2, 
      name: "Mountain View RV Park",
      type: "Paid Camping",
      distance: "5.7 miles",
      rating: 4.6,
      reviews: 156,
      amenities: ["Hookups", "Shower", "Wifi", "Store"],
      coordinates: [34.0622, -118.4537],
      isPremium: false,
      description: "Full hookups available, pet-friendly facility"
    },
    {
      id: 3,
      name: "Secret Desert Oasis",
      type: "Premium Spot",
      distance: "12.4 miles", 
      rating: 4.9,
      reviews: 89,
      amenities: ["Water", "Scenic"],
      coordinates: [34.0722, -118.4637],
      isPremium: true,
      description: "Exclusive member location with natural spring water"
    },
    {
      id: 4,
      name: "Van Life Meetup - Sarah",
      type: "Community Member",
      distance: "3.1 miles",
      rating: 4.7,
      reviews: 45,
      amenities: ["Social", "Tips"],
      coordinates: [34.0422, -118.4237],
      isPremium: false,
      description: "Experienced van lifer, happy to share tips and stories"
    },
    {
      id: 5,
      name: "Bob's Van Parts & Repair",
      type: "Van Services",
      distance: "8.2 miles",
      rating: 4.5,
      reviews: 312,
      amenities: ["Repair", "Parts", "Wifi"],
      coordinates: [34.0822, -118.4737],
      isPremium: false,
      description: "Full van repair services, parts in stock"
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-3 h-3" />;
      case 'hookups': case 'water': return <Zap className="w-3 h-3" />;
      case 'shower': return <Bath className="w-3 h-3" />;
      case 'fuel': return <Fuel className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Community Map
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover camp spots, connect with fellow van lifers, and find van-friendly businesses
              </p>
            </div>

            {/* Search & Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search locations, cities, or coordinates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                </Button>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2 justify-center">
                {mapFilters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <Button
                      key={filter.id}
                      variant={selectedFilter === filter.id ? "hero" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter.id)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {filter.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
          {/* Map Container */}
          <div className="flex-1 relative bg-gradient-to-br from-accent/20 to-primary/20">
            {/* Map Placeholder - This would be replaced with actual map component */}
            <div className="w-full h-full min-h-[400px] lg:min-h-full relative overflow-hidden">
              {/* Map Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-gradient-to-br from-primary to-accent"></div>
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                                   radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }}></div>
              </div>

              {/* Interactive Map Pins */}
              <div className="absolute top-[20%] left-[30%] group cursor-pointer">
                <div className="w-10 h-10 bg-gradient-sunset rounded-full flex items-center justify-center shadow-glow animate-pulse">
                  <Tent className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-background p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="font-medium">Hidden Valley Campground</p>
                  <p className="text-sm text-muted-foreground">Free • 4.8★ • 2.3 miles</p>
                </div>
              </div>

              <div className="absolute top-[60%] right-[25%] group cursor-pointer">
                <div className="w-8 h-8 bg-gradient-forest rounded-full flex items-center justify-center shadow-glow">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-background p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="text-sm font-medium">Sarah - Van Life Meetup</p>
                  <p className="text-xs text-muted-foreground">Member • 3.1 miles</p>
                </div>
              </div>

              <div className="absolute bottom-[30%] left-[45%] group cursor-pointer">
                <div className="w-10 h-10 bg-gradient-sunset rounded-full flex items-center justify-center shadow-glow border-2 border-white/20">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-background p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="font-medium">Secret Desert Oasis</p>
                  <p className="text-sm text-muted-foreground">Premium • 4.9★ • 12.4 miles</p>
                </div>
              </div>

              <div className="absolute top-[40%] right-[40%] group cursor-pointer">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-glow">
                  <Coffee className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-background p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="text-sm font-medium">Bob's Van Parts</p>
                  <p className="text-xs text-muted-foreground">Service • 8.2 miles</p>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button variant="outline" size="icon" className="bg-background/90">
                  <Navigation className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-background/90">
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>

              {/* Current Location Indicator */}
              <div className="absolute bottom-4 left-4 bg-background/90 px-3 py-2 rounded-lg">
                <p className="text-sm font-medium">Current Location: Los Angeles, CA</p>
              </div>
            </div>
          </div>

          {/* Sidebar with Location List */}
          <div className="w-full lg:w-96 bg-muted/20 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Nearby Locations</h3>
              <Badge variant="secondary">{nearbyLocations.length} found</Badge>
            </div>

            <div className="space-y-4">
              {nearbyLocations.map((location) => (
                <Card key={location.id} className="hover:shadow-glow transition-all duration-300 cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {location.name}
                          {location.isPremium && (
                            <Crown className="w-4 h-4 text-secondary" />
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{location.type}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {location.distance}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {location.description}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-secondary fill-current" />
                        <span className="text-sm font-medium">{location.rating}</span>
                        <span className="text-sm text-muted-foreground">({location.reviews})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {location.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs flex items-center gap-1">
                          {getAmenityIcon(amenity)}
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <Button variant="hero" className="w-full">
                <Navigation className="w-4 h-4 mr-2" />
                Plan Route
              </Button>
              <Button variant="outline" className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                Add Location
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Map;