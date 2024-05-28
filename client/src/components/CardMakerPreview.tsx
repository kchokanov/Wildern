import React from 'react'
import { Box, Text, Center } from '@chakra-ui/react'

class CardMakerPreview extends React.Component<{}> {
  render (): React.JSX.Element {
    return (
      <Box bg='#C99DA3' textColor='#EEEBD0' minW='30rem' minH='40rem'>
        <Center h='100%'>
          <Text>canvas</Text>
        </Center>
      </Box>
    )
  }
}

export default CardMakerPreview
