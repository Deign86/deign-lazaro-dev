import { NextRequest } from 'next/server';

// Allow embedding for common hosting domains used by the portfolio projects
const ALLOWED_HOST_SUFFIXES = [
  'vercel.app',
  'firebaseapp.com',
  'netlify.app',
  'github.io',
];

// Basic allowlist check to prevent open proxy abuse
function isAllowedHost(hostname: string) {
  return ALLOWED_HOST_SUFFIXES.some((suffix) =>
    hostname === suffix || hostname.endsWith(`.${suffix}`)
  );
}

// Rewrite absolute same-origin src/href attributes to go through the proxy.
// Without allow-same-origin in the sandbox the page has an opaque origin, so
// absolute same-origin asset URLs would otherwise fail to load.
// appOrigin is used to build absolute proxy URLs (base tag would redirect root-relative paths to targetOrigin).
function rewriteSameOriginUrls(html: string, targetOrigin: string, appOrigin: string): string {
  const escapedOrigin = targetOrigin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return html.replace(
    new RegExp(`((?:src|href)=["'])${escapedOrigin}(/[^"'\\s>]*)`, 'gi'),
    (_, attr, path) => `${attr}${appOrigin}/api/embed?url=${encodeURIComponent(`${targetOrigin}${path}`)}`
  );
}

// Patch HTML to keep relative assets working when proxied
function injectBaseTag(html: string, targetOrigin: string) {
  // Escape special HTML characters in the origin to prevent attribute breakout
  const safeOrigin = targetOrigin
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const baseTag = `<base href="${safeOrigin}/">`;

  // Remove CSP meta tags that may block framing
  const cleanedHtml = html.replace(
    /<meta[^>]*http-equiv=["']content-security-policy["'][^>]*>/gi,
    ''
  );

  if (cleanedHtml.includes('<head')) {
    return cleanedHtml.replace('<head>', `<head>${baseTag}`);
  }

  return `${baseTag}${cleanedHtml}`;
}

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get('url');
  if (!target) {
    return new Response('Missing url parameter', { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(target);
  } catch {
    return new Response('Invalid url parameter', { status: 400 });
  }

  if (!isAllowedHost(targetUrl.hostname)) {
    return new Response('Domain not allowed', { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(targetUrl.toString(), {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PortfolioEmbed/1.0; +https://deign-lazaro-dev.vercel.app)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });
  } catch (error) {
    console.error(`Error fetching ${targetUrl.toString()}:`, error);
    return new Response('Failed to load target', { status: 502 });
  }
  if (!upstream.ok) {
    const safeTargetDescriptor = `${targetUrl.hostname}${targetUrl.pathname}`;
    console.error(`Failed to fetch ${safeTargetDescriptor}: ${upstream.status} ${upstream.statusText}`);
    return new Response(`Failed to load target: ${upstream.status} ${upstream.statusText}`, { status: upstream.status });
  }

  const contentType = upstream.headers.get('content-type') || 'text/html';

  // For non-HTML responses, return as-is but strip framing headers
  if (!contentType.includes('html')) {
    const buffer = await upstream.arrayBuffer();
    return new Response(buffer, {
      status: upstream.status,
      headers: {
        'content-type': contentType,
        'cache-control': 'no-store',
        'content-security-policy': "sandbox allow-scripts allow-forms allow-popups; frame-ancestors 'self'",
      },
    });
  }

  const html = await upstream.text();
  const appOrigin = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
  const patchedHtml = rewriteSameOriginUrls(injectBaseTag(html, targetUrl.origin), targetUrl.origin, appOrigin);

  return new Response(patchedHtml, {
    status: upstream.status,
    headers: {
      'content-type': contentType,
      'cache-control': 'no-store',
      'content-security-policy': "sandbox allow-scripts allow-forms allow-popups; frame-ancestors 'self'",
    },
  });
}
