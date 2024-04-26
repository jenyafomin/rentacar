import { transitionPage } from "@/front-ecom/hooks/EremiaType";
import { EColors } from "types/enum/EGeneral";

type TBtn = {
    href: string,
    pageTransition?: transitionPage,
    title: string,
    color?: EColors,
}
export interface ISliderItemProps {
    id: number,
    title: string,
    slug?: string,
    category: string[] | [],
    href: string,
    description?: string,
    subtitle?: string,
    src: string,
    srcMobile?: string, // todo - not implemented 
    overlay: number, // 1 - 10
    btn?: TBtn
}

const data: Array<ISliderItemProps> = [
    {
        id: 1,
        title: "Dubai Rent a Car",
        slug: 'maybe-speaker',
        category: ['from 49 AED', 'all types'],
        href: "/cars",
        description: 'Best Rent a Car in UAE.',
        src: '/img/3D/AI/CyberTruck.jpg',
        // src: '/img/3D/mobile/bmw-9-16.webp',
        srcMobile: '/img/3D/mobile/bmw-9-16.webp',
        overlay: 8,
        btn: {
            href: "/cars",
            pageTransition: {title: "All Cars"},
            title: "All Cars",
            color: EColors.DEFAULT,
        }
    },
    {
        id: 2,
        title: "Yaren Collection",
        slug: 'yaren-collection',
        src: '/img/3D/concept_3(scene).jpg',
        href: "/cars",

        category: ['pen'],
        description: 'symbols through which express themselves.',
        overlay: 10,
        btn: {
            href: "/cars",
            pageTransition: {title: "All Cars"},
            title: "Night shift",
            color: EColors.CYAN
        }

    },
    {
        id: 3,
        title: "Huggle Power Pack",
        slug: 'huggl-power-pack',
        src: '/img/3D/AI/BMW-4-Series.webp',
        href: "/cars",

        category: ['induction'],
        description: 'Huggl is an induction charging.',
        overlay: 6,

        btn: {
            href: "/cars",
            pageTransition: {title: "All Cars"},
            title: "CONTACT US",
            color: EColors.YELLOW
        }
    },
]

export const getPortfolioData = () => data;