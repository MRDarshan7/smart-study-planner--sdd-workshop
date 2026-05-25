import { BookOpenCheck } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { TodaysFocus } from './TodaysFocus';
import { getPrioritizedTasks } from '../utils/prioritization';

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
  const focusTask = prioritizedTasks[0];

  return (
    <section aria-label="Study tasks" className="grid gap-4">
      <TodaysFocus task={focusTask} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {prioritizedTasks.map((task) => (
          <TaskCard key={task.id} task={task} onDeleteTask={onDeleteTask} />
        ))}
      </div>
    </section>
  );
}
