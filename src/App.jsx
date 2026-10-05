import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import SearchModal from './components/SearchModal';
import CartDrawer from './components/CartDrawer';

// Pages
import Home from './pages/Home';
import SkinQuiz from './pages/SkinQuiz';
import Results from './pages/Results';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Reviews from './pages/Reviews';
import Learn from './pages/Learn';
import MyRoutine from './pages/MyRoutine';
import TeamDashboard from './pages/TeamDashboard';
import About from './pages/About';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div
          className="flex flex-col min-h-screen bg-white text-teal-800 font-sans"
          dir="rtl"
        >
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/"                element={<Home />} />
              <Route path="/quiz"            element={<SkinQuiz />} />
              <Route path="/results"         element={<Results />} />
              <Route path="/products"        element={<Products />} />
              <Route path="/products/:id"    element={<ProductDetails />} />
              <Route path="/checkout"        element={<Checkout />} />
              <Route path="/wishlist"        element={<Wishlist />} />
              <Route path="/reviews"         element={<Reviews />} />
              <Route path="/learn"           element={<Learn />} />
              <Route path="/my-routine"      element={<MyRoutine />} />
              <Route path="/team-dashboard"  element={<TeamDashboard />} />
              <Route path="/about"           element={<About />} />
              <Route path="*"               element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <Toast />
          <SearchModal />
          <CartDrawer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
