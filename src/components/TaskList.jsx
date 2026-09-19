import { PlusIcon } from "./Icons";
import TaskItem from "./TaskItem";

export default function TaskList({
  title = "Today's tasks",
  description,
  tasks,
  onToggle,
  onDelete,
  onAddTask,
  emptyTitle = "No tasks yet",
  emptyDescription = "Add a study task to start filling this list.",
}) {
  const allDone =
    tasks.length > 0 && tasks.every((task) => task.status === "completed");

  return (
    <section className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-200/70 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          ) : null}
        </div>
        {onAddTask ? (
          <button
            type="button"
            onClick={onAddTask}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <PlusIcon className="h-4 w-4" />
            Add a task
          </button>
        ) : null}
      </div>

      {tasks.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center">
          <p className="text-sm font-semibold text-slate-800">{emptyTitle}</p>
          <p className="mt-1 text-sm text-slate-500">{emptyDescription}</p>
        </div>
      ) : (
        <>
          {allDone ? (
            <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              Nice work — every task in this list is complete.
            </p>
          ) : null}
          <ul className="mt-5 space-y-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
