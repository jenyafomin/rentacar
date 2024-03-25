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
      </body>
    </html>
  )
}

export default RootLayout
