import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import {Flex, Stack, Link as ChakraLink} from '@chakra-ui/react'

const Header = ({ height }: HeaderProps) => {
  return (
    <Flex w='100%' h={height} bg='gray.200'>
      <Stack spacing={4} direction='row' align='center' paddingLeft='30px'>
        <ChakraLink as={ReactRouterLink} to='/'> Home </ChakraLink>
        <ChakraLink as={ReactRouterLink} to='/deckbuilder'> Edit Deck </ChakraLink>
        <ChakraLink as={ReactRouterLink} to='/cardmaker'> Create Card </ChakraLink>
      </Stack>
    </Flex>
  )
}

export interface HeaderProps {
  height: string
}
export default Header
