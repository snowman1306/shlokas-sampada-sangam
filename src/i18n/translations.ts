export const translations = {
  en: {
    nav: {
      brandShort: "Kri",
      brandLong: "Farmer Portal",
      login: "Login",
    },
    hero: {
      shloka: '"Shivakanta Shambho..."',
      subtitle: "In harmony with nature and the wisdom of our ancestors",
      titleLine1: "Farmer Empowerment",
      titleLine2: "Your journey towards prosperous farming begins here.",
      getStarted: "Get Started",
      learnMore: "Learn More",
      features: {
        ai: "AI Assistant",
        weather: "Weather Alerts",
        crop: "Crop Advice",
        community: "Community",
      },
    },
    footer: {
      copy: "© 2024 Farmer Empowerment Portal. In harmony with nature and tradition.",
    },
    auth: {
      title: "Farmer Portal",
      subtitle: "Farmer Portal",
      tabs: { login: "Login", signup: "Sign Up" },
      labels: {
        name: "Name",
        email: "Email",
        password: "Password",
        dob: "Date of Birth",
        state: "State",
        city: "City",
      },
      buttons: { login: "Login", signup: "Sign Up", viewGuide: "View Guide", contact: "Contact for Help" },
      help: { privacy: "Privacy", faqs: "FAQs", guideQuestion: "How to create email?" }
    },
    dashboard: {
      title: "Farmer Portal",
      welcome: "Welcome",
      assistantPlaceholder: "Ask your question...",
      climate: { heavyRain: "Heavy Rain Expected", goodConditions: "Good Growing Conditions" },
      buttons: { viewFullReport: "View Full Report", allSchemes: "All Schemes", joinCommunity: "Join Community", irrigation: "Irrigation Tips", pestControl: "Pest Control" },
      stats: { farmersHelped: "Farmers Helped", villagesReached: "Villages Reached", benefits: "Benefits Claimed", satisfaction: "Satisfaction Rate" },
      government: { title: "Government Benefits" }
    }
  },
  hi: {
    nav: {
      brandShort: "कृ",
      brandLong: "किसान सेवा",
      login: "लॉगिन",
    },
    hero: {
      shloka: '"शिवकान्त शम्भो..."',
      subtitle: "प्रकृति और पूर्वजों की बुद्धि के साथ तालमेल में",
      titleLine1: "किसान सशक्तिकरण",
      titleLine2: "समृद्ध खेती की दिशा में आपकी यात्रा यहीं से शुरू होती है।",
      getStarted: "शुरू करें",
      learnMore: "और जानें",
      features: {
        ai: "AI सहायक",
        weather: "मौसम चेतावनी",
        crop: "फसल सलाह",
        community: "समुदाय",
      },
    },
    footer: {
      copy: "© 2024 किसान सशक्तिकरण पोर्टल। प्रकृति और परंपरा के साथ समन्वय में।",
    },
    auth: {
      title: "किसान सेवा",
      subtitle: "Farmer Portal",
      tabs: { login: "लॉगिन", signup: "साइन अप" },
      labels: {
        name: "नाम",
        email: "ईमेल",
        password: "पासवर्ड",
        dob: "जन्म तिथि",
        state: "राज्य",
        city: "शहर",
      },
      buttons: { login: "लॉगिन करें", signup: "साइन अप करें", viewGuide: "गाइड देखें", contact: "सहायता के लिए संपर्क करें" },
      help: { privacy: "गोपनीयता", faqs: "प्रश्न", guideQuestion: "ईमेल कैसे बनाएं?" }
    },
    dashboard: {
      title: "कृषक सेवा",
      welcome: "स्वागत है",
      assistantPlaceholder: "अपना सवाल पूछें...",
      climate: { heavyRain: "भारी बारिश की आशंका", goodConditions: "अच्छे बढ़ने की स्थितियाँ" },
      buttons: { viewFullReport: "पूरी रिपोर्ट देखें", allSchemes: "सभी योजनाएं", joinCommunity: "समुदाय में शामिल हों", irrigation: "सिंचाई टिप्स", pestControl: "कीट नियंत्रण" },
      stats: { farmersHelped: "किसानों को सहायता", villagesReached: "पहुंचे गये गाँव", benefits: "क्लेम किए गए लाभ", satisfaction: "संतुष्टि दर" },
      government: { title: "सरकारी योजनाएं" }
    }
  }
} as const;

export type Translations = typeof translations;
