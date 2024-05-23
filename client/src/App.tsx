import React, { FC } from 'react'
import { Box, Flex} from '@chakra-ui/react'

import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import RouteList from './RouteList.tsx'

const HEADER_HEIGHT_PX: number = 50
const FOOTER_HEIGHT_PX: number = 25

const App: FC = () => {
  return (
    <Box w='100%'>
      <Header height={HEADER_HEIGHT_PX + 'px'} />
      <Flex w='100%' bg='red.100' minH={'calc(100vh - ' + (HEADER_HEIGHT_PX + FOOTER_HEIGHT_PX) + 'px)'}>
        <RouteList />
      </Flex>
      <Footer height={FOOTER_HEIGHT_PX + 'px'} />
    </Box>
  )
}

export default App
