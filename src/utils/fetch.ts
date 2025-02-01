import { Locale } from "i18n-config";
import { config } from "dotenv";
config();

export async function makeApiCall<T>(locale: Locale, endpoint: string, options?: RequestInit): Promise<T> {
    endpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    console.log(`[makeApiCall] :: URL :`, url);
    const result = await fetch(`${url}${endpoint}`, {
        ...options,
        headers: {
            ...(options?.headers || {}),
            "x-locale": locale
        }
    })

    return await result.json() as T;
}