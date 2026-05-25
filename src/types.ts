export type Player = 'X' | 'O'
export type CellValue = Player | null
export type Board = CellValue[]
export type GameMode = 'local' | 'computer'

export interface Score {
  X: number
  O: number
  draws: number
}

export interface GameState {
  board: Board
  currentPlayer: Player
  winner: Player | null
  isDraw: boolean
  winningLine: number[] | null
}
