import { useState } from "react";
import { Button } from "@/components/ui/button";

export const LanguageSelector = () => {
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en";
    setLanguage(newLang);
    localStorage.setItem("preferred-language", newLang);
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="lg"
      className="gap-2 font-medium"
    >
      <span>{language === "en" ? "🇬🇧" : "🇮🇳"}</span>
      <span className="hidden sm:inline">
        Language: {language === "en" ? "English" : "हिंदी"}
      </span>
      <span className="sm:hidden">
        {language === "en" ? "EN" : "HI"}
      </span>
    </Button>
  );
};
