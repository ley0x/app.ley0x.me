'use client';

import React from 'react';
import {Prose} from '@nikolovlazar/chakra-ui-prose';
import ReactMarkdown from 'react-markdown';
import {useAtom} from 'jotai';
import {selectedLyrics, trackLyrics} from '@/store/store';
import SearchBar from './searchbar';
import { Box } from '@chakra-ui/react';

const TrackLyrics = () => {
  const [_, setSelectedText] = useAtom(selectedLyrics);

  const [lyrics] = useAtom(trackLyrics);

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection) {
      const text = selection.toString();
      if (!text) return;
      setSelectedText(text);
    }
  };

  return (
    <Box as="section" overflowX="scroll">
      <SearchBar />
      <Prose as='pre'>
        <div onMouseUp={handleSelection}>
          <ReactMarkdown>{lyrics}</ReactMarkdown>
        </div>
      </Prose>
    </Box>
  );
};

export default TrackLyrics;
