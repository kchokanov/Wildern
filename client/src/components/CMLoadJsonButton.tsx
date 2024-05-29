import React from 'react'

interface Prop {
  setCardData: Function
}

class CMLoadJsonButton extends React.Component<Prop> {
  loadFile (target: HTMLInputElement): void {
    const reader = new FileReader()

    reader.addEventListener('load', () =>
      this.props.setCardData(JSON.parse(String(reader.result)))
    )

    reader.addEventListener('error', err =>
      console.error(err)
    )

    reader.readAsText(target.files![0])
  }

  render (): React.JSX.Element {
    return (
      <input
        type='file'
        id='uploadButton'
        onChange={e => this.loadFile(e.target)}
      />
    )
  }
}

export default CMLoadJsonButton
