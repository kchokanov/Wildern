import { Button } from '@chakra-ui/react'
import React from 'react'
import CardManupulator from '../../../CardManupulator'
import { card } from '../../../types/card'

interface Prop {
  cardMan: CardManupulator
}

class DownloadCardAsJsonButton extends React.Component<Prop> {
  // this is how files are downloaded apparently...
  downloadCard (data: card): void {
    const a = document.createElement('a')
    const file = new Blob([JSON.stringify(data)], { type: 'application/json' })
    a.href = URL.createObjectURL(file)
    a.download = data.name
    a.click()
  }

  render (): React.JSX.Element {
    return (
      <Button onClick={() => this.downloadCard(this.props.cardMan.getCardData())}>Download JSON</Button>
    )
  }
}

export default DownloadCardAsJsonButton
