'use client';

import {lyricsBackground} from '@/store/store';
import {Box} from '@chakra-ui/react';
import {useAtom} from 'jotai';
import Image from 'next/image';
import React from 'react';
import Lyrics from './lyrics';
import Tag from './tag';



const LyricsCanvas = () => {
  const [img] = useAtom(lyricsBackground);

  return (
    <Box
      bg='blue.400'
      borderRadius='3xl'
      position='relative'
      maxW='md'
      id='lyrics-canvas'
      height='80'
      width='96'
      overflow='hidden'
    >
      <Tag />
      <Lyrics
        artist='Damso'
        track='Débrouillard'
        size='lg'
      />
      {!!img && (
        <Box zIndex='base' position='absolute' inset='0'>
          <Image
            src={img}
            alt='Illustration to lyrics'
            layout='fill'
            objectFit='cover'
          />
        </Box>
      )}
    </Box>
  );
};

export default LyricsCanvas;
