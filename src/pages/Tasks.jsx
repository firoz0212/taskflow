import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import TaskCard from "../components/TaskCard";

const Tasks = () => {

    const tasks = useSelector(
  (state) => state.tasks || []
);


  return (

    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <Header />

        <h1 className="text-4xl font-bold mb-4">
          Tasks
        </h1>

        <div className="mt-8">

  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold">
      All Tasks
    </h2>

    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">
      {tasks.length} Tasks
    </span>
  </div>

  {tasks.length === 0 ? (
    <div className="text-center py-16">
      <div className="text-6xl mb-3">📋</div>

      <h3 className="text-xl font-semibold">
        No Tasks Found
      </h3>

      <p className="text-slate-400 mt-2">
        Create your first task from Dashboard.
      </p>
    </div>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          dueDate={task.dueDate}
          status={task.status}
        />
      ))}
    </div>
  )}

    </div>
    </div>
    </div>
  );
};

export default Tasks;