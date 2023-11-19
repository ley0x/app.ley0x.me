'use client';

import { Stack } from '@chakra-ui/react';
import React from 'react'
import Album from './album';
import SearchBar from './searchbar';
import { useAtom } from 'jotai';
import { albumsCovers } from '@/store/store';

const Covers = () => {
  const [albums] = useAtom(albumsCovers);
  return (
    <Stack spacing={4} direction='column' align='center'>
      <SearchBar />
      {albums.slice(0, 10).map((album) => (
        <Album album={album}
          key={album.id}
        />
      ))}
    </Stack>
  )
}



export default Covers;
