import React from 'react'
import CardManupulator from '../../../cardManipulator'
import { Box, Button, Input } from '@chakra-ui/react'

interface Prop {
  cardMan: CardManupulator
  label: string
  fileHandler: Function
}

class LoadLocalFileButton extends React.Component<Prop> {
  ref: React.RefObject<HTMLInputElement>

  constructor (props: { cardMan: CardManupulator, label: string, fileHandler: Function }) {
    super(props)
    this.ref = React.createRef()
  }

  render (): React.JSX.Element {
    return (
      <Box>
        <Input
          display='none'
          type='file'
          ref={this.ref}
          onChange={e => this.props.fileHandler(e.target)}
        />
        <Button
          p='1em'
          bg='#FFFFFF'
          color='#AC6D6A'
          _hover={{ bg: '#925B59', color: '#EEEBD0' }}
          boxShadow='0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);'
          onClick={() => this.ref.current?.click()}
        >
          {this.props.label}
        </Button>
      </Box>
    )
  }
}

export default LoadLocalFileButton
