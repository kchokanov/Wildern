import React from 'react'
import CardManupulator from '../../../CardManupulator'
import { HStack, Input } from '@chakra-ui/react'
import LoadLocalFileButton from './LoadLocalFileButton'

interface Prop {
  cardMan: CardManupulator
}

class ArtUpload extends React.Component<Prop> {
  render (): React.JSX.Element {
    return (
      <HStack>
        <LoadLocalFileButton label='Upload Card Art' fileHandler={() => console.log('TODO')} {...this.props} />
        <Input
          w='15em'
          pl='.5em'
          variant='flushed'
          placeholder='Artist name'
          _placeholder={{ opacity: 0.7, color: '#14342B' }}
          value={this.props.cardMan.getCardData().artAuthor}
          onChange={e => this.props.cardMan.updateStringField('artAuthor', e.target.value)}
        />
      </HStack>
    )
  }
}

export default ArtUpload
