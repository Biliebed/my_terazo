export { auth as middleware } from "./auth";

export const config = {
  // Protect all routes except login, api routes, and static files
  matcher: [
    /*
     * Match all request paths except:
     * - /api (API routes)
     * - /_next (Next.js internals)
     * - /favicon.ico, /robots.txt (static files)
     */
    "/((?!api|_next|favicon.ico|robots.txt).*)",
  ],
};
