import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Info, CreditCard, Users } from 'lucide-react';

const SettingsPage = () => {
  const features = [
    {
      icon: CreditCard,
      title: 'Smart Expense Tracking',
      description:
        'Automatically categorize and track your expenses. Get insights into your spending patterns and make informed financial decisions.',
    },
    {
      icon: Users,
      title: 'Group Expenses',
      description:
        'Create groups for shared expenses with roommates or friends. Split bills easily and keep track of who owes what.',
    },
    {
      icon: Info,
      title: 'AI-Powered Insights',
      description:
        'Receive personalized insights about your spending habits and recommendations for better financial management.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-8"
    >
      <div className="flex items-center space-x-4">
        <Settings className="w-8 h-8 text-primary-500" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings & About</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          About Smart Expense Manager
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Smart Expense Manager is your all-in-one solution for tracking expenses, managing shared
          bills, and gaining insights into your spending habits. With features like QR code payments,
          real-time expense tracking, and AI-powered analytics, managing your finances has never been
          easier.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <feature.icon className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">How It Works</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300">
            Imagine visiting Café Aroma and paying ₹150 for your coffee. Simply scan the QR code or
            enter the UPI ID, and your payment is instantly logged—updating your Dashboard in real-time.
            Over time, you'll see a clear breakdown of your spending across different categories and
            receive personalized insights to help you make better financial decisions.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;