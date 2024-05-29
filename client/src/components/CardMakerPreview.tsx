import React from 'react'
import { Text, Center, Card } from '@chakra-ui/react'

interface Prop {
  cardData: any
}

class CardMakerPreview extends React.Component<Prop> {
  render (): React.JSX.Element {
    return (
      <Card bg='#C99DA3' textColor='#EEEBD0' minW='30rem' minH='40rem'>
        <Center h='100%'>
          <Text>canvas</Text>
        </Center>
      </Card>
    )
  }
}

export default CardMakerPreview
