"use client"
import { useLocale } from "@/localization/useLocale";
import { makeApiCall } from "./fetch";
import { Locale } from "i18n-config";

export async function clientApiFetch<T=any | {error: any}>(locale: Locale, endpoint: string, options: RequestInit = {}): Promise<T> {
    'use client'
    try {
        const response = await makeApiCall<T>(locale, endpoint, options);
        if(response.error) {
            throw new Error(response.error);
        }
        return response;
    } catch (e: any) {
        const errorMessage = e.message ? e.message : e;
        console.error(e)
        throw new Error(errorMessage)
    }

}