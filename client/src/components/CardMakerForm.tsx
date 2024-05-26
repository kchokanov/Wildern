import React, { FC } from 'react'
import { Box, Text, Center, Button } from '@chakra-ui/react'

import { saveCard, getCard } from '../apiHandler'

const CardMakerForm: FC = () => {
  return (
    <Box bg='yellow.200' minW='500px' minH='500px'>
      <Center h='100%'>
        <Text>Form goes here</Text>
        <Button onClick={saveCard}>Save a card!</Button>
        <Button onClick={getCard}>Get a card!</Button>
      </Center>
    </Box>
  )
}

export default CardMakerForm
