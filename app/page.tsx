"use client";
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>MediSync - Hospital Management System</title>
        <meta name="description" content="MediSync: A modern hospital management system to streamline operations, enhance patient care, and improve efficiency." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Glassmorphic Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-30 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="hidden md:flex space-x-8">
            <a href="/patients" className="text-white hover:text-purple-400 transition">Patients</a>
            <a href="/doctors" className="text-white hover:text-purple-400 transition">Doctors</a>
            <a href="/staff" className="text-white hover:text-purple-400 transition">Staff</a>
            <a href="/departments" className="text-white hover:text-purple-400 transition">Departments</a>
            <a href="/appointments" className="text-white hover:text-purple-400 transition">Appointments</a>
            <a href="/beds" className="text-white hover:text-purple-400 transition">Beds</a>
            <a href="/treatments" className="text-white hover:text-purple-400 transition">Treatments</a>
            <a href="/inventory" className="text-white hover:text-purple-400 transition">Inventory</a>
            <a href="/bills" className="text-white hover:text-purple-400 transition">Bills</a>
            <a href="/suggestions" className="text-white hover:text-purple-400 transition">Suggestions</a>

          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-50 backdrop-blur-md">
            <a href="#home" className="block px-6 py-2 text-white hover:text-purple-400 transition">Home</a>
            <a href="#about" className="block px-6 py-2 text-white hover:text-purple-400 transition">About</a>
            <a href="#features" className="block px-6 py-2 text-white hover:text-purple-400 transition">Features</a>
            <a href="#testimonials" className="block px-6 py-2 text-white hover:text-purple-400 transition">Testimonials</a>
            <a href="#contact" className="block px-6 py-2 text-white hover:text-purple-400 transition">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-bg flex h-screen items-center justify-center">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="max-w-lg text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              MediSync: Revolutionizing Healthcare
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Streamline hospital operations, enhance patient care, and embrace efficiency with our state-of-the-art management system.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-block rounded-full bg-purple-600 px-8 py-3 text-lg font-semibold text-white hover:bg-purple-700 transition"
            >
              Get Started
            </a>
          </div>
          <div className="mt-10 md:mt-0 md:ml-10">
            <img
              src="https://images.unsplash.com/photo-1585435557343-3b0929fb6be1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Hospital Management"
              className="w-full max-w-md rounded-lg shadow-lg animate-pulse-slow"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white text-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-purple-600">About MediSync</h2>
          <p className="mt-6 text-lg text-center max-w-3xl mx-auto">
            MediSync is a comprehensive hospital management system designed to simplify and enhance the operational efficiency of healthcare facilities. Our platform integrates seamlessly with existing workflows, providing tools for patient management, appointment scheduling, inventory tracking, and staff coordination. With a focus on user-friendly design and cutting-edge technology, MediSync empowers hospitals to deliver exceptional care while reducing administrative burdens.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl text-green-400 mb-4">🏥</div>
              <h3 className="text-xl font-semibold">Patient-Centric Care</h3>
              <p className="mt-2 text-gray-600">Centralized patient records for quick access and better care coordination.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl text-green-400 mb-4">⚙️</div>
              <h3 className="text-xl font-semibold">Streamlined Operations</h3>
              <p className="mt-2 text-gray-600">Automate administrative tasks to focus on what matters most—patients.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl text-green-400 mb-4">🔒</div>
              <h3 className="text-xl font-semibold">Secure & Compliant</h3>
              <p className="mt-2 text-gray-600">HIPAA-compliant data security to protect patient information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-purple-400">Key Features</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition">
              <h3 className="text-xl font-semibold text-green-400">Appointment Management</h3>
              <p className="mt-2">Easily schedule, reschedule, or cancel appointments with an intuitive interface, reducing no-shows and improving patient satisfaction.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition">
              <h3 className="text-xl font-semibold text-green-400">Electronic Health Records</h3>
              <p className="mt-2">Store and access patient records securely, with real-time updates and integration with diagnostic tools.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition">
              <h3 className="text-xl font-semibold text-green-400">Inventory Management</h3>
              <p className="mt-2">Track medical supplies, medications, and equipment to ensure availability and reduce waste.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition">
              <h3 className="text-xl font-semibold text-green-400">Billing & Invoicing</h3>
              <p className="mt-2">Automate billing processes, integrate with insurance providers, and generate detailed financial reports.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition">
              <h3 className="text-xl font-semibold text-green-400">Staff Coordination</h3>
              <p className="mt-2">Manage staff schedules, roles, and communication to ensure smooth hospital operations.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition">
              <h3 className="text-xl font-semibold text-green-400">Analytics & Reporting</h3>
              <p className="mt-2">Gain insights with real-time analytics on patient flow, resource utilization, and operational efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white text-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-purple-600">What Our Users Say</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 italic">"MediSync has transformed our hospital's efficiency. The appointment system alone has reduced our no-show rate by 30%!"</p>
              <p className="mt-4 font-semibold text-green-400">Dr. Sarah Thompson, Chief Administrator</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 italic">"The analytics dashboard provides insights that help us make data-driven decisions for better patient care."</p>
              <p className="mt-4 font-semibold text-green-400">John Rivera, Hospital Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-purple-400">Get in Touch</h2>
          <p className="mt-6 text-lg text-center max-w-3xl mx-auto">
            Ready to transform your hospital operations? Contact us today to schedule a demo or learn more about MediSync.
          </p>
          <div className="mt-10 max-w-md mx-auto">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-400"
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-400"
                rows="5"
              ></textarea>
              <button className="w-full rounded-full bg-purple-600 px-8 py-3 text-lg font-semibold text-white hover:bg-purple-700 transition">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-6 text-gray-400">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 MediSync. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="hover:text-purple-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-purple-400 transition">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}