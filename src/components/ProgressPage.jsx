import StatsGrid from './StatsGrid'

const priorities = ['High', 'Medium', 'Low']

export default function ProgressPage({ tasks, stats }) {
  const byPriority = priorities.map((priority) => {
    const items = tasks.filter((task) => task.priority === priority)
    const completed = items.filter((task) => task.status === 'completed').length
    return { priority, total: items.length, completed }
  })

  const subjects = [...new Set(tasks.map((task) => task.subject))]

  return (
    <div className="space-y-6">
      <StatsGrid cards={stats.cards} />

      {tasks.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-12 text-center shadow-card">
          <h2 className="text-lg font-semibold text-slate-900">No progress to show yet</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add a few tasks and check them off. Completion rate and subject breakdowns will appear here.
          </p>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-200/70 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">By priority</h2>
            <p className="mt-1 text-sm text-slate-500">Finished versus remaining in each priority band.</p>
            <ul className="mt-5 space-y-4">
              {byPriority.map((row) => {
                const percent = row.total === 0 ? 0 : Math.round((row.completed / row.total) * 100)
                return (
                  <li key={row.priority}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-800">{row.priority}</span>
                      <span className="text-slate-500">
                        {row.completed}/{row.total}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className={`h-2 rounded-full ${
                          row.priority === 'High'
                            ? 'bg-rose-500'
                            : row.priority === 'Medium'
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-200/70 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">By subject</h2>
            <p className="mt-1 text-sm text-slate-500">A simple count of what is still open.</p>
            {subjects.length === 0 ? (
              <p className="mt-6 text-sm text-slate-500">Subjects will group here after you add tasks.</p>
            ) : (
              <ul className="mt-5 space-y-3">
                {subjects.map((subject) => {
                  const items = tasks.filter((task) => task.subject === subject)
                  const pending = items.filter((task) => task.status !== 'completed').length
                  return (
                    <li
                      key={subject}
                      className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-3"
                    >
                      <span className="text-sm font-medium text-slate-800">{subject}</span>
                      <span className="text-xs text-slate-500">
                        {pending === 0 ? 'All done' : `${pending} pending`}
                      </span>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
