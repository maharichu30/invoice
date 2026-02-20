import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInvoices, saveInvoices } from "../utils/localStorage";
import jsPDF from "jspdf";
import { Trash2 } from "lucide-react";

function CreateInvoice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [invoiceNumber, setInvoiceNumber] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    date: "",
    address: "",
  });

  const [items, setItems] = useState([
    { description: "", qty: "", amount: "" },
  ]);

  const taxRate = 18;

  const productList = [
    { name: "A4 Paper 70 GSM", price: 230 },
    { name: "A4 Paper 75 GSM", price: 250 },
    { name: "A4 Paper 80 GSM", price: 270 },
    { name: "A3 Paper", price: 450 },
    { name: "A2 Paper", price: 650 },
    { name: "Photo Paper Glossy", price: 320 },
    { name: "Sticker Paper", price: 300 },
    { name: "Chart Paper", price: 20 },
    { name: "Brown Cover", price: 15 },
    { name: "Paper Bundle Box", price: 1200 },
  ];

  useEffect(() => {
    const data = getInvoices();
    setInvoiceNumber(data.length + 1);

    if (isEditMode) {
      const existingInvoice = data.find((inv) => String(inv.id) === String(id));

      if (existingInvoice) {
        setFormData({
          name: existingInvoice.name,
          mobile: existingInvoice.mobile,
          date: existingInvoice.date,
          address: existingInvoice.address,
        });

        setItems(existingInvoice.items);
        setInvoiceNumber(existingInvoice.invoiceNumber);
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 auto price fill
  const handleItemChange = (index, field, value) => {
    const updated = [...items];

    if (field === "description") {
      const selected = productList.find((p) => p.name === value);
      updated[index].description = value;
      updated[index].amount = selected ? selected.price : "";
    } else {
      updated[index][field] = value;
    }

    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { description: "", qty: "", amount: "" }]);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.qty) * Number(item.amount),
    0,
  );

  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  const isFormValid = () => {
    if (
      !formData.name ||
      !formData.mobile ||
      !formData.date ||
      !formData.address
    )
      return false;

    for (let item of items) {
      if (!item.description || !item.qty || !item.amount) return false;
    }

    return true;
  };

  // 🔥 SAVE + DOWNLOAD TOGETHER
  const handleSaveAndDownload = () => {
    if (!isFormValid()) return;

    const existing = getInvoices();

    if (isEditMode) {
      const updated = existing.map((inv) =>
        String(inv.id) === String(id)
          ? { ...inv, ...formData, items, subtotal, tax, total }
          : inv,
      );

      saveInvoices(updated);
      alert("Invoice Updated!");
    } else {
      const newInvoice = {
        id: Date.now(),
        invoiceNumber,
        ...formData,
        items,
        subtotal,
        tax,
        total,
        status: "unpaid",
      };

      saveInvoices([...existing, newInvoice]);
      alert("Invoice Saved!");
    }

    // 📄 PDF
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Paper Traders", 14, 20);

    doc.setFontSize(12);
    doc.text(`Invoice No: INV-${invoiceNumber}`, 14, 30);
    doc.text(`Date: ${formData.date}`, 14, 38);

    doc.text(`Name: ${formData.name}`, 14, 50);
    doc.text(`Mobile: ${formData.mobile}`, 14, 58);

    doc.text("Address:", 14, 66);
    doc.text(formData.address || "", 14, 72);

    let y = 90;
    doc.text("Description", 14, y);
    doc.text("Qty", 110, y);
    doc.text("Amount", 140, y);

    y += 6;

    items.forEach((item) => {
      doc.text(item.description, 14, y);
      doc.text(String(item.qty), 110, y);
      doc.text(String(item.amount), 140, y);
      y += 6;
    });

    y += 10;
    doc.text(`Total: ₹${total.toFixed(2)}`, 14, y);

    doc.save(`Invoice-${invoiceNumber}.pdf`);

    navigate("/invoices");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* 🔷 Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {isEditMode ? "Edit Invoice" : "Create Invoice"}
          </h1>
          <p className="text-sm text-gray-500">Manage your customer billing</p>
        </div>

        <button
          onClick={() => navigate("/invoices")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium transition"
        >
          ← Back
        </button>
      </div>

      {/* 🔷 Main Card */}
      <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        {/* 🔷 Company Header */}
        <div className="text-center border-b border-gray-100 pb-4">
          <h1 className="text-3xl font-bold text-blue-600">Smart Paper Traders</h1>
          <p className="text-gray-400 text-sm">chennai-600002</p>
        </div>

        {/* 🔷 Client Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Customer Name *"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="mobile"
            placeholder="Mobile Number *"
            value={formData.mobile}
            onChange={handleChange}
            className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            value={`INV-${invoiceNumber}`}
            readOnly
            className="p-3 border rounded-xl bg-gray-100"
          />

          <textarea
            name="address"
            placeholder="Address *"
            value={formData.address}
            onChange={handleChange}
            className="p-3 border rounded-xl md:col-span-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* 🔷 Items Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-800">Items</h2>

            <button
              onClick={addItem}
              className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm hover:bg-black transition"
            >
              + Add Item
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-3 items-center bg-gray-50 p-3 rounded-xl"
              >
                {/* description */}
                <select
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  className="col-span-5 p-2 border rounded-lg bg-white"
                >
                  <option value="">Select Item *</option>
                  {productList.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>

                {/* qty */}
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.qty}
                  onChange={(e) =>
                    handleItemChange(index, "qty", e.target.value)
                  }
                  className="col-span-2 p-2 border rounded-lg bg-white"
                />

                {/* amount */}
                <input
                  type="number"
                  value={item.amount}
                  readOnly
                  className="col-span-3 p-2 border rounded-lg bg-gray-100"
                />

                {/* delete */}
                <button
                  onClick={() => deleteItem(index)}
                  className="col-span-2 bg-red-500 text-white h-10 w-10 rounded-xl hover:bg-red-600 flex items-center justify-center"
                  title="Delete Item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 🔷 Totals */}
        <div className="flex justify-end">
          <div className="w-full sm:w-72 bg-gray-50 p-4 rounded-xl space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-green-600 pt-2 border-t">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* 🔷 Action */}
        <div className="flex justify-end">
          <button
            disabled={!isFormValid()}
            onClick={handleSaveAndDownload}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition ${
              isFormValid()
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg hover:scale-[1.02]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isEditMode ? "Update & Download" : "Save & Download"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateInvoice;
