import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Host router for the careers subdomain.
 *
 * careers.outsourcevaphilippines.com/<path>  →  renders /careers/<path>
 * outsourcevaphilippines.com/careers/<path>  →  redirects to the subdomain
 *
 * The /careers path segment is an implementation detail: it exists so the App
 * Router has somewhere to put the pages. Visitors only ever see the subdomain.
 *
 * Local development: use careers.localhost:3000, which browsers resolve to
 * 127.0.0.1 without any hosts-file changes.
 */

const CAREERS_PREFIX = "/careers";

function isCareersHost(hostname: string): boolean {
  return hostname === "careers.localhost" || hostname.startsWith("careers.");
}

/**
 * The host the visitor actually asked for. `nextUrl.hostname` reflects the
 * server origin, not the Host header, so behind a proxy (and in local testing)
 * it reports the wrong name. Prefer the forwarded/Host header and drop the port.
 */
function requestHostname(request: NextRequest): string {
  const raw =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    request.nextUrl.hostname;
  return raw.split(":")[0].toLowerCase();
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = requestHostname(request);

  if (isCareersHost(hostname)) {
    // Already-prefixed paths would double up; serve them as-is.
    if (pathname === CAREERS_PREFIX || pathname.startsWith(`${CAREERS_PREFIX}/`)) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? CAREERS_PREFIX : `${CAREERS_PREFIX}${pathname}`;
    return NextResponse.rewrite(url);
  }

  // On the main host the /careers path is not a real page — send visitors and
  // crawlers to the canonical subdomain so there is one URL per job posting.
  if (pathname === CAREERS_PREFIX || pathname.startsWith(`${CAREERS_PREFIX}/`)) {
    const rest = pathname.slice(CAREERS_PREFIX.length) || "/";
    const target = new URL(`${rest}${search}`, careersOrigin(request));
    return NextResponse.redirect(target, 308);
  }

  return NextResponse.next();
}

/** Build the careers origin from the incoming host, keeping the port in dev. */
function careersOrigin(request: NextRequest): string {
  const { protocol, port } = request.nextUrl;
  const hostname = requestHostname(request);
  const base = hostname.startsWith("www.") ? hostname.slice(4) : hostname;
  return `${protocol}//careers.${base}${port ? `:${port}` : ""}`;
}

export const config = {
  /**
   * Run on everything except API routes, Next internals and static assets.
   * /robots.txt and /sitemap.xml are deliberately NOT excluded — the careers
   * host needs its own versions of both.
   */
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2|ttf|otf|mp4|webm)$).*)",
  ],
};
