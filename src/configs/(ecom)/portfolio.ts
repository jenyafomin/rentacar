import { transitionPage } from "@/front-ecom/hooks/EremiaType";
import { EColors } from "types/enum/EGeneral";

type TBtn = {
    href?: string,
    pageTransition?: transitionPage,
    title: string,
    color?: EColors,
    method?: "modal-contacts" | "none"
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
    video?: any,
    srcMobile?: string, // todo - not implemented 
    overlay: number, // 1 - 10
    btn?: TBtn
}

const data: Array<ISliderItemProps> = [
    {
        id: 1,
        title: "Dubai Rent a Car",
        slug: 'maybe-speaker',
        category: ['from 49 AED', 'No Hidden Fees'],
        href: "/cars",
        description: 'From city lights to desert nights, drive Dubai your way.',
        src: '/img/AI/dub-cars-2.jpg',
        // src: '/img/3D/mobile/bmw-9-16.webp',
        srcMobile: '/img/3D/mobile/bmw-9-16.webp',
        overlay: 8,
        btn: {
            href: "/cars",
            pageTransition: {title: "All Cars"},
            title: "All Cars",
            color: EColors.YELLOW,

        }
    },
    {
        id: 2,
        title: "Choose Your Ride",
        slug: 'yaren-collection',
        src: '/img/AI/dub-cars-1.jpg',
        href: "/cars?available=true",

        category: ['Luxury & Economy', 'Best Rate Guarantee'],
        description: 'Arrive as a tourist, drive like a local.',
        overlay: 10,

        btn: {
            href: "/cars?available=true",
            pageTransition: {title: "Available Cars"},
            title: "Available Cars",
            color: EColors.YELLOW,

        }

    },
    {
        id: 3,
        title: "Drive Today",
        slug: 'huggl-power-pack',
        src: '/img/AI/kia-k5.webp',
        href: "/cars",

        category: ['24/7 Support', 'Free Cancellation'],
        description: 'Fast wheels, faster bookings – welcome to Dubai.”',
        overlay: 6,

        btn: {
            method: "modal-contacts",
            // href: "/cars",
            // pageTransition: {title: "All Cars"},
            title: "Make a Booking",
            color: EColors.BLUE
        }
    },
]

export const getPortfolioData = () => data;

export const getPortfolioItem = (slug: string) => {
    return data.find(item => item.slug === slug)
}