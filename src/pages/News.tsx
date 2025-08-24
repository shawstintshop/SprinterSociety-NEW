import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ExternalLink, TrendingUp, Bookmark } from "lucide-react";
import Header from "@/components/Header";

const News = () => {
  const topHeadlines = [
    {
      id: 1,
      title: "New EV Van Models Coming in 2024: Ford E-Transit and Mercedes eSprinter Updates",
      excerpt: "Major manufacturers announce new electric van models with extended range and improved charging capabilities for van life enthusiasts.",
      source: "Van Life Magazine",
      publishedAt: "2 hours ago",
      category: "Industry News",
      imageUrl: "https://images.unsplash.com/photo-1544978503-7ad5ac882d5d?w=400&h=200&fit=crop",
      trending: true
    },
    {
      id: 2,
      title: "National Parks Implement New Overnight Parking Regulations",
      excerpt: "Updated guidelines for van life and RV camping in national parks take effect next month, affecting popular destinations.",
      source: "Outdoor Adventure Daily",
      publishedAt: "4 hours ago",
      category: "Regulations",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
      trending: true
    },
    {
      id: 3,
      title: "Solar Technology Breakthrough: New Flexible Panels 40% More Efficient",
      excerpt: "Revolutionary solar panel technology promises to transform off-grid power solutions for van life and overlanding.",
      source: "Solar Tech Today",
      publishedAt: "6 hours ago",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=200&fit=crop",
      trending: true
    }
  ];

  const recentNews = [
    {
      id: 4,
      title: "Top 10 Van Life Destinations Opening for Summer 2024",
      excerpt: "Discover the best new camping spots and van-friendly locations across North America.",
      source: "Adventure Seekers",
      publishedAt: "1 day ago",
      category: "Travel",
      imageUrl: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      title: "DIY Van Build Costs: Complete Budget Breakdown for 2024",
      excerpt: "Latest pricing analysis shows average van conversion costs and money-saving tips.",
      source: "Van Build Weekly",
      publishedAt: "2 days ago",
      category: "Finance",
      imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Lithium Battery Safety: New Guidelines from RV Industry Association",
      excerpt: "Important safety protocols for lithium battery installations in recreational vehicles.",
      source: "RV Safety News",
      publishedAt: "3 days ago",
      category: "Safety",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop"
    },
    {
      id: 7,
      title: "Van Life Insurance Changes: What You Need to Know",
      excerpt: "New insurance options and coverage considerations for full-time van life travelers.",
      source: "Insurance Today",
      publishedAt: "4 days ago",
      category: "Insurance",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop"
    },
    {
      id: 8,
      title: "Overland Expo 2024: Biggest Van Life Event Announces Speakers",
      excerpt: "This year's expo features top builders, travel experts, and new product launches.",
      source: "Event News",
      publishedAt: "5 days ago",
      category: "Events",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
    }
  ];

  const categories = [
    "All", "Industry News", "Technology", "Travel", "Regulations", 
    "Finance", "Safety", "Events", "Reviews", "Community"
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
                  Van Life News
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Stay updated with the latest van life trends, regulations, and community news
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant={index === 0 ? "hero" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Top Headlines */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-bold">Today's Top Headlines</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {topHeadlines.map((article, index) => (
                <Card key={article.id} className={`group hover:shadow-glow transition-all duration-300 cursor-pointer ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                  <div className="relative aspect-video lg:aspect-auto">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className={`w-full object-cover ${index === 0 ? 'h-64 lg:h-80' : 'h-48'}`}
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      {article.trending && (
                        <Badge className="bg-gradient-sunset text-white">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <CardTitle className={`mb-3 line-clamp-2 group-hover:text-primary transition-colors ${index === 0 ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
                      {article.title}
                    </CardTitle>
                    <CardDescription className="mb-4 line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>{article.source}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.publishedAt}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent News */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Recent News</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentNews.map((article) => (
                <Card key={article.id} className="group hover:shadow-glow transition-all duration-300 cursor-pointer">
                  <div className="relative aspect-video">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3" variant="secondary">
                      {article.category}
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="mb-3 line-clamp-2">
                      {article.excerpt}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{article.source}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.publishedAt}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default News;