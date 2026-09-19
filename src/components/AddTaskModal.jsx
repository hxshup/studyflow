import { useEffect, useRef, useState } from 'react'
import { subjects, toISODate } from '../data/mockData'
import { CloseIcon } from './Icons'

const emptyForm = {
  title: '',
  subject: '',
  priority: 'Medium',
  dueDate: toISODate(),
}

export default function AddTaskModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm)
  const titleRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    setForm({ ...emptyForm, dueDate: toISODate() })
    const frame = requestAnimationFrame(() => titleRef.current?.focus())

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const title = form.title.trim()
    const subject = form.subject.trim()
    if (!title || !subject || !form.dueDate) return

    onSubmit({
      title,
      subject,
      priority: form.priority,
      dueDate: form.dueDate,
    })
  }

  const fieldClass =
    'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-2'

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-slate-900/50" aria-label="Close dialog" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-task-title"
        className="relative z-10 w-full max-w-lg rounded-t-3xl bg-white p-5 shadow-card sm:rounded-3xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="add-task-title" className="text-lg font-semibold text-slate-900">
              Add a task
            </h2>
            <p className="mt-1 text-sm text-slate-500">Keep it specific so it is easy to start.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            Task title
            <input
              ref={titleRef}
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Review chapter 4 notes"
              className={fieldClass}
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Subject
            <input
              name="subject"
              list="subject-options"
              value={form.subject}
              onChange={handleChange}
              required
              placeholder="e.g. Mathematics"
              className={fieldClass}
            />
            <datalist id="subject-options">
              {subjects.map((subject) => (
                <option key={subject} value={subject} />
              ))}
            </datalist>
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Priority
              <select name="priority" value={form.priority} onChange={handleChange} className={fieldClass}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Due date
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                required
                className={fieldClass}
              />
            </label>
          </div>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
