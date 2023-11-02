import {
  Center,
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
import {trackArtist, trackLyrics, trackName, trackUrl} from '@/store/store';
import {GetLyricsApi} from '@/lib/zod/schemas';

type Inputs = {
  search: string;
};

const schema = z.object({
  search: z.string().min(1),
});

const SearchBar = () => {
  const [_, setLyrics] = useAtom(trackLyrics);
  const [__, setArtist] = useAtom(trackArtist);
  const [___, setTrack] = useAtom(trackName);
  const [____, setTrackUrl] = useAtom(trackUrl);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const url = new URL('/api/lyrics', window.location.origin);
    url.searchParams.set('q', data.search);
    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(res);
      return;
    }

    const json = GetLyricsApi.parse(await res.json());

    if (!json.success) {
      console.error(json);
      return;
    }
    if (!json.data) {
      console.error(json);
      return;
    }
    setLyrics(json.data.lyrics);
    setTrack(json.data.title);
    setArtist(json.data.artist);
    setTrackUrl(json.data.url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup size='md' variant='outline'>
        <InputLeftElement height='full' pointerEvents='none'>
          <IconButton
            ml='3'
            size='md'
            height='full'
            aria-label='Cherchez un son'
            icon={<IoSearch style={{fontSize: '1.5rem'}} />}
          />
        </InputLeftElement>
        <Input
          maxW='lg'
          placeholder='Cherchez un son'
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
