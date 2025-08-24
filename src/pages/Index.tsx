import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoCarousel from "@/components/VideoCarousel";
import MapPreview from "@/components/MapPreview";
import PremiumSection from "@/components/PremiumSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <VideoCarousel />
        <MapPreview />
        <PremiumSection />
      </main>
    </div>
  );
};

export default Index;
