import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";
import {
  UserCircle,
  CheckCircle,
  ClipboardList,
  Clock3,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const Profile = () => {
  const tasks = useSelector(
    (state) => state.tasks || []
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks / tasks.length) * 100
        );

  const chartData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#eab308",
  ];

  const handleExport = () => {
  const dataStr = JSON.stringify(
    tasks,
    null,
    2
  );

  const blob = new Blob(
    [dataStr],
    {
      type: "application/json",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = "tasks.json";

  link.click();

  window.URL.revokeObjectURL(url);

  toast.success(
  "Tasks Exported Successfully"
);
};

  return (
    <div className="p-8">

      {/* Profile Card */}
      <div
        className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-8
          mb-8
        "
      >
        <div className="flex items-center gap-4">

          <UserCircle
            size={70}
            className="text-cyan-400"
          />

          <div>
            <h1 className="text-3xl font-bold">
              Firoz
            </h1>

            <p className="text-slate-400">
              Frontend Developer
            </p>

            <button
  onClick={handleExport}
  className="
    mt-4
    flex
    items-center
    gap-2
    bg-cyan-500
    hover:bg-cyan-600
    px-4
    py-2
    rounded-xl
    text-sm
    font-medium
    transition-all
  "
>
  ⬇ Export Tasks
</button>

          </div>

        </div>
      </div>


      {/* Analytics Cards */}
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <ClipboardList
            className="mb-3 text-cyan-400"
          />
          <h3>Total Tasks</h3>
          <p className="text-3xl font-bold">
            {tasks.length}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <CheckCircle
            className="mb-3 text-green-400"
          />
          <h3>Completed</h3>
          <p className="text-3xl font-bold">
            {completedTasks}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <Clock3
            className="mb-3 text-yellow-400"
          />
          <h3>Pending</h3>
          <p className="text-3xl font-bold">
            {pendingTasks}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <UserCircle
            className="mb-3 text-purple-400"
          />
          <h3>Completion Rate</h3>
          <p className="text-3xl font-bold">
            {completionRate}%
          </p>
        </div>

      </div>

      {/* Chart Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Task Analytics
        </h2>

        <div className="w-full h-[350px] min-w-0">

    <PieChart width={500} height={300}>
  <Pie
    data={chartData}
    cx={250}
    cy={150}
    outerRadius={100}
    dataKey="value"
    label
  >
    {chartData.map((entry, index) => (
      <Cell
        key={index}
        fill={COLORS[index]}
      />
    ))}
  </Pie>

  <Tooltip />
</PieChart>     

        </div>

      </div>

    </div>
  );
};

export default Profile;