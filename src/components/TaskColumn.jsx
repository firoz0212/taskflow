import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

const TaskColumn = ({ 
     title,
     tasks,
     columnId

 }) => {

    const { setNodeRef } = useDroppable({
          id: columnId,
          });

  return (
    <div
      ref={setNodeRef}
      className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5"
      >

    <div className="flex items-center justify-between mb-4">

     <h2 className="text-xl font-bold">
       {title}
     </h2>

     <span
      className="
      bg-cyan-500/20
      text-cyan-400
      px-3
      py-1
      rounded-full
      text-sm
      font-semibold
      ">
      {tasks.length}
     </span>

    </div>
      
{tasks?.length === 0 ? (
  <div className="text-center py-10">

    <div className="text-5xl mb-3">
      📝
    </div>

    <h3 className="font-semibold text-slate-300">
      No Tasks Yet
    </h3>

    <p className="text-slate-500 text-sm mt-2">
      Create your first task
      using the Add Task button.
    </p>

  </div>
) : (
  tasks.map((task) => (
    <TaskCard
      key={task.id}
      id={task.id}
      title={task.title}
      description={task.description}
      priority={task.priority}
      dueDate={task.dueDate}
      status={task.status}
    />
  ))
)}

    </div>
  );
};

export default TaskColumn;