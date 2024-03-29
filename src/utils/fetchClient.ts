"use client"
import { useLocale } from "@/localization/useLocale";
import { makeApiCall } from "./fetch";

export async function clientApiFetch(locale: string, endpoint: string, options: RequestInit = {}) {
    'use client'
    try {
        // const locale = useLocale();
        return await makeApiCall(locale, endpoint, options);
    } catch (e) {
        console.error(e)
        throw new Error('{ error: "Server error", code: 500 }')
    }

}