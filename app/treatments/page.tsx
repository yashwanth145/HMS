"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { prescriptions } from "../../lib/actions"; 
import Image from "next/image";
import { motion } from "framer-motion";

export default function PrescriptionsPage() {
  const router = useRouter();
  const [prescriptionsList, setPrescriptionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format date for display (e.g., MM/DD/YYYY)
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
    async function fetchPrescriptions() {
      try {
        const data = await prescriptions();
        console.log('Fetched prescriptions:', data);
        setPrescriptionsList(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch prescriptions data");
        setLoading(false);
      }
    }
    fetchPrescriptions();
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        className="max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-900 mb-10 text-center tracking-tight">
          Prescription Management
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {prescriptionsList.map((prescription) => (
            <motion.div
              key={prescription.id}
              className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <Image
                  src="/prescription-placeholder.png"
                  alt="Prescription Record"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-indigo-200"
                />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-indigo-900">Prescription ID: {prescription.id}</h2>
                <p className="text-gray-700">
                  <strong>Patient ID:</strong> {prescription.patient_id || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Doctor ID:</strong> {prescription.doctor_id || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Medicine ID:</strong> {prescription.medicine_id || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Dosage:</strong> {prescription.dosage || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Start Date:</strong> {formatDisplayDate(prescription.start_date)}
                </p>
                <p className="text-gray-700">
                  <strong>End Date:</strong> {formatDisplayDate(prescription.end_date)}
                </p>
                <p className="text-gray-700">
                  <strong>Quantity:</strong> {prescription.quantity || "N/A"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}