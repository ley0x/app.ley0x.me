
import { AlbumSchemaSoft, ArtistSchema, TrackSchema } from "@/lib/zod/schemas";
import { MouseEventHandler } from "react";
import { z } from "zod";
import Image from 'next/image';
import { Stack, Text } from '@chakra-ui/react'
import clsx from "clsx";

type Props = {
  artist: z.infer<typeof ArtistSchema>,
  setSelectedArtist: (artist: z.infer<typeof ArtistSchema>) => void,
  setAlbums: (albums: z.infer<typeof AlbumSchemaSoft>[] | null) => void,
  recordType: "album" | "single" | "compilation" | "ep" | "live",
  reset: () => void,
  active: boolean,
}

const getArtistAlbums = async (id: number): Promise<z.infer<typeof AlbumSchemaSoft>[]> => {
  const url = new URL('/api/deezer/get-artist-albums', window.location.origin);
  url.searchParams.set('id', encodeURIComponent(id));
  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error(res);
    return [];
  }

  const json = await res.json()
  const albums = AlbumSchemaSoft.array().parse(json.data);

  if (!json.success) {
    console.error(json);
    return [];
  }
  if (!albums) {
    console.error(json);
    return [];
  }
  return albums;
};

export const Artist = ({ active, artist, reset, setSelectedArtist, setAlbums, recordType }: Props) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    reset()
    setSelectedArtist(artist);

    const albums = await getArtistAlbums(artist.id);
    if (albums) {
      setAlbums(albums.filter((album) => album.record_type != recordType).sort((a, b) => b.fans - a.fans));
    };
  }
  return (
    <Stack mt='6' spacing='3' bgColor="gray.100" p={2} className={clsx("shadow rounded", {
      'border border-gray-500': active
    })}>
      <button onClick={handleClick}>
        <Image
          src={artist.picture_xl}
          alt={artist.name}
          height={100}
          width={100}
          loading="lazy"
          className="mx-auto mb-2 shadow rounded-full"
        />
        <Text className="font-bold">
          {artist.name}
        </Text>
      </button>
    </Stack>
  )
}
