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
import { Download, TrendingUp, Wallet, PiggyBank, Loader2 } from 'lucide-react'; // Added Loader2 for loading state
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
  const [loadingTransactions, setLoadingTransactions] = useState(true); // New loading state

  useEffect(() => {
    fetchTransactions();

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
    setLoadingTransactions(true); // Set loading to true before fetch
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch transactions');
      setLoadingTransactions(false); // Set loading to false on error
      return;
    }

    setTransactions(data || []);
    setLoadingTransactions(false); // Set loading to false after fetch
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
        pointBackgroundColor: 'rgb(14, 165, 233)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(14, 165, 233)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(107, 114, 128)', // Tailwind gray-500
        },
      },
      title: {
        display: false,
        text: 'Monthly Spending Trend',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(107, 114, 128)',
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.2)', // Light gray for grid lines
        },
      },
      y: {
        ticks: {
          color: 'rgb(107, 114, 128)',
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.2)',
        },
      },
    },
    maintainAspectRatio: false,
  };

  const handleExportCSV = () => {
    try {
      const headers = ['Date', 'Amount', 'Merchant', 'Category', 'Description'];
      const csvData = transactions.map(t => [
        new Date(t.created_at).toLocaleDateString(),
        t.amount,
        t.merchant,
        t.category,
        t.description
      ]);

      const csvContent = [
        headers.join(','),
        ...csvData.map(row => row.map(item => `"${item}"`).join(',')) // Enclose items in quotes to handle commas in data
      ].join('\n');

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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-6 max-w-6xl mx-auto" // Increased max-width for better layout
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExportCSV}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" // Enhanced button style
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
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:shadow-xl transition-all duration-200" // Added hover shadow
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 ${metric.color} rounded-full`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(metric.value)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Spending Trends</h2>
        <div className="h-[300px]">
          <Line data={spendingData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Transactions</h2>
        <div className="overflow-x-auto">
          {loadingTransactions ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <p className="ml-2 text-gray-600 dark:text-gray-400">Loading transactions...</p>
            </div>
          ) : transactions.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="py-3 px-4 text-gray-600 dark:text-gray-400">Date</th>
                  <th className="py-3 px-4 text-gray-600 dark:text-gray-400">Amount</th>
                  <th className="py-3 px-4 text-gray-600 dark:text-gray-400">Merchant</th>
                  <th className="py-3 px-4 text-gray-600 dark:text-gray-400">Category</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <motion.tr
                    key={transaction.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150" // Hover effect for rows
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{transaction.merchant}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{transaction.category}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              No transactions recorded yet.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
