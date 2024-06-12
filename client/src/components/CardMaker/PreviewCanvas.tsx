import React from 'react'
import CardManupulator from '../../CardManupulator'

interface Prop {
  cardMan: CardManupulator
}

class PreviewCanvas extends React.Component<Prop> {
  canvasRef: React.RefObject<HTMLCanvasElement>

  constructor (props: { cardMan: CardManupulator }) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount (): void {
    const canvas = this.canvasRef.current
    if (canvas != null) {
      const context = canvas.getContext('2d')
      if (context != null) {
        context.fillStyle = '#FFFFFF'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
      }
    }
  }

  render (): React.JSX.Element {
    return (
      <canvas width='455px' height='607px' ref={this.canvasRef} />
    )
  }
}

export default PreviewCanvas
