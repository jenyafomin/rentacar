import { i18n } from "i18n-config";
import { usePathname } from "next/navigation";

export function useLocale() {
    try {
        let path: string | null;
        path = usePathname()

        const locale = path.split("/")[1] || i18n.defaultLocale
        return locale;
    } catch(e) {
        console.error(e);
        return i18n.defaultLocale;
    }
}