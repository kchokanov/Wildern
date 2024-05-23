import React from 'react'
import { Center, Text } from '@chakra-ui/react'

const Footer = ({ height }: FooterProps) => {
  return (
    <Center w='100%' h={height} bg='cyan.300'>
      <Text as='kbd' fontSize='xs'>Kal's own</Text>
    </Center>
  )
}

export interface FooterProps {
  height: string
}

export default Footer
