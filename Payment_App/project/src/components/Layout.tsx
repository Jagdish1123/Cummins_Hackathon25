import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, QrCode, Settings, Sun, Moon } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const navItems = [
    // { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/qr-payment', icon: QrCode, label: 'QR Payment' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      <header className="hidden md:flex justify-between items-center h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Smart Expense Manager</h1>
        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-3 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2
                ${location.pathname === item.path && item.path === '/qr-payment'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {location.pathname === item.path && item.path === '/qr-payment' && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                  layoutId="navbar-indicator-desktop"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 relative overflow-hidden"
            aria-label="Toggle dark mode"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              key={isDarkMode ? "sun" : "moon"}
              initial={{ y: isDarkMode ? -20 : 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: isDarkMode ? 20 : -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-400" />
              ) : (
                <Moon className="h-6 w-6 text-gray-600" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </header>

      <header className="md:hidden flex justify-between items-center h-14 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Smart Expense Manager</h1>
        <motion.button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 relative overflow-hidden"
          aria-label="Toggle dark mode"
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            key={isDarkMode ? "sun-mobile" : "moon-mobile"}
            initial={{ y: isDarkMode ? -20 : 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: isDarkMode ? 20 : -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </motion.div>
        </motion.button>
      </header>


      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 md:py-8 w-full overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden z-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 text-sm
                  ${location.pathname === item.path && item.path === '/qr-payment'
                    ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <item.icon className="h-6 w-6 mb-1" />
                <span className="text-xs">{item.label}</span>
                {location.pathname === item.path && item.path === '/qr-payment' && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                    layoutId="navbar-indicator-mobile"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
