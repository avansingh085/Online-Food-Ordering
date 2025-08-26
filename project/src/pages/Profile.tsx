import React from 'react';
import { User, MapPin, Phone, Mail, Clock, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  const recentOrders = [
    {
      id: '#BPB-001',
      date: '2024-01-15',
      items: ['Margherita Pizza', 'Classic Cheeseburger'],
      total: 598,
      status: 'Delivered'
    },
    {
      id: '#BPB-002',
      date: '2024-01-12',
      items: ['Pepperoni Deluxe', 'Cheesy Loaded Fries'],
      total: 548,
      status: 'Delivered'
    },
    {
      id: '#BPB-003',
      date: '2024-01-08',
      items: ['Chicken Deluxe Burger', 'Classic French Fries'],
      total: 328,
      status: 'Delivered'
    }
  ];

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <User className="h-32 w-32 text-gray-300 dark:text-gray-600 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Please Login</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            You need to login to view your profile and order history.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="bg-orange-100 dark:bg-yellow-400/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-orange-500 dark:text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.firstName} {" "} {user.lastName}</h2>
              
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Mail className="h-5 w-5 text-orange-500 dark:text-yellow-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Phone className="h-5 w-5 text-orange-500 dark:text-yellow-400" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <MapPin className="h-5 w-5 text-orange-500 dark:text-yellow-400" />
                <span>Delhi, India</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={logout}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <ShoppingBag className="h-6 w-6 mr-2 text-orange-500 dark:text-yellow-400" />
              Order History
            </h3>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{order.id}</h4>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(order.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Items: {order.items.join(', ')}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-500 dark:text-yellow-400">
                      ₹{order.total}
                    </span>
                    <button className="text-orange-500 dark:text-yellow-400 hover:underline text-sm">
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {recentOrders.length === 0 && (
              <div className="text-center py-8">
                <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">No orders yet</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm">Start ordering to see your history here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;