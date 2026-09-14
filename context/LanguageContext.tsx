'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang, translations, t as translate } from '@/lib/translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: Record<Lang, string>) => string;
  tr: typeof translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key['en'],
  tr: translations,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('ls-lang') as Lang | null;
    
    if (saved && ['en', 'es', 'it', 'fr'].includes(saved)) {
      setLangState(saved);
    } else if (typeof navigator !== 'undefined' && navigator.language) {
      // e.g., 'es-ES' -> 'es', 'en-US' -> 'en'
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      if (['en', 'es', 'it', 'fr'].includes(browserLang)) {
        setLangState(browserLang as Lang);
      }
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('ls-lang', l);
  };

  const t = (key: Record<Lang, string>) => translate(key, lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tr: translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
