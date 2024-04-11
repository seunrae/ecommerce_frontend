import React, { useEffect, useState } from "react";
import Logo from "../assets/shoplogo2.png"
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6"
import DarkMode from "./DarkMode";
import { Link, useNavigate } from "react-router-dom";
import AllProducts from "../pages/AllProducts";
import axios from "axios";

var product = [];
export default function Navbar({handleOrderPopup}) {
	const [searchInput, setSearchInput] = useState();
	const navigate = useNavigate();
	const id = localStorage.getItem("id");
	const handleChange = (e) =>{
		setSearchInput(e.target.value)
	}
	const role = localStorage.getItem('role');
	const token = localStorage.getItem('token');
	const searchProducts = async () => {
		try {
		  const result = await axios.get(
			"http://localhost:8081/api/v1/product/search-name",
			{
			  headers: {
				Authorization: `Bearer ${token}`,
			  },
			  params: {
				name: searchInput,
			  },
			}
		  );
		  console.log(result.data);
		  navigate(`/all-products/${result.data}`);
		} catch (err) {
		  console.log(err);
		}
	  };

	  const logOut = ()=>{
		localStorage.removeItem('token');
		navigate('/login')
	  }

useEffect(()=>{
},[])
	
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
		{/* upper navbar */}
      <div className="bg-tomato/40 py-2 w-screen">
        <div className="container flex justify-between items-center">
          <div>
			<a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
				<img src={Logo} alt="logo" className="w-10" />
				Shop_4l
			</a>
		  </div>
		    {/* search bar and order button */}
			<div className="flex justify-between items-center gap-4">
				<div className="relative group hidden sm:block">
					<input type="text"
					placeholder="search"
					value={searchInput}
					onChange={handleChange}
					className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full
					border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800"
					/>
					<IoMdSearch className="text-gray-500 group-hover:text-tomato absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer" onClick={searchProducts}/>
				</div>
				{/* order button */}
			<button onClick={() => handleOrderPopup()}
			className="bg-gradient-to-r from-tomato to-neon transition-all ease-in-out duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
			>
				<span className="group-hover:block hidden transition-all duration-200">
					Order
				</span>
				<FaCartShopping 
				className="text-xl text-white drop-shadow-sm cursor-pointer"
				/>
			</button>
			{/* DarkMode Switch */}
			<div>
				<DarkMode />
			</div>
			</div>
        </div>
      </div>
	  {/* lower navbar */}
      <div data-aos="zoom-in" className="flex justify-center">
		<ul className="sm:flex hidden items-center gap-4">
			<li >
				<Link to='/' className="inline-block px-4 hover:text-tomato duration-200">Home</Link>
			</li>
			<li>
				<Link to='/all-products' className="inline-block px-4 hover:text-tomato duration-200">Products</Link>
			</li>
			<li>
				<a href="" className="inline-block px-4 hover:text-tomato duration-200" >Categories</a>
			</li>
			<li className="group relative cursor-pointer">
				<p className="flex items-center gap-[2px] py-2" >
					Account
					<span>
					<FaCaretDown 
					className="trasition-all duration-200 group-hover:rotate-180"
					/>
					</span>
				</p>
				{
					role == 'BUYER' ? 
				(
				<div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md dark:bg-gray-900 dark:text-white">
					<ul>
						<li><Link to={`/view-user/${id}`} className="inline-block w-full rounded-md p-2 hover:bg-tomato/20">Your account</Link></li>
						<li><Link to={`/transaction-history`} className="inline-block w-full rounded-md p-2 hover:bg-tomato/20">Transaction history</Link></li>
						<li><a className="inline-block w-full rounded-md p-2 hover:bg-tomato/20" onClick={logOut}>Log-out</a></li>
					</ul>
				</div>
				) 
				:
				(
					<div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md dark:bg-gray-900 dark:text-white">
						<ul>
							<li><Link to={`/view-user/${id}`} className="inline-block w-full rounded-md p-2 hover:bg-tomato/20">Your account</Link></li>
							<li><Link to={`/add-product`} className="inline-block w-full rounded-md p-2 hover:bg-tomato/20">Add product</Link></li>
							<li><Link to={`/transaction-history`} className="inline-block w-full rounded-md p-2 hover:bg-tomato/20">Your products</Link></li>
							<li><a className="inline-block w-full rounded-md p-2 hover:bg-tomato/20" onClick={logOut}>Log-out</a></li>
						</ul>
					</div>
				)
					}
			</li>
		</ul>
	  </div>
    </div>
  );
}
