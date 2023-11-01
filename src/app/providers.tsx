'use client';

import {theme} from '@/lib/theme';
import {CacheProvider} from '@chakra-ui/next-js';
import {ChakraProvider} from '@chakra-ui/react';
import {Provider as JotaiProvider} from 'jotai';

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <JotaiProvider>{children}</JotaiProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
