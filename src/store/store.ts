import { atom } from "jotai";

export const lyricsBackground = atom<string | null>(null);
export const trackLyrics = atom<string>("");
export const selectedLyrics = atom<string>("");
