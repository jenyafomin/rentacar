import { NextAuthProvider } from "@/front/context/nextAuthProvider"
import DictionaryProvider from "@/localization/dictionaryProvider"
import { getDictionary } from "@/localization/getDictionary"
import { Locale } from "i18n-config"
import { SessionProvider } from "next-auth/react"

export const metadata = {
  title: 'GA Dashboard',
  description:
    'Admin Dashboard for proffesional usage'
}

const RootLayout = async ({ children, params, session }: {
    children: React.ReactNode
    params: { lang: Locale },
    session: any
  }) => {
  // Vars
  const direction = 'ltr'
  const dictionary = await getDictionary(params.lang)

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <DictionaryProvider dictionary={dictionary}>
            <NextAuthProvider session={session}>
                {children}
            </NextAuthProvider>
        </DictionaryProvider>
        {/* <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="shape">
          <defs>
            <linearGradient id="gradient">
                  <stop offset="0%" stop-color="var(--theme-color)" />
                  <stop offset="100%" stop-color="var(--theme-color2)" />
              </linearGradient>
          </defs>
        </svg> */}
      </body>
    </html>
  )
}

export default RootLayout
