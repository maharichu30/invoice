import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Users, Package } from "lucide-react";

function Navbar() {
  const baseLink =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200";

  const activeLink = "bg-blue-600 text-white shadow-md";
  const inactiveLink =
    "text-gray-700 hover:bg-blue-50 hover:text-blue-600";

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-white to-blue-50 border-r border-gray-200 p-5 flex flex-col sticky top-0">
      {/* 🔷 Logo */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 leading-tight">
          Smart Paper
        </h2>
        <p className="text-xs text-gray-500 -mt-1">Traders</p>
      </div>

      {/* 🔷 Menu */}
      <nav className="space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/invoices"
          end
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          <FileText size={18} />
          Invoices
        </NavLink>

        <NavLink
          to="/clients"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          <Users size={18} />
          Clients
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          <Package size={18} />
          Products
        </NavLink>
      </nav>

      {/* 🔷 Footer */}
      <div className="mt-auto pt-6 border-t text-xs text-gray-400">
        © {new Date().getFullYear()} Smart Paper Traders
      </div>
    </aside>
  );
}

export default Navbar;