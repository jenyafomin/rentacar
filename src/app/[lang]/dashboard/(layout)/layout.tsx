// MUI Imports
import Button from '@mui/material/Button'

// Type Imports
import type { ChildrenType } from '@/front/@core/types'

// Layout Imports
import LayoutWrapper from '@/front/@layouts/LayoutWrapper'
import VerticalLayout from '@/front/@layouts/VerticalLayout'
import HorizontalLayout from '@/front/@layouts/HorizontalLayout'

// Component Imports
import Providers from '@/front/components/Providers'
import Navigation from '@/front/views/navigation/Navigation'
import Header from '@/front/layout/horizontal/Header'
import Navbar from '@/front/views/navigation/navHeader/Navbar'
import VerticalFooter from '@/front/views/navigation/footer/Footer'
import HorizontalFooter from '@/front/layout/horizontal/Footer'
import ScrollToTop from '@/front/@core/components/scroll-to-top'

// Util Imports
import { getMode, getSystemMode } from '@/front/@core/utils/serverHelpers'

const Layout = async ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'
  const mode = getMode()
  const systemMode = getSystemMode()

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        systemMode={systemMode}
        // systemMode={"dark"}

        verticalLayout={
          <VerticalLayout
            navigation={<Navigation mode={mode} systemMode={systemMode} />}
            navbar={<Navbar />}
            footer={<VerticalFooter />}
          >
            {children}
          </VerticalLayout>
        }
        horizontalLayout={
          <HorizontalLayout header={<Header />} footer={<HorizontalFooter />}>
            {children}
          </HorizontalLayout>
        }
      />
      <ScrollToTop className='mui-fixed'>
        <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'>
          <i className='tabler-arrow-up' />
        </Button>
      </ScrollToTop>
    </Providers>
  )
}

export default Layout
