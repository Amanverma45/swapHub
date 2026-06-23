import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Products from './Components/Products'
import Login from './Components/Login'
import Register from './Components/Register'

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
        </Routes>
      </main>

    </div>
  )
}

export default App