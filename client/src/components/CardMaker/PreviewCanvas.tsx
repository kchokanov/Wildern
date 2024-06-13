import React from 'react'
import CardManupulator from '../../CardManupulator'
import { getImage } from '../../ApiCallWrapper'
import { Box } from '@chakra-ui/react'

interface Prop {
  cardMan: CardManupulator
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
  borderRad: number = 5
  canvasRef: React.RefObject<HTMLCanvasElement>

  constructor (props: { cardMan: CardManupulator }) {
    super(props)
    this.canvasRef = React.createRef()
  }

  drawFrame(context: CanvasRenderingContext2D ): void{
    //Draw Art
    //Draw Frame
    this.drawName(context)
    this.drawCardAuthor(context)
    this.drawArtAuthor(context)
    this.drawEffect(context)
    
    this.drawStats(context)
    this.drawTraits(context)
    this.drawCosts(context)
    this.drawValue(context)

  }

  drawStats(context: CanvasRenderingContext2D ): void{

  }

  drawCosts(context: CanvasRenderingContext2D ): void{

  }

  drawTraits(context: CanvasRenderingContext2D ): void{

  }

  drawValue(context: CanvasRenderingContext2D ): void{

  }

  drawName(context: CanvasRenderingContext2D ): void{

  }

  drawArtAuthor(context: CanvasRenderingContext2D ): void{

  }

  drawCardAuthor(context: CanvasRenderingContext2D ): void{

  }

  drawEffect(context: CanvasRenderingContext2D ): void{

  }




  componentDidMount (): void {
    getImage('frame_wildern').then(blob => {
      const img = new Image()
      if (blob != null) {
        const canvas = this.canvasRef.current
        img.src = URL.createObjectURL(blob)
        const borderRad = this.borderRad
        img.onload = function () {
          if (canvas != null) {
            const context = canvas.getContext('2d')
            if (context != null) {
              context.fillStyle = '#5a5858'
              context.fillRect(0, 0, context.canvas.width, context.canvas.height)
              context.fillStyle = '#FFFFFF'
              context.fillRect(borderRad, borderRad, context.canvas.width - borderRad * 2, context.canvas.height - borderRad * 2)
              context.drawImage(img, 5, 5)
              console.log('drew')
            }
          }
        }
      }
    }).catch(err => console.error(err))
  }

  render (): React.JSX.Element {
    return (
      <Box
        borderRadius='5px'
        boxShadow='0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);'
      >
        <canvas
          width='465px'
          height='636px'
          style={{ borderRadius: `${this.borderRad}px` }}
          ref={this.canvasRef}
        />
      </Box>
    )
  }
}

export default PreviewCanvas
