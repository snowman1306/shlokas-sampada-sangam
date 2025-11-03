import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageProvider";

export const LanguageSelector = () => {
  const { lang, setLang } = useLanguage();

  const toggleLanguage = () => setLang(lang === "en" ? "hi" : "en");

  return (
    <Button onClick={toggleLanguage} variant="outline" size="lg" className="gap-2 font-medium">
      <span>{lang === "en" ? "🇬🇧" : "🇮🇳"}</span>
      <span className="hidden sm:inline">{lang === "en" ? "English" : "हिंदी"}</span>
      <span className="sm:hidden">{lang === "en" ? "EN" : "HI"}</span>
    </Button>
  );
};
