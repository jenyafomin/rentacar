'use client'

// Component Imports
import Navigation from './Navigation'
import NavbarContent from './NavbarContent'
import Navbar from '@/front/@layouts/components/horizontal/Navbar'
import LayoutHeader from '@/front/@layouts/components/horizontal/Header'

// Hook Imports
import useHorizontalNav from '@/front/@menu/hooks/useHorizontalNav'

const Header = () => {
  // Hooks
  const { isBreakpointReached } = useHorizontalNav()

  return (
    <>
      <LayoutHeader>
        <Navbar>
          <NavbarContent />
        </Navbar>
        {!isBreakpointReached && <Navigation />}
      </LayoutHeader>
      {isBreakpointReached && <Navigation />}
    </>
  )
}

export default Header
