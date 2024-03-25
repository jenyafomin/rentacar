export function getLocaleFromPath(path:string) {
    return path.split("/")[1];
}