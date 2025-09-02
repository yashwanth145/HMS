
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { patients, updatePatients } from "../../lib/actions";
import Image from "next/image";
import image from "../../public/patient.webp";
import { motion } from "framer-motion";

export default function PatientsPage() {
  const router = useRouter();
  const [patientsList, setPatientsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    contact: "",
    admission_date: "",
    discharge_date: "",
  });

  useEffect(() => {
    async function fetchPatients() {
      try {
        const data = await patients();
        setPatientsList(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch patients data");
        setLoading(false);
      }
    }
    fetchPatients();
  }, []);

  const handleEditClick = (patient) => {
    setEditingPatient(patient.patient_id);
    setFormData({
      name: patient.name,
      dob: patient.dob,
      gender: patient.gender,
      address: patient.address,
      phone: patient.phone,
      email: patient.email,
      contact: patient.contact,
      admission_date: patient.admission_date,
      discharge_date: patient.discharge_date,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (patientId) => {
    try {
      await updatePatients(patientId, formData);
      setPatientsList((prev) =>
        prev.map((patient) =>
          patient.patient_id === patientId ? { ...patient, ...formData } : patient
        )
      );
      setEditingPatient(null);
    } catch (err) {
      setError("You have entered some wrong details");
    }
  };

  const handleCancel = () => {
    setEditingPatient(null);
    setFormData({
      name: "",
      dob: "",
      gender: "",
      address: "",
      phone: "",
      email: "",
      contact: "",
      admission_date: "",
      discharge_date: "",
    });
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
        <div className="text-center text-red-600 text-3xl font-semibold">
          Error: {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-700 to-pink-800 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        className="max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-10 text-center tracking-tight">
          Our Patients
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {patientsList.map((patient) => (
            <motion.div
              key={patient.patient_id}
              className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={image}
                  alt="Patient Profile"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-indigo-200"
                />
              </div>
              {editingPatient === patient.patient_id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">DOB</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Emergency Contact</label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Admission Date</label>
                    <input
                      type="date"
                      name="admission_date"
                      value={formData.admission_date}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-900">Discharge Date</label>
                    <input
                      type="date"
                      name="discharge_date"
                      value={formData.discharge_date}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleUpdate(patient.patient_id)}
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
                  <h2 className="text-xl font-semibold text-indigo-900">
                    Patient ID: {patient.patient_id}
                  </h2>
                  <p className="text-gray-700">
                    <strong>Name:</strong> {patient.name}
                  </p>
                  <p className="text-gray-700">
                    <strong>DOB:</strong> {patient.dob}
                  </p>
                  <p className="text-gray-700">
                    <strong>Gender:</strong> {patient.gender}
                  </p>
                  <p className="text-gray-700">
                    <strong>Address:</strong> {patient.address}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> {patient.phone}
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> {patient.email}
                  </p>
                  <p className="text-gray-700">
                    <strong>Emergency Contact:</strong> {patient.contact}
                  </p>
                  <p className="text-gray-700">
                    <strong>Admission Date:</strong> {patient.admission_date}
                  </p>
                  <p className="text-gray-700">
                    <strong>Discharge Date:</strong> {patient.discharge_date || "NOT DISCHARGED"}
                  </p>
                  <button
                    onClick={() => handleEditClick(patient)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                  >
                    Edit Profile
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
