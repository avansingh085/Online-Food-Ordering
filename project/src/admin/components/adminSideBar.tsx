import React from 'react';
import {
  FiBarChart, FiPackage, FiGift, FiImage, 
  FiShoppingBag, FiSettings, FiLogOut, FiX, FiBox
} from 'react-icons/fi';
import { AdminTab } from '../../types/admin';
import { AiOutlineTransaction } from 'react-icons/ai';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  adminUser: any;
  adminLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  adminUser,
  adminLogout
}) => {
  const sidebarItems = [
    { id: 'dashboard' as AdminTab, name: 'Dashboard', icon: <FiBarChart className="w-5 h-5" /> },
    { id: 'menu' as AdminTab, name: 'Menu Items', icon: <FiPackage className="w-5 h-5" /> },
    { id: 'offers' as AdminTab, name: 'Offers', icon: <FiGift className="w-5 h-5" /> },
    { id: 'hero' as AdminTab, name: 'Hero Banners', icon: <FiImage className="w-5 h-5" /> },
    { id: 'orders' as AdminTab, name: 'Orders', icon: <FiShoppingBag className="w-5 h-5" /> },
    { id: 'customizations' as AdminTab, name: 'Customization Settings', icon: <FiBox className="w-5 h-5" /> },
    {id:'transactions' as AdminTab ,name:'Transactions',icon:<AiOutlineTransaction className='w-5 h-5'/>}
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 lg:hidden hover:text-gray-700"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${activeTab === item.id
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
              <FiSettings className="w-5 h-5 text-gray-700" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{adminUser?.username}</p>
              <p className="text-xs text-gray-500">{adminUser?.email}</p>
            </div>
          </div>
          <button
            onClick={adminLogout}
            className="flex items-center w-full px-4 py-2 text-red-600 transition-colors rounded-lg hover:bg-red-50"
          >
            <FiLogOut className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;