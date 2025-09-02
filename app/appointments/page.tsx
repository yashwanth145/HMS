
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { appointments, deleteAppointment, insertAppointment } from "../../lib/actions"; 
import Image from "next/image";
import { motion } from "framer-motion";

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: "",
    status: "Scheduled",
  });

  // Format datetime for display (e.g., MM/DD/YYYY HH:MM AM/PM)
  const formatDisplayDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "N/A";
    try {
      const date = new Date(dateTimeStr);
      return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return dateTimeStr || "N/A";
    }
  };

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await appointments();
        console.log('Fetched appointments:', data);
        setAppointmentsList(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointments data");
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsert = async () => {
    try {
      // Client-side validation
      if (!formData.patient_id || isNaN(formData.patient_id)) {
        setError("Patient ID must be a valid number");
        return;
      }
      if (!formData.doctor_id || isNaN(formData.doctor_id)) {
        setError("Doctor ID must be a valid number");
        return;
      }
      if (!formData.appointment_date || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(formData.appointment_date)) {
        setError("Appointment Date must be in YYYY-MM-DD HH:MM format");
        return;
      }
      if (!['Scheduled', 'Completed', 'Cancelled'].includes(formData.status)) {
        setError("Status must be Scheduled, Completed, or Cancelled");
        return;
      }

      console.log('Inserting new appointment with data:', formData);
      const { appointment_id } = await insertAppointment(formData);
      setAppointmentsList((prev) => [
        ...prev,
        { appointment_id, ...formData }
      ]);
      setFormData({
        patient_id: "",
        doctor_id: "",
        appointment_date: "",
        status: "Scheduled",
      });
      setShowInsertForm(false);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to insert appointment");
      console.error('Insert error:', err.message);
    }
  };

  const handleDelete = async (appointmentId) => {
    if (!confirm(`Are you sure you want to delete appointment ID ${appointmentId}?`)) return;
    try {
      console.log('Deleting appointment ID:', appointmentId);
      await deleteAppointment(appointmentId);
      setAppointmentsList((prev) => prev.filter((appointment) => appointment.appointment_id !== appointmentId));
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to delete appointment");
      console.error('Delete error:', err.message);
    }
  };

  const handleCancel = () => {
    setShowInsertForm(false);
    setFormData({
      patient_id: "",
      doctor_id: "",
      appointment_date: "",
      status: "Scheduled",
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
          Appointment Management
        </h1>
        <div className="mb-8 flex justify-end">
          <button
            onClick={() => setShowInsertForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Add New Appointment
          </button>
        </div>
        {showInsertForm && (
          <motion.div
            className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Add New Appointment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-indigo-900">Patient ID</label>
                <input
                  type="number"
                  name="patient_id"
                  value={formData.patient_id}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-900">Doctor ID</label>
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
                <label className="block text-sm font-medium text-indigo-900">Appointment Date</label>
                <input
                  type="datetime-local"
                  name="appointment_date"
                  value={formData.appointment_date}
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
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleInsert}
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
          </motion.div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {appointmentsList.map((appointment) => (
            <motion.div
              key={appointment.appointment_id}
              className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <Image
                  src="/appointment-placeholder.png"
                  alt="Appointment Record"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-indigo-200"
                />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-indigo-900">Appointment ID: {appointment.appointment_id}</h2>
                <p className="text-gray-700">
                  <strong>Patient ID:</strong> {appointment.patient_id}
                </p>
                <p className="text-gray-700">
                  <strong>Doctor ID:</strong> {appointment.doctor_id}
                </p>
                <p className="text-gray-700">
                  <strong>Appointment Date:</strong> {formatDisplayDateTime(appointment.appointment_date)}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong> {appointment.status}
                </p>
                <button
                  onClick={() => handleDelete(appointment.appointment_id)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Delete Appointment
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
