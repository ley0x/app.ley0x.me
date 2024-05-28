import { AlbumSchema, AlbumSchemaSoft } from "@/lib/zod/schemas";
import * as deezerApi from "deezer-api-ts";
import { NextRequest } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest): Promise<void | Response> {

  try {
    const { searchParams } = new URL(request.url);
    const id = z.number().parse(parseInt(searchParams.get('id') ?? ''));

    const data = await fetch(`https://api.deezer.com/artist/${id}/albums?limit=200`).then(res => res.json()).then(data => {console.log(data); return data;}).then(z.object({data:AlbumSchemaSoft.array()}).parse);
    return Response.json({ success: true, data: data.data });
  } catch (e: any) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message });
    return Response.json({ success: false, error: e });
  }
}
