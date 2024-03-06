"use client";
import { AlbumSchemaSoft, ArtistSchema, TrackSchema } from '@/lib/zod/schemas';
import { Text, Box, Button, Divider, Heading, Stack, Flex, VStack } from '@chakra-ui/react'

import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import { toPng } from 'html-to-image';
import slugify from 'slugify';
import download from 'downloadjs';

const getArtistAlbums = async (id: number) => {
  const url = new URL('/api/deezer/get-artist-albums', window.location.origin);
  url.searchParams.set('id', encodeURIComponent(id));
  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error(res);
    return;
  }

  const json = await res.json()
  const albums = AlbumSchemaSoft.array().parse(json.data);

  if (!json.success) {
    console.error(json);
    return;
  }
  if (!albums) {
    console.error(json);
    return;
  }
  return albums;
};

const getAlbumTracks = async (id: number) => {
  const url = new URL('/api/deezer/get-album-tracks', window.location.origin);
  url.searchParams.set('id', encodeURIComponent(id));
  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error(res);
    return;
  }

  const json = await res.json()
  const tracks = TrackSchema.array().parse(json.data);

  if (!json.success) {
    console.error(json);
    return;
  }
  if (!tracks) {
    console.error(json);
    return;
  }
  return tracks;
};

const searchArtist = async (id: string) => {
  const url = new URL('/api/deezer/search/artist', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(id));
  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error(res);
    return;
  }

  const json = await res.json()
  const artists = ArtistSchema.array().parse(json.data);

  if (!json.success) {
    console.error(json);
    return;
  }
  if (!artists) {
    console.error(json);
    return;
  }
  return artists;
};

const Artist = ({ artist }: { artist: z.infer<typeof ArtistSchema> }) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log("clicked");
  }
  return (
    <Stack mt='6' spacing='3' bgColor="gray.100" p={2} className="shadow">
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

type ChooseAlbum = (album: z.infer<typeof AlbumSchemaSoft>) => void;

const Album = ({ album, chooseAlbum }: { album: z.infer<typeof AlbumSchemaSoft>, chooseAlbum: ChooseAlbum}) => {
  return (
    <Stack onClick={() => chooseAlbum(album)} mt='6' spacing='3' bgColor="gray.100" p={2} className="shadow cursor-pointer">
      <Image
        src={album.cover_big}
        alt={album.title}
        height={100}
        width={100}
        loading="lazy"
        className="mx-auto mb-2 shadow"
      />
      <Text className="font-bold">
        {album.title}
      </Text>

      <Text>
        {new Date(album.release_date).getFullYear()}
      </Text>
    </Stack>
  )
}

const Track = ({ track, cover }: { track: z.infer<typeof TrackSchema>, cover: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleExport = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true, pixelRatio: 1.5 })
      .then((dataUrl) => {
        const name = `${slugify(`${track.track_position}-${track.title}`, { lower: true })}.png`
        download(dataUrl, name)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  return (
    <Box ref={ref} onClick={() => handleExport()} className="relative h-24 w-24 cursor-pointer">
      <Text
        className="absolute z-30 bottom-0 font-bold w-full text-gray-900 py-1 px-px"
      >
        <span className="line-clamp-2 text-md text-center bg-white/80 w-11/12 mx-auto rounded break-normal overflow-hidden">
          {track.title}
        </span>
      </Text>
      <Image
        src={cover}
        alt={track.title}
        height={100}
        width={100}
        loading="lazy"
        className="absolute z-20 inset-0 mx-auto mb-2 shadow"
      />
    </Box>
  )
}
export default function ImageGenerator() {
  const artist = "Vald";
  const recordType = "album";
  const [artists, setArtists] = useState<z.infer<typeof ArtistSchema>[] | null>(null);
  const [albums, setAlbums] = useState<z.infer<typeof AlbumSchemaSoft>[] | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<z.infer<typeof AlbumSchemaSoft> | null>(null);
  const [selectedTracks, setSelectedTracks] = useState<z.infer<typeof TrackSchema>[] | null>(null);

  const search = async (artist: string) => {
    const artists = await searchArtist(artist);
    if (!artists) return null;
    setArtists(artists.slice(0, 5));
    const albums = await getArtistAlbums(artists[0].id);
    if (!albums) return null;
    setAlbums(albums.filter((album) => album.record_type === recordType).sort((a, b) => b.fans - a.fans));
    setSelectedAlbum(albums.filter((album) => album.record_type === recordType).sort((a, b) => b.fans - a.fans)[2]);
    // if (!selectedAlbum) return null;
    // const tracks = await getAlbumTracks(selectedAlbum.id);
    // if (!tracks) return null;
    // setSelectedTracks(tracks);
    // return tracks;
  }

  const chooseAlbum : ChooseAlbum = useCallback(async (album) => {
    setSelectedAlbum(null);
    setSelectedTracks(null);
    console.log("Set album :", album.title)
    setSelectedAlbum(album);
    if (selectedAlbum) {
      const tracks = await getAlbumTracks(album.id);
      if (tracks) {
        console.log("Set tracks :", tracks.map((track) => track.title))
        setSelectedTracks(tracks);
      };
    };
  }, [selectedAlbum]);

  return (
    <Box as="main" height="max">
      <Heading as="h1">Générateur d'image pour Tierlists</Heading>
      <VStack>
        <div>
          <Heading as="h2" size="md">Cherchez un artiste :</Heading>
          <Button onClick={() => search(artist)}>Search</Button>
        </div>
        <Divider className="my-4" />
        <div>
          <Heading as="h2" size="md">Choisissez votre artiste :</Heading>
          <Flex mt='6' gap="2" wrap="wrap">
            {artists && artists.map((artist) => (<Artist key={artist.id} artist={artist} />))}
          </Flex>
        </div>
        <Divider className="my-4" />
        <div>
          <Heading as="h2" size="md">Sélectionnez un album :</Heading>
          <Flex mt='6' gap="2" wrap="wrap">
            {albums && albums.map((album) => (<Album key={album.id} album={album} chooseAlbum={chooseAlbum} />))}
          </Flex>
        </div>
        <Divider className="my-4" />
        <div>
          <Heading as="h2" size="md">Images générées :</Heading>
          <Flex mt='6' gap="2" wrap="wrap">
            {selectedTracks && selectedAlbum && selectedTracks.map((track) => (<Track key={track.id} track={track} cover={selectedAlbum.cover_big} />))}
          </Flex>
        </div>
      </VStack>
    </Box>
  )
}
