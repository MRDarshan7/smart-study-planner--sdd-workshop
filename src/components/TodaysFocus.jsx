import { Target, Zap } from 'lucide-react';
import { formatDeadline } from '../utils/date';

export function TodaysFocus({ task }) {
  if (!task) {
    return null;
  }

  const { importance, reason, urgencyText } = task.prioritization;

  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-emerald-700 shadow-sm">
            <Target size={21} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Today's Focus
            </p>
            <h2 className="mt-1 break-words text-xl font-bold leading-tight text-stone-950">
              {task.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{reason}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${importance.className}`}
          >
            {importance.label}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-emerald-800">
            <Zap size={13} aria-hidden="true" />
            {urgencyText}
          </span>
          <span className="inline-flex rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-700">
            {formatDeadline(task.deadline)}
          </span>
        </div>
      </div>
    </section>
  );
}
