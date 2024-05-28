import { TrackSchema } from "@/lib/zod/schemas";
import * as deezerApi from "deezer-api-ts";
import { NextRequest } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {

  try {
    const { searchParams } = new URL(request.url);
    const id = z.number().parse(parseInt(searchParams.get('id') ?? ''));
    console.log('Album id', id);

    const url = `https://api.deezer.com/album/${id}/tracks?limit=100`

    const data = await fetch(url).then(res => res.json()).then(z.object({ data: TrackSchema.array() }).parse);
    console.log('Data', data.data.map(track => track.title));

    return Response.json({ success: true, data: data.data });
  } catch (e: any) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message });
    return Response.json({ success: false, error: e });
  }
}
