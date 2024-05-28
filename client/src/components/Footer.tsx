import React from 'react'
import { Center, Text } from '@chakra-ui/react'

interface Props {
  height: string
}
class Footer extends React.Component<Props> {
  render (): React.JSX.Element {
    return (
      <Center w='100%' h={this.props.height} bg='#673C4F' textColor='#EEEBD0'>
        <Text as='kbd' fontSize='xs'>Kal's own</Text>
      </Center>
    )
  }
}

export default Footer
