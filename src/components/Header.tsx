import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { settings, loading } = useSiteSettings();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'News', href: '/news' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Results', href: '/results' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-ui-surface shadow-subtle sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="group flex items-center space-x-3">
              {loading ? (
                <div className="w-12 h-12 bg-brand-light-blue/20 rounded-lg animate-pulse"></div>
              ) : settings.logo_url ? (
                <img src={settings.logo_url} alt={settings.site_title || 'Site Logo'} className="h-12 w-auto" />
              ) : (
                <div className="w-12 h-12 bg-brand-secondary rounded-lg flex items-center justify-center transform group-hover:rotate-[-15deg] transition-transform duration-300">
                  <span className="text-white font-bold text-3xl font-serif transform group-hover:rotate-[15deg] transition-transform duration-300">
                    M
                  </span>
                </div>
              )}
              <span className="text-ui-text-primary font-bold text-xl hidden sm:block tracking-tight">
                {settings.site_title || 'SSF Muhimmath'}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="ml-10 flex items-baseline space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(item.href)
                      ? 'bg-brand-secondary text-white'
                      : 'text-ui-text-secondary hover:bg-brand-secondary/10 hover:text-ui-text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-ui-text-secondary hover:text-ui-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-brand-secondary text-white'
                      : 'text-ui-text-secondary hover:bg-black/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
