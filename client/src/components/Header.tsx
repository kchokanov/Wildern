import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Flex, Stack, Link as ChakraLink } from '@chakra-ui/react'

interface Props {
  height: string
}

class Header extends React.Component<Props> {
  render (): React.JSX.Element {
    return (
      <Flex w='100%' h={this.props.height} bg='#673C4F' textColor='#EEEBD0'>
        <Stack spacing={4} direction='row' align='center' paddingLeft='30px'>
          <ChakraLink as={ReactRouterLink} to='/'> Home </ChakraLink>
          <ChakraLink as={ReactRouterLink} to='/deckbuilder'> Edit Deck </ChakraLink>
          <ChakraLink as={ReactRouterLink} to='/cardmaker'> Create Card </ChakraLink>
        </Stack>
      </Flex>
    )
  }
}

export default Header
