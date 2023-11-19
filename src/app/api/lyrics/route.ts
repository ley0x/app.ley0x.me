import { environment } from '@/lib/zod/environment';
import { load } from 'cheerio';
import { NextRequest } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic' // defaults to force-static

async function searchTrack(query: string) {
  const res = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(query)}`, {
    headers: {
      Authorization: `Bearer ${environment.GENIUS_CLIENT_ACCESS_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Error while fetching");
  const data = await res.json();
  if (!data.response.hits.length) throw new Error('No results found');

  const schema = z.object({
    url: z.string().url(),
    title: z.string(),
    primary_artist: z.object({
      name: z.string(),
    }),
  })
  const track = schema.parse(data?.response?.hits?.[0]?.result);
  console.log(track);
  return track;
}

async function getLyrics(url: string) {
  const res = await fetch(url);
  const data = await res.text();
  const $ = load(data);
  let lyrics = $('div[class="lyrics"]').text().trim();
  if (!lyrics) {
    lyrics = '';
    $('div[class^="Lyrics__Container"]').each((_, elem) => {
      if ($(elem).text().length !== 0) {
        let snippet = $(elem).html()
          ?.replace(/<br>/g, '\n')
          ?.replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');
        if (snippet) {
          lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
        }
      }
    });
  }
  if (!lyrics) throw new Error('Could not find lyrics');
  return lyrics.trim();
};


export async function GET(request: NextRequest, route:any): Promise<void | Response> {

  try {
    console.log("Route :", route);

    const { searchParams } = new URL(request.url);
    const q = z.string().parse(searchParams.get('q'));
    const { url, title, primary_artist: {name} } = await searchTrack(q);
    const lyrics = await getLyrics(url);
    return Response.json({
      success: true, data: {
        url,
        title,
        artist: name,
        lyrics,
      }
    });
  } catch (e: any) {
    if (e instanceof Error) return Response.json({ success: false, error: e.message });
    return Response.json({ success: false, error: e });
  }
}
