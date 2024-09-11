import { LastFmAlbumSchema } from '@/lib/zod/schemas';
import { Button, Flex, Heading, Stack, Tag, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react'
import slugify from 'slugify';
import { z } from 'zod';
import { MdOutlineContentCopy, MdOutlineFileDownload } from "react-icons/md";
import Link from 'next/link';
import { copyImageToClipboard } from '@/lib/utils';

type Props = {
  album: z.infer<typeof LastFmAlbumSchema>
}

const Album = ({ album }: Props) => {

  const toDataURL = async (url: string): Promise<string> => {
    const data = await fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
    return data;
  };

  const download = async () => {
    const a = document.createElement("a");
    let link = getAlbumSrcLink(album);
    if (!link) {
      return;
    }
    a.href = await toDataURL(link);
    a.download =
      slugify(album.artist + " " + album.name + " cover").toLocaleLowerCase() +
      ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  const getAlbumSrcLink = (album: z.infer<typeof LastFmAlbumSchema>) => {
    let src = album.image.find((i) => i.size === "mega")?.['#text'];

    if (!src) { src = album.image.find((i) => i.size === "large")?.['#text']; }
    if (!src) { src = album.image.find((i) => i.size === "large")?.['#text']; }
    if (!src) { src = album.image.find((i) => i.size === "medium")?.['#text']; }
    if (!src) { src = album.image.find((i) => i.size === "small")?.['#text']; }
    if (!src) { src = album.image.find((i) => i.size === "")?.['#text']; }
    if (!src) src = album.image[0]["#text"];
    if (!src) src = "/";
    return src;
  };

  const copy = async (album: z.infer<typeof LastFmAlbumSchema>) => {
    let link = getAlbumSrcLink(album);
    if (!link) {
      return;
    }
    await copyImageToClipboard(link);
  };

  const getTrackNumber = (album: z.infer<typeof LastFmAlbumSchema>) => {
    if (!album.tracks) return 1;
    if (!album.tracks.track) return 1;
    const tracks = album.tracks.track;
    // test if tracks is a single object or an array of objects
    if (Array.isArray(tracks)) {
      return tracks.length;
    }
    return 1;
  };

  const getArrayOfTags = (album: z.infer<typeof LastFmAlbumSchema>) => {
    if (!album.tags) return [];
    if (!album.tags.tag) return [];
    const tags = album.tags.tag;
    return tags.map((tag) => tag.name);
  };

  return (
    <Flex flexDirection={"column"} justifyContent="space-between" gap={2} p="3" w='250px' maxWidth="full" bg='white' maxW="full" className="shadow">
      <Stack mt="2" spacing='1'>
        <Link href={album.url} target="_blank">
          <Image
            src={getAlbumSrcLink(album)}
            alt={`Cover of the album ${album.name}`}
            height={200}
            width={200}
            loading="lazy"
            unoptimized
            className="mx-auto my-0"
          />
        </Link>
        <Heading size='md'>
          {album.artist} - {album.name}
        </Heading>
        <Text>{getTrackNumber(album)} tracks</Text>
        <Flex flexWrap="wrap" gap={2}>
          {getArrayOfTags(album).map((tag) => <Tag colorScheme="orange" width="fit-content" key={tag}>{tag}</Tag>)}
        </Flex>
      </Stack>
      <Stack width="full" direction="column">
        <Button
          width="full"
          size="sm"
          colorScheme={useColorModeValue('orange', 'orange')}
          variant="solid"
          className="text-black hover:text-white border border-gray-400 hover:border-transparent"
          onClick={() => download()} leftIcon={<MdOutlineFileDownload />}
        >
          Télécharger
        </Button>
        <Button
          width="full"
          size="sm"
          colorScheme={useColorModeValue('orange', 'orange')}
          variant="solid"
          className="text-black hover:text-white border border-gray-400 hover:border-transparent"
          onClick={() => copy(album)} leftIcon={<MdOutlineContentCopy />}
        >
          Copier
        </Button>
      </Stack>
    </Flex>
  )
}

export default Album;
