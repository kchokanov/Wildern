import React from 'react'
import { Box, Input, InputGroup, InputLeftElement, Text, VStack } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { fetchCardListByNameMatch } from '../../../ApiCallWrapper'
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
      <VStack pos='relative' zIndex='docked' w='100%'>

        {/* Search Input */}
        <InputGroup>
          <InputLeftElement>
            <FaSearch />
          </InputLeftElement>
          <Input
            placeholder='Search...'
            _placeholder={{ opacity: 0.9, color: '#EEEBD0' }}
            variant='flushed'
            color='black'
            w='100%'
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
        </InputGroup>
        {/* Results Display */}
        <Box
          display={this.state.showResults && this.state.searchResults[0] != null ? 'block' : 'none'}
          position='absolute'
          zIndex={-1}
          top='2.5em'
          width='100%'
          backgroundColor='white'
          color='black'
          maxH='75em'
          overflowY='auto'
          p='1px, 1px, 0'
          borderBottomRadius='.25em'
          boxShadow='0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);'
        >
          {resultsList}
        </Box>

      </VStack>
    )
  }
}

export default CardSearchBar
