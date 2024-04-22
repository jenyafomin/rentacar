import { getServerLocale } from "@/localization/getServerLocale"
import { makeApiCall } from "./fetch";

export async function serverApiFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
    try {
        const locale = getServerLocale();
        return await makeApiCall(locale, endpoint, options);
    } catch (e) {
        console.error(e)
        return { error: "Server error", code: 500 }
    }
}