'use client';

import {lyricsBackground, trackArtist, trackName} from '@/store/store';
import {Box} from '@chakra-ui/react';
import {useAtom} from 'jotai';
import Image from 'next/image';
import React, { useCallback, useRef } from 'react';
import Lyrics from './lyrics';
import Tag from './tag';

import slugify from "slugify";

import { toPng } from 'html-to-image';
import download from 'downloadjs';

const LyricsCanvas = () => {
  const [img] = useAtom(lyricsBackground);
  const ref = useRef<HTMLDivElement>(null);

  const [artist] = useAtom(trackArtist);
  const [track] = useAtom(trackName);
  const handleExport = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true, pixelRatio: 1.5 })
      .then((dataUrl) => {
        const name = `${slugify(artist, {lower: true}) || "artist"}-${slugify(track, {lower: true}) || "song"}-card.png`
        download(dataUrl, name)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref, artist, track])

  return (
    <Box
      as="div"
      ref={ref}
      onClick={() => handleExport()}
      bg='orange.300'
      cursor="pointer"
      shadow="lg"
      borderRadius='sm'
      position='relative'
      maxW='md'
      id='lyrics-canvas'
      height='80'
      width={["full", '8xl']}
      overflow='hidden'
    >
      <Tag />
      <Lyrics
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
