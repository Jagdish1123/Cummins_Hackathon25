import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Download, TrendingUp, Wallet, PiggyBank } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardPage = () => {
  const [totalBalance] = useState(75000);
  const [monthlySpending] = useState(18000);
  const [savings] = useState(57000);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('transactions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, (payload) => {
        toast.success('New transaction recorded!');
        fetchTransactions();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch transactions');
      return;
    }

    setTransactions(data || []);
  };

  const metrics = [
    { label: 'Total Balance', value: totalBalance, icon: Wallet, color: 'bg-blue-500' },
    { label: 'Monthly Spending', value: monthlySpending, icon: TrendingUp, color: 'bg-red-500' },
    { label: 'Savings', value: savings, icon: PiggyBank, color: 'bg-green-500' },
  ];

  const spendingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Spending',
        data: [15000, 17000, 16500, 18000, 17500, 18000],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const handleExportCSV = () => {
    try {
      // Convert transactions to CSV format
      const headers = ['Date', 'Amount', 'Merchant', 'Category', 'Description'];
      const csvData = transactions.map(t => [
        new Date(t.created_at).toLocaleDateString(),
        t.amount,
        t.merchant,
        t.category,
        t.description
      ]);

      // Create CSV content
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => row.join(','))
      ].join('\n');

      // Create and download the file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'expenses.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('CSV exported successfully!');
    } catch (error) {
      toast.error('Failed to export CSV');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExportCSV}
          className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 ${metric.color} rounded-full`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{metric.value.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Spending Trends</h2>
        <div className="h-[300px]">
          <Line data={spendingData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 text-gray-600 dark:text-gray-400">Date</th>
                <th className="pb-3 text-gray-600 dark:text-gray-400">Amount</th>
                <th className="pb-3 text-gray-600 dark:text-gray-400">Merchant</th>
                <th className="pb-3 text-gray-600 dark:text-gray-400">Category</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b dark:border-gray-700">
                  <td className="py-3 text-gray-900 dark:text-white">
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-gray-900 dark:text-white">
                    ₹{transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-3 text-gray-900 dark:text-white">{transaction.merchant}</td>
                  <td className="py-3 text-gray-900 dark:text-white">{transaction.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;