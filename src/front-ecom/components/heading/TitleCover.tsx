"use client"
import React from 'react';
import MoveTrigger from "../../animation/MoveTrigger";


function TitleCover({className, children, from={yPercent: -100, opacity: 0}, to={yPercent: 0, opacity: 0.12}, ease, start, end="75%", scrub, markers}) {
    return (
        <MoveTrigger from={from} to={to} markers={markers} scrub={scrub} end={end} start={start} ease={ease}>
            {(ref) => <div className={`p-absolute title-cover ${className}`} ref={ref}>{children}</div>}
            {/* {(ref) => <div className={`p-absolute title-cover ${className}`} ref={ref}>"HELLOO"</div>} */}
        </MoveTrigger>

    );
}


export default TitleCover;