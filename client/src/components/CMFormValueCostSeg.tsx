import { Box, Button, ButtonGroup, Divider, Flex, HStack, Input, Select, VStack, Popover, PopoverContent, PopoverHeader, PopoverBody, PopoverCloseButton, Portal, Center} from '@chakra-ui/react'
import React, { LegacyRef, useRef } from 'react'
import axios from 'axios';
import ObjectID from 'bson-objectid';

interface Prop{
  cardData: card
  setCardData: Function,
  mainPageRef: React.RefObject<HTMLDivElement>
}

interface State{
  valueBoxCount: 1 | 2 | 3,
  costBoxCount: 1 | 2 | 3,
  typeList: [{name: string, _id: string}] | [],
  seePopUp: boolean,
  newValueField: string
}


class CMFormValueCostSeg extends React.Component<Prop> {
  mainRef: LegacyRef<HTMLDivElement>
  
  constructor (props: {cardData: card, setCardData: Function, mainPageRef: React.RefObject<HTMLDivElement>}) {
    super(props)
    this.mainRef = React.createRef()
 }
  state: State = {
    valueBoxCount: this.props.cardData.value.length,
    costBoxCount: this.props.cardData.cost.length,
    typeList: [],
    seePopUp: false,
    newValueField: ''
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

  postNewType(): void{
    if(this.state.newValueField == '' || this.state.newValueField == null){return}
    const newTypedata = {name: this.state.newValueField, _id: ObjectID().toHexString}

    axios.post(`${String(process.env.API_URL)}/api/savevalue`,
    newTypedata)
    .catch(function (error) {
      console.log(error)
    })
  }

  updateFieldsAmount(isCost: boolean, toAdd: number): void{
      this.setState(isCost ? {costBoxCount: this.state.costBoxCount + toAdd} : {valueBoxCount: this.state.valueBoxCount + toAdd})
  }

  getFields(isCost: boolean): React.JSX.Element[]{
    const testData = [{name: 'name1', _id: 'id1'},{name: 'name2', _id: 'id2'}]
    const fields = []
    for (var i=0; i < (isCost ? this.state.costBoxCount : this.state.valueBoxCount); i++) {
      fields[i] = 
      <HStack w={300} key={isCost ? 'costField_' : 'valueField_' + String(i)}>
        <ButtonGroup>
          <Button display={i == 2 ? 'none': 'block'} onClick={() => this.updateFieldsAmount(isCost, 1)}> + </Button>
          <Button display={i == 0 ? 'none': 'block'}onClick={() => this.updateFieldsAmount(isCost, -1)}> - </Button>
        </ButtonGroup>
        <Select minW={200}>
          {testData.map((item: { name: string, _id: string }) => {
            return (
             <option>{item.name}</option>
            )
          })}
        </Select>
        <Input w={55}/>
      </HStack>
    }
    return(fields)
  }

  render (): React.JSX.Element {
    console.log(this.props.mainPageRef)
    return (
      <Flex ref={this.mainRef}>
      <VStack pl={4}>
      <Box>Tribute Value:</Box>
        {this.getFields(false)}
      </VStack>

      <Divider orientation='vertical'/>

      <VStack pl={4}>
        <Box>Tribute Cost:</Box>
        {this.getFields(true)}
      </VStack> 

      <Portal containerRef={this.props.mainPageRef}>
        <Popover isOpen={this.state.seePopUp} placement='end-end' isLazy>
          <PopoverContent>
            <PopoverCloseButton onClick={() => this.setState({seePopUp: false})} />
            <PopoverHeader>Add New Tribute Type:</PopoverHeader>
            <PopoverBody>
              <HStack>
                <Input placeContent='Fae' onChange={(e) => this.setState({newValueField: e.target.value})}></Input>
                <Button onClick={() => this.postNewType()}>Submit</Button>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Portal>
    </Flex>
    )
  }
}

export default CMFormValueCostSeg
