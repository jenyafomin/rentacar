// Type Imports
import type { ChildrenType, Direction } from '@/front/@core/types'

// Context Imports
import { VerticalNavProvider } from '@/front/@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@/front/@core/contexts/settingsContext'
import ThemeProvider from '@/front/theme'

// Util Imports
import { getDemoName, getMode, getSettingsFromCookie, getSystemMode } from '@/front/@core/utils/serverHelpers'
import { NextAuthProvider } from '../context/nextAuthProvider'
// import { SessionProvider, useSession } from 'next-auth/react'

type Props = ChildrenType & {
  direction: Direction,
  session?: any
}

const Providers = ({session, ...props}: Props) => {
  // Props
  const { children, direction } = props

  // Vars
  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()
  const demoName = getDemoName()
  const systemMode = getSystemMode()


  return (
    <NextAuthProvider session={session}>
      <VerticalNavProvider>
        <SettingsProvider settingsCookie={settingsCookie} mode={mode} demoName={demoName}>
          <ThemeProvider direction={direction} systemMode={systemMode}>
            {children}
          </ThemeProvider>
        </SettingsProvider>
      </VerticalNavProvider>
    </NextAuthProvider>
  )
}

export default Providers
