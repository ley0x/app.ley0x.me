import * as deezerApi from "deezer-api-ts";
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ArtistSchema } from "@/lib/zod/schemas";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<void | Response> {

  try {
    const { searchParams } = new URL(request.url);
    const q = decodeURIComponent(z.string().min(2).max(200).trim().parse(searchParams.get('q')));

    const opts = {}
    const res = await deezerApi.searchArtists(q, opts);
    const data = ArtistSchema.array().parse(res.data)
    return Response.json({ success: true, data });
  } catch (e: any) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message });
    return Response.json({ success: false, error: e });
  }
}
