import React from 'react'
import { Center, Spinner } from '@chakra-ui/react'

interface Prop {
  color: string
  size: string
}

class LoadingSpinner extends React.Component<Prop> {
  render (): React.JSX.Element {
    return (
      <Center w='100%'>
        <Spinner color={this.props.color} size={this.props.size} />
      </Center>
    )
  }
}

export default LoadingSpinner
