import { TColors, TSizes, TrackSchema } from "@/lib/zod/schemas";
import download from "downloadjs";
import { toPng } from "html-to-image";
import { useEffect, useRef } from "react";
import slugify from "slugify";
import { z } from "zod";

import { Text, Box, Image } from '@chakra-ui/react'
import clsx from "clsx";

type Props = {
  track: z.infer<typeof TrackSchema>,
  cover: string,
  albumTitle: string;
  txtColor: TColors,
  bgColor: TColors,
  txtSize: TSizes
}
export const Track = ({ track, cover, albumTitle, txtColor, bgColor, txtSize }: Props) => {
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
    <Box ref={ref} id={`${track.id}`} onClick={() => handleExport()} className="relative h-24 w-24 cursor-pointer overflow-hidden shadow">
      <div className="absolute inset-1 z-40 flex flex-col justify-end">
        <Text
          className={clsx("font-bold w-full rounded  ", {
            'text-black': txtColor === 'black',
            'text-white': txtColor === 'white',
            'text-red-500': txtColor === 'red',
            'text-green-500': txtColor === 'green',
            'text-blue-500': txtColor === 'blue',
            'text-yellow-500': txtColor === 'yellow',
            'bg-white/80': bgColor === 'white',
            'bg-black/80': bgColor === 'black',
            'bg-red-700/80': bgColor === 'red',
            'bg-green-700/80': bgColor === 'green',
            'bg-blue-700/80': bgColor === 'blue',
            'bg-yellow-600/80': bgColor === 'yellow',
            'text-sm': txtSize === 'sm',
            'text-md': txtSize === 'md',
            'text-lg': txtSize === 'lg',
          })}
        >
          <span className="line-clamp-4 text-center mx-auto rounded break-words overflow-hidden">
            {track.title}
          </span>
        </Text>

      </div>
      <Image
        src={cover}
        id={`${track.id}-cover`}
        alt={track.title}
        loading="lazy"
        className="absolute h-24 w-24 z-20 inset-0 mx-auto shadow"
      />
    </Box>
  )
}
