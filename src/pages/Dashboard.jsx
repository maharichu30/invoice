import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "../utils/localStorage";
import { Search } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = getInvoices();
    setInvoices(data);
  }, []);

  // 🔍 filter by mobile or date
  const filteredInvoices = invoices.filter((inv) => {
    const value = search.toLowerCase();
    return (
      inv.mobile?.toLowerCase().includes(value) ||
      inv.date?.toLowerCase().includes(value)
    );
  });

  // 🆕 recent 5
  const recentInvoices = [...invoices]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* 🔷 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back 👋 Manage your invoices easily
          </p>
        </div>

        <button
          onClick={() => navigate("/invoices/new")}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow hover:shadow-lg hover:scale-[1.02] transition"
        >
          + Add Invoice
        </button>
      </div>

      {/* 🔍 Search Card */}
      <div className="bg-white/90 backdrop-blur p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by mobile or date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* 🔎 Search Results */}
        {search && (
          <div className="mt-4 space-y-2">
            {filteredInvoices.length === 0 ? (
              <div className="text-center py-6 text-gray-400">
                No results found
              </div>
            ) : (
              filteredInvoices.slice(0, 5).map((inv) => (
                <div
                  key={inv.id}
                  className="p-3 rounded-xl border border-gray-100 hover:shadow-sm flex justify-between items-center transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {inv.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {inv.mobile} • {inv.date}
                    </p>
                  </div>

                  <p className="font-semibold text-blue-600">
                    ₹{inv.total}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 🆕 Recent Invoices */}
      <div className="bg-white/90 backdrop-blur p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Invoices
          </h2>

          <button
            onClick={() => navigate("/invoices")}
            className="text-blue-600 font-semibold hover:underline"
          >
            View All →
          </button>
        </div>

        {recentInvoices.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No invoices yet
          </div>
        ) : (
          <div className="space-y-2">
            {recentInvoices.map((inv) => (
              <div
                key={inv.id}
                className="p-3 rounded-xl border border-gray-100 hover:shadow-sm flex justify-between items-center transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {inv.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {inv.mobile} • {inv.date}
                  </p>
                </div>

                <p className="font-semibold text-green-600">
                  ₹{inv.total}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;