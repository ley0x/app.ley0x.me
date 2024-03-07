import { AlbumSchemaSoft } from "@/lib/zod/schemas";
import Image from 'next/image';
import { Text, Stack } from '@chakra-ui/react'
import { z } from "zod";
import clsx from "clsx";

export type ChooseAlbum = (album: z.infer<typeof AlbumSchemaSoft>) => void;

export const Album = ({ album, chooseAlbum, active }: { album: z.infer<typeof AlbumSchemaSoft>, chooseAlbum: ChooseAlbum, active: boolean }) => {
  return (
    <Stack onClick={() => chooseAlbum(album)} mt='6' spacing='3' bgColor="gray.100" p={2} className={clsx("shadow rounded cursor-pointer", {
      'border border-gray-500': active
    })}>
      <Image
        src={album.cover_big}
        alt={album.title}
        height={100}
        width={100}
        loading="lazy"
        className="mx-auto mb-2 shadow"
      />
      <Text className="font-bold">
        {album.title}
      </Text>
      <Text>
        {new Date(album.release_date).getFullYear()}
      </Text>
    </Stack>
  )
}
