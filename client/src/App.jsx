import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import MainSite from './pages/MainSite';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#181818',
              color: '#ffffff',
              border: '1px solid rgba(240, 192, 64, 0.4)',
              fontFamily: 'var(--ff-body)',
              fontSize: '0.9rem',
              borderRadius: '8px',
            },
            success: {
              iconTheme: {
                primary: '#f0c040',
                secondary: '#0a0a0a',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

