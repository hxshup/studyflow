import StatsGrid from "./StatsGrid";
import StudyProgressCard from "./StudyProgressCard";
import TaskList from "./TaskList";

export default function DashboardPage({
  todayTasks,
  selectedDate,
  today,
  onChangeDate,
  onToday,
  stats,
  onToggle,
  onDelete,
  onAddTask,
}) {
  const completedSelectedDate = todayTasks.filter(
    (task) => task.status === "completed",
  ).length;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-200/70 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onChangeDate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            aria-label="Previous day"
          >
            ←
          </button>

          <div className="min-w-0 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-indigo-600">
              {selectedDate === today ? "Today" : "Selected date"}
            </p>

            <p className="mt-1 truncate text-base font-semibold text-slate-900 sm:text-lg">
              {new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                },
              )}
            </p>

            {selectedDate !== today && (
              <button
                type="button"
                onClick={onToday}
                className="mt-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Back to today
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => onChangeDate(1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            aria-label="Next day"
          >
            →
          </button>
        </div>
      </section>
      <StudyProgressCard
        completed={completedSelectedDate}
        total={todayTasks.length}
      />
      <StatsGrid cards={stats.cards} />
      <TaskList
        tasks={todayTasks}
        onToggle={onToggle}
        onAddTask={onAddTask}
        onDelete={onDelete}
        description={
          todayTasks.length === 0
            ? selectedDate === today
              ? "Nothing is scheduled for today yet."
              : "Nothing is scheduled for this date yet."
            : selectedDate === today
              ? `${todayTasks.length} task${todayTasks.length === 1 ? "" : "s"} due today.`
              : `${todayTasks.length} task${todayTasks.length === 1 ? "" : "s"} due on this date.`
        }
        emptyTitle="No tasks due today"
        emptyDescription="Add a task with today’s due date and it will show up here."
      />
    </div>
  );
}
