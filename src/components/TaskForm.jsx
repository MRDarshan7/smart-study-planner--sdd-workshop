import { CalendarDays, Flag, Layers, Plus, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { difficulties, priorities, subjects } from '../constants/taskOptions';

const initialFormState = {
  title: '',
  subject: subjects[0],
  deadline: '',
  difficulty: difficulties[1],
  priority: priorities[1],
};

export function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState(initialFormState);

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    onAddTask({
      ...formData,
      title: formData.title.trim(),
    });

    setFormData(initialFormState);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-stone-200 bg-white p-5 shadow-soft sm:p-6"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center bg-emerald-100 text-emerald-700">
          <Sparkles size={20} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-stone-950">Add study task</h2>
          <p className="text-sm text-stone-500">Capture what needs attention next.</p>
        </div>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-stone-700">Title</span>
          <input
            name="title"
            value={formData.title}
            onChange={updateField}
            placeholder="e.g. Revise quadratic equations"
            className="h-11 border border-stone-300 bg-stone-50 px-3 text-stone-950 outline-none transition focus:border-emerald-500 focus:bg-white"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-stone-700">Subject</span>
            <select
              name="subject"
              value={formData.subject}
              onChange={updateField}
              className="h-11 border border-stone-300 bg-stone-50 px-3 text-stone-950 outline-none transition focus:border-emerald-500 focus:bg-white"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="flex items-center gap-2 text-sm font-medium text-stone-700">
              <CalendarDays size={16} aria-hidden="true" />
              Deadline
            </span>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={updateField}
              className="h-11 border border-stone-300 bg-stone-50 px-3 text-stone-950 outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="flex items-center gap-2 text-sm font-medium text-stone-700">
              <Layers size={16} aria-hidden="true" />
              Difficulty
            </span>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={updateField}
              className="h-11 border border-stone-300 bg-stone-50 px-3 text-stone-950 outline-none transition focus:border-emerald-500 focus:bg-white"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="flex items-center gap-2 text-sm font-medium text-stone-700">
              <Flag size={16} aria-hidden="true" />
              Priority
            </span>
            <select
              name="priority"
              value={formData.priority}
              onChange={updateField}
              className="h-11 border border-stone-300 bg-stone-50 px-3 text-stone-950 outline-none transition focus:border-emerald-500 focus:bg-white"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex h-11 items-center justify-center gap-2 bg-emerald-700 px-4 font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <Plus size={18} aria-hidden="true" />
          Add task
        </button>
      </div>
    </form>
  );
}
