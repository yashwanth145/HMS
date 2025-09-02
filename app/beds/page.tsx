
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { beds, updateBeds } from "../../lib/actions"; 
import Image from "next/image";
import { motion } from "framer-motion";

export default function BedsPage() {
  const router = useRouter();
  const [bedsList, setBedsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBed, setEditingBed] = useState(null);
  const [formData, setFormData] = useState({
    bed_type: "",
    status: "",
    patient_id: "",
  });

  useEffect(() => {
    async function fetchBeds() {
      try {
        const data = await beds();
        console.log('Fetched beds:', data);
        setBedsList(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch beds data");
        setLoading(false);
      }
    }
    fetchBeds();
  }, []);

  const handleEditClick = (bed) => {
    setEditingBed(bed.bed_id);
    setFormData({
      bed_type: bed.bed_type || "",
      status: bed.status || "",
      patient_id: bed.patient_id || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (bedId) => {
    try {
      // Client-side validation
      if (!formData.bed_type) {
        setError("Bed Type is required");
        return;
      }
      if (!['Available', 'Occupied', 'Maintenance'].includes(formData.status)) {
        setError("Status must be Available, Occupied, or Maintenance");
        return;
      }
      if (formData.patient_id && isNaN(formData.patient_id)) {
        setError("Assigned Patient ID must be a number or empty");
        return;
      }

      console.log('Updating bed ID:', bedId, 'with data:', formData);
      await updateBeds(bedId, formData);
      setBedsList((prev) =>
        prev.map((bed) =>
          bed.bed_id === bedId ? { ...bed, ...formData } : bed
        )
      );
      setEditingBed(null);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to update bed data");
      console.error('Update error:', err.message);
    }
  };

  const handleCancel = () => {
    setEditingBed(null);
    setFormData({
      bed_type: "",
      status: "",
      patient_id: "",
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        className="max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-900 mb-10 text-center tracking-tight">
          Bed Management
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {bedsList.map((bed) => (
            <motion.div
              key={bed.bed_id}
              className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <Image
                  src="/bed-placeholder.png"
                  alt="Bed Record"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-indigo-200"
                />
              </div>
              {editingBed === bed.bed_id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Bed ID</label>
                    <p className="w-full p-3 bg-gray-100 rounded-lg text-gray-700">{bed.bed_id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Department ID</label>
                    <p className="w-full p-3 bg-gray-100 rounded-lg text-gray-700">{bed.department_id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Bed Type</label>
                    <input
                      type="text"
                      name="bed_type"
                      value={formData.bed_type}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Assigned Patient ID</label>
                    <input
                      type="number"
                      name="patient_id"
                      value={formData.patient_id}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      placeholder="Enter Patient ID or leave empty"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleUpdate(bed.bed_id)}
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
                  <h2 className="text-xl font-semibold text-indigo-900">Bed ID: {bed.bed_id}</h2>
                  <p className="text-gray-700">
                    <strong>Department ID:</strong> {bed.department_id}
                  </p>
                  <p className="text-gray-700">
                    <strong>Bed Type:</strong> {bed.bed_type || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Status:</strong> {bed.status}
                  </p>
                  <p className="text-gray-700">
                    <strong>Assigned Patient ID:</strong> {bed.patient_id || "Available"}
                  </p>
                  <button
                    onClick={() => handleEditClick(bed)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                  >
                    Edit Bed
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
