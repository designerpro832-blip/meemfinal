import React from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-ui-surface shadow-sm border-b border-black/10">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-ui-text-secondary hover:text-ui-text-primary"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-brand-mid-blue rounded-lg flex items-center justify-center">
              <span className="text-ui-text-light font-bold text-xl font-serif">M</span>
            </div>
            <span className="text-lg font-semibold text-ui-text-primary font-serif hidden sm:block">
              Admin Panel
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-ui-text-secondary hover:text-ui-text-primary relative" aria-label="Notifications">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-mid-blue rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-ui-text-light" />
            </div>
            <span className="text-sm text-ui-text-primary hidden sm:block">Admin</span>
          </div>

          <button
            onClick={handleLogout}
            className="text-ui-text-secondary hover:text-ui-text-primary"
            title="Logout"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
