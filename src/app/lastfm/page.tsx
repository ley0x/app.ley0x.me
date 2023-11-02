import CommingSoon from '@/components/comming-soon'
import { Box, Divider, Heading, Stack } from '@chakra-ui/react'

export default function Lastfm() {
  return (
    <Box as="main" height="max">
      <Heading as="h1">Last.fm</Heading>
      <Divider my="6"/>
      <Stack spacing={4} direction='row' align='center'>
        <CommingSoon />
      </Stack>
    </Box>
  )
}
