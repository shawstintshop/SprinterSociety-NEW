import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Users, 
  Pin, 
  TrendingUp, 
  Clock,
  ThumbsUp,
  Eye,
  Crown,
  Search,
  Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Header from "@/components/Header";

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const forumCategories = [
    { id: "all", name: "All Topics", count: "12.5K", icon: MessageSquare },
    { id: "builds", name: "Van Builds", count: "3.2K", icon: MessageSquare },
    { id: "electrical", name: "Electrical & Solar", count: "2.1K", icon: MessageSquare },
    { id: "mechanical", name: "Mechanical", count: "1.8K", icon: MessageSquare },
    { id: "travel", name: "Travel & Routes", count: "2.4K", icon: MessageSquare },
    { id: "tips", name: "Tips & Tricks", count: "1.9K", icon: MessageSquare },
    { id: "marketplace", name: "Buy/Sell", count: "890", icon: MessageSquare },
    { id: "meetups", name: "Meetups", count: "654", icon: Users },
    { id: "newbie", name: "Newbie Corner", count: "1.1K", icon: MessageSquare }
  ];

  const pinnedTopics = [
    {
      id: 1,
      title: "Community Guidelines - Please Read Before Posting",
      author: "Admin",
      authorAvatar: "A",
      category: "Announcements",
      replies: 45,
      views: "12.3K",
      lastActivity: "2 hours ago",
      isPinned: true,
      isPremium: false
    },
    {
      id: 2,
      title: "New Member Introductions - Start Here!",
      author: "ModeratorSarah",
      authorAvatar: "S",
      category: "Community",
      replies: 1234,
      views: "45.2K", 
      lastActivity: "15 min ago",
      isPinned: true,
      isPremium: false
    }
  ];

  const trendingTopics = [
    {
      id: 3,
      title: "Complete Sprinter 4x4 Build Thread - $180K Build Breakdown",
      author: "VanLifeMike",
      authorAvatar: "M",
      category: "Van Builds",
      replies: 287,
      views: "23.1K",
      likes: 156,
      lastActivity: "23 min ago",
      isPinned: false,
      isPremium: true,
      trending: true
    },
    {
      id: 4,
      title: "Solar Setup Help - 800W System Not Charging Properly",
      author: "SolarNewbie", 
      authorAvatar: "N",
      category: "Electrical & Solar",
      replies: 34,
      views: "2.1K",
      likes: 23,
      lastActivity: "45 min ago",
      isPinned: false,
      isPremium: false,
      trending: true
    },
    {
      id: 5,
      title: "Best Boondocking Spots in Utah - Hidden Gems Thread",
      author: "DesertWanderer",
      authorAvatar: "D",
      category: "Travel & Routes", 
      replies: 89,
      views: "8.7K",
      likes: 67,
      lastActivity: "1 hour ago",
      isPinned: false,
      isPremium: true,
      trending: true
    },
    {
      id: 6,
      title: "Diesel Heater Installation - Step by Step Guide",
      author: "HeatingPro",
      authorAvatar: "H",
      category: "Tips & Tricks",
      replies: 156,
      views: "15.4K",
      likes: 234,
      lastActivity: "2 hours ago",
      isPinned: false,
      isPremium: false,
      trending: false
    },
    {
      id: 7,
      title: "Van Insurance Comparison - Full Timer Options 2024",
      author: "InsuranceGuru",
      authorAvatar: "I",
      category: "Tips & Tricks",
      replies: 78,
      views: "5.2K",
      likes: 45,
      lastActivity: "3 hours ago",
      isPinned: false,
      isPremium: false,
      trending: false
    },
    {
      id: 8,
      title: "West Coast Van Life Meetup - March 2024 Planning",
      author: "EventOrganizer",
      authorAvatar: "E",
      category: "Meetups",
      replies: 67,
      views: "3.8K",
      likes: 89,
      lastActivity: "4 hours ago",
      isPinned: false,
      isPremium: false,
      trending: false
    }
  ];

  const allTopics = [...pinnedTopics, ...trendingTopics];

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
                  Community Forum
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect, learn, and share with the van life community
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">12.5K</div>
                <div className="text-sm text-muted-foreground">Topics</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">45.2K</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">8.9K</div>
                <div className="text-sm text-muted-foreground">Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">234</div>
                <div className="text-sm text-muted-foreground">Online</div>
              </div>
            </div>

            {/* Search and New Topic */}
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search topics, posts, or users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="hero" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Topic
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {forumCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "hero" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span className="flex-1 text-left">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Topics List */}
          <div className="lg:col-span-3 space-y-4">
            {/* Pinned Topics */}
            {pinnedTopics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{topic.authorAvatar}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <Pin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary cursor-pointer">
                            {topic.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">by {topic.author}</span>
                            <Badge variant="secondary" className="text-xs">
                              {topic.category}
                            </Badge>
                            <Badge className="bg-gradient-sunset text-white text-xs">
                              Pinned
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {topic.replies} replies
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {topic.views} views
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {topic.lastActivity}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Trending Section Header */}
            <div className="flex items-center gap-2 pt-4">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-semibold">Trending Topics</h2>
            </div>

            {/* Regular Topics */}
            {trendingTopics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{topic.authorAvatar}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary cursor-pointer">
                            {topic.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-sm text-muted-foreground">by {topic.author}</span>
                            <Badge variant="secondary" className="text-xs">
                              {topic.category}
                            </Badge>
                            {topic.isPremium && (
                              <Badge className="bg-gradient-sunset text-white text-xs flex items-center gap-1">
                                <Crown className="w-3 h-3" />
                                Premium
                              </Badge>
                            )}
                            {topic.trending && (
                              <Badge className="bg-gradient-forest text-white text-xs flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                Trending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {topic.replies} replies
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {topic.views} views
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {topic.likes} likes
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {topic.lastActivity}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Load More */}
            <div className="text-center pt-8">
              <Button variant="outline" size="lg">
                Load More Topics
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forum;