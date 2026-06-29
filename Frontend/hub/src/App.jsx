import { Routes, Route } from 'react-router-dom'
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

const App = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      
      <Navbar />
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/addProduct" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/myProducts" element={<ProtectedRoute><MyProducts /></ProtectedRoute>} />
          <Route path="/editProduct/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
          <Route path="/swapRequest" element={<ProtectedRoute><SwapRequests /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
        <Footer/>
      </main>

    </div>
  )
}

export default App