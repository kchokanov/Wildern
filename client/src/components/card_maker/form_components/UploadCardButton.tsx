import { Button } from '@chakra-ui/react'
import React from 'react'
import CardManupulator from '../../../CardManupulator'

interface Prop {
  cardMan: CardManupulator
}

class UploadCardButton extends React.Component<Prop> {
  uploadCard (): void {
    this.props.cardMan.saveCard().then(res => {
      if (res) {
        // TODO - success toast
        console.log('Uploaded card.')
      } else {
        // TODO - error toast
      }
    }).catch(err => console.error(err))
  }

  render (): React.JSX.Element {
    // TODO - need to reset data on save
    return (
      <Button
        p='1em'
        bg='#FFFFFF'
        color='#AC6D6A'
        _hover={{ bg: '#925B59', color: '#EEEBD0' }}
        boxShadow='0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);'
        onClick={() => this.uploadCard()}
      >
        Save Card
      </Button>
    )
  }
}

export default UploadCardButton
