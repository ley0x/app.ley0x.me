'use client';

import React, { useState, useEffect, MouseEventHandler } from 'react';
import Album from '../_common/album';
import { AlbumSchema } from '@/lib/zod/schemas';
import { Box, Button } from '@chakra-ui/react';
import Head from 'next/head';

interface TournamentBracketProps {
  albums: { title: string; artist: string; cover: string }[];
}

const TournamentBracket: React.FC<TournamentBracketProps> = () => {
  const [tournament, setTournament] = useState<{ title: string; artist: string; cover: string }[]>([]);
  const [rankings, setRankings] = useState<{ title: string; artist: string; position: number }[]>([]);

  useEffect(() => {
    // Update rankings whenever tournament changes
    const updatedRankings = tournament.map((album, index) => ({
      title: album.title,
      artist: album.artist,
      position: index + 1,
    }));
    setRankings(updatedRankings);
  }, [tournament]);

  const handleAlbumClick = (selectedAlbumIndex: number) => {
    // Simulate a match by removing the selected album and moving it to the end of the tournament
    const updatedTournament = [...tournament];
    const selectedAlbum = updatedTournament.splice(selectedAlbumIndex, 1)[0];
    updatedTournament.push(selectedAlbum);
    setTournament(updatedTournament);
  };


  const handleClick: MouseEventHandler = async () => {
    const url = new URL('/api/deezer/search/album', window.location.origin);
    url.searchParams.set('q', encodeURIComponent("superfly"));
    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(res);
      return;
    }

    const json = await res.json()
    const albums = AlbumSchema.array().parse(json.data);

    if (!json.success) {
      console.error(json);
      return;
    }
    if (!albums) {
      console.error(json);
      return;
    }
    
    setTournament(albums.map((album) => ({
      title: album.title,
      artist: album.artist.name,
      cover: album.cover_medium,
    })));
  };

  return (
    <Box>
      <Head>Tournament Bracket</Head>
      <Button onClick={handleClick}>Click me</Button>
      <Box>
        {tournament.map((album, index) => (
          <Album
            key={index}
            title={album.title}
            artist={album.artist}
            cover={album.cover}
            onClick={() => handleAlbumClick(index)}
          />
        ))}
      </Box>
      <Head>Rankings</Head>
      <ul>
        {rankings.map((rank, index) => (
          <li key={index}>
            {`${rank.position}. ${rank.title} by ${rank.artist}`}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default TournamentBracket;
