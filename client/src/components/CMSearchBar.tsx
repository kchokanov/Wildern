import React from 'react'
import { Box, Input, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'

// TODO - make generic, add image display in results

interface Prop {
  setCardData: Function
}

interface State {
  cardName: string
  cardList: Array<{ name: string, _id: string }>
  showResults: boolean
}

class CMSearchBar extends React.Component<Prop> {
  state: State = {
    cardName: '',
    cardList: [],
    showResults: false
  }

  // API call using card id which updates parent state via prop method
  fetchCardData (id: string): void {
    axios.get(`${String(process.env.API_URL)}/api/fetchcard`, {
      params: {
        _id: id
      }
    }).then(res => {
      this.props.setCardData(res.data)
    }
    )
      .catch(err => {
        console.log(err)
      })
  }

  // api call to get list of names matching string
  updateCardList (searchQuery: string): void {
    this.setState({ cardName: searchQuery })
    axios.get(`${String(process.env.API_URL)}/api/fetchcardnames`, {
      params: {
        name: searchQuery
      }
    }).then(res =>
      this.setState({ cardList: res.data })
    )
      .catch(err => {
        console.log(err)
      })
  }

  render (): React.JSX.Element {
    return (
      // parent positions children vertically
      <VStack pos='relative' zIndex='docked'>

        {/* search input which handles result display boolean */}
        <Input
          backgroundColor='white'
          color='black'
          placeholder='Search...'
          w='31.5vw'
          minW={80}
          value={this.state.cardName}
          onClick={() => {
            this.setState({ showResults: true })
            this.updateCardList(this.state.cardName)
          }}
          onChange={e => this.updateCardList(e.target.value)}
          onBlur={() => this.setState({ showResults: false })}
        />

        {/* result container */}
        <Box
          display={this.state.showResults && this.state.cardList[0] != null ? 'block' : 'none'}
          position='absolute'
          zIndex={-1}
          top={8}
          width='100%'
          backgroundColor='white'
          color='black'
          maxH={300}
          overflowY='auto'
          pt={2}
          pl={1}
          pr={1}
          borderBottomRadius={4}
          boxShadow='0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);'
        >

          {/* result mapping, creates button-like elements for each entry */}
          {this.state.cardList.map((item: { name: string, _id: string }) => {
            return (
              <Box
                borderBottom='1px solid rgba(34,36,38,.1)'
                cursor='pointer'
                _hover={{
                  bgColor: '#f9fafb'
                }}
                onMouseDown={() => this.fetchCardData(item._id)} key={item._id}
              >
                <Text p='.1em 1em 0' key={item._id}> {item.name} </Text>
              </Box>
            )
          })}
        </Box>

      </VStack>
    )
  }
}

export default CMSearchBar
