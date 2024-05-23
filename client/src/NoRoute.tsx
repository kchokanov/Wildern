import React, { FC } from 'react'
import {HStack, VStack, Text } from '@chakra-ui/react'

const NoRoute: FC = () => {
  return (
    <HStack w='100%'>
      <VStack w='100%'>
        <Text>Wrong URL bud.</Text>
      </VStack>
    </HStack>
  )
}

export default NoRoute
