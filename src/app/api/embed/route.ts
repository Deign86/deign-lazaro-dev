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

// Patch HTML to keep relative assets working when proxied
function injectBaseTag(html: string, targetOrigin: string) {
  const baseTag = `<base href="${targetOrigin}/">`;

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

  const upstream = await fetch(targetUrl.toString(), { redirect: 'follow' });
  if (!upstream.ok) {
    return new Response('Failed to load target', { status: upstream.status });
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
        // allow-same-origin is intentionally omitted: the CSP sandbox and the iframe sandbox
        // attribute are intersected by the browser, so the embedded content never gains
        // same-origin privileges even though the iframe grants allow-same-origin.
        // When opened directly in a tab (no iframe), the bare sandbox still isolates the origin.
        'content-security-policy': "sandbox allow-scripts allow-forms allow-popups; frame-ancestors 'self'",
      },
    });
  }

  const html = await upstream.text();
  const patchedHtml = injectBaseTag(html, targetUrl.origin);

  return new Response(patchedHtml, {
    status: upstream.status,
    headers: {
      'content-type': contentType,
      'cache-control': 'no-store',
      // allow-same-origin is intentionally omitted: the CSP sandbox and the iframe sandbox
      // attribute are intersected by the browser, so the embedded content never gains
      // same-origin privileges even though the iframe grants allow-same-origin.
      // When opened directly in a tab (no iframe), the bare sandbox still isolates the origin.
      'content-security-policy': "sandbox allow-scripts allow-forms allow-popups; frame-ancestors 'self'",
    },
  });
}
