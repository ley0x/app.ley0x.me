import ExportAsImage from '@/components/lyrics/export-as-image';
import ImageUploader from '@/components/lyrics/image-uploader';
import LyricsCanvas from '@/components/lyrics/lyrics-canvas';
import TrackLyrics from '@/components/lyrics/track-lyrics';
import {Heading, Stack} from '@chakra-ui/react';

export default async function Lyrics() {
  return (
    <main className='flex flex-col justify-between p-12'>
      <Heading as='h1'>Lyrics</Heading>
      <Stack spacing={4} direction='column'>
        <LyricsCanvas />
        <ExportAsImage />
        <ImageUploader />
        <TrackLyrics />
      </Stack>
    </main>
  );
}
