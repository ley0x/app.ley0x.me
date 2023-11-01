import { Button, Heading, Stack } from '@chakra-ui/react'

async function getData() {
  const res = await fetch('http://localhost:3000/tops/azertyuiop')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex flex-col items-center justify-between p-24 border">
      <Heading as="h1">Tops</Heading>
      {JSON.stringify(data)}
      <Stack spacing={4} direction='row' align='center'>
        <Button size='lg'>
          Button
        </Button>
      </Stack>
    </main>
  )
}
