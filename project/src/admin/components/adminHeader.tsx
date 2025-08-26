import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { AdminTab } from '../../types/admin';

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  activeTab: AdminTab;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ setSidebarOpen, activeTab }) => {
  const getHeaderTitle = (tab: AdminTab) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'menu': return 'Menu Management';
      case 'offers': return 'Offers Management';
      case 'hero': return 'Hero Banners';
      case 'orders': return 'Orders Management';
      case 'customizations': return 'Customization Settings';
      case 'transactions': return 'Transactions';
      default: return 'Admin Panel';
    }
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <button
        onClick={() => setSidebarOpen(true)}
        className="text-gray-500 lg:hidden hover:text-gray-700"
      >
        <FiMenu className="w-6 h-6" />
      </button>
      <h2 className="text-xl font-semibold text-gray-900">
        {getHeaderTitle(activeTab)}
      </h2>
      <div className="w-6"></div>
    </header>
  );
};

export default AdminHeader;