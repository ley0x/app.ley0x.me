import { TrackSchema } from "@/lib/zod/schemas";
// import Image from 'next/image';
import download from "downloadjs";
import { toPng } from "html-to-image";
import { useCallback, useEffect, useRef } from "react";
import slugify from "slugify";
import { z } from "zod";

import { Text, Box, Image } from '@chakra-ui/react'

type Props = {
  track: z.infer<typeof TrackSchema>,
  cover: string,
  albumTitle: string;
}
export const Track = ({ track, cover, albumTitle }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log('track', track.title);
  }, [track]);

  useEffect(() => {
    console.log('cover', cover);
  }, [cover]);

  const handleExport = () => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true, pixelRatio: 3 })
      .then((dataUrl) => {
        const name = `${slugify(`${albumTitle}-${track.track_position}-${track.title}`, { lower: true })}.png`
        download(dataUrl, name)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Box ref={ref} id={`${track.id}`} onClick={() => handleExport()} className="relative h-24 w-24 cursor-pointer">
      <Text
        className="absolute z-30 bottom-0 font-bold w-full text-gray-900 py-1 px-px"
      >
        <span className="line-clamp-2 text-md text-center bg-white/80 w-11/12 mx-auto rounded break-normal overflow-hidden">
          {track.title}
        </span>
      </Text>
      <Image
        src={cover}
        id={`${track.id}-cover`}
        alt={track.title}
        height={100}
        width={100}
        loading="lazy"
        className="absolute z-20 inset-0 mx-auto mb-2 shadow"
      />
    </Box>
  )
}
