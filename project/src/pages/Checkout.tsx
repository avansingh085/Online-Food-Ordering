import React, { useState } from 'react';
import { CreditCard, MapPin, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [orderStatus, setOrderStatus] = useState<'form' | 'processing' | 'success'>('form');
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    city: '',
    pincode: '',
    phone: user?.phone || ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'upi'>('cod');

  const totalAmount = getTotalPrice() + (getTotalPrice() > 299 ? 0 : 40) + Math.round(getTotalPrice() * 0.05);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus('processing');
    
    // Simulate order processing
    setTimeout(() => {
      setOrderStatus('success');
      clearCart();
    }, 3000);
  };

  if (orderStatus === 'processing') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 dark:border-yellow-400 mx-auto mb-8"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Processing Your Order</h2>
          <p className="text-gray-600 dark:text-gray-300">Please wait while we confirm your order...</p>
        </div>
      </div>
    );
  }

  if (orderStatus === 'success') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-6 w-32 h-32 flex items-center justify-center mx-auto mb-8">
            <svg className="h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Thank you for your order! Your delicious food will be delivered within 30-45 minutes.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-left mb-8">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Details:</h3>
            <p className="text-gray-600 dark:text-gray-300">Order ID: #BPB-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p className="text-gray-600 dark:text-gray-300">Total Amount: ₹{totalAmount}</p>
            <p className="text-gray-600 dark:text-gray-300">Delivery Address: {deliveryInfo.address}</p>
            <p className="text-gray-600 dark:text-gray-300">Payment Method: {paymentMethod.toUpperCase()}</p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-orange-500 dark:bg-yellow-400 text-white dark:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 dark:hover:bg-yellow-500 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Checkout</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-orange-500 dark:text-yellow-400" />
                  Delivery Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Full Address
                    </label>
                    <textarea
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo(prev => ({ ...prev, address: e.target.value }))}
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your complete delivery address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={deliveryInfo.city}
                        onChange={(e) => setDeliveryInfo(prev => ({ ...prev, city: e.target.value }))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={deliveryInfo.pincode}
                        onChange={(e) => setDeliveryInfo(prev => ({ ...prev, pincode: e.target.value }))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-orange-500 dark:text-yellow-400" />
                  Payment Method
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'cod')}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-3 text-gray-900 dark:text-white">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-3 text-gray-900 dark:text-white">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'upi')}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-3 text-gray-900 dark:text-white">UPI Payment</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 dark:bg-yellow-400 text-white dark:text-gray-900 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 dark:hover:bg-yellow-500 transition-colors"
              >
                Place Order - ₹{totalAmount}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm">
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
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="flex items-center text-orange-700 dark:text-orange-300">
                <Clock className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Estimated delivery: 30-45 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;