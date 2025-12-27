import { useNavigate } from "react-router-dom";
import ventarLogo from "../assets/ventar.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-(--brand-bg)">
      
      {/* Header */}
      <header className="bg-(--brand-bg) px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={ventarLogo}
            alt="Company Logo"
            className="h-20 w-auto"
          />
        </div>

        <span className="text-sm text-gray-500">
          v1.0
        </span>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-6">
          Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* Billing Card */}
          <button
            onClick={() => navigate("/billing")}
            className="bg-white rounded-xl p-6 shadow hover:shadow-md transition text-left"
          >
            <h3 className="text-lg font-semibold mb-2">
              Billing
            </h3>
            <p className="text-gray-600 text-sm">
              Create bills, invoices and quotations
            </p>
          </button>

          {/* Reports */}
          <div className="bg-gray-200 rounded-xl p-6 text-gray-500 cursor-not-allowed">
            <h3 className="text-lg font-semibold mb-2">
              Reports
            </h3>
            <p className="text-sm">
              Coming soon
            </p>
          </div>

          {/* Settings */}
          <div className="bg-gray-200 rounded-xl p-6 text-gray-500 cursor-not-allowed">
            <h3 className="text-lg font-semibold mb-2">
              Settings
            </h3>
            <p className="text-sm">
              Coming soon
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
