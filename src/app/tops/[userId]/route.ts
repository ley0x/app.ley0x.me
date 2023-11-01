import { environment } from "@/lib/zod/environment"
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {userId: string}}) {
  console.log(params.userId)

  const url = new URL(environment.LASTFM_BASE_URL);
  const urlParams = new URLSearchParams(url.search);
  urlParams.append('method', 'album.getinfo');
  urlParams.append('api_key', environment.LASTFM_API_KEY);
  urlParams.append('format', 'json');
  urlParams.append('artist', 'Damso');
  urlParams.append('album', 'Ipséité');
  url.search = urlParams.toString();

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': `${environment.LASTFM_APPLICATION_NAME}/1.0`,
    },
  })

  const data = await res.json()
 
  return Response.json({ data })
}
