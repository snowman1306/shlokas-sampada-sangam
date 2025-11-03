import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "@/context/LanguageProvider";
import { Bot, Cloud, FileText, Users, Send, AlertCircle, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-natural flex items-center justify-center">
                <span className="text-white font-bold text-xl">{t("nav.brandShort")}</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">{t("dashboard.title")}</h1>
              </div>
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 p-6 bg-gradient-cultural rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-2">{t("dashboard.welcome")}</h2>
          <p className="text-white/90 text-lg">{t("hero.titleLine2")}</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* AI Assistant */}
          <DashboardCard title={t("hero.features.ai")} titleHindi={t("hero.features.ai")} icon={Bot} iconColor="text-primary">
            <div className="space-y-4">
              <p className="text-muted-foreground">{t("dashboard.assistantPlaceholder")}</p>
              <div className="flex gap-2">
                <Input placeholder={t("dashboard.assistantPlaceholder")} className="text-base" />
                <Button className="bg-primary">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm">🌾 {t("hero.features.crop")}</Button>
                <Button variant="outline" size="sm">💧 {t("dashboard.buttons.irrigation" )}</Button>
                <Button variant="outline" size="sm">🐛 {t("dashboard.buttons.pestControl")}</Button>
              </div>
            </div>
          </DashboardCard>

          {/* Weather Alerts */}
          <DashboardCard title={t("hero.features.weather")} titleHindi={t("hero.features.weather")} icon={Cloud} iconColor="text-blue-600">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <AlertCircle className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-semibold">{t("dashboard.climate.heavyRain")}</p>
                  <p className="text-sm text-muted-foreground">Next 3 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-semibold">{t("dashboard.climate.goodConditions")}</p>
                  <p className="text-sm text-muted-foreground">Temperature: 25-30°C</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">{t("dashboard.buttons.viewFullReport")}</Button>
            </div>
          </DashboardCard>

          {/* Government Policies */}
          <DashboardCard title={t("dashboard.government.title")} titleHindi={t("dashboard.government.title")} icon={FileText} iconColor="text-cultural">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                <p className="font-semibold">किसान सम्मान निधि</p>
                <p className="text-sm text-muted-foreground">PM-KISAN Scheme</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                <p className="font-semibold">फसल बीमा योजना</p>
                <p className="text-sm text-muted-foreground">Crop Insurance</p>
              </div>
              <Button variant="outline" className="w-full">{t("dashboard.buttons.allSchemes")}</Button>
            </div>
          </DashboardCard>

          {/* Community */}
          <DashboardCard title={t("hero.features.community")} titleHindi={t("hero.features.community")} icon={Users} iconColor="text-green-600">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">गेहूं की खेती में सुधार / Wheat Farming Tips</p>
                <p className="text-xs text-muted-foreground">5 farmers discussing</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">
                  मिट्टी परीक्षण / Soil Testing Guide
                </p>
                <p className="text-xs text-muted-foreground">12 farmers discussing</p>
              </div>
              <Button variant="outline" className="w-full">{t("dashboard.buttons.joinCommunity")}</Button>
            </div>
          </DashboardCard>
        </div>

        {/* Success Stats */}
        <div className="bg-card p-6 rounded-2xl border">
          <h3 className="text-xl font-bold mb-4">{t("dashboard.title")} / {t("dashboard.welcome")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">50,000+</p>
              <p className="text-sm text-muted-foreground">{t("dashboard.stats.farmersHelped")}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-cultural">1,200+</p>
              <p className="text-sm text-muted-foreground">{t("dashboard.stats.villagesReached")}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">₹2.5Cr+</p>
              <p className="text-sm text-muted-foreground">{t("dashboard.stats.benefits")}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">95%</p>
              <p className="text-sm text-muted-foreground">{t("dashboard.stats.satisfaction")}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
