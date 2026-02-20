import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getInvoices, saveInvoices } from "../utils/localStorage";
import { Download, Trash2 } from "lucide-react";
import jsPDF from "jspdf";

function Invoices() {
  const navigate = useNavigate();
  const location = useLocation();

  const [invoices, setInvoices] = useState([]);

  // 🔥 auto refresh when page opens
  useEffect(() => {
    setInvoices(getInvoices());
  }, [location.pathname]);

  // 🗑 delete invoice
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this invoice?"
    );
    if (!confirmDelete) return;

    const updated = invoices.filter((inv) => inv.id !== id);
    setInvoices(updated);
    saveInvoices(updated);
  };

  // 📄 download from list
  const handleDownloadFromList = (inv) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Paper Traders", 14, 20);

    doc.setFontSize(12);
    doc.text(`Invoice No: INV-${inv.invoiceNumber}`, 14, 30);
    doc.text(`Date: ${inv.date}`, 14, 38);

    doc.text(`Name: ${inv.name}`, 14, 50);
    doc.text(`Mobile: ${inv.mobile}`, 14, 58);

    doc.text("Address:", 14, 66);
    doc.text(inv.address || "", 14, 72);

    let y = 90;
    doc.text("Description", 14, y);
    doc.text("Qty", 110, y);
    doc.text("Amount", 140, y);

    y += 6;

    inv.items?.forEach((item) => {
      doc.text(item.description, 14, y);
      doc.text(String(item.qty), 110, y);
      doc.text(String(item.amount), 140, y);
      y += 6;
    });

    y += 10;
    doc.text(`Total: ₹${inv.total?.toFixed(2)}`, 14, y);

    doc.save(`Invoice-${inv.invoiceNumber}.pdf`);
  };

  return (
    <div className="p-6">
      {/* 🔷 Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>

        <button
          onClick={() => navigate("/invoices/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Invoice
        </button>
      </div>

      {/* 🔷 List */}
      {invoices.length === 0 ? (
        <p className="text-gray-500">No invoices yet.</p>
      ) : (
        <div className="space-y-4">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              {/* LEFT INFO */}
              <div>
                <p className="font-semibold">{inv.name}</p>
                <p className="text-sm text-gray-500">
                  {inv.mobile} • {inv.date}
                </p>
                <p className="text-sm font-medium">
                  ₹{inv.total} • {inv.status}
                </p>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex gap-2 items-center">
                {/* ✏️ EDIT */}
                <button
                  onClick={() => navigate(`/invoices/edit/${inv.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>

                {/* 📄 DOWNLOAD ICON */}
                <button
                  onClick={() => handleDownloadFromList(inv)}
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                  title="Download"
                >
                  <Download size={18} />
                </button>

                {/* 🗑 DELETE ICON */}
                <button
                  onClick={() => handleDelete(inv.id)}
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Invoices;