
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  User,
  Settings,
  LogIn
} from "lucide-react";
import { KanbanSquare } from "lucide-react";


const Sidebar = () => {
  return (
    <div className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 p-6">

      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        TaskFlow
      </h1>

    <ul className="space-y-3">

      <NavLink
        to="/"
          className={({ isActive }) =>
         `flex items-center gap-3 p-3 rounded-xl transition-all ${
          isActive
          ? "bg-cyan-500 text-white"
          : "hover:bg-slate-800"
          }`
        }
       >
        <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

      <NavLink
        to="/tasks"
          className={({ isActive }) =>
         `flex items-center gap-3 p-3 rounded-xl transition-all ${
          isActive
          ? "bg-cyan-500 text-white"
          : "hover:bg-slate-800"
          }`
        }
      >
       <CheckSquare size={20} />
          Tasks
       </NavLink>

      <NavLink
         to="/profile"
           className={({ isActive }) =>
           `flex items-center gap-3 p-3 rounded-xl transition-all ${
           isActive
           ? "bg-cyan-500 text-white"
           : "hover:bg-slate-800"
           }`
        }
      >
       <User size={20} />
         Profile
       </NavLink>

      <Link
        to="/login"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
        >
      <LogIn size={20}/>
        Login
      </Link>

</ul>  
 </div>
 
  );
};

export default Sidebar;