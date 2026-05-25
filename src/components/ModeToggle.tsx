import { GameMode } from '../types'

interface ModeToggleProps {
  mode: GameMode
  onToggle: (mode: GameMode) => void
}

export default function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <div className="flex bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => onToggle('local')}
        className={`px-4 py-2 text-sm font-medium transition-colors ${
          mode === 'local'
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        2 Players
      </button>
      <button
        onClick={() => onToggle('computer')}
        className={`px-4 py-2 text-sm font-medium transition-colors ${
          mode === 'computer'
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        vs Computer
      </button>
    </div>
  )
}
