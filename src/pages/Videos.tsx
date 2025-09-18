import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, Play, Clock, Eye, Star, Crown, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useYouTubeSync } from "@/hooks/useYouTubeSync";
import Header from "@/components/Header";

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();
  
  // Auto-sync YouTube videos daily
  useYouTubeSync();

  const videoCategories = [
    { id: "all", name: "All Videos", count: "48" },
    { id: "builds", name: "Van Builds & Tours", count: "9" },
    { id: "electrical", name: "Electrical & Solar", count: "6" },
    { id: "plumbing", name: "Plumbing & Heating", count: "5" },
    { id: "mods", name: "Mods & Upgrades", count: "4" },
    { id: "maintenance", name: "Maintenance & Repairs", count: "4" },
    { id: "camping", name: "Camping Spots & Travel", count: "6" },
    { id: "tips", name: "Tips, Tricks & Hacks", count: "5" },
    { id: "offroad", name: "Offroad Adventures", count: "3" },
    { id: "reviews", name: "Product Reviews & Installs", count: "7" },
    { id: "van-life", name: "General Van Life", count: "5" }
  ];

  // Fetch videos from database
  const fetchVideos = async () => {
    try {
      let query = supabase
        .from('youtube_videos')
        .select('*')
        .order('published_at', { ascending: false });

      if (selectedCategory !== "all") {
        query = query.eq('category', selectedCategory);
      }

      if (searchQuery.trim()) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,channel_title.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query.limit(50);

      if (error) {
        console.error('Error fetching videos:', error);
        toast({
          title: "Error",
          description: "Failed to load videos. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setVideos(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load videos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Refresh videos from YouTube API
  const refreshFromYouTube = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-youtube-videos', {
        body: { maxResults: 30, forceRefresh: true }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: `Fetched ${data.count} new videos from YouTube!`,
      });

      // Refresh the local data
      await fetchVideos();
    } catch (error) {
      console.error('Error refreshing videos:', error);
      toast({
        title: "Error",
        description: "Failed to refresh videos from YouTube. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  // Format view count for display
  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Open YouTube video in new tab
  const openVideo = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  useEffect(() => {
    fetchVideos();
  }, [selectedCategory, searchQuery]);

  // Initial data load - try to fetch from YouTube if no videos exist
  useEffect(() => {
    const initializeData = async () => {
      const { data } = await supabase
        .from('youtube_videos')
        .select('id')
        .limit(1);

      if (!data || data.length === 0) {
        console.log('No videos found, fetching from YouTube...');
        await refreshFromYouTube();
      }
    };

    initializeData();
  }, []);

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
            {/* Header with refresh button */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {selectedCategory === "all" ? "Latest Videos" : videoCategories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <Button 
                variant="outline" 
                onClick={refreshFromYouTube}
                disabled={refreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh from YouTube'}
              </Button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-muted"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No videos found.</p>
                <Button onClick={refreshFromYouTube} disabled={refreshing}>
                  {refreshing ? 'Loading...' : 'Load Videos from YouTube'}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card 
                    key={video.id} 
                    className="group bg-gradient-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
                    onClick={() => openVideo(video.youtube_id)}
                  >
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button variant="hero" size="icon" className="shadow-lg">
                            <Play className="w-6 h-6" />
                          </Button>
                        </div>
                      </div>

                      {/* Duration */}
                      {video.duration && (
                        <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-white text-xs flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {video.duration}
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 bg-gradient-sunset px-2 py-1 rounded text-white text-xs font-semibold">
                        {videoCategories.find(c => c.id === video.category)?.name || 'Van Life'}
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </CardTitle>
                      <CardDescription className="mb-3 line-clamp-1">
                        {video.channel_title}
                      </CardDescription>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {formatViewCount(video.view_count || 0)}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-secondary" />
                            {new Date(video.published_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            {videos.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" onClick={fetchVideos}>
                  Load More Videos
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Videos;