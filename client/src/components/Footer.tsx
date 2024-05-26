import React, { FC } from 'react'
import { Center, Text } from '@chakra-ui/react'

interface Props {
  height: string
}

const Footer: FC<Props> = ({ height }) => {
  return (
    <Center w='100%' h={height} bg='cyan.300'>
      <Text as='kbd' fontSize='xs'>Kal's own</Text>
    </Center>
  )
}

export default Footer
