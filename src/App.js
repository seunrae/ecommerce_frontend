import logo from './logo.svg';
import './App.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UpdateUser from './pages/UpdateUser';
import ViewUser from './pages/ViewUser';



function App() {
  return (
    // <div className="App">
    //   <Navbar />
    //   {/* <Home /> */}
    //   {/* <Register /> */}
    //   <Login />
    // </div>
    <BrowserRouter>
    {/* <Navbar /> */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login"   element={<Login />} />   
        <Route path='update-user/:id' element={<UpdateUser />} />
        <Route path='view-user/:id' element={<ViewUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
