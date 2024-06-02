import React from 'react'
import CardManupulator from '../../../CardManupulator'
import { Button, ButtonGroup, HStack, Input, VStack } from '@chakra-ui/react'
import TributeSelect from './TributeSelect'

interface Prop {
  cardMan: CardManupulator
  type: 'costs' | 'values'
  pageRef: React.RefObject<HTMLDivElement>
  maxFields: number
}

interface State {
  fieldCount: number
}

class TributeField extends React.Component<Prop, State> {
  state: State = {
    fieldCount: this.props.cardMan.getCardData()[this.props.type].length > 0 ? this.props.cardMan.getCardData()[this.props.type].length : 1
  }

  // increases fieldcount up to the maxfields value provided or decresses to 1
  updateFieldCount (add: boolean): void {
    if (add && this.state.fieldCount < this.props.maxFields) {
      this.setState({ fieldCount: this.state.fieldCount + 1 })
    } else if (!add && this.state.fieldCount > 1) {
      this.setState({ fieldCount: this.state.fieldCount - 1 })
    }
  }

  render (): React.JSX.Element {
    const fields: React.JSX.Element[] = []

    for (let i = 0; i < this.state.fieldCount; i++) {
      fields.push(
        <HStack w={300} key={this.props.type + String(i)}>
          <ButtonGroup>
            <Button
              display={i === this.props.maxFields - 1 ? 'none' : 'block'}
              onClick={() => this.updateFieldCount(true)}
            > +
            </Button>
            <Button
              display={i === 0 ? 'none' : 'block'}
              onClick={() => this.updateFieldCount(false)}
            > -
            </Button>
          </ButtonGroup>
          <TributeSelect {...this.props} />
          <Input w={55} />
        </HStack>
      )
    }

    return (
      <VStack>
        {fields}
      </VStack>
    )
  }
}

export default TributeField
