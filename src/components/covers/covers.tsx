'use client';

import { Box, Grid, Stack } from '@chakra-ui/react';
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

      <Box className="flex flex-wrap flex-row " gap={6}>
        {albums.map((album, index) => (
          <Album album={album}
            key={index}
          />
        ))}
      </Box>
    </Stack>
  )
}



export default Covers;
