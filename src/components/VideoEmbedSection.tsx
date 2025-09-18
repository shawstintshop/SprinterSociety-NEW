import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, X } from "lucide-react";

interface EmbedVideo {
  id: string;
  title: string;
  category: string;
  embedId: string;
}

const VideoEmbedSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Real YouTube video IDs from your provided examples
  const featuredEmbeds: EmbedVideo[] = [
    {
      id: "1",
      title: "Budget Vanlife Tour After 5+ Years - Ford Econoline Van Tour",
      category: "Van Tours",
      embedId: "xnSVDwal_jo"
    },
    {
      id: "2", 
      title: "Gamer Changes his life by Living in a DIY Van | VanLife Tour",
      category: "Van Tours",
      embedId: "37rv2-nP5BQ"
    },
    {
      id: "3",
      title: "Camper Van Tips No One Ever Talks About",
      category: "Van Tips",
      embedId: "jIwfxcZDVLQ"
    },
    {
      id: "4",
      title: "INSANE Custom Sprinter Van Build With BIG Rear Bath",
      category: "Sprinter Builds",
      embedId: "rmwDjISev7E"
    },
    {
      id: "5",
      title: "The ULTIMATE 4x4 Sprinter Van Build: A $230,000 Rolling Fortress!",
      category: "Sprinter Builds", 
      embedId: "gme5z-6yAWE"
    },
    {
      id: "6",
      title: "Solo Van Camping in Guthrie County!",
      category: "Van Camping",
      embedId: "4oEbABQbQfc"
    }
  ];

  const VideoEmbed = ({ embedId, title }: { embedId: string; title: string }) => (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${embedId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0"
      />
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Featured Van Life
            </span>
            <span className="text-foreground"> Experiences</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch real van life stories, builds, and adventures from the community
          </p>
        </div>

        {/* Featured Embed - Large */}
        {selectedVideo && (
          <div className="mb-12">
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur"
                onClick={() => setSelectedVideo(null)}
              >
                <X className="w-4 h-4" />
              </Button>
              <VideoEmbed 
                embedId={selectedVideo} 
                title={featuredEmbeds.find(v => v.embedId === selectedVideo)?.title || "Van Life Video"}
              />
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEmbeds.map((video) => (
            <Card 
              key={video.id} 
              className="group bg-gradient-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              onClick={() => setSelectedVideo(video.embedId)}
            >
              <div className="relative aspect-video">
                <img
                  src={`https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="hero" size="icon" className="shadow-lg">
                    <Play className="w-6 h-6" />
                  </Button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-gradient-sunset px-2 py-1 rounded text-white text-xs font-semibold">
                  {video.category}
                </div>
              </div>

              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to see more van life content?
          </p>
          <Button variant="outline" size="lg">
            Browse All Videos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoEmbedSection;