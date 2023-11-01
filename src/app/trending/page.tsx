import { Button, Heading, Stack } from '@chakra-ui/react'

export default function Home() {
  return (
    <main className="flex flex-col justify-between p-12">
      <Heading as="h1">Trending</Heading>
      <Stack spacing={4} direction='row' align='center'>
        <Button size='lg'>
          Button
        </Button>
      </Stack>
    </main>
  )
}
