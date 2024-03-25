import DictionaryProvider from "@/localization/dictionaryProvider"
import { getDictionary } from "@/localization/getDictionary"
import { Locale } from "i18n-config"

export const metadata = {
  title: 'GA Dashboard',
  description:
    'Admin Dashboard for proffesional usage'
}

const RootLayout = async ({ children, params }: {
    children: React.ReactNode
    params: { lang: Locale }
  }) => {
  // Vars
  const direction = 'ltr'
  const dictionary = await getDictionary(params.lang)

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <DictionaryProvider dictionary={dictionary}>
          {children}
        </DictionaryProvider>
      </body>
    </html>
  )
}

export default RootLayout
