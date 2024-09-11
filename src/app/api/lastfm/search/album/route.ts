import { NextRequest } from 'next/server';
import { z } from 'zod';
import { AlbumSchema, LastFmAlbumSchema, LastFmSearchAlbumSchema } from "@/lib/zod/schemas";
import { environment } from '@/lib/zod/environment';

export const dynamic = 'force-dynamic' // defaults to force-static

const lastFmAlbumSearch = async (q: string): Promise<z.infer<typeof LastFmSearchAlbumSchema>[]> => {
  const args = {
    album: q,
    api_key: environment.LASTFM_API_KEY,
    format: 'json',
    method: 'album.search',
  }
  const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results.albummatches.album) {
    return [];
  }

  return LastFmSearchAlbumSchema.array().parse(data.results.albummatches.album);
}

const lastFmAlbumGetInfo = async (album: z.infer<typeof LastFmSearchAlbumSchema>): Promise<z.infer<typeof LastFmAlbumSchema>> => {
  const args = {
    album: album.name,
    artist: album.artist,
    api_key: environment.LASTFM_API_KEY,
    format: 'json',
    method: 'album.getInfo',
  }
  const url = `${environment.LASTFM_BASE_URL}/?${new URLSearchParams(args)}`;
  const res = await fetch(url);
  const data = await res.json();
  return LastFmAlbumSchema.parse(data.album);
}

export async function GET(request: NextRequest): Promise<void | Response> {

  try {
    const { searchParams } = new URL(request.url);
    const q = decodeURIComponent(z.string().min(2).max(200).trim().parse(searchParams.get('q')));
    const albumsFound = (await lastFmAlbumSearch(q)).filter((elt) => elt.image.some(img => img['#text'])).slice(0, 10);

    const output = [];
    for (const album of albumsFound) {
      const albumInfo = await lastFmAlbumGetInfo(album);
      output.push(albumInfo);
    }

    return Response.json({ success: true, data: output });
  } catch (e: any) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message });
    return Response.json({ success: false, error: e });
  }
}
