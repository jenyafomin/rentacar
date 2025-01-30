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

// This is needed to avoid error - Layout "src/app/[lang]/layout.tsx" has an invalid "default" export:
  // Type "{ children: ReactNode; params: { lang: "en" | "ru"; }; session: any; }" is not valid.
type LayoutProps = {
  children?: React.ReactNode
}

type LayoutPropsExtended = {
  children: React.ReactNode
  params: { lang: Locale }
  session: any
}

export default async function RootLayout(props: LayoutProps | LayoutPropsExtended) {
  const { params, children, session } = {
    params: { lang: 'en' as any },
    session: undefined,
    ...props,
  }
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
