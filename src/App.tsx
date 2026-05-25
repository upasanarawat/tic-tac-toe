import { useState, useCallback, useEffect } from 'react'
import { Board as BoardType, Player, Score, GameMode } from './types'
import { createEmptyBoard, checkWinner, checkDraw, makeMove, getBestMove } from './gameLogic'
import Board from './components/Board'
import Scoreboard from './components/Scoreboard'
import ModeToggle from './components/ModeToggle'

export default function App() {
  const [board, setBoard] = useState<BoardType>(createEmptyBoard())
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [winner, setWinner] = useState<Player | null>(null)
  const [isDraw, setIsDraw] = useState(false)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [score, setScore] = useState<Score>({ X: 0, O: 0, draws: 0 })
  const [mode, setMode] = useState<GameMode>('local')

  const gameOver = winner !== null || isDraw

  const handleCellClick = useCallback((index: number) => {
    if (gameOver || board[index] !== null) return
    if (mode === 'computer' && currentPlayer === 'O') return

    const newBoard = makeMove(board, index, currentPlayer)
    setBoard(newBoard)

    const result = checkWinner(newBoard)
    if (result.winner) {
      setWinner(result.winner)
      setWinningLine(result.line)
      setScore(s => ({ ...s, [result.winner!]: s[result.winner!] + 1 }))
    } else if (checkDraw(newBoard)) {
      setIsDraw(true)
      setScore(s => ({ ...s, draws: s.draws + 1 }))
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }, [board, currentPlayer, gameOver, mode])

  // Computer move
  useEffect(() => {
    if (mode !== 'computer' || currentPlayer !== 'O' || gameOver) return

    const timer = setTimeout(() => {
      const moveIndex = getBestMove(board)
      if (moveIndex === -1) return

      const newBoard = makeMove(board, moveIndex, 'O')
      setBoard(newBoard)

      const result = checkWinner(newBoard)
      if (result.winner) {
        setWinner(result.winner)
        setWinningLine(result.line)
        setScore(s => ({ ...s, O: s.O + 1 }))
      } else if (checkDraw(newBoard)) {
        setIsDraw(true)
        setScore(s => ({ ...s, draws: s.draws + 1 }))
      } else {
        setCurrentPlayer('X')
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [mode, currentPlayer, gameOver, board])

  const resetGame = () => {
    setBoard(createEmptyBoard())
    setCurrentPlayer('X')
    setWinner(null)
    setIsDraw(false)
    setWinningLine(null)
  }

  const handleModeToggle = (newMode: GameMode) => {
    setMode(newMode)
    setScore({ X: 0, O: 0, draws: 0 })
    resetGame()
  }

  const statusText = gameOver
    ? winner
      ? `${winner} wins!`
      : "It's a draw!"
    : `${currentPlayer}'s turn`

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 gap-6">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Tic Tac Toe</h1>

      <ModeToggle mode={mode} onToggle={handleModeToggle} />

      <Scoreboard score={score} />

      <div
        className={`text-xl font-semibold transition-colors ${
          winner === 'X' ? 'text-blue-500' : winner === 'O' ? 'text-rose-500' : ''
        }`}
      >
        {statusText}
      </div>

      <Board
        board={board}
        winningLine={winningLine}
        onCellClick={handleCellClick}
        disabled={gameOver || (mode === 'computer' && currentPlayer === 'O')}
      />

      <button
        onClick={resetGame}
        className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
      >
        New Game
      </button>
    </div>
  )
}
