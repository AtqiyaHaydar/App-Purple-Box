import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

export default getRequestConfig(async () => {
  const defaultLocale = "en";
  const supportedLocales = ["en", "fr", "es", "it", "id", "pt", "de", "ae"];

  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language");

  let locale = defaultLocale;

  if (acceptLanguage) {
    const browserLocales = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().split("-")[0]);

    console.log(browserLocales);

    locale =
      browserLocales.find((lang) => supportedLocales.includes(lang)) ||
      defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "Europe/Rome",
  };
});
