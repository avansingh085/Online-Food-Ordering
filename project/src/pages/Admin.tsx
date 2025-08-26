import React, { useState } from 'react';
import { AdminProvider, useAdmin } from '../context/AdminContext';
import AdminLogin from '../admin/components/AdminLogin';
import AdminDashboard from '../admin/adminDashboard';



const AdminContent: React.FC = () => {
  const { isAdminAuthenticated } = useAdmin();
  const [showDashboard, setShowDashboard] = useState(false);

  if (!isAdminAuthenticated && !showDashboard) {
    return <AdminLogin onLoginSuccess={() => setShowDashboard(true)} />;
  }

  return <AdminDashboard />;
};

const Admin: React.FC = () => {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
};

export default Admin;