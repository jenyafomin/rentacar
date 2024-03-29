import { Locale } from "i18n-config";

export async function makeApiCall(locale: Locale, endpoint: string, options?: RequestInit) {
    endpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`

    const result = await fetch(`http://localhost:3000${endpoint}`, {
        ...options,
        headers: {
            ...(options?.headers || {}),
            "x-locale": locale
        }
    })

    return await result.json();
}