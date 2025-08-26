import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="h-32 w-32 text-gray-300 dark:text-gray-600 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Looks like you haven't added any delicious items to your cart yet.
          </p>
          <Link
            to="/"
            className="bg-orange-500 dark:bg-yellow-400 text-white dark:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 dark:hover:bg-yellow-500 transition-colors inline-block"
          >
            Start Ordering
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 capitalize">{item.category}</p>
                      {item.size && <p className="text-sm text-gray-500 dark:text-gray-400">Size: {item.size}</p>}
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-100 dark:bg-gray-700 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Minus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-100 dark:bg-gray-700 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Plus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                    <div className="text-lg font-bold text-orange-500 dark:text-yellow-400">
                      ₹{item.price * item.quantity}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Delivery Fee</span>
                <span>₹{getTotalPrice() > 299 ? 0 : 40}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Tax (5%)</span>
                <span>₹{Math.round(getTotalPrice() * 0.05)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>₹{getTotalPrice() + (getTotalPrice() > 299 ? 0 : 40) + Math.round(getTotalPrice() * 0.05)}</span>
                </div>
              </div>
            </div>

            {getTotalPrice() > 299 && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3 mb-6">
                <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                  🎉 Congratulations! You get free delivery on orders above ₹299
                </p>
              </div>
            )}

            {!isAuthenticated ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Please login to continue with your order
                </p>
                <button className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed">
                  Login Required
                </button>
              </div>
            ) : (
              <Link
                to="/checkout"
                className="block w-full bg-orange-500 dark:bg-yellow-400 text-white dark:text-gray-900 text-center py-3 rounded-lg font-semibold hover:bg-orange-600 dark:hover:bg-yellow-500 transition-colors"
              >
                Proceed to Checkout
              </Link>
            )}

            <Link
              to="/"
              className="block w-full text-center text-orange-500 dark:text-yellow-400 py-3 hover:underline mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;