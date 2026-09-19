import { ProgressIcon, TasksIcon } from './Icons'
import StatCard from './StatCard'

const icons = {
  total: <TasksIcon className="h-5 w-5" />,
  completed: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75 9 17.25 19.5 6.75" />
    </svg>
  ),
  pending: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.5 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    </svg>
  ),
  rate: <ProgressIcon className="h-5 w-5" />,
}

export default function StatsGrid({ cards = [] }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((stat) => (
        <StatCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          hint={stat.hint}
          accent={stat.accent}
          icon={icons[stat.id]}
        />
      ))}
    </section>
  )
}
