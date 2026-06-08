import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclude API, Next internals, any file with an extension, and the root-level
  // metadata routes `/icon` + `/apple-icon`. Without the last two, next-intl
  // rewrites them to `/en/icon` etc. (they're dotless) and the generated icons
  // 404 — breaking the manifest + apple-touch-icon link.
  matcher: ['/((?!api|_next|_vercel|icon|apple-icon|.*\\..*).*)'],
};
