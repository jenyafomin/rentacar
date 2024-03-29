"use client"
import { ChangeEvent } from "react";

export function changeStateWithInput<T>(state: T, setState: (newValue: T) => any) {
    return function (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key: keyof T,
        isNumber: boolean = false
    ) {
        let newValue: any = event.target.value;
        if (isNumber) {
            newValue = Number(newValue);
            if (isNaN(newValue) && newValue !== "") {
                return
            }
        }

        const newObj = { ...state, [key]: newValue };
        setState(newObj);
    };
}

export function changeStateWithValue<T>(state: T, setState: (newValue: T) => any) {
    return function (
        newValue: any,
        key: keyof T,
        isNumber: boolean = false
    ) {
        if (isNumber) {
            newValue = Number(newValue);
            if (isNaN(newValue) && newValue !== "") {
                return
            }
        }

        const newObj = { ...state, [key]: newValue };
        setState(newObj);
    };
}