import React, { FC } from 'react'
import {HStack, VStack, Text } from '@chakra-ui/react'

const InProgress: FC = () => {
  return (
    <HStack w='100%'>
      <VStack w='100%'>
        <Text>In Progress...</Text>
      </VStack>
    </HStack>
  )
}

export default InProgress
