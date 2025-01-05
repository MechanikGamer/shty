import {headers} from "next/headers";

export default async function requestConfig() {
  const supportedLocales = ["de","en","es", "fr","no", "pl"];

  const fallbackLocale = "en";

  const browserHeaders = await headers(); 
  const browserLocale = browserHeaders.get("accept-language")?.split(",")[0]?.split("-")[0];

  const locale = browserLocale && supportedLocales.includes(browserLocale)
    ? browserLocale
    : fallbackLocale;

  const messages = (await import(`../public/locales/${locale}/common.json`)).default;

  return {
    locale,
    messages,
  };
}
