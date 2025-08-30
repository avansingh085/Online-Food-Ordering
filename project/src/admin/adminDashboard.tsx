import React, { useState, useEffect } from 'react';

import { AdminTab } from '../types/admin';
import { demoSaladCustomization } from '../data/demoData';
import AdminSidebar from './components/adminSideBar';
import AdminHeader from './components/adminHeader';
import DashboardStats from './components/adminDashboard';
import MenuManagement from './components/menuManagement';
import OrdersManagement from './components/ordersManagement';
import CustomizationManager from './components/customizations';
import PlaceholderSection from './components/PlaceHolderSection';
import { FiGift, FiImage } from 'react-icons/fi';
import { useAdmin } from '../context/AdminContext';
import Transactions from './components/Transactions';
import customization from './services/customization';
const AdminDashboard: React.FC = () => {
  const {
    adminUser,
    adminLogout,
    getMenuItems,
    getOrders,
    updateMenuItem,
    addMenuItem,
    deleteMenuItem,
    updateOrderStatus,
    getDashboardStats
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [defaultCustomizationData,setDefaultCustomizationData]=useState<any>({itemId:"default",name:"default",options:[],size:[]})
  useEffect(() => {
    const fetchDashboard = async () => {
      const items = await getMenuItems();
      const cust=await customization.getDefaultCustomization();
      if(cust)
      {
        setDefaultCustomizationData(cust);
      }
      setMenuItems(items);
    };
    fetchDashboard();

  }, [getMenuItems]);

  

  const stats = getDashboardStats();
  const orders = getOrders();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats stats={stats} orders={orders} />;
      case 'menu':
        return (
          <MenuManagement
            menuItems={menuItems}
            updateMenuItem={updateMenuItem}
            addMenuItem={addMenuItem}
            deleteMenuItem={deleteMenuItem}
          />
        );
      case 'orders':
        return (
          <OrdersManagement
            orders={orders}
            updateOrderStatus={updateOrderStatus}
          />
        );
      case 'offers':
        return (
          <PlaceholderSection
            icon={<FiGift className="w-16 h-16 text-gray-300" />}
            message="Offers management coming soon..."
          />
        );
      case 'hero':
        return (
          <PlaceholderSection
            icon={<FiImage className="w-16 h-16 text-gray-300" />}
            message="Hero banners management coming soon..."
          />
        );
      case 'customizations':
        return <CustomizationManager customization={defaultCustomizationData} onCancel={()=>{}} onSave={customization.updateDefaultCustomization} />;
        case 'transactions':
  return <Transactions itemPerPage={20} />;
      default:
        return <DashboardStats stats={stats} orders={orders} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        adminUser={adminUser}
        adminLogout={adminLogout}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader setSidebarOpen={setSidebarOpen} activeTab={activeTab} />
        
        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;