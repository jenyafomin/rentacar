// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@front/styles/global.css'

// Generated Icon CSS Imports
import '@front/assets/iconify-icons/generated-icons.css'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'inspector'

export const metadata = {
  title: 'GA Dashboard',
  description:
    'Admin Dashboard for proffesional usage'
}

const RootLayout = ({ children, session }: ChildrenType & {session: any}) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
          {children}
      </body>
    </html>
  )
}

export default RootLayout
