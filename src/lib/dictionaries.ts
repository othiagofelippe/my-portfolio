import { Locale } from "./i18n";

const dictionaries = {
  pt: () =>
    import("@/src/dictionaries/pt.json").then((module) => module.default),
  en: () =>
    import("@/src/dictionaries/en.json").then((module) => module.default),
  es: () =>
    import("@/src/dictionaries/es.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.pt();
};
