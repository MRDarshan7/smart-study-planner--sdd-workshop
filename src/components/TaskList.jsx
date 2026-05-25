import { BookOpenCheck } from 'lucide-react';
import { TaskCard } from './TaskCard';

export function TaskList({ tasks, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <section className="grid min-h-64 place-items-center border border-dashed border-stone-300 bg-white p-8 text-center">
        <div>
          <span className="mx-auto mb-4 grid h-12 w-12 place-items-center bg-teal-100 text-teal-700">
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

  return (
    <section aria-label="Study tasks" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDeleteTask={onDeleteTask} />
      ))}
    </section>
  );
}
