'use client';

import React, { createContext, useContext, useState } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: 'HIDDEN GEMS',
    tagline: 'Explore Beyond the Ordinary',
    findGems: 'Find Hidden Gems',
    communityFavorites: 'Explore Community Favourites',
    budgetLabel: 'Budget per Person',
    studySpaces: 'Study & Work Spaces',
    cheapEats: 'Cheap Eats',
    parks: 'Parks & Peaceful Corners',
    scenic: 'Scenic Viewpoints',
    art: 'Art & Culture',
    books: 'Bookshops & Reading Corners',
    markets: 'Local Markets & Hidden Shops',
    stay: 'Stay & Accommodation',
    quiet: 'Quiet & Peaceful',
    moderate: 'Moderate',
    lively: 'Lively & Social',
    verifiedBhashini: 'Powered by Bhashini AI',
  },
  hi: {
    appName: 'हिडन जेम्स',
    tagline: 'साधारण से परे अन्वेषण करें',
    findGems: 'अनूठे स्थान खोजें',
    communityFavorites: 'समुदाय के पसंदीदा स्थल',
    budgetLabel: 'प्रति व्यक्ति बजट',
    studySpaces: 'अध्ययन और कार्य स्थल',
    cheapEats: 'किफायती खान-पान',
    parks: 'शांत उद्यान और कोने',
    scenic: 'सुंदर दृश्य स्थल',
    art: 'कला एवं संस्कृति',
    books: 'किताबों की दुकानें',
    markets: 'स्थानीय बाजार और दुकानें',
    stay: 'रहने की जगह',
    quiet: 'शांत और सुकूनदेह',
    moderate: 'मध्यम',
    lively: 'जीवंत और सामाजिक',
    verifiedBhashini: 'भाषिणी एआई द्वारा संचालित',
  },
  mr: {
    appName: 'हिडन जेम्स',
    tagline: 'सामान्य पलीकडे जाऊन शोधा',
    findGems: 'लपलेली ठिकाणे शोधा',
    communityFavorites: 'समुदायाचे आवडते ठिकाण',
    budgetLabel: 'दरडोई बजेट',
    studySpaces: 'अभ्यास आणि कामाच्या जागा',
    cheapEats: 'स्वस्त आणि चविष्ट खाद्यपदार्थ',
    parks: 'शांत उद्याने आणि कोपरे',
    scenic: 'मनोहर दृश्ये',
    art: 'कला आणि संस्कृती',
    books: 'पुस्तकांची दुकाने',
    markets: 'स्थानिक बाजार',
    stay: 'राहण्याची सोय',
    quiet: 'शांत आणि निवांत',
    moderate: 'मध्यम',
    lively: 'उत्साही आणि सामाजिक',
    verifiedBhashini: 'भाषिणी एआई द्वारे समर्थित',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string) => {
    return translations[lang]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);