import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage.tsx';
import QRCodePage from './pages/QRCodePage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/qr-payment" element={<QRCodePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </AnimatePresence>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;