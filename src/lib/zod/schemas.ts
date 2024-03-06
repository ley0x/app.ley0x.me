import { z } from 'zod';

export const GetLyricsApi = z.object({
  success: z.boolean(),
  error: z.string().optional(),
  data: z
    .object({
      url: z.string().url(),
      lyrics: z.string(),
      artist: z.string(),
      title: z.string(),
    })
    .optional(),
});



export const ArtistSchema = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string().url(),
  picture_medium: z.string().url(),
  picture_big: z.string().url(),
  picture_xl: z.string().url(),
  tracklist: z.string().url(),
  type: z.string(),
});

export const AlbumSchema = z.object({
  id: z.number(),
  title: z.string(),
  link: z.string(),
  cover_medium: z.string(),
  cover_big: z.string(),
  cover_xl: z.string(),
  nb_tracks: z.number(),
  type: z.string(),
  tracklist: z.string().url(),
  artist: ArtistSchema,
});
