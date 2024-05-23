import React, { FC } from 'react'
import { Box, Text, Center } from '@chakra-ui/react'

const CardMakerPreview: FC = () => {
  return (
    <Box bg='green.200' minW='35vw' minH='40vw'>
      <Center h='100%'>
        <Text>Canvas</Text>
      </Center>
    </Box>
  )
}

export default CardMakerPreview
