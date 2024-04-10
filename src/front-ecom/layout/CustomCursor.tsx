import {useEffect, useRef,} from 'react';
import gsap from 'gsap';

// CustomCursor.defaultProps = {
//     duration: 0.5,
//     durationChangeSize: 0.3,
//     size: 30,
//     scale: 75
// }

export default function CustomCursor({duration=0.5, durationChangeSize=0.3, size=30, scale=50, ease=undefined}) {

    const cursor = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (window.innerWidth <= 991)
            return;

        const moseMove = (e: any) => {
            gsap.to(cursor.current, {left: e.clientX, top: e.clientY, duration: duration, ease});
        }

        const changeCursor = (val: any) => {
            return {width: val, height: val, duration: durationChangeSize};
        }

        const mouseLinkEnter = (e: any) => {
            gsap.to(cursor.current, changeCursor(scale));
        }
        const mouseLinkLeve = (e: any) => {
            gsap.to(cursor.current, changeCursor(size));
        }

        const tagA = document.body.querySelectorAll('a');
        tagA.forEach((item) => {
            item.addEventListener('mouseenter', mouseLinkEnter);
            item.addEventListener('mouseleave', mouseLinkLeve);
        });


        document.body.addEventListener('mousemove', moseMove);

        return () => {
            console.log("did")
            document.body.removeEventListener('mousemove', moseMove);
            tagA.forEach((item) => {
                item.removeEventListener('mouseenter', mouseLinkEnter);
                item.removeEventListener('mouseleave', mouseLinkLeve);
            })
        }


    }, []);// eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="cursor" ref={cursor} style={{width: size, height: size}}/>
    );
}