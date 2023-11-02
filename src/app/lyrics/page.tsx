import ImageUploader from '@/components/lyrics/image-uploader';
import LyricsCanvas from '@/components/lyrics/lyrics-canvas';
import TrackLyrics from '@/components/lyrics/track-lyrics';
import {Divider, Flex, Heading} from '@chakra-ui/react';

export default async function Lyrics() {
  return (
    <Flex direction="column" as="main" height="max">
      <Heading as='h1'>Créez vos images personnalisées avec les paroles de vos chansons préférées.</Heading>
      <Divider my="6"/>
      <Flex direction="column" gap={4} maxW="7xl" width="full" mx="auto" my="0">
        <LyricsCanvas />
        <ImageUploader />
        <TrackLyrics />
      </Flex>
    </Flex>
  );
}
