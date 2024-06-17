import { Button } from '@chakra-ui/react'
import React from 'react'
import CardManupulator from '../../../cardManipulator'
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
      <Button
        p='1em'
        bg='#FFFFFF'
        color='#AC6D6A'
        _hover={{ bg: '#925B59', color: '#EEEBD0' }}
        boxShadow='0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);'
        onClick={() => this.downloadCard(this.props.cardMan.getCardData())}
      >
        Download as .json
      </Button>
    )
  }
}

export default DownloadCardAsJsonButton
