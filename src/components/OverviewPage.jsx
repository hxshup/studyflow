import StatsGrid from './StatsGrid'
import TaskList from './TaskList'

export default function OverviewPage({ tasks, stats, onToggle, onAddTask }) {
  const pending = tasks.filter((task) => task.status !== 'completed')

  return (
    <div className="space-y-6">
      <StatsGrid cards={stats.cards} />
      <TaskList
        title="Upcoming work"
        description="Pending tasks across every due date."
        tasks={pending}
        onToggle={onToggle}
        onAddTask={onAddTask}
        emptyTitle="Nothing pending"
        emptyDescription="You have no open tasks. Add one, or enjoy the clear list."
      />
    </div>
  )
}
