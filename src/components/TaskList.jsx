import { BookOpenCheck, Target } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { getPrioritizedTasks, getTodaysFocus } from '../utils/prioritization';

export function TaskList({ tasks, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <section className="grid min-h-64 place-items-center rounded-2xl border border-dashed border-stone-300 bg-white/80 p-8 text-center shadow-sm sm:min-h-[27rem]">
        <div>
          <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-teal-100 text-teal-700">
            <BookOpenCheck size={24} aria-hidden="true" />
          </span>
          <h2 className="text-xl font-semibold text-stone-950">No tasks yet</h2>
          <p className="mt-2 max-w-sm text-sm text-stone-500">
            Add a study task to start building your plan.
          </p>
        </div>
      </section>
    );
  }

  const prioritizedTasks = getPrioritizedTasks(tasks);
  const focusTask = getTodaysFocus(tasks);

  return (
    <div className="grid gap-4">
      <section
        aria-labelledby="todays-focus-heading"
        className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
              <Target size={21} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Today's Focus
              </p>
              <h2
                id="todays-focus-heading"
                className="mt-1 break-words text-xl font-semibold leading-snug text-stone-950"
              >
                {focusTask.title}
              </h2>
              <p className="mt-2 text-sm font-medium text-stone-600">
                {focusTask.importance.explanation}
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800">
            {focusTask.importance.label}
          </span>
        </div>
      </section>

      <section aria-label="Study tasks" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {prioritizedTasks.map((task) => (
          <TaskCard key={task.id} task={task} onDeleteTask={onDeleteTask} />
        ))}
      </section>
    </div>
  );
}
