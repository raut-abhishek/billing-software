import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="w-60 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">Billing App</h2>

      <nav className="space-y-2">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/billing" className={linkClass}>
          Billing
        </NavLink>

        <NavLink to="/items" className={linkClass}>
          Items
        </NavLink>

        <NavLink to="/customers" className={linkClass}>
          Customers
        </NavLink>
      </nav>
    </aside>
  );
}
