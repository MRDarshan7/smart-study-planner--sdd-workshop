import { ClipboardList } from 'lucide-react';
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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <header className="flex flex-col gap-4 border-b border-stone-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 bg-white px-3 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
              <ClipboardList size={17} aria-hidden="true" />
              Study Planner
            </div>
            <h1 className="max-w-3xl text-3xl font-bold tracking-normal text-stone-950 sm:text-4xl">
              Plan study work without the clutter.
            </h1>
          </div>
          <div className="bg-stone-900 px-4 py-3 text-white">
            <p className="text-2xl font-bold">{tasks.length}</p>
            <p className="text-sm text-stone-300">{tasks.length === 1 ? 'task' : 'tasks'} saved</p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[390px_1fr] lg:items-start">
          <TaskForm onAddTask={addTask} />
          <TaskList tasks={tasks} onDeleteTask={deleteTask} />
        </div>
      </div>
    </main>
  );
}
