import { AlbumSchema } from '@/lib/zod/schemas';
import { Button, Card, CardBody, CardFooter, Divider, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react'
import slugify from 'slugify';
import { z } from 'zod';
import { MdOutlineFileDownload } from "react-icons/md";
import Link from 'next/link';

type Props = {
  album: z.infer<typeof AlbumSchema>
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
  const download = async (quality: number) => {
    const a = document.createElement("a");
    switch (quality) {
      case 1000:
        a.href = await toDataURL(album.cover_xl);
        break;
      case 500:
        a.href = await toDataURL(album.cover_big);
        break;
      case 250:
        a.href = await toDataURL(album.cover_medium);
      default:
        a.href = await toDataURL(album.cover_xl);
    }
    a.download =
      slugify(album.artist.name + " " + album.title).toLocaleLowerCase() +
      "-cover.jpeg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card width="md" maxW="full">
      <CardBody>

        <Stack mt='6' spacing='3'>
          <Image
            src={album.cover_big}
            alt='Illustration to lyrics'
            height={500}
            width={500}
            loading="lazy"
          />
          <Heading size='md'><Link href={album.link} target="_blank">{album.title} - {album.nb_tracks} tracks.</Link></Heading>
          <Stack direction="row" align="center">
            <Image src={album.artist.picture_medium} alt='Artist' height={50} width={50} className="rounded-full" loading="lazy" />
            <Link href={album.artist.link} target="_blank">
              {album.artist.name}
            </Link>
          </Stack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Stack width="full" direction="column">
          <Button 
            width="full"
            size="lg"
            colorScheme={useColorModeValue('teal', 'teal')}
            variant="solid"
            className="text-black hover:text-white"
            onClick={() => download(1000)} leftIcon={<MdOutlineFileDownload />}
          >
            1000x1000
        </Button>
          <Button 
            width="full"
            size="lg"
            colorScheme={useColorModeValue('teal', 'teal')}
            variant="solid"
            className="text-black hover:text-white"
            onClick={() => download(500)} leftIcon={<MdOutlineFileDownload />}
          >
            500x500
        </Button>
          <Button 
            width="full"
            size="lg"
            colorScheme={useColorModeValue('teal', 'teal')}
            variant="solid"
            className="text-black hover:text-white"
            onClick={() => download(250)} leftIcon={<MdOutlineFileDownload />}
          >
            250x250
        </Button>
        </Stack>
      </CardFooter>
    </Card>
  )
}

export default Album;
