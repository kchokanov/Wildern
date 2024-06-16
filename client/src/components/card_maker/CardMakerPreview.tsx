import React from 'react'
import { Center, Card } from '@chakra-ui/react'
import CardManupulator from '../../CardManupulator'
import PreviewCanvas from './PreviewCanvas'

interface Prop {
  cardMan: CardManupulator
}
class CardMakerPreview extends React.Component<Prop> {
  render (): React.JSX.Element {
    return (
      <Card
        p='1em'
        bg='#CB807D'
        textColor='#EEEBD0'
        minW='30rem'
        minH='40rem'
        boxShadow='0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);'
      >
        {/* TODO - character limits for text fields based on canvas */}
        <Center h='100%'>
          <PreviewCanvas borderRadiusPx={10} frameHeightPx={626} frameWidthPx={455} {...this.props} />
        </Center>
      </Card>
    )
  }
}

export default CardMakerPreview
