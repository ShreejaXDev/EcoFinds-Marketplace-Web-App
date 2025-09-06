import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import ProductCard from '../components/ui/ProductCard';
import { products, categories, conditions, sortOptions } from '../data/dummyData';
import { Product } from '../data/types';
import Select from '../components/ui/Select';
import { FilterIcon, SlidersIcon } from 'lucide-react';
const HomePage: React.FC = () => {
  const {
    theme
  } = useTheme();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [sortOption, setSortOption] = useState('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  useEffect(() => {
    let filtered = [...products];
    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    // Apply condition filter
    if (selectedCondition !== 'All Conditions') {
      filtered = filtered.filter(product => product.condition === selectedCondition);
    }
    // Apply sorting
    switch (sortOption) {
      case 'newest':
        // In a real app, we would sort by date
        break;
      case 'oldest':
        // In a real app, we would sort by date
        filtered = [...filtered].reverse();
        break;
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'sustainability':
        filtered = [...filtered].sort((a, b) => (b.sustainabilityScore || 0) - (a.sustainabilityScore || 0));
        break;
      default:
        break;
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, selectedCondition, sortOption]);
  return <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Banner */}
      <div className="relative">
        <div className="h-80 w-full overflow-hidden">
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Sustainable Shopping Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-lg">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Shop Sustainably, Live Responsibly
                </h1>
                <p className="text-white text-lg mb-6">
                  Discover unique second-hand items that are good for your
                  wallet and the planet.
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters - Desktop */}
        <div className="hidden md:flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Select id="category" label="Category" options={categories} value={selectedCategory} onChange={setSelectedCategory} className="w-40" />
            <Select id="condition" label="Condition" options={conditions} value={selectedCondition} onChange={setSelectedCondition} className="w-40" />
          </div>
          <div className="flex items-center">
            <Select id="sort" label="Sort By" options={sortOptions} value={sortOption} onChange={setSortOption} className="w-48" />
          </div>
        </div>
        {/* Filters - Mobile */}
        <div className="md:hidden mb-6">
          <button onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} className={`w-full flex items-center justify-between p-3 rounded-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center">
              <FilterIcon className="h-5 w-5 mr-2" />
              <span>Filters & Sort</span>
            </div>
            <SlidersIcon className="h-5 w-5" />
          </button>
          {isMobileFilterOpen && <div className={`mt-2 p-4 rounded-md shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="space-y-4">
                <Select id="mobile-category" label="Category" options={categories} value={selectedCategory} onChange={setSelectedCategory} fullWidth />
                <Select id="mobile-condition" label="Condition" options={conditions} value={selectedCondition} onChange={setSelectedCondition} fullWidth />
                <Select id="mobile-sort" label="Sort By" options={sortOptions} value={sortOption} onChange={setSortOption} fullWidth />
              </div>
            </div>}
        </div>
        {/* Products Grid */}
        {filteredProducts.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div> : <div className="text-center py-16">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>}
      </div>
    </div>;
};
export default HomePage;