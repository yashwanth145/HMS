"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { staff, updateStaff } from "../../lib/actions"; 
import Image from "next/image";
import { motion } from "framer-motion";

export default function StaffPage() {
  const router = useRouter();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department_id: "",
    salary: "",
    hired: "",
    phone: "",
  });

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
    async function fetchStaff() {
      try {
        const data = await staff();
        console.log('Fetched staff:', data);
        setStaffList(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch staff data");
        setLoading(false);
      }
    }
    fetchStaff();
  }, []);

  const handleEditClick = (staff) => {
    setEditingStaff(staff.staff_id);
    setFormData({
      name: staff.name || "",
      role: staff.role || "",
      department_id: staff.department || "",
      salary: staff.salary || "",
      hired: staff.hired || "",
      phone: staff.phone || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (staffId) => {
    try {
      // Client-side validation
      if (!formData.name) {
        setError("Name is required");
        return;
      }
      if (!formData.role) {
        setError("Role is required");
        return;
      }
      if (!formData.department_id || isNaN(formData.department_id)) {
        setError("Department ID must be a valid number");
        return;
      }
      if (!formData.salary || isNaN(formData.salary) || formData.salary < 0) {
        setError("Salary must be a non-negative number");
        return;
      }
      if (!formData.hired || !/^\d{4}-\d{2}-\d{2}$/.test(formData.hired)) {
        setError("Hire Date must be in YYYY-MM-DD format");
        return;
      }
      if (!formData.phone) {
        setError("Phone is required");
        return;
      }

      console.log('Updating staff ID:', staffId, 'with data:', formData);
      await updateStaff(staffId, formData);
      setStaffList((prev) =>
        prev.map((staff) =>
          staff.staff_id === staffId ? { ...staff, ...formData } : staff
        )
      );
      setEditingStaff(null);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to update staff data");
      console.error('Update error:', err.message);
    }
  };

  const handleCancel = () => {
    setEditingStaff(null);
    setFormData({
      name: "",
      role: "",
      department_id: "",
      salary: "",
      hired: "",
      phone: "",
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
          Staff Management
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {staffList.map((staff) => (
            <motion.div
              key={staff.staff_id}
              className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <Image
                  src="/staff-placeholder.png"
                  alt="Staff Record"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-indigo-200"
                />
              </div>
              {editingStaff === staff.staff_id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Staff ID</label>
                    <p className="w-full p-3 bg-gray-100 rounded-lg text-gray-700">{staff.staff_id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Name</label>
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
                    <label className="block text-sm font-medium text-indigo-900">Role</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Department ID</label>
                    <input
                      type="number"
                      name="department_id"
                      value={formData.department_id}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Salary</label>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Hire Date</label>
                    <input
                      type="date"
                      name="hired"
                      value={formData.hired}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleUpdate(staff.staff_id)}
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
                  <h2 className="text-xl font-semibold text-indigo-900">Staff ID: {staff.staff_id}</h2>
                  <p className="text-gray-700">
                    <strong>Name:</strong> {staff.name || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Role:</strong> {staff.role || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Department ID:</strong> {staff.department || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Salary:</strong> ${parseFloat(staff.salary || 0).toFixed(2)}
                  </p>
                  <p className="text-gray-700">
                    <strong>Hire Date:</strong> {formatDisplayDate(staff.hired)}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> {staff.phone || "N/A"}
                  </p>
                  <button
                    onClick={() => handleEditClick(staff)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                  >
                    Edit Staff
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