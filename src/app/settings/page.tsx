import { Button, Heading, Stack } from '@chakra-ui/react'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 border">
      <Heading as="h1">Settings</Heading>
      <Stack spacing={4} direction='row' align='center'>
        <Button size='lg'>
          Button
        </Button>
      </Stack>
    </main>
  )
}
