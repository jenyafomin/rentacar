// import Splitting from "splitting"
import dynamic from "next/dynamic";

// FIXING
//  - 
// ERROR:
//  ⨯ node_modules/splitting/dist/splitting.js (7:11) @ document
//  ⨯ ReferenceError: document is not defined
// const Splitting: any = dynamic(() => require('splitting'))
// const Splitting: any = dynamic(() => require('splitting'), {ssr: false})


function spaceHtml(target: any, whitespace: any) {
    const space = target.querySelectorAll('.whitespace');
    const char = target.querySelectorAll('.char');
    if (space.length && whitespace)
        space.forEach((item: any) => item.outerHTML = ' ');

    if (char.length)
        char.forEach((item: any , index: number) => {
            item.classList.add("dsn-chars-wrapper");
            item.style.setProperty("--char-dsn-index" , index);
        });
    ;




}

export const splittingChar = (target: any, whitespace = true) => {
    const el = Splitting({target: target, whitespace: false})[0];
    spaceHtml(target, whitespace);
    return el;
}

export const splittingWords = (target: any, whitespace = true) => {
    const el = Splitting({target: target, by: 'words'})[0];
    spaceHtml(target, whitespace);

    return el;
}

export const splittingLine = (target: any, whitespace = true) => {
    const el = Splitting({target: target, by: 'lines'})[0];
    spaceHtml(target, whitespace);
    return el;
}

export const splittingItems = (target: any, matching = null) => {
    return Splitting({target, by: 'items', matching});
}
export const splittingGrid = (target: any, matching = null) => {
    return Splitting({target, by: 'grid', matching});
}







const FFSpliting = {
    Char: splittingChar,
    Words: splittingWords,
    Lines: splittingLine,
    Items: splittingItems,
    Grid: splittingGrid,
}


export default FFSpliting;