import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold">कृ</span>
            </div>
            <span className="text-white font-semibold hidden sm:inline">
              Farmer Portal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Button
              onClick={() => navigate("/auth")}
              className="bg-white text-primary hover:bg-white/90"
            >
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            © 2024 Farmer Empowerment Portal. In harmony with nature and tradition.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
