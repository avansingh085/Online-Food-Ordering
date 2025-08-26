import React, { useState, useEffect } from 'react';
import { Pizza, Sandwich, Zap } from 'lucide-react';
import FoodCard from './FoodCard';
import { MenuItem } from '../data/menuData';
import { useAdmin } from '../context/AdminContext';

const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pizza' | 'burger' | 'fries'>('all');
  const { getMenuItems } = useAdmin();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getMenuItems().then((items: MenuItem[]) => {
      if (isMounted) {
        setMenuItems(items);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [getMenuItems]);

  const categories = [
    { id: 'all', name: 'All Items', icon: <Zap className="h-5 w-5" /> },
    { id: 'pizza', name: 'Pizza', icon: <Pizza className="h-5 w-5" /> },
    { id: 'burger', name: 'Burgers', icon: <Sandwich className="h-5 w-5" /> },
    { id: 'fries', name: 'French Fries', icon: <Zap className="h-5 w-5" /> }
  ];

  const filteredItems =
    activeCategory === 'all'
      ? menuItems
      : menuItems;

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'pizza':
        return 'Our Delicious Pizzas';
      case 'burger':
        return 'Juicy Burgers';
      case 'fries':
        return 'Crispy French Fries';
      default:
        return 'Our Full Menu';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            {getCategoryTitle()}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Made with love, served with passion. Every bite is a celebration of flavor.
          </p>
        </div>

        {/* Food Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading menu items...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item: MenuItem) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No items found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;