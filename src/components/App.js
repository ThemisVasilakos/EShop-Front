import React from 'react'
import Register from './Register'
import { Routes, Route } from 'react-router-dom';
import Login from './Login'
import Home from './Home'
import ProductCreateOrUpdate from './ProductCreateOrUpdate'

const App = () => {

  

    return (
      <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="product-create" element={<ProductCreateOrUpdate />} />
      </Routes>
      </div>
    )
  }

export default App