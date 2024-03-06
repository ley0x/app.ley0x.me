import CommingSoon from '@/components/comming-soon'
import TournamentBracket from '@/components/tournament/tournament-bracket'
import { Box, Divider, Heading, Stack } from '@chakra-ui/react'

export default function ImageGenerator() {
  const albums = [{
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    cover: "https://app.ley0x.me/_next/image?url=https%3A%2F%2Fe-cdns-images.dzcdn.net%2Fimages%2Fcover%2F79ba3cd515942d1dc62f49f859a374fd%2F500x500-000000-80-0-0.jpg&w=1080&q=75"
  }, {
    title: "Abbey Road",
    artist: "The Beatles",
    cover: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg"
  }, {
    title: "Thriller",
    artist: "Michael Jackson",
    cover: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png"
  }, {
    title: "Led Zeppelin IV",
    artist: "Led Zeppelin",
    cover: "https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg"
  }, {
    title: "The Wall",
    artist: "Pink Floyd",
    cover: "https://upload.wikimedia.org/wikipedia/en/b/bd/Pink_Floyd_-_Wall.jpg"
  }, {
    title: "Back in Black",
    artist: "AC/DC",
    cover: "https://upload.wikimedia.org/wikipedia/en/1/11/ACDC_Back_in_Black.png"
  }]
  return (
    <Box as="main" height="max">
      <Heading as="h1">Last.fm</Heading>
      <Divider my="6" />
      <Stack spacing={4} direction='row' align='center'>
        <TournamentBracket albums={[]} />
      </Stack>
    </Box>
  )
}
