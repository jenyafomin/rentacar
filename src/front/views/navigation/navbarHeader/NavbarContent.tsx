'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from '../buttons/NavToggle'
import ModeDropdown from '../buttons/ModeDropdown'
import UserDropdown from '../buttons/UserDropdown'

// Util Imports
import { verticalLayoutClasses } from '@/front/@layouts/utils/layoutClasses'

const NavbarContent = () => {
  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-4'>
        <NavToggle />
        <ModeDropdown />
      </div>
      <div className='flex items-center'>
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
