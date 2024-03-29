"use client"
import { Locale, i18n } from "i18n-config";
import { usePathname } from "next/navigation";

export function useLocale(): Locale {
    try {
        let path: string | null;
        path = usePathname()

        const locale = path.split("/")[1] || i18n.defaultLocale
        return locale as Locale;
    } catch(e) {
        console.error(e);
        return i18n.defaultLocale as Locale;
    }
}