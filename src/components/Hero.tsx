import { Button } from "@/components/ui/button";
import { Sprout, Bot, Cloud, Users } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-natural opacity-90" />
      
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Shloka */}
        <div className="mb-8 animate-fade-in">
          <p className="text-white/90 text-2xl sm:text-3xl md:text-4xl font-serif italic mb-2">
            "शिवकान्त शम्भो..."
          </p>
          <p className="text-white/80 text-sm sm:text-base">
            In harmony with nature and the wisdom of our ancestors
          </p>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6">
          किसान सशक्तिकरण
          <br />
          <span className="text-white/95">Farmer Empowerment</span>
        </h1>

        <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
          Your journey towards prosperous farming begins here. Ask, learn, and grow with your community.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
            शुरू करें / Get Started
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20 text-lg px-8 py-6">
            और जानें / Learn More
          </Button>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Bot, label: "AI सहायक / AI Assistant" },
            { icon: Cloud, label: "मौसम चेतावनी / Weather Alerts" },
            { icon: Sprout, label: "फसल सलाह / Crop Advice" },
            { icon: Users, label: "समुदाय / Community" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <feature.icon className="h-12 w-12 text-white mx-auto mb-3" />
              <p className="text-white text-sm font-medium">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
