import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Trophy, Image, Mail, Info, Users, LayoutDashboard, LayoutTemplate, Newspaper } from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Homepage', href: '/admin/homepage', icon: LayoutDashboard },
    { name: 'Results', href: '/admin/results', icon: Trophy },
    { name: 'Teams', href: '/admin/teams', icon: Users },
    { name: 'News', href: '/admin/news', icon: Newspaper },
    { name: 'Gallery', href: '/admin/gallery', icon: Image },
    { name: 'Poster Models', href: '/admin/posters', icon: LayoutTemplate },
    { name: 'Contact', href: '/admin/contact', icon: Mail },
    { name: 'About', href: '/admin/about', icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-ui-surface shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-black/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-lg font-semibold text-ui-text-primary">Muhimmath Admin</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-ui-text-secondary hover:text-ui-text-primary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-brand-secondary/10 text-brand-secondary font-bold'
                    : 'text-ui-text-secondary hover:bg-black/5'
                }`}
                onClick={() => onClose()}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-ui-text-secondary hover:bg-black/5 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Website</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
