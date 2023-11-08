import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from 'react-icons/bi';
import Credits from './credits';
import { useAtom } from 'jotai';
import { selectedLyrics, trackArtist, trackName } from '@/store/store';

type Props = {
  size: 'sm' | 'md' | 'lg';
  noOfLines?: number;
};

const Lyrics = ({ size, noOfLines }: Props) => {

  const [lyrics] = useAtom(selectedLyrics);
  const [artist] = useAtom(trackArtist);
  const [track] = useAtom(trackName);

  return (
    <Flex
      direction='column'
      position='absolute'
      bottom='2'
      left='0'
      paddingRight="6"
      paddingLeft="6"
      zIndex='sticky'
      gap="2"
    >
      <Flex
        color='white'
        gap="2"
      >
        <Flex as="span">
          <BiSolidQuoteAltLeft style={{ fontSize: "2rem" }} />
        </Flex>
        <Text
          bg='white'
          color='black'
          fontSize={size}
          fontWeight='semibold'
          lineHeight='tight'
          noOfLines={noOfLines ?? 5}
          px='2'
        >
          {lyrics}
        </Text>
        <Flex as="span" alignItems="end">
          <BiSolidQuoteAltRight style={{ fontSize: "2rem" }} />
        </Flex>
      </Flex>
      <Credits artist={artist} track={track} size={size} />
    </Flex>
  );
};

export default Lyrics;
