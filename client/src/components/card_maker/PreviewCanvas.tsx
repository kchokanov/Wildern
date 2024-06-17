import React from 'react'
import CardManupulator from '../../cardManipulator'
import { Box } from '@chakra-ui/react'
import { card } from '../../types/card'
import baseFrame from 'CardDisplay/frame_1.gif'

interface Prop {
  cardMan: CardManupulator
  borderRadiusPx: number
  frameWidthPx: number
  frameHeightPx: number
}
/*
  store copy of data, compare on update, fetch relevant data if different

  power && not myth = frame 2 OR
  myth = frame 3 OR
  mythic = frame 4 OR
  else = frame 1

  wildern = stat box

  cost != null = cost disp
  special trait != null = special disp

  art!= null = art disp

*/
class PreviewCanvas extends React.Component<Prop> {
  canvasRef: React.RefObject<HTMLCanvasElement>
  currCard: card | null

  constructor (props: { cardMan: CardManupulator, borderRadiusPx: number, frameWidthPx: number, frameHeightPx: number }) {
    super(props)
    this.canvasRef = React.createRef()
    this.currCard = null
  }

  drawFrame (context: CanvasRenderingContext2D): void {
    // Draw background
    context.fillStyle = '#5a5858'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = '#FFFFFF'
    context.fillRect(
      this.props.borderRadiusPx,
      this.props.borderRadiusPx,
      context.canvas.width - this.props.borderRadiusPx * 2,
      context.canvas.height - this.props.borderRadiusPx * 2
    )

    this.drawCardLayer(context, baseFrame)
  }

  drawCardLayer (context: CanvasRenderingContext2D, source: string): void {
    const img = new Image()
    img.src = source
    img.onload = () => {
      context.drawImage(img, this.props.borderRadiusPx, this.props.borderRadiusPx)
    }
    img.onerror = (err) => { console.error(err) }
  }

  getCanvasContext (): CanvasRenderingContext2D | null {
    const canvas = this.canvasRef.current
    if (canvas != null) {
      return canvas.getContext('2d')
    }
    console.error('Canvas reference not found.')
    return null
  }

  // On mount run full render
  componentDidMount (): void {
    const context = this.getCanvasContext()
    if (context != null) {
      this.drawFrame(context)
    }
    this.currCard = this.props.cardMan.getCardData()
  }

  // On update only re-render parts needed
  // TODO - ^ that
  componentDidUpdate (): void {
    const context = this.getCanvasContext()
    if (context != null) {
      this.drawFrame(context)
    }
    this.currCard = this.props.cardMan.getCardData()
  }

  render (): React.JSX.Element {
    return (
      <Box
        borderRadius={`${this.props.borderRadiusPx}px`}
        boxShadow='0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);'
      >
        <canvas
          width={`${this.props.frameWidthPx + this.props.borderRadiusPx * 2}px`}
          height={`${this.props.frameHeightPx + this.props.borderRadiusPx * 2}px`}
          style={{ borderRadius: `${this.props.borderRadiusPx}px` }}
          ref={this.canvasRef}
        />
      </Box>
    )
  }
}

export default PreviewCanvas
