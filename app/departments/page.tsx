"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { departments, updateDepartment } from "../../lib/actions"; // Adjust path if needed
import Image from "next/image";
import { motion } from "framer-motion";

export default function DepartmentsPage() {
  const router = useRouter();
  const [departmentsList, setDepartmentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    doctor_id: "",
    beds: "",
  });

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const data = await departments();
        console.log('Fetched departments:', data);
        setDepartmentsList(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch departments data");
        setLoading(false);
      }
    }
    fetchDepartments();
  }, []);

  const handleEditClick = (department) => {
    setEditingDepartment(department.id);
    setFormData({
      name: department.name || "",
      doctor_id: department.doctor_id || "",
      beds: department.beds || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (departmentId) => {
    try {
      // Client-side validation
      if (!formData.name) {
        setError("Department Name is required");
        return;
      }
      if (!formData.doctor_id || isNaN(formData.doctor_id)) {
        setError("Head Doctor ID must be a valid number");
        return;
      }
      if (!formData.beds || isNaN(formData.beds) || formData.beds < 0) {
        setError("Number of Beds must be a non-negative number");
        return;
      }

      console.log('Updating department ID:', departmentId, 'with data:', formData);
      await updateDepartment(departmentId, formData);
      setDepartmentsList((prev) =>
        prev.map((department) =>
          department.id === departmentId ? { ...department, ...formData } : department
        )
      );
      setEditingDepartment(null);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to update department data");
      console.error('Update error:', err.message);
    }
  };

  const handleCancel = () => {
    setEditingDepartment(null);
    setFormData({
      name: "",
      doctor_id: "",
      beds: "",
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
          Department Management
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {departmentsList.map((department) => (
            <motion.div
              key={department.id}
              className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <Image
                  src="/department-placeholder.png"
                  alt="Department Record"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-indigo-200"
                />
              </div>
              {editingDepartment === department.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Department ID</label>
                    <p className="w-full p-3 bg-gray-100 rounded-lg text-gray-700">{department.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Department Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Head Doctor ID</label>
                    <input
                      type="number"
                      name="doctor_id"
                      value={formData.doctor_id}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Number of Beds</label>
                    <input
                      type="number"
                      name="beds"
                      value={formData.beds}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      required
                      min="0"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleUpdate(department.id)}
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
                  <h2 className="text-xl font-semibold text-indigo-900">Department ID: {department.id}</h2>
                  <p className="text-gray-700">
                    <strong>Name:</strong> {department.name || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Head Doctor ID:</strong> {department.doctor_id || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Number of Beds:</strong> {department.beds || 0}
                  </p>
                  <button
                    onClick={() => handleEditClick(department)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                  >
                    Edit Department
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
