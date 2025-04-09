import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

const QRCodePage = () => {
  const [paymentInfo, setPaymentInfo] = useState({
    upiId: '',
    mobileNumber: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Show processing notification
      const processingToast = toast.loading('Processing payment...');

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log transaction to Supabase
      const { error } = await supabase.from('transactions').insert([
        {
          amount: parseFloat(paymentInfo.amount),
          merchant: 'QR Payment',
          category: 'Transfer',
          description: `Payment to ${paymentInfo.upiId || paymentInfo.mobileNumber}`,
        },
      ]);

      if (error) throw error;

      // Dismiss processing toast and show success
      toast.dismiss(processingToast);
      toast.success('Payment processed successfully!', {
        duration: 3000,
        icon: '✅',
      });

      // Reset form
      setPaymentInfo({ upiId: '', mobileNumber: '', amount: '' });
    } catch (error) {
      toast.error('Failed to process payment. Please try again.', {
        duration: 4000,
        icon: '❌',
      });
    } finally {
      setLoading(false);
    }
  };

  const qrValue = paymentInfo.upiId
    ? `upi://pay?pa=${paymentInfo.upiId}&am=${paymentInfo.amount}`
    : `upi://pay?pn=${paymentInfo.mobileNumber}&am=${paymentInfo.amount}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-md mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">QR Payment</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            UPI ID
          </label>
          <input
            type="text"
            name="upiId"
            value={paymentInfo.upiId}
            onChange={handleInputChange}
            placeholder="username@bank"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="text-center text-gray-500 dark:text-gray-400">OR</div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={paymentInfo.mobileNumber}
            onChange={handleInputChange}
            placeholder="10-digit mobile number"
            pattern="[0-9]{10}"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount (₹)
          </label>
          <input
            type="number"
            name="amount"
            value={paymentInfo.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            min="1"
            step="0.01"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {(paymentInfo.upiId || paymentInfo.mobileNumber) && paymentInfo.amount && (
          <div className="flex justify-center py-6">
            <QRCodeSVG value={qrValue} size={200} />
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading || (!paymentInfo.upiId && !paymentInfo.mobileNumber) || !paymentInfo.amount}
          className="w-full py-3 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Process Payment'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default QRCodePage;