import { Board as BoardType } from '../types'
import Cell from './Cell'

interface BoardProps {
  board: BoardType
  winningLine: number[] | null
  onCellClick: (index: number) => void
  disabled: boolean
}

export default function Board({ board, winningLine, onCellClick, disabled }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-xs sm:max-w-sm mx-auto">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          index={index}
          onClick={onCellClick}
          isWinning={winningLine?.includes(index) ?? false}
          disabled={disabled}
        />
      ))}
    </div>
  )
}
