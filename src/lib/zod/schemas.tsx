import {z} from 'zod';

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
