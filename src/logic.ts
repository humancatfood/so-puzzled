/* eslint-disable @typescript-eslint/no-explicit-any */
declare let window: any

const $ = window.jQuery



// This class encapsulates the game's logic and the interactions with jQueryUI.
// TODO: split those things up.
class GameLogic {

  callbacks: Array<() => void> = []

  $grid: any
  $stage: any
  $img: any

  constructor(grid: HTMLElement, stage: HTMLElement, img: HTMLImageElement) {
    this.$grid = $(grid)
    this.$stage = $(stage)
    this.$img = $(img)
  }

  start () {

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this

    // .. then iterate over the grid's cells and for each cell ..
    this.$grid.find('.piece-positioner').each((index: number, item: HTMLElement) => {
      const $piecePositioner = $(item)
      // .. we find the contained piece.
      const $piece = $piecePositioner.find('.piece-wrapper')

      // Each piece gets scrambled it (after a short random delay, so the pieces don't all do the same thing)
      setTimeout(() => {
        that.scramblePiece($piece)
        // (the class 'scramble' tells us that the piece should be scrambled again when the window resizes)
        $piece.addClass('scramble')
      }, 1000)

      // We make the piece draggable
      $piece.draggable({
        stack: '.piece-wrapper',    // this makes the currently dragged piece pop to the front of the z-buffer
        snap: '.piece-positioner',  // this makes it snap to the grid-cells
        snapMode: 'inner',
        snapTolerance: Math.max($piece.width(), $piece.height()) / 4, // kinda random snap-tolerance, found by trial-and-error
        containment: that.$stage,   // the pieces should be constrained to the stage div
        start: function () {
          // we don't want the piece to have a transition while we drag it!
          $piece.removeClass('animated')
        },
        stop: function () {
          $piece.addClass('animated')
        },
      })

      // The grid cell becomes a droppable target
      $piecePositioner.droppable({
        tolerance: 'intersect',
        drop: function(event: any, ui: any) {
          // when a piece is dropped in a cell ..
          const $this = $(this)
          const $piece = $(ui.draggable)

          // .. we first give it the same offset as the cell, to make sure it sits flush inside
          $piece.offset($this.offset())

          // then we check if there's already a piece in the cell (dropped pieces get stored in the
          // cell's data-attribute) and it's not the same one as the dropped one.
          const $currentPiece = $this.data('currentPiece')
          if ($currentPiece && $currentPiece.data('id') !== $piece.data('id'))
          {
            // if that's the case, scramble the old one
            that.scramblePiece($currentPiece)
          }

          // either way, we set the dropped one as the currentPiece ..
          $this.data('currentPiece', $piece)
          // .. and remove the 'scramble' class, so the piece doesn't get moved around if the window resizes
          $piece.removeClass('scramble')

          // if the piece has the same id as the cell, meaning it' in the right position, ..
          if ($piece.data('id') === $this.data('id'))
          {
            $this
              .addClass('done')        // .. we add the class 'done' to it, which removes the cell's border ..
              .droppable('destroy')   // .. and remove the drag/drop functionality

            $piece
              .draggable('destroy')
          }

          // last we check if the puzzle is solved
          if (that.isFinished())
          {
            // if that's the case and there's a callback subscribed for this ..
            that.callbacks.forEach(cb => cb())
          }

        },
        out: function (event: any, ui: any) {
          // when we move a piece out of a cell ..
          const $piece = $(ui.draggable)
          const $currentPiece = $(this).data('currentPiece')

          // .. we check whether it just happened to be sitting there, or whether it was dropped here on purpose.
          if ($currentPiece && $currentPiece.data('id') === $piece.data('id'))
          {
            // in the later case, we unset the droppable's current piece ..
            $(this).data('currentPiece', null)
            // .. and re-add the 'scramble' class
            $piece.addClass('scramble')
          }
        },
      })

    })

    // lastly we listen to the window resizing
    $(window).resize(function () {

      // if the window resizes, we go through all the grid cells
      that.$grid.find('.piece-positioner').each((index: number, item: HTMLElement) => {
        const $piecePositioner = $(item)

        // if they have a current piece attached ..
        const $piece = $piecePositioner.data('current-piece')
        if ($piece)
        {
          // .. we give it the same new offset as the cell
          $piece
            .removeClass('animated')
            .offset($piecePositioner.offset())
            .addClass('animated')
        }

        // alse we check on the cell's actual piece (as opposed to iterating over the
        // pieces in a separate loop) and if it has the scramble class, we scramble it.
        $piecePositioner.find('.piece-wrapper.scramble').each((index: number, piece: HTMLElement) => {
          that.scramblePiece($(piece))
        })

      })

    })
  }

  isFinished(): boolean {
    let allCorrectlyPlaced

    // iterate over each cell ..
    $('.piece-positioner').each((index: number, piece: HTMLElement) => {

      // and check whether the attached piece has the same data-attribute id as the cell
      allCorrectlyPlaced = $(piece).data('currentPiece') && $(piece).data('currentPiece').data('id') === $(piece).data('id')

      // if that's not the case, we return the overall result, which is now false, which gives us a nice early-out
      return !!allCorrectlyPlaced

    })

    return !!allCorrectlyPlaced
  }

  // scramblePiece moves a piece to a random position somewhere in the viewport (represented by the stage)
  scramblePiece($piece: any): void {

    const pieceRect = $piece[0].getBoundingClientRect()
    const stageRect = this.$stage[0].getBoundingClientRect()
    const imgRect = this.$img[0].getBoundingClientRect()

    const rnd = Math.random
    let top, left

    // if the stage is wider that the base-image plus 1 1/2 piece-widths on either side, we put the piece on the
    // sides.
    if (stageRect.width > (imgRect.width + pieceRect.width * 3))
    {
    // top position is somewhere along the height of the stage
      top = rnd() * (stageRect.height - pieceRect.height)

      // left position is either ..
      if (rnd() > 0.5)
      {
      // .. between the left window boundary and the base-image's left edge, or ..
        left = imgRect.right + rnd() * (stageRect.right - imgRect.right - pieceRect.width)
      }
      else
      {
      // .. between the base-image's right edge and the right window boundary
        left = stageRect.left + rnd() * (imgRect.left - stageRect.left - pieceRect.width)
      }
    }
    else
    {
    // if there's no space on the sides, we put the piece somewhere below the base-image (the
    // base-image has a max-height of 60vh to ensure that there's always enough space below it)
      left = stageRect.left + rnd() * (stageRect.right - pieceRect.width)
      top = imgRect.bottom + rnd() * (stageRect.bottom - imgRect.bottom - pieceRect.height)
    }

    $piece.offset({
      top: top,
      left: left,
    })

  }

  // attache a callback. Currently only used for the FINISH event
  onFinished(callback: () => void): void {
    this.callbacks.push(callback)
  }
}


export default GameLogic


type ID = string

export interface IPiece {
  id: ID,
  left: number,
  top: number,
}

export interface IGameState {
  slots: Record<ID, ID>
  stage: Array<IPiece>
}


export function createState(ids: Array<ID>): IGameState {
  const slots = ids.reduce<Record<ID, ID>>((acc, id) => {
    acc[id] = id
    return acc
  }, {})
  return {
    slots,
    stage: [],
  }
}

export function movePieceToStage(state: IGameState, pieceId: ID, top: number, left: number): IGameState {

  const { [pieceId]: id, ...otherSlots } = state.slots

  if (id) {
    return {
      slots: otherSlots,
      stage: [
        ...state.stage,
        { id, top, left },
      ],
    }
  } else {
    return {
      slots: otherSlots,
      stage: state.stage.map(item => {
        if (item.id === pieceId) {
          return {
            ...item,
            top,
            left,
          }
        } else {
          return item
        }
      }),
    }

  }

}


export function movePieceToSlot(state: IGameState, pieceId: ID, slotId: ID): IGameState {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [pieceId]: id, ...otherSlots } = state.slots
  const stage = state.stage.filter(piece => piece.id !== pieceId)

  return {
    slots: {
      ...otherSlots,
      [slotId]: pieceId,
    },
    stage,
  }

}

export function getSlotPiece(state: IGameState, slotId: ID): IPiece | null {
  const pieceId = state.slots[slotId]
  if (pieceId) {
    return {
      id: pieceId,
      left: 0,
      top: 0,
    }
  } else {
    return null
  }
}

export function getStagePieces(state: IGameState): Array<IPiece> {
  return state.stage
}
