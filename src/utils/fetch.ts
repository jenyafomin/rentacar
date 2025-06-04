import { Locale } from "i18n-config";
import { config } from "dotenv";
config();

export async function makeApiCall<T>(locale: Locale, endpoint: string, options?: RequestInit & { params?: Record<string, string> }): Promise<T> {
    endpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
    
    // Get base URL - use environment variable if set, otherwise determine automatically
    let url = process.env.NEXT_PUBLIC_API_URL;
    
    if (!url) {
        // Auto-detect URL based on environment
        if (typeof window !== 'undefined') {
            // Client-side: use current origin
            url = window.location.origin;
        } else {
            // Server-side: use Vercel URL if available, otherwise localhost
            url = process.env.VERCEL_URL 
                ? `https://${process.env.VERCEL_URL}` 
                : "http://localhost:3000";
        }
    }

    // Add query parameters if provided
    if (options?.params) {
        // Фильтруем undefined и null значения, сохраняя false
        const filteredParams = Object.fromEntries(
            Object.entries(options.params).filter(([_, value]) => 
                value !== undefined && value !== null
            )
        );
        const queryString = Object.entries(filteredParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        endpoint += `?${queryString}`;
    }

    console.log(`[makeApiCall] :: URL :`, `${url}${endpoint}`);
    const result = await fetch(`${url}${endpoint}`, {
        ...options,
        headers: {
            ...(options?.headers || {}),
            "x-locale": locale
        },
    })

    return await result.json() as T;
}