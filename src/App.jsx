import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import QuickAddClient from "./components/QuickAddClient";

import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Clients from "./pages/Clients";
import Products from "./pages/Products";
import CreateInvoice from "./pages/CreateInvoice";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // close sidebar when route changes (mobile UX)
  const handleNavigate = () => setSidebarOpen(false);

  return (
    <div className="h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* ✅ MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ✅ SIDEBAR */}
      <div
        className={`
          fixed lg:static z-50 h-full
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Navbar />
      </div>

      {/* ✅ MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 🔷 Mobile Top Bar */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-3 py-2 rounded-lg bg-gray-100"
          >
            ☰
          </button>

          <h1 className="font-bold text-gray-700">
            Smart Paper Traders
          </h1>

          <div className="w-8" />
        </div>

        {/* 🔷 Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="min-h-full bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoices/new" element={<CreateInvoice />} />
              <Route path="/invoices/edit/:id" element={<CreateInvoice />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* ✅ RIGHT PANEL — DESKTOP ONLY */}
      <div className="hidden xl:block">
        <QuickAddClient />
      </div>
    </div>
  );
}

export default App;