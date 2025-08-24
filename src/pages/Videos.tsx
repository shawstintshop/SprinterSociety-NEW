import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, Play, Clock, Eye, Star, Crown } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const videoCategories = [
    { id: "all", name: "All Videos", count: "10K+" },
    { id: "builds", name: "Van Builds & Tours", count: "2.1K" },
    { id: "electrical", name: "Electrical & Solar", count: "1.8K" },
    { id: "plumbing", name: "Plumbing & Heating", count: "1.2K" },
    { id: "mods", name: "Mods & Upgrades", count: "1.5K" },
    { id: "maintenance", name: "Maintenance & Repairs", count: "980" },
    { id: "camping", name: "Camping Spots & Travel", count: "2.3K" },
    { id: "tips", name: "Tips, Tricks & Hacks", count: "1.1K" },
    { id: "offroad", name: "Offroad Adventures", count: "650" },
    { id: "reviews", name: "Product Reviews & Installs", count: "890" },
    { id: "events", name: "Events & Expos", count: "320" }
  ];

  const featuredVideos = [
    {
      id: 1,
      title: "Complete Mercedes Sprinter 4x4 Build - $180K Ultimate Van",
      thumbnail: "https://images.unsplash.com/photo-1544978503-7ad5ac882d5d?w=400&h=225&fit=crop",
      duration: "45:32",
      views: "2.3M",
      rating: 4.9,
      channel: "Van Life Builds",
      isPremium: true,
      category: "builds"
    },
    {
      id: 2, 
      title: "Solar System Installation - 1200W Off-Grid Setup",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
      duration: "28:15",
      views: "1.8M", 
      rating: 4.8,
      channel: "Solar Van Life",
      isPremium: false,
      category: "electrical"
    },
    {
      id: 3,
      title: "Hidden Boondocking Spots - Pacific Northwest",
      thumbnail: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=225&fit=crop",
      duration: "22:45",
      views: "1.2M",
      rating: 4.7,
      channel: "Adventure Seekers",
      isPremium: true,
      category: "camping"
    },
    {
      id: 4,
      title: "Diesel Heater Installation & Troubleshooting Guide",
      thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=225&fit=crop",
      duration: "18:30",
      views: "890K",
      rating: 4.6,
      channel: "Van Tech",
      isPremium: false,
      category: "plumbing"
    },
    {
      id: 5,
      title: "Epic Alaska Road Trip - 30 Days Off-Grid",
      thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=225&fit=crop",
      duration: "35:20",
      views: "1.5M",
      rating: 4.9,
      channel: "Nomadic Expeditions",
      isPremium: true,
      category: "offroad"
    },
    {
      id: 6,
      title: "Top 10 Van Life Gadgets Under $50",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
      duration: "15:45",
      views: "750K",
      rating: 4.5,
      channel: "Budget Van Life",
      isPremium: false,
      category: "reviews"
    }
  ];

  const filteredVideos = selectedCategory === "all" 
    ? featuredVideos 
    : featuredVideos.filter(video => video.category === selectedCategory);

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
                  Video Library
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Stream thousands of van builds, tutorials, and adventures from our community
              </p>
            </div>

            {/* Search & Filter */}
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search videos, channels, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {videoCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "hero" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  {category.name}
                  <span className="text-xs opacity-75">({category.count})</span>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Video Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="group bg-gradient-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button variant="hero" size="icon" className="shadow-lg">
                          <Play className="w-6 h-6" />
                        </Button>
                      </div>
                    </div>

                    {/* Premium Badge */}
                    {video.isPremium && (
                      <div className="absolute top-3 right-3 bg-gradient-sunset px-2 py-1 rounded text-white text-xs font-semibold flex items-center">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </div>
                    )}

                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-white text-xs flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {video.duration}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </CardTitle>
                    <CardDescription className="mb-3">
                      {video.channel}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {video.views}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-secondary" />
                          {video.rating}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Videos
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Videos;