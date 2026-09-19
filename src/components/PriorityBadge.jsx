const styles = {
  High: 'bg-rose-50 text-rose-700 ring-rose-100',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-100',
  Low: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
}

const dots = {
  High: 'bg-rose-500',
  Medium: 'bg-amber-500',
  Low: 'bg-emerald-500',
}

export default function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[priority]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[priority]}`} />
      {priority}
    </span>
  )
}
