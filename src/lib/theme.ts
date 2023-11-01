import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { withProse } from '@nikolovlazar/chakra-ui-prose'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({ config }, withProse());
