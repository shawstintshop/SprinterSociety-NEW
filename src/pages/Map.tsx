import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  MapPin, 
  Navigation, 
  Users, 
  Crown, 
  Tent, 
  Coffee,
  Star,
  MapIcon,
  List,
  Plus,
  RefreshCw
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import { locationTypeConfig, LocationType } from "@/lib/googleMaps";
import Header from "@/components/Header";

interface Location {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  type: LocationType;
  amenities?: string[];
  rating?: number;
  reviews_count?: number;
  verified?: boolean;
}

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const { toast } = useToast();

  const mapFilters = [
    { id: "all", name: "All Locations", icon: MapPin },
    { id: "campsite", name: "Campsites", icon: Tent },
    { id: "meetup", name: "Meetups", icon: Users },
    { id: "vendor", name: "Businesses", icon: Coffee },
    { id: "poi", name: "Points of Interest", icon: Star }
  ];

  // Fetch locations from database
  const fetchLocations = async () => {
    try {
      let query = supabase
        .from('locations')
        .select('*')
        .order('rating', { ascending: false });

      if (selectedFilter !== "all") {
        query = query.eq('type', selectedFilter);
      }

      if (searchQuery.trim()) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setLocations((data || []).map(location => ({
        ...location,
        type: location.type as LocationType
      })));
    } catch (error) {
      console.error('Error fetching locations:', error);
      toast({
        title: "Error",
        description: "Failed to load locations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [selectedFilter, searchQuery]);

  // Google Maps integration
  const { mapRef, isLoaded, error } = useGoogleMaps({
    center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
    zoom: 5,
    locations: locations,
    onLocationClick: (location) => {
      setSelectedLocation(location);
    }
  });

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Map Loading Error</h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
                  Van Life Map
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover real camping spots, connect with fellow van lifers, and find van-friendly businesses
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
                <div className="flex gap-2">
                  <Button 
                    variant={viewMode === 'map' ? 'hero' : 'outline'} 
                    size="sm"
                    onClick={() => setViewMode('map')}
                    className="flex items-center gap-2"
                  >
                    <MapIcon className="w-4 h-4" />
                    Map
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'hero' : 'outline'} 
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="flex items-center gap-2"
                  >
                    <List className="w-4 h-4" />
                    List
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Location
                  </Button>
                </div>
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

        {viewMode === 'map' ? (
          <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
            {/* Map Container */}
            <div className="flex-1 relative">
              {loading ? (
                <div className="w-full h-full min-h-[500px] bg-muted animate-pulse flex items-center justify-center">
                  <p className="text-muted-foreground">Loading map...</p>
                </div>
              ) : !isLoaded ? (
                <div className="w-full h-full min-h-[500px] bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Initializing Google Maps...</p>
                </div>
              ) : (
                <div 
                  ref={mapRef} 
                  className="w-full h-full min-h-[500px]"
                  style={{ minHeight: 'calc(100vh - 200px)' }}
                />
              )}
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button variant="outline" size="icon" className="bg-background/90">
                  <Navigation className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-background/90">
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Sidebar with Location List */}
            <div className="w-full lg:w-96 bg-muted/20 p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Locations</h3>
                <Badge variant="secondary">{locations.length} found</Badge>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-4">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : locations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No locations found.</p>
                  <Button variant="outline" onClick={fetchLocations}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {locations.map((location) => {
                    const config = locationTypeConfig[location.type] || locationTypeConfig.poi;
                    return (
                      <Card 
                        key={location.id} 
                        className={`hover:shadow-glow transition-all duration-300 cursor-pointer ${
                          selectedLocation?.id === location.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => handleLocationClick(location)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-base flex items-center gap-2">
                                {location.name}
                                {location.verified && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Star className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground">{config.label}</p>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-0">
                          {location.description && (
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {location.description}
                            </p>
                          )}

                          {location.rating && location.rating > 0 && (
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-secondary fill-current" />
                                <span className="text-sm font-medium">{location.rating}</span>
                                {location.reviews_count && (
                                  <span className="text-sm text-muted-foreground">({location.reviews_count})</span>
                                )}
                              </div>
                            </div>
                          )}

                          {location.amenities && location.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {location.amenities.slice(0, 4).map((amenity) => (
                                <Badge key={amenity} variant="secondary" className="text-xs">
                                  {amenity.replace('_', ' ')}
                                </Badge>
                              ))}
                              {location.amenities.length > 4 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{location.amenities.length - 4} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          // List View
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location) => {
                const config = locationTypeConfig[location.type] || locationTypeConfig.poi;
                return (
                  <Card key={location.id} className="hover:shadow-glow transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: config.color }}
                        />
                        {location.name}
                      </CardTitle>
                      {location.description && (
                        <CardDescription>{location.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{config.label}</Badge>
                        {location.rating && location.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-secondary fill-current" />
                            <span className="text-sm">{location.rating}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Map;