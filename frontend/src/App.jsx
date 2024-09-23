import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Cart from './pages/Cart.jsx'
import Collection from './pages/Collection.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Product from './pages/Product.jsx'
import Contact from './pages/Contact.jsx'
import Orders from './pages/Orders.jsx'
import { assets } from './assets/assets.js'
import Searchbar from './components/Searchbar.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify.jsx'

const App = () => {
  return (
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />
        <Navbar />
        <Searchbar/>

        <Routes>
          <Route path= "/" element= {<Home/>} />
          <Route path= "/login" element= {<Login/>} />
          <Route path= "/about" element= {<About/>} />
          <Route path= "/cart" element= {<Cart/>} />
          <Route path= "/collection" element= {<Collection/>} />
          <Route path= "/contact" element= {<Contact/>} />
          <Route path= "/orders" element= {<Orders/>} />
          <Route path= "/place-order" element= {<PlaceOrder/>} />
          <Route path= "/product/:productId" element= {<Product/>} />
          <Route path= "/verify" element= {<Verify/>} />
        </Routes>
        <Footer/>
      </div>
  )
}

export default App