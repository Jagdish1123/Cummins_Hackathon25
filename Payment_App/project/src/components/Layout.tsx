import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, QrCode, Settings, Sun, Moon } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/qr-payment', icon: QrCode, label: 'QR Payment' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:relative md:border-t-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <item.icon className="h-6 w-6" />
                    <span className="text-xs mt-1">{item.label}</span>
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                        layoutId="navbar-indicator"
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 mb-20 md:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;