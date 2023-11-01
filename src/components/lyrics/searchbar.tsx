import {
  Center,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import React from 'react';
import {IoSearch} from 'react-icons/io5';
import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAtom } from 'jotai';
import { trackLyrics } from '@/store/store';

type Inputs = {
  search: string;
}

const schema = z.object({
  search: z.string().nonempty(),
});

const SearchBar = () => {
  const [_, setLyrics] = useAtom(trackLyrics);

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
console.log(data);
    const url = new URL('/api/lyrics', window.location.origin);
    url.searchParams.set('q', data.search);
    const res = await fetch(url.toString());
    if(!res.ok) {
      console.error(res);
      return;
    }

    const json = z.object({
      lyrics: z.string(),
      success: z.boolean(),
    }).parse(await res.json());

    if(!json.success) {
      console.error(json);
      return;
    }
    setLyrics(json.lyrics)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup size="md"  >
        <InputLeftElement height="full" pointerEvents='none'>
          <IconButton ml="3" size="md" height="full" aria-label='Cherchez un son' icon={<IoSearch style={{fontSize: "1.5rem"}} />} />
        </InputLeftElement>
        <Input maxW="lg" ringColor="gray" {...register("search")} placeholder='Cherchez un son' size='lg' variant='filled' colorScheme="gray"  focusBorderColor="gray.300" />
      </InputGroup>
    </form>
  );
};

export default SearchBar;
