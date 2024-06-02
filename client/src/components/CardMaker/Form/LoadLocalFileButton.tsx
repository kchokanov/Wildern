import React from 'react'
import CardManupulator from '../../../CardManupulator'

interface Prop {
  cardMan: CardManupulator
}

class LoadLocalFileButton extends React.Component<Prop> {
  loadFile (target: HTMLInputElement): void {
    this.props.cardMan.setFromFile(target.files![0])
  }

  render (): React.JSX.Element {
    // TODO - how do I change this button!>!>!>!>!>!>
    return (
      <input
        type='file'
        id='uploadButton'
        onChange={e => this.loadFile(e.target)}
      />
    )
  }
}

export default LoadLocalFileButton
