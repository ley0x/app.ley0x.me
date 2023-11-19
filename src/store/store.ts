import { AlbumSchema } from "@/lib/zod/schemas";
import { atom } from "jotai";
import { z } from "zod";

export const lyricsBackground = atom<string | null>(null);

export const selectedLyrics = atom<string>("");

export const trackLyrics = atom<string>("");
export const trackName = atom<string>("");
export const trackArtist = atom<string>("");
export const trackUrl = atom<string>("");

export const albumsCovers = atom<z.infer<typeof AlbumSchema>[]>([]);
