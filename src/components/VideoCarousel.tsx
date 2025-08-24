import { Button } from "@/components/ui/button";
import { Play, Clock, Eye, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const VideoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const videoCategories = [
    {
      title: "Featured Van Builds",
      videos: [
        {
          id: 1,
          title: "Mercedes Sprinter Ultimate Build",
          duration: "12:45",
          views: "2.3M",
          rating: 4.9,
          thumbnail: "https://images.unsplash.com/photo-1544978503-7ad5ac882d5d?w=400&h=225&fit=crop",
          isPremium: true
        },
        {
          id: 2,
          title: "Off-Grid Solar Setup Guide",
          duration: "18:32",
          views: "1.8M",
          rating: 4.8,
          thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
          isPremium: false
        },
        {
          id: 3,
          title: "Hidden Desert Camping Spots",
          duration: "15:20",
          views: "890K",
          rating: 4.7,
          thumbnail: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=225&fit=crop",
          isPremium: true
        }
      ]
    },
    {
      title: "Latest Adventures",
      videos: [
        {
          id: 4,
          title: "Epic Alaska Road Trip",
          duration: "22:15",
          views: "1.2M",
          rating: 4.9,
          thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=225&fit=crop",
          isPremium: false
        },
        {
          id: 5,
          title: "Van Life in National Parks",
          duration: "16:45",
          views: "967K",
          rating: 4.8,
          thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=225&fit=crop",
          isPremium: true
        },
        {
          id: 6,
          title: "Coastal Highway Adventure",
          duration: "19:30",
          views: "743K",
          rating: 4.6,
          thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
          isPremium: false
        }
      ]
    }
  ];

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
          <Button variant="outline">View All Videos</Button>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoCategories[currentSlide].videos.map((video) => (
                <div
                  key={video.id}
                  className="group bg-gradient-card rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  {/* Thumbnail */}
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