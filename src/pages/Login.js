import axios from 'axios'
import React, { useState } from 'react'
import COVER_IMAGE from '../gadgets.png'
import GOOGLE_ICON from '../icons8-google.svg'
import { Link, useNavigate } from 'react-router-dom';
import Register from './Register';

export default function Login() {
	let navigate=useNavigate();
	const[formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const handleChange = (e)=> {
		setFormData({...formData, [e.target.name]: e.target.value});
		console.log(formData.email);
	}

	const setLocalStorage = (data)=>{
		localStorage.setItem('id', data.userId);
		localStorage.setItem('name', data.name);
		localStorage.setItem('address', data.address);
		localStorage.setItem('phone', data.phone);
		localStorage.setItem('email', data.email);
		localStorage.setItem('role', data.role);
		localStorage.setItem('token', data.token);
		localStorage.setItem('createdAt', data.createdAt);
		localStorage.setItem("products", JSON.stringify(data.productList));
	}

	const handleSubmit = async (e)=>{
		e.preventDefault();
		console.log(formData);
		try{

		const result = await axios.post("http://localhost:8081/api/v1/auth/login", formData);
		console.log(result.data);
		setLocalStorage(result.data);
		navigate("/");
	} catch(error) {
		console.log(error)
	}
	setFormData({
	email: "",
	password: ""});
	}
  return (
	<div className="w-full h-screen flex sm:items-start items-center justify-center">
		<div className="sm:relative sm:w-1/2 sm:flex sm:flex-col w-full h-full absolute">
			<img src= {COVER_IMAGE}
			className="w-full h-full sm:object-cover" />
			<div className="sm:absolute sm:top-[35%] sm:left-[10%] sm:flex sm:flex-col hidden">
				<h1 className="text-4xl text-white font-extrabold my-4"><span className="text-[#FF3131]">Shop</span> from the comfort of your home</h1>
				<p className="text-xl text-white font-normal">Register today for free and get amazing discounts</p>
			</div> 
		</div>
		<div className="sm:w-1/2 sm:h-full bg-[#FAF9F6] sm:flex sm:flex-col sm:relative sm:rounded-none rounded-lg sm:p-20 p-10 justify-between items-center absolute w-[320px] h-[620px]">
			<h1 className="w-full max-w-[500px] mx-auto sm:text-xl font-semibold mr-auto text-sm">Ecommerce App</h1>
			
			<div className="sm:w-full flex flex-col sm:max-w-[500px] max-w-[400px]">
			<form onSubmit={handleSubmit}>
				<div className="w-full flex flex-col mb-2">
				<h3 className="sm:text-3xl sm:font-semibold sm:mb-2 text-2xl font-bold mb-1">Login</h3>
				<p className="sm:text-base sm:mb-2 text-sm mb-1"> Welcome Back! Please enter your details.</p>
				</div>

			<div className="sm:w-full flex flex-col">
			<input 
			type="email"
			name="email"
			value={formData.email}
			id="email"
			placeholder="Enter your email"
			className="w-full text-black sm:py-2 sm:my-2 py-1 my-1 bg-transparent border-b border-black outline-none focus:outiline-none"
			onChange={handleChange}
			/>

			<input 
			type="password"	
			name="password"
			value={formData.password}
			id="password"
			placeholder="Enter your password"
			className="w-full text-black sm:py-2 sm:my-2 py-1 my-2 bg-transparent border-b border-black outline-none focus:outiline-none"
			onChange={handleChange}
			/>
			</div>
			{/* <div className="w-full flex sm:items-center sm:justify-between sm:flex-row flex-col">
				<div className="w-full flex items-center">
					<input type="checkbox" className="w-4 h-4 mr-2" />
					<p className="sm:text-sm text-[10px] whitespace-nowrap">Remember me for 30 days</p>
				</div>

				<p className="sm:text-sm  sm:font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 ">Forgot Password ?</p> 
			</div> */}
			<div className="w-full flex flex-col sm:my-4 my-2">
				<button className="w-full text-black my-2 border-2 bg-red-600  hover:bg-red-800 hover:text-[#060606]  rounded-md p-4 text-center flex items-center justify-center">
					Log in
				</button>
				<Link to = '/register'className="w-full text-[#060606] my-2 bg-white border-2  hover:bg-slate-200  rounded-md p-4 text-center flex items-center justify-center">
					Register
				</Link>
			</div>

			{/* <div className="w-full flex items-center justify-center relative py-2">
				<div className="w-full h-[1px] bg-black"></div>
				<p className="text-lg absolute text-black bg-[#D3D3D3] ">or</p>
			</div> 

			<button className="w-full text-[#060606] my-2 bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center">
				<img src={GOOGLE_ICON} className="h-6 mr-2" />
					Sign in with Google
			</button> */}
			</form>
			</div>
			

			<div className="w-full flex items-center justify-center">
				<p className="text-sm font-normal">Dont't have a account? <Link to='/register' className="font-semibold underline cursor-pointer">Sign up for free</Link> </p>
			</div>
		</div>
	</div>
  ) 
}
