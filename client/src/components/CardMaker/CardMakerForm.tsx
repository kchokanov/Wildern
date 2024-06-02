import React from 'react'
import { Box, Card, Center, Divider, Flex, HStack, Spacer, Wrap, WrapItem } from '@chakra-ui/react'
import CardNameInput from './Form/CardNameInput'
import CardManupulator from '../../CardManupulator'
import CardSearchBar from './Form/CardSearchBar'
import LoadLocalFileButton from './Form/LoadLocalFileButton'
import CardTypeSelect from './Form/CardTypeSelect'
import TraitCheckboxGroup from './Form/TraitCheckboxGroup'
import DownloadCardAsJsonButton from './Form/DownloadCardAsJsonButton'
import UploadCardButton from './Form/UploadCardButton'
import TributeField from './Form/TributeField'

interface Prop {
  cardMan: CardManupulator
  pageRef: React.RefObject<HTMLDivElement>
}

// TODO - reset id button
class CardMakerForm extends React.Component<Prop> {
  render (): React.JSX.Element {
    return (
      <Card bg='#C99DA3' textColor='#EEEBD0' p={5} w='100%'>

        <Wrap w='100%' justify='center'>
          <WrapItem pb={3}>
            <CardSearchBar {...this.props} />
          </WrapItem>
          <WrapItem pt={2} pb={3} pl={10}>
            <LoadLocalFileButton {...this.props} />
          </WrapItem>
        </Wrap>
        <Divider pt={3} />
        <Box pb={3} />

        <Wrap justify='center' w='100%'>
          <WrapItem pb={3}>
            <HStack h='100%'>
              <Center h='100%'>
                <CardNameInput {...this.props} />
              </Center>
            </HStack>
          </WrapItem>
          <WrapItem pl={3} pb={3}>
            <HStack h='100%' gap={6}>
              <Center h='100%'>
                <CardTypeSelect {...this.props} />
              </Center>

              <Divider orientation='vertical' />

              <TraitCheckboxGroup {...this.props} />
            </HStack>
          </WrapItem>
        </Wrap>
        <Divider pt={3} />
        <Box pb={3} />

        <Wrap justify='center' w='100%'>
          <WrapItem pb={3}>
            <TributeField type='values' maxFields={3} {...this.props} />
          </WrapItem>
          <WrapItem pb={3}>
            <TributeField type='costs' maxFields={3} {...this.props} />
          </WrapItem>
        </Wrap>
        <Divider pt={3} />
        <Box pb={3} />

        <Box>
          <Flex>
            <UploadCardButton {...this.props} />
            <Spacer />
            <DownloadCardAsJsonButton {...this.props} />
          </Flex>
          <Divider pt={3} />
        </Box>
      </Card>
    )
  }
}

export default CardMakerForm
