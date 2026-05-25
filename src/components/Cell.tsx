import { CellValue } from '../types'

interface CellProps {
  value: CellValue
  index: number
  onClick: (index: number) => void
  isWinning: boolean
  disabled: boolean
}

export default function Cell({ value, index, onClick, isWinning, disabled }: CellProps) {
  return (
    <button
      onClick={() => onClick(index)}
      disabled={disabled || value !== null}
      className={`
        aspect-square w-full rounded-xl text-4xl sm:text-5xl md:text-6xl font-bold
        flex items-center justify-center
        transition-all duration-200
        ${isWinning ? 'animate-winning' : ''}
        ${value === null && !disabled
          ? 'hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer hover:scale-105'
          : ''}
        ${value !== null || disabled ? 'cursor-default' : ''}
        bg-white dark:bg-gray-800
        shadow-md hover:shadow-lg
        border border-gray-200 dark:border-gray-700
      `}
    >
      {value && (
        <span
          className={`animate-draw-in ${
            value === 'X' ? 'text-blue-500' : 'text-rose-500'
          }`}
        >
          {value}
        </span>
      )}
    </button>
  )
}
