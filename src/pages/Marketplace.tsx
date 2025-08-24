import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  MapPin, 
  Heart,
  Share,
  MessageCircle,
  Star,
  ShoppingBag,
  Truck,
  Wrench,
  Zap
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Items", count: "2.1K", icon: ShoppingBag },
    { id: "vans", name: "Complete Vans", count: "234", icon: Truck },
    { id: "electrical", name: "Electrical & Solar", count: "456", icon: Zap },
    { id: "parts", name: "Van Parts", count: "678", icon: Wrench },
    { id: "interior", name: "Interior & Furniture", count: "345", icon: ShoppingBag },
    { id: "exterior", name: "Exterior & Accessories", count: "289", icon: ShoppingBag },
    { id: "tools", name: "Tools & Equipment", count: "123", icon: Wrench }
  ];

  const featuredListings = [
    {
      id: 1,
      title: "2019 Mercedes Sprinter 4x4 - Fully Built",
      price: "$145,000",
      location: "Denver, CO",
      distance: "120 miles",
      images: ["https://images.unsplash.com/photo-1544978503-7ad5ac882d5d?w=400&h=300&fit=crop"],
      seller: "VanBuilderPro",
      rating: 4.9,
      reviews: 67,
      category: "vans",
      featured: true,
      description: "Professional build with solar, lithium batteries, full kitchen, and bathroom. 25K miles.",
      specs: ["4x4", "Solar", "Lithium", "Full Kitchen", "Bathroom", "25K miles"],
      postedAt: "2 days ago"
    },
    {
      id: 2,
      title: "Complete 800W Solar Kit - Renogy",
      price: "$1,200",
      originalPrice: "$1,800",
      location: "Portland, OR", 
      distance: "45 miles",
      images: ["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop"],
      seller: "SolarExpert", 
      rating: 4.8,
      reviews: 34,
      category: "electrical",
      featured: true,
      description: "Used for 1 year, excellent condition. Includes panels, charge controller, inverter, and wiring.",
      specs: ["800W Panels", "MPPT Controller", "2000W Inverter", "Complete Wiring"],
      postedAt: "5 hours ago"
    },
    {
      id: 3,
      title: "Custom Van Interior - Modular Kitchen",
      price: "$3,500",
      location: "Austin, TX",
      distance: "230 miles", 
      images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"],
      seller: "WoodworkVan",
      rating: 4.7,
      reviews: 23,
      category: "interior",
      featured: false,
      description: "Beautiful walnut kitchen unit with sink, stove, and storage. Custom made for Sprinter.",
      specs: ["Walnut Wood", "Sink Included", "2-Burner Stove", "Sprinter Fit"],
      postedAt: "1 day ago"
    },
    {
      id: 4,
      title: "Diesel Heater - Espar Airtronic D2",
      price: "$450",
      location: "Seattle, WA",
      distance: "78 miles",
      images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"],
      seller: "HeatingPro",
      rating: 4.9,
      reviews: 89,
      category: "parts",
      featured: false,
      description: "Lightly used Espar heater with installation kit. Perfect for winter van life.",
      specs: ["Low Hours", "Installation Kit", "Remote Control", "Quiet Operation"],
      postedAt: "3 days ago"
    },
    {
      id: 5,
      title: "ARB Roof Rack System - Transit",
      price: "$890",
      location: "Phoenix, AZ",
      distance: "156 miles",
      images: ["https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop"],
      seller: "OverlandGear",
      rating: 4.6,
      reviews: 45,
      category: "exterior", 
      featured: false,
      description: "Heavy duty roof rack system for Ford Transit. Includes crossbars and mounting hardware.",
      specs: ["Heavy Duty", "Transit Specific", "Load Rated", "Easy Install"],
      postedAt: "1 week ago"
    },
    {
      id: 6,
      title: "Portable Tool Kit - Van Build Essential",
      price: "$320",
      location: "Las Vegas, NV", 
      distance: "89 miles",
      images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"],
      seller: "ToolMaster",
      rating: 4.5,
      reviews: 12,
      category: "tools",
      featured: false,
      description: "Complete tool set for van builds and maintenance. Includes drill, impact driver, and accessories.",
      specs: ["Cordless Tools", "2 Batteries", "Carrying Case", "Van Build Ready"],
      postedAt: "4 days ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Van Life Marketplace
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Buy and sell vans, parts, and gear with the van life community
              </p>
            </div>

            {/* Search & Controls */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search vans, parts, or gear..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
                <Button variant="hero" className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Sell Item
                </Button>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "hero" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {category.name}
                      <span className="text-xs opacity-75">({category.count})</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Listings Grid */}
        <section className="py-12"> 
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <Card key={listing.id} className="group hover:shadow-glow transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Featured Badge */}
                    {listing.featured && (
                      <Badge className="absolute top-3 left-3 bg-gradient-sunset text-white">
                        Featured
                      </Badge>
                    )}

                    {/* Price */}
                    <div className="absolute bottom-3 left-3 bg-background/90 px-3 py-1 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">{listing.price}</span>
                        {listing.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {listing.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {listing.title}
                    </CardTitle>
                    
                    <CardDescription className="mb-3 line-clamp-2">
                      {listing.description}
                    </CardDescription>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {listing.specs.slice(0, 3).map((spec) => (
                        <Badge key={spec} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {listing.specs.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{listing.specs.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Seller Info */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{listing.seller}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-secondary fill-current" />
                          <span className="text-sm">{listing.rating}</span>
                          <span className="text-sm text-muted-foreground">({listing.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Location & Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{listing.location}</span>
                        <span>• {listing.distance}</span>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        Contact
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground mt-2">
                      Posted {listing.postedAt}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Listings
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Marketplace;