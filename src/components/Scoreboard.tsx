import { Score } from '../types'

interface ScoreboardProps {
  score: Score
}

export default function Scoreboard({ score }: ScoreboardProps) {
  return (
    <div className="flex gap-4 sm:gap-6 text-center">
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-md border border-gray-200 dark:border-gray-700">
        <div className="text-blue-500 font-bold text-lg">X</div>
        <div className="text-2xl font-bold">{score.X}</div>
      </div>
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-md border border-gray-200 dark:border-gray-700">
        <div className="text-gray-500 dark:text-gray-400 font-bold text-lg">Draw</div>
        <div className="text-2xl font-bold">{score.draws}</div>
      </div>
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-md border border-gray-200 dark:border-gray-700">
        <div className="text-rose-500 font-bold text-lg">O</div>
        <div className="text-2xl font-bold">{score.O}</div>
      </div>
    </div>
  )
}
