import { Box, Button, ButtonGroup, Divider, Flex, HStack, Input, Select, VStack, Popover, PopoverContent, PopoverHeader, PopoverBody, PopoverCloseButton} from '@chakra-ui/react'
import React from 'react'
import axios from 'axios';

interface Prop{
  cardData: card
  setCardData: Function
}

interface State{
  valueBoxCount: 1 | 2 | 3,
  costBoxCount: 1 | 2 | 3,
  typeList: [{name: string, _id: string}] | [],
  seePopUp: boolean
}


class CMFormValueCostSeg extends React.Component<Prop> {
  state: State = {
    valueBoxCount: this.props.cardData.value.length,
    costBoxCount: this.props.cardData.cost.length,
    typeList: [],
    seePopUp: false
  }

  fetchTypeList(){
    axios.get(`${String(process.env.API_URL)}/api/allvalue`)
    .then(res => {
      console.log(res.data)
      this.setState({typeList: res.data})
    }
    )
    .catch(err => {
      console.log(err)
    })
  }

  updateFieldsAmount(isCost: boolean, toAdd: number): void{
      this.setState(isCost ? {costBoxCount: this.state.costBoxCount + toAdd} : {valueBoxCount: this.state.valueBoxCount + toAdd})
  }

  getFields(isCost: boolean): React.JSX.Element[]{
    const fields = []
    for (var i=0; i < (isCost ? this.state.costBoxCount : this.state.valueBoxCount); i++) {
      fields[i] = 
      <HStack w={300}>
        <ButtonGroup>
          <Button display={i == 2 ? 'none': 'block'} onClick={() => this.updateFieldsAmount(isCost, 1)}> + </Button>
          <Button display={i == 0 ? 'none': 'block'}onClick={() => this.updateFieldsAmount(isCost, -1)}> - </Button>
        </ButtonGroup>
        <Select minW={200}>
          <option onClick={() => this.setState({seePopUp: true})}>Add new type</option>
        </Select>
        <Input w={55}/>
      </HStack>
    }
    return(fields)
  }

  render (): React.JSX.Element {
    return (
      <Flex>
      <VStack pl={4}>
      <Box>Tribute Value:</Box>
        {this.getFields(false)}
      </VStack>

      <Divider orientation='vertical'/>

      <VStack pl={4}>
        <Box>Tribute Cost:</Box>
        {this.getFields(true)}
      </VStack> 

      <Popover
      isOpen={this.state.seePopUp}
      >
        <PopoverContent>
          <PopoverCloseButton onClick={() => this.setState({seePopUp: false})} />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
        </PopoverContent>
      </Popover>    
    </Flex>
    )
  }
}

export default CMFormValueCostSeg
