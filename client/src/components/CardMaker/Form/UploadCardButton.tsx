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
    return (
      <Button onClick={() => this.uploadCard()}>Save</Button>
    )
  }
}

export default UploadCardButton
