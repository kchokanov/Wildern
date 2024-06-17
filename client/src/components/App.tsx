import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Header from './Header'
import RouteList from './RouteList'
import Footer from './Footer'

interface State {
  headerHeightPX: number
  footerHeightPX: number
}

class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    headerHeightPX: 50,
    footerHeightPX: 25
  }

  render (): React.JSX.Element {
    return (
      <Box w='100%' h='100%'>
        <Header height={`${this.state.headerHeightPX}px`} />
        <Flex w='100%' bg='#EEEBD0' textColor='#673C4F' minH={`calc(100vh - ${this.state.headerHeightPX + this.state.footerHeightPX}px)`}>
          <RouteList />
        </Flex>
        <Footer height={`${this.state.footerHeightPX}px`} />
      </Box>
    )
  }
}
export default App
