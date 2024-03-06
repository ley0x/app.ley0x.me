import { AlbumSchema, AlbumSchemaSoft } from "@/lib/zod/schemas";
import * as deezerApi from "deezer-api-ts";
import { NextRequest } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {

  try {
    const { searchParams } = new URL(request.url);
    const id = z.number().parse(parseInt(searchParams.get('id') ?? ''));

    const res = await deezerApi.getArtistAlbums(id);
    const data = AlbumSchemaSoft.array().parse(res.data);
    return Response.json({ success: true, data });
  } catch (e: any) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message });
    return Response.json({ success: false, error: e });
  }
}
