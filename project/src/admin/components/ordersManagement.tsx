import React from 'react';
import { Order } from '../../types/admin';

interface OrdersManagementProps {
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const OrdersManagement: React.FC<OrdersManagementProps> = ({ orders, updateOrderStatus }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
      <div className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Order ID</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Customer</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Items</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Total</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{order.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      {order.items.map((item, index) => (
                        <p key={index} className="text-gray-900">
                          {item.quantity}x {item.name}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">₹{order.total}</td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className={`px-2 py-1 text-xs font-medium border-0 rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                        }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-sm text-gray-900 hover:text-gray-700">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersManagement;