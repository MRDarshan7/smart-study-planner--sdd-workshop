import { CalendarDays, Trash2 } from 'lucide-react';
import { formatDeadline } from '../utils/date';

const priorityStyles = {
  Low: 'bg-sky-100 text-sky-800',
  Medium: 'bg-amber-100 text-amber-800',
  High: 'bg-rose-100 text-rose-800',
};

const difficultyStyles = {
  Easy: 'border-emerald-200 text-emerald-800',
  Medium: 'border-stone-300 text-stone-700',
  Hard: 'border-indigo-200 text-indigo-800',
};

export function TaskCard({ task, onDeleteTask }) {
  return (
    <article className="border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-medium text-emerald-700">{task.subject}</p>
          <h3 className="break-words text-lg font-semibold leading-snug text-stone-950">
            {task.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => onDeleteTask(task.id)}
          className="grid h-9 w-9 shrink-0 place-items-center border border-stone-200 text-stone-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
          aria-label={`Delete ${task.title}`}
          title="Delete task"
        >
          <Trash2 size={17} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className={`px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}>
          {task.priority} priority
        </span>
        <span
          className={`border px-3 py-1 text-xs font-semibold ${difficultyStyles[task.difficulty]}`}
        >
          {task.difficulty}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-stone-100 pt-4 text-sm text-stone-600">
        <CalendarDays size={16} aria-hidden="true" />
        <span>{formatDeadline(task.deadline)}</span>
      </div>
    </article>
  );
}
