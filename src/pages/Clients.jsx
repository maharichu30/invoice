import { useEffect, useState } from "react";
import { getClients, saveClients } from "../utils/localStorage";

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setClients(getClients());
  }, []);

  const handleDelete = (id) => {
    const filtered = clients.filter((client) => client.id !== id);
    setClients(filtered);
    saveClients(filtered);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Clients</h1>

      {clients.length === 0 ? (
        <p className="text-gray-500">No clients added yet.</p>
      ) : (
        <div className="space-y-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex justify-between items-center bg-white p-4 rounded shadow"
            >
              <div>
                <p className="font-semibold">{client.name}</p>
                <p className="text-gray-500">{client.mobile}</p>
              </div>

              <button
                onClick={() => handleDelete(client.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Clients;
