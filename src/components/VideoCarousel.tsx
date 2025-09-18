import { Button } from "@/components/ui/button";
import { Play, Clock, Eye, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const VideoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoCategories, setVideoCategories] = useState([
    { title: "Featured Van Builds", videos: [] },
    { title: "Latest Adventures", videos: [] }
  ]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch real YouTube videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        console.log('Fetching real YouTube van life videos from database...');
        
        // Add cache busting
        const timestamp = Date.now();
        
        // Fetch directly from database (we have real videos now)
        const { data: buildsData, error: buildsError } = await supabase
          .from('youtube_videos')
          .select('*')
          .eq('category', 'builds')
          .order('view_count', { ascending: false })
          .limit(3);

        const { data: adventureData, error: adventureError } = await supabase
          .from('youtube_videos')
          .select('*')
          .eq('category', 'reviews')
          .order('view_count', { ascending: false })
          .limit(3);

        console.log('Fresh builds data:', buildsData);
        console.log('Fresh adventure data:', adventureData);
        
        // Debug: Check if we got any data
        if (!buildsData || buildsData.length === 0) {
          console.warn('No builds data received!');
        }
        if (!adventureData || adventureData.length === 0) {
          console.warn('No adventure data received!');
        }

        if (buildsError) console.error('Builds fetch error:', buildsError);
        if (adventureError) console.error('Adventure fetch error:', adventureError);

        const formatViewCount = (count: number) => {
          if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
          if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
          return count?.toString() || '0';
        };

        const formatVideos = (videos: any[]) => 
          videos?.map(video => ({
            id: video.id,
            title: video.title,
            duration: video.duration || "15:30",
            views: formatViewCount(video.view_count || 0),
            rating: 4.8,
            thumbnail: video.thumbnail_url,
            youtube_id: video.youtube_id,
            isPremium: false
          })) || [];

        const buildVideos = formatVideos(buildsData || []);
        const adventureVideos = formatVideos(adventureData || []);
        
        console.log('Formatted build videos:', buildVideos);
        console.log('Formatted adventure videos:', adventureVideos);

        setVideoCategories([
          { title: "Featured Van Builds", videos: buildVideos },
          { title: "Van Life Reviews", videos: adventureVideos }
        ]);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [refreshKey]);

  const openVideo = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % videoCategories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + videoCategories.length) % videoCategories.length);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Netflix-Style
              </span>
              <span className="text-foreground"> Video Library</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Stream thousands of van builds, adventures, and how-to guides
            </p>
          </div>
          <Button variant="outline" onClick={() => setRefreshKey(k => k + 1)}>
            Refresh Videos
          </Button>
        </div>

        {/* Category Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Current Category */}
          <div className="px-12">
            <h3 className="text-xl font-semibold mb-6 text-secondary">
              {videoCategories[currentSlide].title}
            </h3>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-muted rounded-xl aspect-video"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoCategories[currentSlide].videos.map((video) => (
                  <div
                    key={video.id}
                    className="group bg-gradient-card rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => openVideo(video.youtube_id)}
                  >
                  {/* Thumbnail */}
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onLoad={() => console.log('Image loaded:', video.title)}
                      onError={(e) => {
                        console.error('Image failed to load:', video.title, video.thumbnail);
                        e.currentTarget.src = 'https://via.placeholder.com/640x360/1f2937/ffffff?text=Van+Life+Video';
                      }}
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
                        <Star className="w-3 h-3 mr-1" />
                        Premium
                      </div>
                    )}

                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-white text-xs flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {video.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h4>
                    
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
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>

          {/* Category Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {videoCategories.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gradient-sunset shadow-glow"
                    : "bg-muted hover:bg-muted-foreground"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;