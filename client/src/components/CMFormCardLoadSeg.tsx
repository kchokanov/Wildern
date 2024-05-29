import { Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import CMSearchBar from './CMSearchBar'
import CMLoadJsonButton from './CMLoadJsonButton'

interface Prop {
  setCardData: Function
}

class CMFormCardLoadSeg extends React.Component<Prop> {
  loadFile (target: HTMLInputElement): void {
    const reader = new FileReader()

    reader.addEventListener('load', () =>
      this.props.setCardData(JSON.parse(String(reader.result)))
    )

    reader.addEventListener('error', err =>
      console.error(err)
    )

    reader.readAsText(target.files![0])
  }

  render (): React.JSX.Element {
    return (
      <Wrap w='100%' justify='center'>
        <WrapItem pb={3}>
          <CMSearchBar setCardData={this.props.setCardData} />
        </WrapItem>
        <WrapItem pt={2} pb={3} pl={10}>
          <CMLoadJsonButton setCardData={this.props.setCardData} />
        </WrapItem>
      </Wrap>
    )
  }
}

export default CMFormCardLoadSeg
