import React from 'react';
import { Plus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  discount: number | null;
}

interface FoodCardProps {
  item: FoodItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: "",
      size: ""
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 flex items-center space-x-1 text-sm shadow-sm">
          <Star className="h-4 w-4 text-gray-600 fill-current" />
          <span className="font-medium text-gray-900">{0}</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 tracking-tight">
          {item.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ₹{item.price}
            </span>
            {item && (
              <span className="text-sm text-gray-500 ml-2">
                {/* ({item.size}) */}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gray-900 text-white p-2.5 rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 group shadow-sm"
          >
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;