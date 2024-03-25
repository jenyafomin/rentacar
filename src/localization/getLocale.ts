import { i18n } from "i18n-config";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export function getLocaleFromPath(path:string) {
    const locale = path.split("/")[1] || i18n.defaultLocale
    return locale;
}

export function getApiLocale(req: NextRequest) {
    const locale = req.headers.get("x-locale")
    return locale;
}

export function getServerLocale() {
    const path = headers().get("x-pathname")
    if(path) {
        // console.log("[getServerLocale] path",path);
        return getLocaleFromPath(path)
    }
    else {
        throw new Error("header 'x-pathname' is empty")
    }
}