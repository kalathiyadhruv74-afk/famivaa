import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MedicineCard } from '../components/MedicineCard';
import { Search, Pill, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

export const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDosageForm, setSelectedDosageForm] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [selectedCategory, selectedDosageForm, searchQuery, page]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories/');
      setCategories(res.data || []);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      let url = `/api/medicines/?page=${page}`;
      if (selectedCategory !== 'all') {
        url += `&category=${selectedCategory}`;
      }
      if (selectedDosageForm !== 'all') {
        url += `&dosage_form=${encodeURIComponent(selectedDosageForm)}`;
      }
      if (searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }

      const res = await axios.get(url);
      if (res.data.results) {
        setMedicines(res.data.results);
        setCount(res.data.count);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
      } else {
        setMedicines(res.data || []);
        setCount(res.data.length || 0);
      }
    } catch (err) {
      console.error('Failed to load medicines:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    setPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMedicines();
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Page Banner */}
      <section className="bg-purple-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider bg-purple-900 px-3.5 py-1.5 rounded-full border border-purple-800">
            Pharmaceutical Formulations
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Product Catalogue</h1>
          <p className="text-purple-200 text-sm max-w-xl mx-auto">
            Browse our comprehensive directory of ethical B2B pharmaceutical products, compositions, and therapeutic formulations.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search Bar & Filter Bar */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
          
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-3 text-purple-400" />
              <input
                type="text"
                placeholder="Search brand name, generic formulation, or composition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-purple-50/40 border border-purple-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedDosageForm}
                onChange={(e) => {
                  setSelectedDosageForm(e.target.value);
                  setPage(1);
                }}
                className="px-3.5 py-2.5 bg-purple-50/40 border border-purple-100 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Dosage Forms</option>
                <option value="Tablet">Tablets</option>
                <option value="Capsule">Capsules</option>
                <option value="Syrups & Liquids">Syrups & Liquids</option>
                <option value="Injections">Injections</option>
                <option value="Dermatology">Dermatology</option>
              </select>

              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-md shadow-purple-600/20"
              >
                Search
              </button>
            </div>
          </form>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 pt-2 scrollbar-none">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-purple-950 text-white shadow-sm'
                  : 'bg-purple-50 text-purple-900 hover:bg-purple-100/70 border border-purple-100'
              }`}
            >
              All Categories ({count})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center space-x-1.5 ${
                  selectedCategory === cat.slug
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-purple-50 text-purple-900 hover:bg-purple-100/70 border border-purple-100'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded-full">
                  {cat.medicine_count}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* Medicine Grid Display */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="h-80 bg-purple-100/50 rounded-2xl"></div>
            ))}
          </div>
        ) : medicines.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-purple-100 space-y-4">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto">
              <Pill className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No Medicines Found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              We couldn't find any pharmaceutical products matching your search query or selected category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDosageForm('all');
                setSearchQuery('');
                setPage(1);
              }}
              className="inline-flex items-center space-x-2 text-purple-600 font-bold hover:underline text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {medicines.map((med) => (
                <MedicineCard key={med.id} medicine={med} />
              ))}
            </div>

            {/* Pagination Controls */}
            {(nextPage || prevPage) && (
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-purple-100 text-sm">
                <button
                  disabled={!prevPage}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-xl font-medium ${
                    prevPage
                      ? 'bg-purple-50 hover:bg-purple-100 text-purple-900'
                      : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <span className="text-xs text-purple-900 font-semibold">
                  Page {page}
                </span>

                <button
                  disabled={!nextPage}
                  onClick={() => setPage((p) => p + 1)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-xl font-medium ${
                    nextPage
                      ? 'bg-purple-50 hover:bg-purple-100 text-purple-900'
                      : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
