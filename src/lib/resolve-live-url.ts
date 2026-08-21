const REQUEST_TIMEOUT_MS = 4000;

async function checkUrl(url: string, method: 'HEAD' | 'GET'): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method,
      redirect: 'follow',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      ...(method === 'GET' ? { headers: { Range: 'bytes=0-0' } } : {}),
    });
    return response.status >= 200 && response.status < 400;
  } catch {
    return false;
  }
}

export async function resolveLiveUrl(candidates: string[]): Promise<string | null> {
  for (const candidate of candidates) {
    if (await checkUrl(candidate, 'HEAD')) return candidate;
    if (await checkUrl(candidate, 'GET')) return candidate;
  }
  return null;
}
