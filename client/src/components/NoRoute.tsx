import React from 'react'
import { Text, Center } from '@chakra-ui/react'

class NoRoute extends React.Component<{}> {
  render (): React.JSX.Element {
    return (
      <Center w='100%'>
        <Text>No Route</Text>
      </Center>
    )
  }
}

export default NoRoute
