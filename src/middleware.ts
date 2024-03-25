// Next Imports
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Third-party Imports
import Negotiator from 'negotiator'
import { withAuth } from 'next-auth/middleware'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import type { NextRequestWithAuth } from 'next-auth/middleware'

// Config Imports
import { i18n } from '../i18n-config'


// Constants
const HOME_PAGE_URL = '/dashboards'

const getLocale = (request: NextRequest): string | undefined => {
  // Try to get locale from URL
  const urlLocale = i18n.locales.find(locale => request.nextUrl.pathname.startsWith(`/${locale}`))

  if (urlLocale) return urlLocale

  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}

  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)
  console.log(languages);
  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  // if (
  //   [
  //     '/manifest.json',
  //     '/favicon.ico',
  //     // Your other files in `public`
  //   ].includes(pathname)
  // )
  //   return

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    // if(!pathname.startsWith("/dashboard"))
    const url = `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`
    const response = NextResponse.redirect(
      new URL(
        url,
        request.url,
      ),
    );
    response.headers.set("x-pathname", url);

    return response
  }
  const response = NextResponse.next()
  response.headers.set("x-pathname", pathname);
  return response
}

/*
const localizedRedirect = (url: string, locale: string | undefined, request: NextRequestWithAuth) => {
  let _url = url

  const isLocaleMissing = isUrlMissingLocale(_url)

  if (isLocaleMissing) {
    // e.g. incoming request is /products
    // The new URL is now /en/products
    _url = getLocalizedUrl(_url, locale ?? i18n.defaultLocale)
  }

  let _basePath = process.env.BASEPATH ?? ''

  _basePath = _basePath.replace('demo-1', request.headers.get('X-server-header') ?? 'demo-1')

  _url = ensurePrefix(_url, `${_basePath ?? ''}`)

  const redirectUrl = new URL(_url, request.url).toString()

  return NextResponse.redirect(redirectUrl)
}*/

/* withAuth
export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    // Get locale from request headers
    const locale = getLocale(request)

    const pathname = request.nextUrl.pathname

    // If the user is logged in, `token` will be an object containing the user's details
    const token = request.nextauth.token

    // Check if the user is logged in
    const isUserLoggedIn = !!token

    // Guest routes (Routes that can be accessed by guest users who are not logged in)
    const guestRoutes = ['login', 'register', 'forgot-password']

    // Shared routes (Routes that can be accessed by both guest and logged in users)
    const sharedRoutes = ['shared-route']

    // Private routes (All routes except guest and shared routes that can only be accessed by logged in users)
    const privateRoute = ![...guestRoutes, ...sharedRoutes].some(route => pathname.endsWith(route))

    // If the user is not logged in and is trying to access a private route, redirect to the login page
    if (!isUserLoggedIn && privateRoute) {
      let redirectUrl = '/login'

      if (!(pathname === '/' || pathname === `/${locale}`)) {
        const searchParamsStr = new URLSearchParams({ redirectTo: withoutSuffix(pathname, '/') }).toString()

        redirectUrl += `?${searchParamsStr}`
      }

      return localizedRedirect(redirectUrl, locale, request)
    }

    // If the user is logged in and is trying to access a guest route, redirect to the root page
    const isRequestedRouteIsGuestRoute = guestRoutes.some(route => pathname.endsWith(route))

    if (isUserLoggedIn && isRequestedRouteIsGuestRoute) {
      return localizedRedirect(HOME_PAGE_URL, locale, request)
    }

    // If the user is logged in and is trying to access root page, redirect to the home page
    if (pathname === '/' || pathname === `/${locale}`) {
      return localizedRedirect(HOME_PAGE_URL, locale, request)
    }

    // If pathname already contains a locale, return next() else redirect with localized URL
    return isUrlMissingLocale(pathname) ? localizedRedirect(pathname, locale, request) : NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      }
    }
  }
)
*/


// Matcher Config
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - all items inside the public folder
     *    - images (public images)
     *    - next.svg (Next.js logo)
     *    - vercel.svg (Vercel logo)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.+?/hook-examples|.+?/menu-examples|images|img|js|next.svg|vercel.svg).*)'
  ]
}
