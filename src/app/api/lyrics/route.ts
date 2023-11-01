import { environment } from '@/lib/zod/environment';
import { load } from 'cheerio';
import { NextRequest } from 'next/server';
import { z } from 'zod';

async function searchTrack(query: string) {
  const res = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(query)}`, {
    headers: {
      Authorization: `Bearer ${environment.GENIUS_CLIENT_ACCESS_TOKEN}`,
    },
  });
  const data = await res.json();
  if (!data.response.hits.length) return null;
  return z.string().url().parse(data?.response?.hits?.[0]?.result?.url);
}

async function getLyrics(query: string) {
  const url = await searchTrack(query);
  if (!url) return null;
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
  if (!lyrics) return null;
  return lyrics.trim();
};


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = z.string().parse(searchParams.get('q'));

    const lyrics = await getLyrics(q);
    return Response.json({ success: true, lyrics });
  } catch (e: any) {
    return Response.json({ success: false, error: e });
  }
}
