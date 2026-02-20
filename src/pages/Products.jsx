import { useEffect, useState } from "react";
import { getProductStock, saveProductStock } from "../utils/localStorage";

function Products() {
  // ✅ MASTER PRODUCT LIST (fixed)
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

  const [stockData, setStockData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [qty, setQty] = useState("");

  // 🔹 load stock
  useEffect(() => {
    setStockData(getProductStock());
  }, []);

  // 🔹 add stock
  const handleAddStock = () => {
    if (!selectedProduct || !qty) {
      alert("Select product and qty");
      return;
    }

    const existing = [...stockData];
    const foundIndex = existing.findIndex(
      (p) => p.name === selectedProduct
    );

    if (foundIndex >= 0) {
      existing[foundIndex].stock += Number(qty);
    } else {
      const productInfo = productList.find(
        (p) => p.name === selectedProduct
      );

      existing.push({
        name: selectedProduct,
        price: productInfo.price,
        stock: Number(qty),
      });
    }

    setStockData(existing);
    saveProductStock(existing);

    setSelectedProduct("");
    setQty("");
  };

  // 🔹 reduce stock
  const handleReduceStock = (name) => {
    const updated = stockData.map((p) =>
      p.name === name && p.stock > 0
        ? { ...p, stock: p.stock - 1 }
        : p
    );

    setStockData(updated);
    saveProductStock(updated);
  };

  // 🔹 status
  const getStatusColor = (stock) => {
    if (stock === 0) return "text-red-600";
    if (stock < 50) return "text-yellow-600";
    return "text-green-600";
  };

  const getStatusText = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 20) return "Low Stock";
    return "In Stock";
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Products Stock</h1>

      {/* ➕ Add Stock */}
      <div className="bg-white p-4 rounded shadow grid grid-cols-3 gap-3">
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Product</option>
          {productList.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name} (₹{p.price})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Add Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          onClick={handleAddStock}
          className="bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Stock
        </button>
      </div>

      {/* 📦 Stock List */}
      {stockData.length === 0 ? (
        <p className="text-gray-500">No stock added yet.</p>
      ) : (
        <div className="space-y-3">
          {stockData.map((p) => (
            <div
              key={p.name}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-500">
                  Price: ₹{p.price} • Qty: {p.stock}
                </p>
                <p className={`text-sm font-semibold ${getStatusColor(p.stock)}`}>
                  {getStatusText(p.stock)}
                </p>
              </div>

              <button
                onClick={() => handleReduceStock(p.name)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                -1 Reduce
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;