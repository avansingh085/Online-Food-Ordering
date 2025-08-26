import React from 'react';
import { FiShoppingBag, FiDollarSign, FiClock, FiUsers } from 'react-icons/fi';
import { DashboardStats as DashboardStatsType, Order } from '../../types/admin';

interface DashboardStatsProps {
  stats: DashboardStatsType;
  orders: Order[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, orders }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="p-3 rounded-full bg-gray-100">
              <FiShoppingBag className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">₹{stats.totalRevenue}</p>
            </div>
            <div className="p-3 rounded-full bg-gray-100">
              <FiDollarSign className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
            </div>
            <div className="p-3 rounded-full bg-gray-100">
              <FiClock className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
            </div>
            <div className="p-3 rounded-full bg-gray-100">
              <FiUsers className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Order ID</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Customer</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Total</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">{order.id}</td>
                  <td className="py-3 px-4 text-gray-900">{order.customerName}</td>
                  <td className="py-3 px-4 text-gray-900">₹{order.total}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                      }`}>
                      {order.status}
                    </span>
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

export default DashboardStats;