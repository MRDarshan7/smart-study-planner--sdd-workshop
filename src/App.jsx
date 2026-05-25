import { ClipboardList, Layers3 } from 'lucide-react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useLocalStorage } from './hooks/useLocalStorage';

function createTask(taskData) {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...taskData,
  };
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage('smart-study-planner:tasks', []);

  function addTask(taskData) {
    setTasks((currentTasks) => [createTask(taskData), ...currentTasks]);
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  return (
    <main className="min-h-screen text-stone-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <header className="rounded-2xl border border-stone-200 bg-white/85 p-5 shadow-sm backdrop-blur sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
              <ClipboardList size={17} aria-hidden="true" />
              Study Planner
              </div>
              <h1 className="max-w-3xl text-2xl font-bold tracking-normal text-stone-950 sm:text-3xl lg:text-4xl">
                Plan study work without the clutter.
              </h1>
            </div>

            <div className="flex w-full items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-950 md:w-auto md:min-w-44">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-emerald-700 shadow-sm">
                <Layers3 size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-2xl font-bold leading-none">{tasks.length}</p>
                <p className="mt-1 text-sm font-medium text-emerald-800">
                  {tasks.length === 1 ? 'task' : 'tasks'} saved
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[380px_1fr] lg:items-start">
          <TaskForm onAddTask={addTask} />
          <TaskList tasks={tasks} onDeleteTask={deleteTask} />
        </div>
      </div>
    </main>
  );
}
