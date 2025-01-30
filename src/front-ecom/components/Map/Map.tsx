"use client"
import {useEffect, useRef} from "react";
import {dsnCN} from "../../hooks/helper";
import { mapStyle } from "./map.style";
// import icon from "/public/img/map-marker.png";

declare const google: any;

interface MapProps {
    defaultCenter: { lat: number, lng: number },
    zoom?: number,
    height?: string,
    mapKey?: string,
    className?: string,
    mapIcon?: string
}

export default function Map({mapKey, defaultCenter, mapIcon="public/img/map-marker.png", className, zoom=14, height="80vh", ...restProps}: MapProps) {

    const ref = useRef<HTMLDivElement>(null);
    const effects = useRef(false);


    useEffect(() => {
        if (effects.current || !mapKey) {
            return;
        }
    
        effects.current = true;
    
        const existingScript = document.getElementById('googleMapsScript');
        const loadMap = () => {
            const map = new google.maps.Map(ref.current, {
                center: { lat: defaultCenter.lat, lng: defaultCenter.lng },
                zoom: zoom,
                styles: mapStyle,
                mapTypeControl: false,
                scrollwheel: false,
                draggable: true,
                streetViewControl: false,
                navigationControl: false,
            });
            
            console.log("google:",google);
            new google.maps.Marker({
                position: new google.maps.LatLng(defaultCenter.lat, defaultCenter.lng),
                map: map,
                animation: google.maps.Animation.BOUNCE,
                // icon: mapIcon,
                title: "ASL",
            });
        };
    
        if (!existingScript) {
            const script = document.createElement("script");
            script.id = 'googleMapsScript';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${mapKey}`;
            document.body.appendChild(script);
            script.addEventListener('load', loadMap);
        } else {
            loadMap();
        }
    
        return () => {
            if (existingScript) {
                existingScript.removeEventListener('load', loadMap);
            }
        };
    }, [mapKey, defaultCenter, mapIcon, zoom, className, height]);


    return (
        <>
            <div className={dsnCN("w-100", className)} style={{height: height}} ref={ref} {...restProps} />
        </>
    );
}







