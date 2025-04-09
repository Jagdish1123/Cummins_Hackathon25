export const formatIndianCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Convert USD to INR (using a fixed rate for demo)
export const usdToInr = (usdAmount: number): number => {
  const conversionRate = 83; // Example fixed rate
  return Number((usdAmount * conversionRate).toFixed(2));
}; 