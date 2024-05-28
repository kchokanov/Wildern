import { Box, Button, Divider, Flex, Input, Spacer } from '@chakra-ui/react'
import React from 'react'

class CMFormCardLoadSeg extends React.Component<{}> {
  render (): React.JSX.Element {
    return (
      <Box p={3}>
        <Flex>
          <Input placeholder='Search...' />
          <Spacer />
          <Button>Load JSON</Button>
        </Flex>
        <Divider pt={3} />
      </Box>
    )
  }
}

export default CMFormCardLoadSeg
