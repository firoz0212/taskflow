import {
  Search,
  Bell,
  UserCircle,
  Filter
} from "lucide-react";

const Header = ({
  search,
  setSearch,
  filter,
  setFilter
}) => {

return (
    <div
       className="
        flex
        items-center
        justify-between
        mb-8"
    >
       {/* Search + Filter */}

    <div className="flex items-center gap-3">

       {/* Search */}

        <div className="relative w-[400px]">
          <Search
             size={18}
              className="
              absolute
              left-4
              top-4
              text-slate-400"
          />

        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search tasks..."
            className="
              w-full
              bg-slate-900
              border
              border-slate-800
              rounded-xl
              py-3
              pl-12
              pr-4
              outline-none
              focus:border-cyan-500"
        />
        </div>

             {/* Filter */}

        <div className="relative w-[180px]">
          <Filter
             size={18}
             className="
              absolute
              left-3
              top-4
              text-slate-400
              pointer-events-none"
          />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="
              w-full
              bg-slate-900
              border
              border-slate-800
              rounded-xl
              py-3
              pl-10
              pr-4
              outline-none
              focus:border-cyan-500 "
            >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
            <option>Completed</option>
            <option>Pending</option>
            </select>

        </div>
        </div>

             {/* Right Side */}

        <div className="flex items-center gap-5">

        <Bell
          size={22}
          className="cursor-pointer"
        />

        <div
            className="
            flex
            items-center
            gap-2
            bg-slate-900
            px-3
            py-2
            rounded-xl"
            >

        <UserCircle size={28} />

        <div>
            <p className="text-sm font-medium">
              Firoz
            </p>

            <p className="text-xs text-slate-400">
              Developer
            </p>
        </div>
        </div>

    </div>
    </div>
  );
};

export default Header;