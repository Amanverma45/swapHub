import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { FaArrowUp } from 'react-icons/fa'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Products from './Components/Products'
import Login from './Components/Login'
import Register from './Components/Register'
import Footer from './Components/Footer'
import Welcome from './Components/Welcome'
import AddProduct from './Components/AddProduct'
import ProductDetails from './Components/ProductDetails'
import MyProducts from './Components/MyProducts'
import EditProduct from './Components/EditProduct'
import ProtectedRoute from './Components/ProtectedRoute'
import Profile from './Components/Profile'
import SwapRequests from './Components/SwapRequests'
import MySwapRequests from './Components/MySwapRequests'
import ForgotPassword from './Components/ForgotPassword'
// NAYA IMPORT: Reset password page ka component
import ResetPassword from './Components/ResetPassword'

// Automatically scrolls window to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Global Floating Back To Top Button
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-[#2E7D32] to-[#1E5621] text-white shadow-xl shadow-[#2E7D32]/35 hover:scale-110 active:scale-95 transition-all duration-300 border border-white/30 cursor-pointer group"
    >
      <FaArrowUp className="text-base sm:text-lg group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};

const App = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50 overflow-x-hidden relative">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow w-full pt-16 sm:pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          {/* NAYA ROUTE: Email se aane wale link (/reset-password/:token) ko handle karne ke liye */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/addProduct" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/myProducts" element={<ProtectedRoute><MyProducts /></ProtectedRoute>} />
          <Route path="/editProduct/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
          <Route path="/swapRequest" element={<ProtectedRoute><SwapRequests /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/mySwapRequests" element={<ProtectedRoute><MySwapRequests /></ProtectedRoute>} />
        </Routes>
        <Footer/>
      </main>
      <BackToTopButton />
    </div>
  )
}

export default App