import { Locale, i18n } from "i18n-config";

// Check if there is any supported locale in the pathname
export function isUrlMissingLocale(pathname: string) {
    // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  return pathnameIsMissingLocale
}


export function getLocaleUrl(locale: Locale, pathname: string) {
    return `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`

}