import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UpdateUser from './pages/UpdateUser';
import ViewUser from './pages/ViewUser';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AllProducts from './pages/AllProducts';
import TransactionHistory from './pages/TransactionHistory';
import AddProduct from './pages/AddProduct';
import OrderPage from './pages/OrderPage';
import { ToastContainer } from 'react-toastify';



function App() {
  useEffect(()=>{
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);
 

  return (    
    <BrowserRouter>
      <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login"   element={<Login />} /> 
      <Route index element={<Home />} />
        <Route path='update-user/:id' element={<UpdateUser />} />
        <Route path='view-user/:id' element={<ViewUser />} />
        <Route path='/all-products' element={<AllProducts />} />
        <Route path='/transaction-history' element={<TransactionHistory />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/order-page/:id' element={<OrderPage />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
