import { useMemo, useRef, useState, ReactElement } from'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useElementSize, coordsToId } from './utils'

import GameGrid from './Grid'
import Menu from './Menu'
import Piece from './Piece'
import Slot from './Slot'
import Stage from './Stage'



const pieceSizeRatio = 2

type GameProps = {
  imgSrc: string
}

type PieceParams = {
  id: string
  pieceWidth: number
  pieceHeight: number
  width: number
  height: number
  left: number
  top: number
}


function getPieces(width: number, height: number, pieceSizeRatio: number): Record<string, PieceParams> {

  const pieces: Record<string, PieceParams> = {}

  if (!width || !height) {
    return pieces
  }

  const desiredPieceSize = Math.min(width, height) / pieceSizeRatio

  const numCols = Math.round(width / desiredPieceSize)
  const numRows = Math.round(height / desiredPieceSize)

  const pieceWidth = width / numCols
  const pieceHeight = height / numRows


  Array(numRows).fill(0).forEach((_, y) => {
    Array(numCols).fill(0).forEach((_, x) => {
      const id = coordsToId(x, y)
      pieces[id] = {
        id,
        pieceWidth,
        pieceHeight,
        width,
        height,
        left: x * pieceWidth * -1,
        top: y * pieceHeight * -1,
      }
    })
  })
  return pieces

}

function Game({ imgSrc }: GameProps) {

  const [showHelp, setShowHelp] = useState<boolean>(false)
  const [isStarted, setStarted] = useState<boolean>(false)

  const imgRef = useRef<HTMLImageElement>(null)

  const [imgWidth, imgHeight] = useElementSize(imgRef.current)

  const onLoadImage = () => setTimeout (function () {
    setStarted(true)
  }, 2000)

  const img = useMemo(() => {
    const img = new Image(imgWidth, imgHeight)
    img.src = imgSrc
    return img
  }, [imgWidth, imgHeight, imgSrc])

  const pieces = getPieces(imgWidth, imgHeight, pieceSizeRatio)

  function renderSlot(id: string): ReactElement {
    const { width, height, pieceWidth, pieceHeight, left, top } = pieces[id]
    return (
      <Slot
        onDropPiece={id => console.log('drop in slot:', id)}
      >
        <Piece
          id={id}
          pieceWidth={pieceWidth}
          pieceHeight={pieceHeight}
          width={width}
          height={height}
          left={left}
          top={top}
          img={img}
        />
      </Slot>
    )
  }

  return (
    <>
      <Menu toggleHelp={setShowHelp} />
      <div className="game-wrapper" >
        <Stage
          onDropPiece={id => console.log(`dropped on stage: ${id}`)}
        />
        <div className="grid-wrapper">
          <img
            alt="Kitty"
            src={imgSrc}
            className={`
              base-img
              ${isStarted ? 'transparent' : ''}
              ${showHelp ? 'semi-transparent' : ''}
            `}
            ref={imgRef}
            onLoad={onLoadImage}
          />
          {isStarted && (
            <GameGrid
              width={imgWidth}
              height={imgHeight}
              pieceSizeRatio={pieceSizeRatio}
              renderSlot={renderSlot}
            />
          )}
        </div>
      </div>
    </>
  )

}



type GameWrapperProps = {
  imgSrc: string
}

export default function GameWrapper({ imgSrc }: GameWrapperProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Game imgSrc={imgSrc}/>
    </DndProvider>
  )
}
