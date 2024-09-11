'use client';

import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';

import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { useForm, SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { albumsCovers } from '@/store/store';
import { AlbumSchema, LastFmAlbumSchema } from '@/lib/zod/schemas';

type Inputs = {
  search: string;
};

const schema = z.object({
  search: z.string().min(1),
});

const SearchBar = () => {
  const [____, setAlbums] = useAtom(albumsCovers);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const url = new URL('/api/lastfm/search/album', window.location.origin);
    url.searchParams.set('q', encodeURIComponent(data.search));
    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(res);
      return;
    }

    const json = await res.json()
    const albums = LastFmAlbumSchema.array().parse(json.data);

    if (!json.success) {
      console.error(json);
      return;
    }
    if (!albums) {
      console.error(json);
      return;
    }
    setAlbums(albums);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup size='md' variant='outline'>
        <Input
          maxW='lg'
          placeholder='Cherchez un album'
          size='lg'
          variant='filled'
          colorScheme='gray'
          className='ring-0'
          focusBorderColor='gray.300'
          {...register('search')}
        />
      <InputRightElement className="mt-1 mr-1">
          <IconButton
            size='md'
            aria-label='Cherchez un album'
            icon={<IoSearch style={{ fontSize: '1.5rem' }} />}
            onClick={handleSubmit(onSubmit)}
          />
      </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
