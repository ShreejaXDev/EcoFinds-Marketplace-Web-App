import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProductPage from './pages/AddProductPage';
import CartPage from './pages/CartPage';
import UserDashboardPage from './pages/UserDashboardPage';
import PreviousPurchasesPage from './pages/PreviousPurchasesPage';
import MyListingsPage from './pages/MyListingsPage';
export function App() {
  return <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="product/:id" element={<ProductDetailPage />} />
                <Route path="add-product" element={<AddProductPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="dashboard" element={<UserDashboardPage />} />
                <Route path="purchases" element={<PreviousPurchasesPage />} />
                <Route path="listings" element={<MyListingsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>;
}