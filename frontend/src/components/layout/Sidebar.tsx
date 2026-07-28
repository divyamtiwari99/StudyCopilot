import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "../../data/sidebar";
import { APP } from "../../constants/app";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950">

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-2xl font-bold tracking-tight text-white">
          {APP.NAME}
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          {APP.TAGLINE}
        </p>

      </div>

      <nav className="flex-1 p-4">

        {SIDEBAR_ITEMS.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon size={19} />

              <span className="font-medium">
                {item.title}
              </span>

            </NavLink>
          );

        })}

      </nav>

    </aside>
  );
}