'use client';

import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import React from 'react';
import {IoSearch} from 'react-icons/io5';
import {useForm, SubmitHandler} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useAtom} from 'jotai';
import {albumsCovers, trackArtist, trackLyrics, trackName, trackUrl} from '@/store/store';
import {AlbumSchema, GetLyricsApi} from '@/lib/zod/schemas';

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
    formState: {errors},
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const url = new URL('/api/deezer/search', window.location.origin);
    url.searchParams.set('q', encodeURIComponent(data.search));
    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(res);
      return;
    }

    const json = await res.json()
    const albums = AlbumSchema.array().parse(json.data);

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
        <InputLeftElement height='full' pointerEvents='none'>
          <IconButton
            ml='3'
            size='md'
            height='full'
            aria-label='Cherchez un album'
            icon={<IoSearch style={{fontSize: '1.5rem'}} />}
          />
        </InputLeftElement>
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
      </InputGroup>
    </form>
  );
};

export default SearchBar;
