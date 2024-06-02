import React from 'react'
import { Box, Input, Text, VStack } from '@chakra-ui/react'
import { fetchCardListByNameMatch } from '../../../ApicallWrapper'
import CardManupulator from '../../../CardManupulator'

interface Prop {
  cardMan: CardManupulator
}

interface State {
  searchQuery: string
  searchResults: Array<{ name: string, _id: string }>
  showResults: boolean
}

class CardSearchBar extends React.Component<Prop> {
  state: State = {
    searchQuery: '',
    searchResults: [],
    showResults: false
  }

  doSearch (): void {
    fetchCardListByNameMatch(this.state.searchQuery).then((data) => {
      if (data != null) {
        this.setState({ searchResults: data })
      } else {
        // TODO - error toast
      }
    }).catch(err => {
      console.error(err)
    })
  }

  fetchCard (id: string): void {
    this.props.cardMan.changeToNewCardById(id)
      .then(res => {
        if (!res) {
        // TODO - error toast
        }
      }).catch(err => {
        console.error(err)
      })
  }

  render (): React.JSX.Element {
    const resultsList: React.JSX.Element[] = []

    this.state.searchResults.map((item: { name: string, _id: string }) => {
      return resultsList.push(
        <Box
          borderBottom='1px solid rgba(34,36,38,.1)'
          cursor='pointer'
          _hover={{
            bgColor: '#f9fafb'
          }}
          onMouseDown={() => this.fetchCard(item._id)} key={item._id}
        >
          <Text p='.1em 1em 0' key={item._id}> {item.name} </Text>
        </Box>
      )
    })

    return (
      <VStack pos='relative' zIndex='docked'>

        {/* Search Input */}
        <Input
          backgroundColor='white'
          color='black'
          placeholder='Search...'
          w='31.5vw'
          minW={80}
          value={this.state.searchQuery}
          onClick={() => {
            this.setState({ showResults: true })
            this.doSearch()
          }}
          onChange={e => {
            this.setState({ searchQuery: e.target.value })
            this.doSearch()
          }}
          onBlur={() => this.setState({ showResults: false })}
        />

        {/* Results Display */}
        <Box
          display={this.state.showResults && this.state.searchResults[0] != null ? 'block' : 'none'}
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
          {resultsList}
        </Box>

      </VStack>
    )
  }
}

export default CardSearchBar
