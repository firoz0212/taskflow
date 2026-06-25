import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import TaskColumn from "../components/TaskColumn";
import Header from "../components/Header";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/taskSlice";
import toast from "react-hot-toast";
import { DndContext } from "@dnd-kit/core";
import { updateStatus } from "../redux/taskSlice";


const Dashboard = () => {

  // UI STATE

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("todo");

  const dispatch = useDispatch();

  const handleDragEnd = (event) => {
  const { active, over } = event;

  if (!over) return;

  dispatch(
    updateStatus({
      id: active.id,
      status: over.id,
    })
  );
};

  // REDUX DATA
  const tasks = useSelector((state) => state.tasks || []);

  // ADD TASK
  const handleAddTask = () => {
  if (!taskInput.trim()) return;

  dispatch(
    addTask({
      id: Date.now(),
      title: taskInput,
      description,
      priority,
      dueDate,
      status,
    })
  );

  toast.success("Task Added Successfully");

  setTaskInput("");
  setDescription("");
  setPriority("Medium");
  setDueDate("");

  setIsModalOpen(false);
};

  //  SEARCH FILTER

  const filteredTasks = tasks.filter((task) => {
  const matchesSearch = task.title
    .toLowerCase()
    .includes(search.toLowerCase());

  if (filter === "All")
    return matchesSearch;

  if (filter === "Completed")
    return (
      matchesSearch &&
      task.status === "completed"
    );

  if (filter === "Pending")
    return (
      matchesSearch &&
      task.status !== "completed"
    );

  return (
    matchesSearch &&
    task.priority === filter
  );
});

  // SPLIT TASKS

  const todoTasks = filteredTasks.filter(t => t.status === "todo");
  const progressTasks = filteredTasks.filter(t => t.status === "progress");
  const completedTasks = filteredTasks.filter(t => t.status === "completed");

  const completionPercentage =
  tasks.length === 0
    ? 0
    : Math.round(
        (completedTasks.length / tasks.length) * 100
      );

  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <div className="flex-1 p-6 lg:p-10">

        {/* HEADER */}

        <h1 className="text-3xl lg:text-4xl font-bold mb-6">
          Dashboard
        </h1>
        <Header

  search={search}
  setSearch={setSearch}
  filter={filter}
  setFilter={setFilter}
/>

<div
  className="
    bg-gradient-to-r
    from-cyan-500/20
    to-blue-500/20
    border
    border-cyan-500/20
    rounded-2xl
    p-6
    mb-8
  "
>
  <h1 className="text-3xl font-bold">
    👋 Welcome Back, Firoz
  </h1>

  <p className="text-slate-400 mt-2">
    Manage your tasks efficiently and stay productive.
  </p>
</div>


        {/* ADD BUTTON */}

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 px-5 py-3 rounded-xl font-semibold mb-8"
        >
          + Add Task
        </button>


        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <StatsCard
            title="Total Tasks"
            value={tasks.length}
          />

          <StatsCard
            title="Completed"
            value={completedTasks.length}
          />

          <StatsCard
            title="Pending"
            value={todoTasks.length + progressTasks.length}
          />

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

  <div className="flex justify-between mb-3">
    <h3 className="font-semibold text-lg">
      Task Progress
    </h3>

    <span className="text-cyan-400 font-bold">
      {completionPercentage}%
    </span>
  </div>

  <div className="w-full bg-slate-800 rounded-full h-3">
    <div
      className="bg-cyan-500 h-3 rounded-full transition-all duration-500"
      style={{
        width: `${completionPercentage}%`
      }}
    />
  </div>

  <p className="text-slate-400 text-sm mt-3">
    Completed {completedTasks.length} of {tasks.length} tasks
  </p>

</div>

        {/* TASK COLUMNS */}

        <DndContext onDragEnd={handleDragEnd}>

  <div className="grid lg:grid-cols-3 gap-6">

    <TaskColumn
      title="Todo"
      tasks={todoTasks}
      columnId="todo"
    />

    <TaskColumn
      title="In Progress"
      tasks={progressTasks}
      columnId="progress"
    />

    <TaskColumn
      title="Completed"
      tasks={completedTasks}
      columnId="completed"
    />

  </div>

</DndContext>



  </div>

      {/* MODAL */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-[90%] max-w-md">

            <h2 className="text-xl font-bold mb-4">
              Add New Task
            </h2>

            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Enter task title..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-cyan-500"
            />
            
<textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Task Description"
  className="w-full mt-3 bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none"
/>

<select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  className="w-full mt-3 bg-slate-800 border border-slate-700 rounded-xl p-3"
>
  <option>Low</option>
  <option>Medium</option>
  <option>High</option>
</select>

<input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  className="w-full mt-3 bg-slate-800 border border-slate-700 rounded-xl p-3"
/>


<select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="w-full mt-3 bg-slate-800 border border-slate-700 rounded-xl p-3"
>
  <option value="todo">Todo</option>
  <option value="progress">In Progress</option>
  <option value="completed">Completed</option>
</select>

            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600"
              >
                Cancel
              </button>

              <button
                onClick={handleAddTask}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-semibold"
              >
                Add
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Dashboard;