import TaskList from "./TaskList";
import StatsGrid from "./StatsGrid";

export default function TasksPage({
  tasks,
  stats,
  onToggle,
  onDelete,
  onAddTask,
}) {
  return (
    <div className="space-y-6">
      <StatsGrid cards={stats.cards} />
      <TaskList
        title="Task list"
        description={
          tasks.length === 0
            ? "Your planner is empty."
            : "Every task you add is securely stored in your study planner."
        }
        tasks={tasks}
        onToggle={onToggle}
        onDelete={onDelete}
        onAddTask={onAddTask}
        emptyTitle="No tasks on your list"
        emptyDescription="Use Add a task to create your first study item."
      />
    </div>
  );
}
