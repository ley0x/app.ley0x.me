import { TrackSchema } from '@/lib/zod/schemas';
import { Button } from '@chakra-ui/react';
import download from 'downloadjs';
import { toPng } from 'html-to-image'
import React from 'react'
import slugify from 'slugify';
import { z } from 'zod';

type TTrack = z.infer<typeof TrackSchema>

type Props = {
  tracks: TTrack[] | null;
  albumTitle: string;
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const DownloadAll = ({ tracks, albumTitle }: Props) => {
  if (!tracks) return null;
  const downloadAll = async () => {
    for (const track of tracks) {
      await downloadTrack(track);
      await wait(100);
    }
  }

  const downloadTrack = async (track: TTrack) => {
    const ref = document.getElementById(`${track.id}`);
    if (!ref) return;

    await toPng(ref, { cacheBust: true, pixelRatio: 3 })
      .then((dataUrl) => {
        const name = `${slugify(`${albumTitle}-${track.track_position}-${track.title}`, { lower: true })}.png`
        download(dataUrl, name)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Button onClick={() => downloadAll()} colorScheme={"orange"} variant="solid" className="text-black hover:text-white border border-black w-min mt-6 hover:border-transparent">
      Tout télécharger
    </Button>
  )
}

export default DownloadAll;
