import React, { FC } from 'react'
import { Center, Wrap, WrapItem } from '@chakra-ui/react'

import CardMakerForm from './components/CardMakerForm'
import CardMakerPreview from './components/CardMakerPreview'

const CardMaker: FC = () => {
  return (
    <Wrap w='100%' pt='2em'>
      <WrapItem w='40%'>
        <Center w='100%'>
          <CardMakerPreview />
        </Center>
      </WrapItem>
      <WrapItem w='59%'>
        <Center w='100%'>
          <CardMakerForm />
        </Center>
      </WrapItem>
    </Wrap>
  )
}

export default CardMaker
