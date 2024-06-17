import React from 'react'
import { Box, Card, Center, HStack, Spacer, Wrap, WrapItem } from '@chakra-ui/react'
import CardManupulator from '../../cardManipulator'
import { cardType } from '../../types/card'

const CardNameInput = React.lazy(async () => await import('./form_components/CardNameInput'))
const CardSearchBar = React.lazy(async () => await import('./form_components/CardSearchBar'))
const LoadLocalFileButton = React.lazy(async () => await import('./form_components/LoadLocalFileButton'))
const CardTypeSelect = React.lazy(async () => await import('./form_components/CardTypeSelect'))
const TraitCheckboxGroup = React.lazy(async () => await import('./form_components/TraitCheckboxGroup'))
const DownloadCardAsJsonButton = React.lazy(async () => await import('./form_components/DownloadCardAsJsonButton'))
const UploadCardButton = React.lazy(async () => await import('./form_components/UploadCardButton'))
const TributeField = React.lazy(async () => await import('./form_components/TributeField'))
const StatsInput = React.lazy(async () => await import('./form_components/StatsInput'))
const ArtUpload = React.lazy(async () => await import('./form_components/ArtUpload'))
const EffectInput = React.lazy(async () => await import('./form_components/EffectInput'))
const QuoteInput = React.lazy(async () => await import('./form_components/QuoteInput'))

interface Prop {
  cardMan: CardManupulator
  pageRef: React.RefObject<HTMLDivElement>
}

// TODO - reset id button
class CardMakerForm extends React.Component<Prop> {
  constructor (props: {
    cardMan: CardManupulator
    pageRef: React.RefObject<HTMLDivElement>
  }) {
    super(props)

    // binding magic so JS doesn't forget the set function exists when it's passed to child component
    this.loadFile = this.loadFile.bind(this)
  }

  loadFile (target: HTMLInputElement): void {
    if (target.files != null) {
      this.props.cardMan.setCardFromFile(target.files[0])
    }
  }

  render (): React.JSX.Element {
    return (
      <Card
        bg='#CB807D'
        textColor='#EEEBD0'
        p='1em'
        w='100%'
        boxShadow='0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);'
      >
        <HStack w='100%' minW='30rem'>
          <Box w='58%' pl='1em'>
            <CardSearchBar {...this.props} />
          </Box>
          <Box pl='1em'>
            <LoadLocalFileButton label='Load from .json' fileHandler={this.loadFile} {...this.props} />
          </Box>
        </HStack>

        <Card
          bg='#FFFFFF'
          textColor='#14342B'
          p='1em'
          w='100%'
          mt='1em'
          boxShadow='0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);'
        >
          <Wrap w='100%'>
            <WrapItem pl='.5em'>
              <Center h='100%'>
                <CardNameInput {...this.props} />
              </Center>
            </WrapItem>
            <WrapItem pl='.5em'>
              <Center h='100%'>
                <Box pr='2em'>
                  <CardTypeSelect {...this.props} />
                </Box>
                <Box pl='1em' w='100%'>
                  {/* TODO - could move trait enum to DB */}
                  <TraitCheckboxGroup {...this.props} />
                </Box>
              </Center>
            </WrapItem>

          </Wrap>
          <Wrap w='100%' pt='2em' spacing='2em'>
            <WrapItem>
              <TributeField type='values' maxFields={3} fieldCount={this.props.cardMan.getCardData().values.length} {...this.props} />
            </WrapItem>
            <WrapItem>
              <TributeField type='costs' maxFields={3} fieldCount={this.props.cardMan.getCardData().costs.length} {...this.props} />
            </WrapItem>
            <WrapItem>
              {/* TODO - could move card type enum to DB */}
              <StatsInput isDisplayed={this.props.cardMan.getCardData().cardType === cardType.wildern} {...this.props} />
            </WrapItem>
          </Wrap>

          <Box pt='2em'>
            <ArtUpload {...this.props} />
          </Box>

          <Box pt='2em'>
            <EffectInput {...this.props} />
          </Box>

          <Box pt='2em' pl='.5em' w='100%'>
            <QuoteInput {...this.props} />
          </Box>
        </Card>
        <HStack w='100%' pt='2em'>
          <UploadCardButton {...this.props} />
          <Spacer />
          <DownloadCardAsJsonButton {...this.props} />
        </HStack>
      </Card>
    )
  }
}

export default CardMakerForm
