"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { bills } from "../../lib/actions";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BillingPage() {
  const router = useRouter();
  const [billsList, setBillsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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
    async function fetchBills() {
      try {
        const data = await bills();
        console.log('Fetched bills:', data);
        setBillsList(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bills data");
        setLoading(false);
      }
    }
    fetchBills();
  }, []);

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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        className="max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-10 text-center tracking-tight">
          Billing Management
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {billsList.map((bill) => (
            <motion.div
              key={bill.id}
              className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-indigo-900">Bill ID: {bill.id}</h2>
                <p className="text-gray-700">
                  <strong>Patient ID:</strong> {bill.patient_id}
                </p>
                <p className="text-gray-700">
                  <strong>Total Amount:</strong> ${parseFloat(bill.total_amount).toFixed(2)}
                </p>
                <p className="text-gray-700">
                  <strong>Bill Date:</strong> {formatDisplayDate(bill.bill_date)}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong> {bill.status}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
