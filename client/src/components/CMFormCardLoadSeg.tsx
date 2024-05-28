import { Box, Button, Divider, Flex, Input, InputGroup, Spacer } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'

interface Prop {
  setCardData: Function
}

interface State {
  cardName: string
  cardList: undefined
}

class CMFormCardLoadSeg extends React.Component<Prop> {
  state: State = {
    cardName: '',
    cardList: undefined
  }

  updateCardList (searchName: string): void {
    this.setState({ cardName: searchName })
    axios.get(`${String(process.env.API_URL)}/api/fetchcardnames`, {
      params: {
        name: searchName
      }
    }).then(res =>
      this.setState({ cardList: res.data })
    )
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount (): void {
    this.updateCardList(this.state.cardName)
  }

  render (): React.JSX.Element {
    return (
      <Box p={3}>
        <Flex>
          <InputGroup>
            <Input placeholder='Search...' value={this.state.cardName} onChange={e => this.updateCardList(e.target.value)} />
          </InputGroup>
          <Spacer />
          <Button>Load JSON</Button>
        </Flex>
        <Divider pt={3} />
      </Box>
    )
  }
}

export default CMFormCardLoadSeg
