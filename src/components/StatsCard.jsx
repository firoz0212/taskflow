import {
  ClipboardList,
  CheckCircle,
  Clock3
} from "lucide-react";

const StatsCard = ({ title, value }) => {

  const getIcon = () => {
    if (title === "Total Tasks")
      return <ClipboardList size={26} />;

    if (title === "Completed")
      return <CheckCircle size={26} />;

    return <Clock3 size={26} />;
  };

  return (
    <div
      className="
     bg-slate-900
     border
     border-slate-800
     rounded-2xl
     p-6
     hover:-translate-y-2
     hover:shadow-lg
     hover:shadow-cyan-500/20
     hover:border-cyan-500
     transition-all
     duration-300
     "
     >

       <div className="flex justify-between items-center">

        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div
          className="
            bg-cyan-500/20
            text-cyan-400
            p-3
            rounded-xl"
            >
          {getIcon()}
        </div>

       </div>
    </div>
  );
};

export default StatsCard;