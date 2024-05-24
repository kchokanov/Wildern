import React, { FC } from 'react'
import axios from 'axios'
import { Box, Text, Center, Button } from '@chakra-ui/react'

async function saveCard(): Promise<void>{
  axios('http://localhost:3000/api/savecard', {
    method: "post",
    data: {name: 'reactCard', _id: '6650619e62ba12950d888020'},
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
  }})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });}

const CardMakerForm: FC = () => {
  return (
    <Box bg='yellow.200' minW='500px' minH='500px'>
      <Center h='100%'>
        <Text>Form goes here</Text>
        <Button onClick={saveCard}>Save a card!</Button>
      </Center>
    </Box>
  )
}

export default CardMakerForm
