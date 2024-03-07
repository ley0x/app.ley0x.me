import { Box, Text } from '@chakra-ui/react';
import React, { MouseEventHandler } from 'react';
import Image from 'next/image';

interface AlbumProps {
  title: string;
  artist: string;
  cover: string; 
  onClick: MouseEventHandler;
}

const Album: React.FC<AlbumProps> = ({ title, artist, cover, onClick }) => (
  <Box onClick={onClick} style={{ cursor: 'pointer' }}>
    <Image src={cover} height={250} width={250} alt={`${title} by ${artist}`} />
    <Box>
      <Text>{title}</Text>
      <Text>{artist}</Text>
    </Box>
  </Box>
);

export default Album;
