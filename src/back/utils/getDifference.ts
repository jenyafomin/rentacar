export function getDifference<T>(
    initialValues: Record<string, any>, 
    state: Record<string, any>, 
    excludeKeys: string[] = []
): Partial<T> | undefined {
    const difference: any = {};
    for (const [key, value] of Object.entries(state)) {

        if (excludeKeys.includes(key)) {
            continue;
        }

        if (Array.isArray(value)) {
            if (JSON.stringify(state[key]) !== JSON.stringify(initialValues[key])) {
                difference[key] = value;
            }

        } else {
            if (value !== initialValues[key]) {
                difference[key] = value;
            }
        }
    }
    if (!Object.keys(difference).length) {
        return undefined
    }
    return difference;
}