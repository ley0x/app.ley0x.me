import CoversComponent from '@/components/covers/covers';
import { Divider, Flex, Heading } from '@chakra-ui/react'

export default async function Covers() {
  return (
    <Flex direction="column">
      <Heading as="h1">Home</Heading>
      <Divider my="6"/>
      <CoversComponent />
    </Flex>
  )
}
