import React, { } from 'react'
import { Wrap, WrapItem } from '@chakra-ui/react'

import CardMakerForm from './components/CardMakerForm'
import CardMakerPreview from './components/CardMakerPreview'

class CardMaker extends React.Component<{}> {
  render (): React.JSX.Element {
    return (
      <Wrap w='100%' justify='center' pt='1rem' pb='1rem' spacing='2rem'>
        <WrapItem alignContent='center'>
          <CardMakerPreview />
        </WrapItem>
        <WrapItem alignContent='center'>
          <CardMakerForm />
        </WrapItem>
      </Wrap>
    )
  }
}

export default CardMaker
