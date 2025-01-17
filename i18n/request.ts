import { getRequestConfig, GetRequestConfigParams } from "next-intl/server";

export default getRequestConfig(
  async ({ requestLocale }: GetRequestConfigParams) => {
    const defaultLocale = "en";
    const supportedLocales = ["en", "fr", "es", "it", "id", "pt", "de", "ae"];

    // Get the locale from the Accept-Language header
    const acceptLanguage = await requestLocale;
    let locale = defaultLocale;

    if (acceptLanguage) {
      const browserLocales = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";")[0].trim());

      locale =
        browserLocales.find((lang) => supportedLocales.includes(lang)) ||
        defaultLocale;
    }

    return {
      locale,
      messages: (await import(`../messages/${locale}.json`)).default,
    };
  }
);
