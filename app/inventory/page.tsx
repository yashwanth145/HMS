
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { inventory, updateInventory } from "../../lib/actions"; 
import Image from "next/image";
import { motion } from "framer-motion";

export default function InventoryPage() {
  const router = useRouter();
  const [inventoryList, setInventoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    quantity: "",
    price: "",
    expiry_date: "",
  });

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr || "N/A";
    }
  };

  useEffect(() => {
    async function fetchInventory() {
      try {
        const data = await inventory();
        setInventoryList(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch inventory data");
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);

  const handleEditClick = (item) => {
    setEditingItem(item.name);
    setFormData({
      quantity: item.quantity || "",
      price: item.price || "",
      expiry_date: item.expiry_date || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (itemName) => {
    try {
      // Basic validation
      if (!formData.quantity || !formData.price) {
        setError("Quantity and Price are required");
        return;
      }
      if (isNaN(formData.quantity) || formData.quantity < 0) {
        setError("Quantity must be a non-negative number");
        return;
      }
      if (isNaN(formData.price) || formData.price < 0) {
        setError("Price must be a non-negative number");
        return;
      }
      await updateInventory(itemName, formData);
      setInventoryList((prev) =>
        prev.map((item) =>
          item.name === itemName ? { ...item, ...formData } : item
        )
      );
      setEditingItem(null);
      setError(null);
    } catch (err) {
      setError("Failed to update inventory data");
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setFormData({
      quantity: "",
      price: "",
      expiry_date: "",
    });
    setError(null);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="text-center text-indigo-800 text-3xl font-semibold animate-pulse">
          Loading...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="text-center text-red-600 text-2xl font-semibold">
          Error: {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-800 to-green-300 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        className="max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-900 mb-10 text-center tracking-tight">
          Inventory Management
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {inventoryList.map((item) => (
            <motion.div
              key={item.name}
              className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center mb-4">
               
              </div>
              {editingItem === item.name ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Name</label>
                    <p className="w-full p-3 bg-gray-100 rounded-lg text-gray-700">{item.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Category</label>
                    <p className="w-full p-3 bg-gray-100 rounded-lg text-gray-700">{item.category || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Supplier</label>
                    <p className="w-full p-3 bg-gray-100 rounded-lg text-gray-700">{item.supplier || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      required
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Expiry Date</label>
                    <input
                      type="date"
                      name="expiry_date"
                      value={formData.expiry_date}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleUpdate(item.name)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-semibold text-indigo-900">{item.name}</h2>
                  <p className="text-gray-700">
                    <strong>Category:</strong> {item.category || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p className="text-gray-700">
                    <strong>Price:</strong> ${parseFloat(item.price).toFixed(2)}
                  </p>
                  <p className="text-gray-700">
                    <strong>Expiry Date:</strong> {formatDisplayDate(item.expiry_date)}
                  </p>
                  <p className="text-gray-700">
                    <strong>Supplier:</strong> {item.supplier || "N/A"}
                  </p>
                  <button
                    onClick={() => handleEditClick(item)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                  >
                    Edit Item
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
