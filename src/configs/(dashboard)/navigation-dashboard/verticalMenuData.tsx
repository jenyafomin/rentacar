// Type Imports
import type { VerticalMenuDataType } from '@/front/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Home',
    href: '/dashboard',
    icon: 'tabler-smart-home'
  },
  {
    label: 'Cars',
    href: '/dashboard/cars',
    icon: "tabler-car"
  },
  {
    label: 'Requests',
    href: '/dashboard/requests',
    icon: 'tabler-bell'
  },
  // {
  //   label: 'Excel Cars',
  //   href: '/dashboard/excel-cars',
  //   icon: "tabler-truck"
  // }
]

export default verticalMenuData
