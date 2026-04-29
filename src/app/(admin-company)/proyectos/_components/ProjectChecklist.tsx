import type { MockProjectTask } from "@/mocks";

type ProjectChecklistProps = {
  tasks: MockProjectTask[];
  onToggleTask: (taskId: number) => void;
};

export function ProjectChecklist({ tasks, onToggleTask }: ProjectChecklistProps) {
  if (tasks.length === 0) {
    return <p className="text-sm text-neutral-500">Sin tareas registradas.</p>;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <label key={task.id} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-neutral-200 p-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
            className="mt-1 h-4 w-4 rounded border-neutral-300"
          />
          <span className={task.completed ? "text-sm text-neutral-500 line-through" : "text-sm text-neutral-800"}>
            {task.title}
          </span>
        </label>
      ))}
    </div>
  );
}
