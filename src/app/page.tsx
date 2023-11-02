import CommingSoon from '@/components/comming-soon'
import { Divider, Flex, Heading, Stack } from '@chakra-ui/react'

export default function Home() {
  return (
    <Flex direction="column">
      <Heading as="h1">Home</Heading>
      <Divider my="6"/>
      <Stack spacing={4} direction='row' align='center'>
        <CommingSoon />
      </Stack>
    </Flex>
  )
}
