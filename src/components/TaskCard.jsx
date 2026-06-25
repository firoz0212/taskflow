import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";


import {
  deleteTask,
  updateStatus,
  editTask,
} from "../redux/taskSlice";

import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({
  id,
  title,
  description,
  priority,
  dueDate,
  status,
}) => {
  const dispatch = useDispatch();

  const {
  attributes,
  listeners,
  setNodeRef,
  transform,
} = useDraggable({
  id: id,
  data: {
    taskId: id,
    status,
  },
});

const style = transform
  ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    }
  : undefined;

  const [isEditOpen, setIsEditOpen] = 
    useState(false);

  const [editTitle, setEditTitle] = 
    useState(title);

  const [editDescription, setEditDescription] =
    useState(description);

  const [editPriority, setEditPriority] =
    useState(priority);

  const [editDueDate, setEditDueDate] =
    useState(dueDate);

  const [editStatus, setEditStatus] = 
    useState(status);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {
      dispatch(deleteTask(id));
      toast.success("Task Deleted");
    }
  };

  const handleMove = () => {
     console.log("MOVE BUTTON CLICKED");
    let newStatus = "todo";

    if (status === "todo") {
      newStatus = "progress";
    } else if (status === "progress") {
      newStatus = "completed";
    }

    dispatch(
      updateStatus({
        id,
        status: newStatus,
      })
    );

    toast.success("Task Status Updated");

  };

  const handleEditSave = () => {
    dispatch(
      editTask({
        id,
        title: editTitle,
        description: editDescription,
        priority: editPriority,
        dueDate: editDueDate,
        status: editStatus,
      })
    );

    toast.success("Task Updated");
    setIsEditOpen(false);
  };

  const priorityColor =
    priority === "High"
      ? "bg-red-500"
      : priority === "Medium"
      ? "bg-yellow-500"
      : "bg-green-500";

      const getDueDateStatus = () => {
  if (!dueDate) return "normal";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  if (due < today) return "overdue";
  if (due.getTime() === today.getTime())
    return "today";

  return "upcoming";
};

const dueStatus = getDueDateStatus();

  return (
    <>
    
          <div
            ref={setNodeRef}
            style={style}

            className="
            bg-slate-800/60
            border
            border-slate-700
            p-4
            rounded-xl
            mb-3
            hover:scale-[1.02]
            hover:border-cyan-500
            transition-all
            duration-300
            "
            >
           <div className="flex justify-between items-center">

           <div
               {...listeners}
               {...attributes}
               className="cursor-grab"
               >
               <h3 className="font-semibold">
                {title}
               </h3>
            </div>

            <span
              className={`${priorityColor} text-xs px-2 py-1 rounded-lg`}
              >
              {priority}
            </span>

        </div>

        <p className="text-slate-400 text-sm mt-2">
          {description}
        </p>

        <p
          className={
           dueStatus === "overdue"
           ? "text-red-400"
           : dueStatus === "today"
           ? "text-yellow-400"
           : "text-slate-400"
           }
           >
           {dueStatus === "overdue" && "🔴 "}
           {dueStatus === "today" && "🟡 "}

           Due: {dueDate}
        </p>

        <p className="text-slate-400 text-sm mt-2">
          Status: {status}
        </p>

        <div className="flex gap-2 mt-3">
          <button
           onClick={(e) => {
           e.stopPropagation();
           handleMove();
           }}
           className="bg-cyan-500 px-3 py-1 rounded-lg text-sm"
           >
             Move
          </button>

          <button
           onClick={(e) => {
           e.stopPropagation();
           setIsEditOpen(true);
           }}
           className="bg-yellow-300 px-3 py-1 rounded-lg text-sm"
           >
            Edit
          </button>

          <button
           onClick={(e) => {
           e.stopPropagation();
           handleDelete();
           }}
           className="bg-red-500 px-3 py-1 rounded-lg text-sm"
           >
            Delete
          </button>

        </div>
    </div>

      {isEditOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-[90%] max-w-md">

            <h2 className="text-xl font-bold mb-4">
              Edit Task
            </h2>

            <input
              value={editTitle}
              onChange={(e) =>
                setEditTitle(e.target.value)
              }
              className="w-full bg-slate-800 p-3 rounded-xl mb-3 outline-none"
            />

            <textarea
              value={editDescription}
              onChange={(e) =>
                setEditDescription(e.target.value)
              }
              className="w-full bg-slate-800 p-3 rounded-xl mb-3 outline-none"
            />

            <select
              value={editPriority}
              onChange={(e) =>
                setEditPriority(e.target.value)
              }
              className="w-full bg-slate-800 p-3 rounded-xl mb-3"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              value={editDueDate}
              onChange={(e) =>
                setEditDueDate(e.target.value)
              }
              className="w-full bg-slate-800 p-3 rounded-xl mb-3"
            />

            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full bg-slate-800 p-3 rounded-xl mb-3"
              >
              <option value="todo">Todo</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setIsEditOpen(false)
                }
                className="bg-slate-700 px-4 py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleEditSave}
                className="bg-cyan-500 px-4 py-2 rounded-xl"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default TaskCard;