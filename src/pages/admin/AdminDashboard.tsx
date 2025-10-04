import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminResults from '../../components/admin/AdminResults';
import AdminTeams from '../../components/admin/AdminTeams';
import AdminGallery from '../../components/admin/AdminGallery';
import AdminNews from '../../components/admin/AdminNews';
import AdminContact from '../../components/admin/AdminContact';
import AdminAbout from '../../components/admin/AdminAbout';
import AdminHomepage from '../../components/admin/AdminHomepage';
import AdminPosters from '../../components/admin/AdminPosters';
import { useAdmin } from '../../context/AdminContext';

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-ui-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-6">
          <Routes>
            <Route path="/homepage" element={<AdminHomepage />} />
            <Route path="/results" element={<AdminResults />} />
            <Route path="/teams" element={<AdminTeams />} />
            <Route path="/gallery" element={<AdminGallery />} />
            <Route path="/news" element={<AdminNews />} />
            <Route path="/posters" element={<AdminPosters />} />
            <Route path="/contact" element={<AdminContact />} />
            <Route path="/about" element={<AdminAbout />} />
            <Route path="/" element={<Navigate to="/admin/homepage" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
