import React from 'react'
import { Text, Center, Card } from '@chakra-ui/react'

class CardMakerPreview extends React.Component<{}> {
  render (): React.JSX.Element {
    return (
      <Card
        bg='#CB807D'
        textColor='#EEEBD0'
        minW='30rem'
        minH='40rem'
        boxShadow='0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);'
      >
        {/* TODO - character limits for text fields based on canvas */}
        <Center h='100%'>
          <Text>canvas</Text>
        </Center>
      </Card>
    )
  }
}

export default CardMakerPreview
