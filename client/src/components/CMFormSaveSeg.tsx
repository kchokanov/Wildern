import { Box, Button, Divider, Flex, Spacer } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'

interface Prop {
  cardData: card
}

function isNameSet (name: string): boolean {
  if (name.replace(/\s/g, '') === '') {
    console.error('Card has no name set.')
    return false
  }
  return true
}

function downloadCard (data: card): void {
  if (!isNameSet(data.name)) { return }

  const a = document.createElement('a')
  const file = new Blob([JSON.stringify(data)], { type: 'application/json' })
  a.href = URL.createObjectURL(file)
  a.download = data.name
  a.click()
}

function saveCard (data: card): void {
  if (!isNameSet(data.name)) { return }

  axios.post(`${String(process.env.API_URL)}/api/savecard`,
    data)
    .catch(function (error) {
      console.log(error)
    })
}

class CMFormCardSaveSeg extends React.Component<Prop> {
  render (): React.JSX.Element {
    return (
      <Box p={3}>
        <Flex>
          <Button onClick={() => saveCard(this.props.cardData)}>Save</Button>
          <Spacer />
          <Button onClick={() => downloadCard(this.props.cardData)}>Download JSON</Button>
        </Flex>
        <Divider pt={3} />
      </Box>
    )
  }
}

export default CMFormCardSaveSeg
