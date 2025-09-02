"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doctors, updateDoctor } from "../../lib/actions";
import Image from "next/image";
import image from "../../public/doctor.webp";
import { motion } from "framer-motion";

export default function DoctorsPage() {
  const router = useRouter();
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    specialization: "",
    qualification: "",
    licence: "",
  });

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const data = await doctors();
        setDoctorsList(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch doctors data");
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  const handleEditClick = (doctor) => {
    setEditingDoctor(doctor.doctor_id);
    setFormData({
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      licence: doctor.licence,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (doctorId) => {
    try {
      await updateDoctor(doctorId, formData);
      setDoctorsList((prev) =>
        prev.map((doctor) =>
          doctor.doctor_id === doctorId ? { ...doctor, ...formData } : doctor
        )
      );
      setEditingDoctor(null);
    } catch (err) {
      setError("Failed to update doctor data");
    }
  };

  const handleCancel = () => {
    setEditingDoctor(null);
    setFormData({ specialization: "", qualification: "", licence: "" });
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        className="max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-900 mb-10 text-center tracking-tight">
          Meet Our Expert Doctors
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {doctorsList.map((doctor) => (
            <motion.div
              key={doctor.doctor_id}
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
                  alt="Doctor Profile"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-indigo-200"
                />
              </div>
              {editingDoctor === doctor.doctor_id ? (
                <div className="space-y-4 text-black">
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Qualification
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">
                      License No
                    </label>
                    <input
                      type="text"
                      name="licence"
                      value={formData.licence}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-black"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleUpdate(doctor.doctor_id)}
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
                  <h2 className="text-xl font-semibold text-black">
                    Doctor ID: {doctor.doctor_id}
                  </h2>
                  <p className="text-black">
                    <strong>Specialization:</strong> {doctor.specialization}
                  </p>
                  <p className="text-black">
                    <strong>Qualification:</strong> {doctor.qualification}
                  </p>
                  <p className="text-black">
                    <strong>License No:</strong> {doctor.licence}
                  </p>
                  <button
                    onClick={() => handleEditClick(doctor)}
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