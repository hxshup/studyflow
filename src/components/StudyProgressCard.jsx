export default function StudyProgressCard({ completed = 0, total = 0 }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <section className="overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-card sm:p-7">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <p className="text-sm font-medium text-indigo-200">Today&apos;s study progress</p>
          {total === 0 ? (
            <>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">No tasks due today</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Add a task for today and this ring will track how much of your list you have finished.
              </p>
            </>
          ) : (
            <>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {completed} of {total} tasks complete
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                You&apos;re {percent}% through today&apos;s list. Check off a task to update this instantly.
              </p>
            </>
          )}
        </div>

        <div className="relative mx-auto h-32 w-32 shrink-0 sm:mx-0">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#1e293b" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="url(#progress-ring)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
            <defs>
              <linearGradient id="progress-ring" x1="0" y1="0" x2="100" y2="100">
                <stop stopColor="#818CF8" />
                <stop offset="1" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold">{percent}%</span>
          </div>
        </div>
      </div>
    </section>
  )
}
