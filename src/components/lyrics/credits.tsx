import { Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  artist: string;
  track: string;
  size: 'sm' | 'md' | 'lg';
};

const Credits = ({ artist, size, track }: Props) => {
  return (
      <Text
        color='white'
        fontSize={size}
        fontWeight='semibold'
        lineHeight='tight'
        noOfLines={1}
        px='2'
      >
        {artist || "Artiste"} - {track || "Titre"}
      </Text>
  );
};

export default Credits;
