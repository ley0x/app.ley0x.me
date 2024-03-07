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
import {AlbumSchema, AlbumSchemaSoft, ArtistSchema} from '@/lib/zod/schemas';

type Inputs = {
  search: string;
};

const schema = z.object({
  search: z.string().min(1),
});

type Props = {
  setArtists: (artists: z.infer<typeof ArtistSchema>[]) => void;
  reset: () => void;
  setAlbums: (albums: z.infer<typeof AlbumSchemaSoft>[]) => void;
}

const SearchBar = ({setArtists, reset, setAlbums}: Props) => {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    reset();
    setAlbums([]);
    const url = new URL('/api/deezer/search/artist', window.location.origin);
    url.searchParams.set('q', encodeURIComponent(data.search));
    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(res);
      return;
    }

    const json = await res.json()
    const artists = ArtistSchema.array().parse(json.data);

    if (!json.success) {
      console.error(json);
      return;
    }
    if (!artists) {
      console.error(json);
      return;
    }
    setArtists(artists.slice(0, 6));
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
          placeholder='Cherchez un artiste'
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
