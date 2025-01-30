import { Locale, i18n } from "i18n-config";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export function getLocaleFromPath(path:string): Locale {
    const locale = path.split("/")[1] || i18n.defaultLocale
    return locale as Locale;
}

export function getApiLocale(req: NextRequest) {
    const locale = req.headers.get("x-locale")
    return locale;
}

export function getServerLocale(): Locale {
    const path = headers().get("x-pathname")
    if(path) {
        // console.log("[getServerLocale] path",path);
        return getLocaleFromPath(path)
    }
    else {
        // ! In standalone application throw an error
        // throw new Error("header 'x-pathname' is empty")
    }
}