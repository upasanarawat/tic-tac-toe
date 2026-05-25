import { Board, Player, CellValue } from './types'

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],             // diagonals
]

export function createEmptyBoard(): Board {
  return Array(9).fill(null)
}

export function checkWinner(board: Board): { winner: Player | null; line: number[] | null } {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line }
    }
  }
  return { winner: null, line: null }
}

export function checkDraw(board: Board): boolean {
  return board.every(cell => cell !== null) && checkWinner(board).winner === null
}

export function makeMove(board: Board, index: number, player: Player): Board {
  if (board[index] !== null) return board
  const newBoard = [...board]
  newBoard[index] = player
  return newBoard
}

export function getAvailableMoves(board: Board): number[] {
  return board.reduce<number[]>((moves, cell, i) => {
    if (cell === null) moves.push(i)
    return moves
  }, [])
}

function minimax(board: Board, isMaximizing: boolean, alpha: number, beta: number): number {
  const { winner } = checkWinner(board)
  if (winner === 'O') return 10
  if (winner === 'X') return -10
  if (board.every(c => c !== null)) return 0

  if (isMaximizing) {
    let best = -Infinity
    for (const move of getAvailableMoves(board)) {
      const newBoard = [...board] as Board
      newBoard[move] = 'O' as CellValue
      best = Math.max(best, minimax(newBoard, false, alpha, beta))
      alpha = Math.max(alpha, best)
      if (beta <= alpha) break
    }
    return best
  } else {
    let best = Infinity
    for (const move of getAvailableMoves(board)) {
      const newBoard = [...board] as Board
      newBoard[move] = 'X' as CellValue
      best = Math.min(best, minimax(newBoard, true, alpha, beta))
      beta = Math.min(beta, best)
      if (beta <= alpha) break
    }
    return best
  }
}

export function getBestMove(board: Board): number {
  let bestScore = -Infinity
  let bestMove = -1

  for (const move of getAvailableMoves(board)) {
    const newBoard = [...board] as Board
    newBoard[move] = 'O' as CellValue
    const score = minimax(newBoard, false, -Infinity, Infinity)
    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }

  return bestMove
}
