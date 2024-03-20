'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'
import Logo from '@/front/components/Logo'
import ModeDropdown from '@/front/views/navigation/buttons/ModeDropdown'
import UserDropdown from '@/front/views/navigation/buttons/UserDropdown'

// Hook Imports
import useHorizontalNav from '@/front/@menu/hooks/useHorizontalNav'

// Util Imports
import { horizontalLayoutClasses } from '@/front/@layouts/utils/layoutClasses'

const NavbarContent = () => {
  // Hooks
  const { isBreakpointReached } = useHorizontalNav()

  return (
    <div
      className={classnames(horizontalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}
    >
      <div className='flex items-center gap-4'>
        <NavToggle />
        {/* Hide Logo on Smaller screens */}
        {!isBreakpointReached && <Logo />}
      </div>
      <div className='flex items-center'>
        <ModeDropdown />
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
