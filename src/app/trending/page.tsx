import CommingSoon from '@/components/comming-soon'
import { Box, Heading, Stack } from '@chakra-ui/react'

export default function Trending() {
  return (
    <Box as="main" height="max">
      <Heading as="h1">Trending</Heading>
      <Stack spacing={4} direction='row' align='center'>
        <CommingSoon />
      </Stack>
    </Box>
  )
}




