"use client";
import { AlbumSchemaSoft, ArtistSchema, TrackSchema } from '@/lib/zod/schemas';
import { Box, Divider, Heading, Flex, VStack, Button } from '@chakra-ui/react'

import React, { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';
import { Artist } from '@/components/image-generator/artist';
import { Track } from '@/components/image-generator/track';
import { ChooseAlbum, Album } from '@/components/image-generator/album';
import SearchBar from '@/components/image-generator/searchbar';
import DownloadAll from '@/components/image-generator/download-all';
import { FaPlus } from "react-icons/fa6";

import { v4 as uuidv4 } from 'uuid';

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

export default function ImageGenerator() {
  const recordType = "single";
  const [artists, setArtists] = useState<z.infer<typeof ArtistSchema>[] | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<z.infer<typeof ArtistSchema> | null>(null);
  const [albums, setAlbums] = useState<z.infer<typeof AlbumSchemaSoft>[] | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<z.infer<typeof AlbumSchemaSoft> | null>(null);
  const [selectedTracks, setSelectedTracks] = useState<z.infer<typeof TrackSchema>[] | null>(null);
  const [nb, setNb] = useState(6);
  const [cover, setCover] = useState<string | null>(null);

  useEffect(() => {
    if (selectedAlbum) {
      setCover(selectedAlbum.cover_big);
    }
  }, [selectedAlbum]);

  const chooseAlbum: ChooseAlbum = useCallback(async (album) => {
    setSelectedAlbum(null);
    setSelectedTracks(null);
    setSelectedAlbum(album);
    if (album) {
      const tracks = await getAlbumTracks(album.id);
      if (tracks) {
        setSelectedTracks(tracks);
      };
    };
  }, [setSelectedTracks]);

  const reset = useCallback(() => {
    setSelectedArtist(null);
    setSelectedAlbum(null);
    setSelectedTracks(null);
  }, [setSelectedArtist, setSelectedAlbum, setSelectedTracks])

  return (
    <Box as="main" height="max">
      <Heading as="h1">Générateur d&apos;image pour Tierlists</Heading>
      <Divider className="my-6" />
      <Flex direction={"column"}>
        <div>
          <Heading mb="4" as="h2" size="md">Cherchez un artiste :</Heading>
          <SearchBar setArtists={setArtists} reset={reset} setAlbums={setAlbums} />
        </div>
        <Divider className="my-6" />
        {artists && (
          <>
            <div>
              <Heading as="h2" size="md">Choisissez le bon artiste :</Heading>
              <Flex gap="2" wrap="wrap">
                {artists && artists.map((artist) => (
                  <Artist
                    key={uuidv4()}
                    artist={artist}
                    setSelectedArtist={setSelectedArtist}
                    setAlbums={setAlbums}
                    recordType={recordType}
                    reset={reset}
                    active={selectedArtist?.id === artist.id}
                  />))}
              </Flex>
            </div>
            <Divider className="my-6" />
          </>
        )}
        {albums && albums.length > 0 && (
          <>
            <div>
              <Heading as="h2" size="md">Sélectionnez un album :</Heading>
              <Flex gap="2" wrap="wrap">
                {albums && albums.slice(0, nb).map((album) => (<Album key={uuidv4()} album={album} chooseAlbum={chooseAlbum} active={selectedAlbum?.id === album.id} />)
                )}
              </Flex>
              {nb >= albums.length ? null : <Button className="flex items-center border border-gray-500 mt-4" onClick={() => setNb(nb + 6)}><FaPlus className="mr-2" />Voir plus</Button>}
            </div>
            <Divider className="my-6" />
          </>
        )}
        {cover && selectedTracks && selectedAlbum && (
          <div className="flex flex-col w-full">
            <Heading as="h2" size="md">Images générées :</Heading>
            <Flex gap="2" mt="6" wrap="wrap">
              {selectedTracks.map((track) => (<Track albumTitle={selectedAlbum.title} key={uuidv4()} track={track} cover={cover} />))}
            </Flex>
            <DownloadAll albumTitle={selectedAlbum.title} tracks={selectedTracks} />
          </div>
        )}
      </Flex>
    </Box>
  )
}
