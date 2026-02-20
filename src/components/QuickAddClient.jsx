import { useState } from "react";
import { getClients, saveClients } from "../utils/localStorage";
import { UserPlus } from "lucide-react";

function QuickAddClient() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleAddClient = () => {
    if (!name || !mobile) {
      alert("Please fill all fields");
      return;
    }

    const newClient = {
      id: Date.now(),
      name,
      mobile,
    };

    const existingClients = getClients();
    const updatedClients = [...existingClients, newClient];

    saveClients(updatedClients);

    setName("");
    setMobile("");

    alert("Client Added Successfully!");
  };

  return (
    <aside className="w-72 h-screen bg-white/90 backdrop-blur border-l border-gray-200 p-5 flex flex-col sticky top-0">
      {/* 🔷 Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800">
          Quick Add Client
        </h2>
        <p className="text-xs text-gray-500">
          Add customer instantly
        </p>
      </div>

      {/* 🔷 Form */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Client Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
        />

        <button
          onClick={handleAddClient}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition flex items-center justify-center gap-2"
        >
          <UserPlus size={18} />
          Add Client
        </button>
      </div>

      {/* 🔷 Footer hint */}
      <div className="mt-auto pt-6 text-xs text-gray-400">
        Clients are saved locally
      </div>
    </aside>
  );
}

export default QuickAddClient;