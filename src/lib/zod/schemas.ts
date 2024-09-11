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
  picture_small: z.string().url(),
  picture_medium: z.string().url(),
  picture_big: z.string().url(),
  picture_xl: z.string().url(),
  picture: z.string().url(),
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

export const LastFmTrackSchema = z.object({
  name: z.string(),
  duration: z.number().nullable(),
  artist: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  url: z.string().url(),
})

export const LastFmAlbumSchema = z.object({
  name: z.string(),
  artist: z.string(),
  url: z.string().url(),
  image: z.array(z.object({
    "#text": z.string(),
    size: z.union([z.literal('small'), z.literal('medium'), z.literal('large'), z.literal('extralarge'), z.literal('mega'), z.literal("")]),
  })),
  listeners: z.string().nullish(),
  playcount: z.string().nullish(),
  tags: z.union([
    z.literal(""),
    z.object({
      tag: z.array(z.object({
        name: z.string(),
        url: z.string().url(),
      })),
    })]).nullish(),
  tracks: z.object({
      track: z.union([z.array(LastFmTrackSchema), LastFmTrackSchema]).nullish(),
    }).nullish()
})


export const LastFmSearchAlbumSchema = z.object({
  name: z.string(),
  artist: z.string(),
  url: z.string().url(),
  image: z.array(z.object({
    "#text": z.string(),
    size: z.union([z.literal('small'), z.literal('medium'), z.literal('large'), z.literal('extralarge'), z.literal('mega'), z.literal("")]),
  }))
})


export const AlbumSchemaSoft = z.object({
  id: z.number(),
  title: z.string(),
  link: z.string(),
  cover_medium: z.string(),
  cover_big: z.string(),
  cover_xl: z.string(),
  type: z.string(),
  tracklist: z.string().url(),
  fans: z.number(),
  release_date: z.string(),
  record_type: z.literal('album')
    .or(z.literal('single'))
    .or(z.literal('compilation'))
    .or(z.literal('ep'))
    .or(z.literal('live')
      .or(z.literal("compile"))),
});


export const TrackSchema = z.object({
  id: z.number(),
  readable: z.boolean(),
  title: z.string(),
  title_short: z.string(),
  link: z.string().url(),
  duration: z.number(),
  track_position: z.number(),
  disk_number: z.number(),
});


export const ColorsSchema = z.enum(['black', 'white', 'red', 'green', 'blue', 'yellow']);
export type TColors = z.infer<typeof ColorsSchema>;
export const SizesSchema = z.enum(['sm', 'md', 'lg']);
export type TSizes = z.infer<typeof SizesSchema>;
