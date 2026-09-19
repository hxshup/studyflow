const accents = {
  indigo: {
    wrap: 'from-indigo-50 to-white',
    icon: 'bg-indigo-100 text-indigo-600',
  },
  emerald: {
    wrap: 'from-emerald-50 to-white',
    icon: 'bg-emerald-100 text-emerald-600',
  },
  amber: {
    wrap: 'from-amber-50 to-white',
    icon: 'bg-amber-100 text-amber-600',
  },
  sky: {
    wrap: 'from-sky-50 to-white',
    icon: 'bg-sky-100 text-sky-600',
  },
}

export default function StatCard({ label, value, hint, accent, icon }) {
  const tone = accents[accent]

  return (
    <article className={`rounded-2xl bg-gradient-to-br ${tone.wrap} p-5 shadow-card ring-1 ring-slate-200/70`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.icon}`}>{icon}</div>
      </div>
      <p className="mt-3 text-xs text-slate-500">{hint}</p>
    </article>
  )
}
