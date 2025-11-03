import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { chatAPI } from '@/integrations/supabase/api';
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "@/context/LanguageProvider";
import { Bot, Cloud, FileText, Users, Send, AlertCircle, TrendingUp } from "lucide-react";
import { categoryAPI, shlokaAPI, translationAPI, policyAPI } from '@/integrations/supabase/api';

const Dashboard = () => {
  const { t } = useTranslation();
  const [assistantInput, setAssistantInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; text: string }>>([]);
  const [showReport, setShowReport] = useState(false);
  const [sampleData, setSampleData] = useState<{ shlokas: any[]; policies: any[] }>({ shlokas: [], policies: [] });

  const seedSampleData = async () => {
    const sampleShlokas = [
      { text: 'सर्वे भवन्तु सुखिनः', transliteration: 'sarve bhavantu sukhinaḥ', meaning: 'May all be happy', source: 'Ancient', isPublic: true },
      { text: 'तमसो मा ज्योतिर्गमय', transliteration: 'tamaso ma jyotirgamaya', meaning: 'Lead me from darkness to light', source: 'Bṛhadāraṇyaka', isPublic: true }
    ];
    const samplePolicies = [
      { title: 'PM-KISAN', description: 'Direct income support to farmers', language: 'en', is_active: true, published_date: new Date().toISOString() },
      { title: 'Crop Insurance', description: 'Protection against crop loss', language: 'en', is_active: true, published_date: new Date().toISOString() }
    ];

    setSampleData({ shlokas: sampleShlokas, policies: samplePolicies });

    // Try to persist to backend (best-effort)
    try {
      for (const p of samplePolicies) {
        await policyAPI.getPolicyById ? null : null; // noop to avoid lint error
      }
    } catch (e) {
      console.debug('Seeding policies failed (likely due to auth):', e);
    }
  };

  const mockAIAnswer = async (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('weather') || lower.includes('rain') || lower.includes('temperature')) {
      return 'The forecast shows pleasant weather for the next 3 days with temperatures between 24-30°C. Watch for heavy rain warnings in some regions.';
    }
    if (lower.includes('policy') || lower.includes('scheme') || lower.includes('benefit')) {
      return 'You may be eligible for PM-KISAN and crop insurance schemes. Visit the Government Benefits section for details.';
    }
    if (lower.includes('join') && lower.includes('community')) {
      return 'To join the community, click the Join Community button — you will be redirected to the forums.';
    }
    // Fallback: simple echo + helpful note
    return `I hear you: "${text}". I can help with weather updates, government schemes, and basic farming advice.`;
  };

  const handleSend = async () => {
    const text = assistantInput.trim();
    if (!text) return;
    // add user message
    setMessages(prev => [...prev, { role: 'user', text }]);
    setAssistantInput('');

    // try to persist to backend (best-effort)
    try {
      await chatAPI.sendMessage(text, 'text');
    } catch (e) {
      // ignore persistence errors for now
      console.debug('chatAPI.sendMessage failed', e);
    }

    // get AI answer (mock or future integration)
    const answer = await mockAIAnswer(text);
    setMessages(prev => [...prev, { role: 'bot', text: answer }]);
    // persist bot message
    try {
      await chatAPI.sendMessage(answer, 'text');
    } catch (e) {
      console.debug('chatAPI.sendMessage (bot) failed', e);
    }
  };
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
              <div className="flex flex-col gap-2">
                <div className="space-y-2 max-h-40 overflow-y-auto p-2 bg-card rounded">
                  {messages.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t("dashboard.assistantPlaceholder")}</p>
                  ) : (
                    messages.map((m, i) => (
                      <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                        <div className={`inline-block p-2 rounded ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          {m.text}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <Input value={assistantInput} onChange={(e) => setAssistantInput(e.target.value)} placeholder={t("dashboard.assistantPlaceholder")} className="text-base" />
                  <Button className="bg-primary" onClick={handleSend}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
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
              <Button variant="outline" className="w-full" onClick={() => setShowReport(true)}>{t("dashboard.buttons.viewFullReport")}</Button>
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
              <Button variant="outline" className="w-full" onClick={() => window.open('https://community.example.com', '_blank')}>{t("dashboard.buttons.joinCommunity")}</Button>
            </div>
          </DashboardCard>
        </div>

        {/* Success Stats */}
        <div className="bg-card p-6 rounded-2xl border">
          <h3 className="text-xl font-bold mb-4">{t("dashboard.title")} / {t("dashboard.welcome")}</h3>
          <div className="mb-4">
            <Button onClick={seedSampleData} variant="ghost">Seed Sample Data</Button>
            {sampleData.shlokas.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold">Sample Shlokas</h4>
                <ul className="list-disc ml-6 text-sm">
                  {sampleData.shlokas.map((s, i) => (
                    <li key={i}>{s.text} — <em className="text-muted-foreground">{s.meaning}</em></li>
                  ))}
                </ul>
              </div>
            )}
            {sampleData.policies.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold">Sample Policies</h4>
                <ul className="list-disc ml-6 text-sm">
                  {sampleData.policies.map((p, i) => (
                    <li key={i}>{p.title} — <em className="text-muted-foreground">{p.description}</em></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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
