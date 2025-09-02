'use client';

import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';

interface Medicine {
  medicine_name: string;
  description: string;
  category?: string; // Not in provided JSON, added for filtering compatibility
  additional_suggestions: string[];
  natural_remedies: string[];
  Category?: string; // Optional for backward compatibility
}

export default function SuggestionsPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  // Fetch JSON data on mount
  useEffect(() => {
    async function fetchMedicines() {
      try {
        const response = await fetch('/medicines_dataset.json');
        const data = await response.json();
        setMedicines(data);
        // Since the provided JSON lacks a 'category' field, we'll use a placeholder or derive it if needed
        // For now, assume categories are not explicitly defined; use 'All' only
        setCategories(['All']);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    }
    fetchMedicines();
  }, []);

  // Filter medicines based on search term (since no category field exists, filter by name only)
  const filteredMedicines = medicines.filter(medicine =>
    medicine.medicine_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-teal-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Medicine Suggestions</h1>
          <p className="mt-2">Explore additional suggestions and natural remedies for medicines</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search medicines..."
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled // Disabled since no category field exists
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        {filteredMedicines.length === 0 ? (
          <p className="text-gray-600 text-center">No suggestions found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((medicine, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-teal-600">{medicine.medicine_name}</h2>
                <p className="text-sm text-gray-500">{medicine.description}</p>
                <h3 className="mt-4 font-semibold text-gray-800">Additional Suggestions</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {medicine.additional_suggestions.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </ul>
                <h3 className="mt-4 font-semibold text-gray-800">Natural Remedies</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {medicine.natural_remedies.map((remedy, idx) => (
                    <li key={idx}>{remedy}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}