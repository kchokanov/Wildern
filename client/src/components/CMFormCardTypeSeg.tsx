import { Checkbox, Center, Select, Divider, HStack, VStack } from '@chakra-ui/react'
import React from 'react'

class CMFormCardTypeSeg extends React.Component<{}> {
  render (): React.JSX.Element {
    return (
      <HStack pl='1em' pr='1em' h='7em' gap={6}>
        <Center h='100%'>
          <Select placeholder='Select option'>
            <option value='option1'>Option 1</option>
          </Select>
        </Center>
        <Divider orientation='vertical' />
        <VStack>
          <Checkbox defaultChecked>Checkbox</Checkbox>
          <Checkbox defaultChecked>Checkbox</Checkbox>
          <Checkbox defaultChecked>Checkbox</Checkbox>
        </VStack>
      </HStack>
    )
  }
}

export default CMFormCardTypeSeg
