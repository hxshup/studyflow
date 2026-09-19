import PriorityBadge from "./PriorityBadge";
import { formatDueDate } from "../data/mockData";

export default function TaskItem({ task, onToggle, onDelete }) {
  const done = task.status === "completed";

  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <input
          id={`task-${task.id}`}
          type="checkbox"
          checked={done}
          onChange={() => onToggle(task.id)}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 text-indigo-600 accent-indigo-600"
        />
        <label htmlFor={`task-${task.id}`} className="min-w-0 cursor-pointer">
          <p
            className={`text-sm font-semibold text-slate-900 ${done ? "line-through decoration-slate-300" : ""}`}
          >
            {task.title}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {task.subject} · Due {formatDueDate(task.dueDate)}
          </p>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2 pl-8 sm:pl-0">
        <PriorityBadge priority={task.priority} />
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
            done
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-slate-50 text-slate-600"
          }`}
        >
          {done ? "Done" : "To do"}
        </span>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          aria-label={`Delete ${task.title}`}
          title="Delete task"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v5" />
            <path d="M14 11v5" />
            <path d="M9 6V4h6v2" />
          </svg>
        </button>
      </div>
    </li>
  );
}
