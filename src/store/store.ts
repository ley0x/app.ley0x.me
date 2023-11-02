import { atom } from "jotai";

export const lyricsBackground = atom<string | null>(null);

export const selectedLyrics = atom<string>("");

export const trackLyrics = atom<string>("");
export const trackName = atom<string>("");
export const trackArtist = atom<string>("");
export const trackUrl = atom<string>("");

