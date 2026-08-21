import { NextRequest } from 'next/server';
import { PINNED_PROJECTS } from '@/data/projects';
import { resolveLiveUrl } from '@/lib/resolve-live-url';

export const revalidate = 900;

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  const project = PINNED_PROJECTS.find((candidate) => candidate.id === id);

  if (!project) {
    return Response.json({ url: null }, { status: 404 });
  }

  const url = await resolveLiveUrl(project.liveUrlCandidates);
  return Response.json({ url });
}
