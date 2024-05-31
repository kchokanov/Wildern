import { Checkbox, Center, Select, Divider, HStack, VStack, CheckboxGroup } from '@chakra-ui/react'
import React from 'react'

interface Prop {
  cardData: card
  setCardData: Function
}

interface State {
  isContiniousPower: boolean
  isCycle: boolean
  isHandEff: boolean
  isMyth: boolean
  isMythic: boolean
}

class CMFormCardTypeSeg extends React.Component<Prop> {
  state: State = {
    isContiniousPower: this.props.cardData.isContiniousPower,
    isCycle: this.props.cardData.isCycle,
    isHandEff: this.props.cardData.isHandEff,
    isMyth: this.props.cardData.isMyth,
    isMythic: this.props.cardData.isMythic
  }

  // card type change function, needs to reset all checkboxes
  SetType (type: 'wildern' | 'power'): void {
    this.props.cardData.cardType = type
    this.props.cardData.isContiniousPower = false
    this.props.cardData.isCycle = false
    this.props.cardData.isHandEff = false
    this.props.cardData.isMyth = false
    this.props.cardData.isMythic = false
    this.props.setCardData(this.props.cardData)
  }

  // changes the selected option in the type select based on loaded card info
  componentDidUpdate (): void {
    (document.getElementById('typeSelect') as HTMLInputElement).value = this.props.cardData.cardType
  }

  render (): React.JSX.Element {
    return (
      <HStack h='100%' gap={6}>
        {/*Select for card type. Considered changing this to button, but may be more than 2 states in the future*/}
        <Center h='100%'>
          <Select placeholder='Select card type' id='typeSelect'>
            <option value='wildern' onMouseDown={() => this.SetType('wildern')}>Wildern</option>
            <option value='power' onMouseDown={() => this.SetType('power')}>Power</option>
          </Select>
        </Center>
        
        <Divider orientation='vertical' />

        {/*Bunch of checkboxes for the different special properties of cards*/}
        <CheckboxGroup>
          <VStack align='left' minW={40}>

            <Checkbox
              id='handEffCheck'
              isChecked={this.props.cardData.isHandEff}
              disabled={this.props.cardData.isContiniousPower || this.props.cardData.isMythic}
              onChange={e => {
                this.props.cardData.isHandEff = e.target.checked
                this.props.setCardData(this.props.cardData)
              }}
            >
              Hand Effect
            </Checkbox>

            <Checkbox
              id='cycleCheck'
              isChecked={this.props.cardData.isCycle}
              onChange={e => {
                this.props.cardData.isCycle = e.target.checked
                this.props.setCardData(this.props.cardData)
              }}
            >
              Cycle
            </Checkbox>

            {this.props.cardData == null || this.props.cardData.cardType === 'wildern'
              ? <Checkbox
                  id='mythicCheck'
                  isChecked={this.props.cardData.isMythic}
                  disabled={this.props.cardData.isMyth || this.props.cardData.isHandEff}
                  onChange={e => {
                    this.props.cardData.isMythic = e.target.checked
                    this.props.setCardData(this.props.cardData)
                  }}
                >
                Mythic Card
              </Checkbox>
              : <Checkbox
                  id='contEffCheck'
                  isChecked={this.props.cardData.isContiniousPower}
                  disabled={this.props.cardData.isHandEff}
                  onChange={e => {
                    this.props.cardData.isContiniousPower = e.target.checked
                    this.props.setCardData(this.props.cardData)
                  }}
                >
                Continuous Effect
              </Checkbox>}

            <Checkbox
              id='mythCheck'
              isChecked={this.props.cardData.isMyth}
              disabled={this.props.cardData.isMythic}
              onChange={e => {
                this.props.cardData.isMyth = e.target.checked
                this.props.setCardData(this.props.cardData)
              }}
            >
              Myth Card
            </Checkbox>
          </VStack>
        </CheckboxGroup>
      </HStack>
    )
  }
}

export default CMFormCardTypeSeg
