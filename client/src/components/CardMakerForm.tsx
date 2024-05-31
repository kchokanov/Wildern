import React from 'react'
import { Box, Card, Center, Divider, HStack, Wrap, WrapItem } from '@chakra-ui/react'
import CMFormCardLoadSeg from './CMFormCardLoadSeg'
import CMFormCardTypeSeg from './CMFormCardTypeSeg'
import CMFormCardSaveSeg from './CMFormSaveSeg'
import CMFormNameSeg from './CMFormNameSeg'
import CMFormValueCostSeg from './CMFormValueCostSeg'

// TODO handler passed as prop to update parent state

interface Prop {
  cardData: card
  setCardData: Function
}

class CardMakerForm extends React.Component<Prop> {
  render (): React.JSX.Element {
    return (
      <Card bg='#C99DA3' textColor='#EEEBD0' p={5} w='100%'>

        <CMFormCardLoadSeg {...this.props} />
        <Divider pt={3} />
        <Box pb={3} />
        
        <Wrap justify='center' w='100%'>
          <WrapItem pb={3}>
            <HStack h='100%'>
              <Center h='100%'>
                <CMFormNameSeg {...this.props} />
              </Center>
            </HStack>
          </WrapItem>
          <WrapItem pl={3} pb={3}>
            <CMFormCardTypeSeg {...this.props} />
          </WrapItem>
        </Wrap>
        <Divider pt={3} />
        <Box pb={3} />

        <Wrap justify='center' w='100%'>
          <WrapItem pb={3}>
          <CMFormValueCostSeg {...this.props}/>
          </WrapItem>
          <WrapItem pb={3}>
          </WrapItem>
        </Wrap>
        <Divider pt={3} />
        <Box pb={3} />

        <CMFormCardSaveSeg {...this.props} />
      </Card>
    )
  }
}

export default CardMakerForm
