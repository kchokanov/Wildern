import React from 'react'
import { Text, Center } from '@chakra-ui/react'

class InProgress extends React.Component<{}> {
  render (): React.JSX.Element {
    return (
      <Center w='100%'>
        <Text>In Progress...</Text>
      </Center>
    )
  }
}

export default InProgress
