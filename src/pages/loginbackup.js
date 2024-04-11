import axios from 'axios'
import React, { useState } from 'react'
import COVER_IMAGE from '../gadgets.png'
import GOOGLE_ICON from '../icons8-google.svg'

export default function LoginBackup() {
	const[formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const handleChange = (e)=> {
		setFormData({...formData, [e.target.name]: e.target.value});
	} 

	const handleSubmit = async (e)=>{
		e.preventDefault();
		console.log(formData);
		try{
		const result = await axios.post("http://localhost:8081/api/v1/auth/login", formData);
		console.log(result.data);
	} catch(error) {
		console.log(error)
	}
	setFormData({
	email: "",
	password: ""});
	}
  return (
	<div className="w-full h-screen flex items-start">
		<div className="relative w-1/2 h-full flex flex-col">
			<img src= {COVER_IMAGE}
			className="w-full h-full object-cover" />
			<div className="absolute top-[35%] left-[10%] flex flex-col ">
				<h1 className="text-4xl text-white font-extrabold my-4"><span className="text-red-600">Shop</span> from the comfort of your home</h1>
				<p className="text-xl text-white font-normal">Register today for free and get amazing discounts</p>
			</div> 
		</div>
		<div className="w-1/2 h-full bg-[#D3D3D3] flex flex-col p-20 justify-between items-center">
			<h1 className="w-full max-w-[500px] mx-auto text-xl font-semibold mr-auto">Ecommerce App</h1>

			<div className="w-full flex flex-col max-w-[500px]">
				<div className="w-full flex flex-col mb-2">
				<h3 className="text-3xl font-semibold mb-2">Login</h3>
				<p className="text-base mb-2"> Welcome Back! Please enter your details.</p>
				</div>

			<div className="w-full flex flex-col">
			<input 
			type="email"
			name="email"
			value={formData.email}
			id="email"
			placeholder="Enter your email"
			className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outiline-none"
			onChange={handleChange}
			/>

			<input 
			type="password"	
			name="password"
			value={formData.password}
			id="password"
			placeholder="Enter your password"
			className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outiline-none"
			onChange={handleChange}
			/>
			</div>
			<div className="w-full flex items-center justify-between">
				<div className="w-full flex items-center">
					<input type="checkbox" className="w-4 h-4 mr-2" />
					<p className="text-sm">Remember me for 30 days</p>
				</div>

				<p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">Forgot Password ?</p> 
			</div>
			<div className="w-full flex flex-col my-4">
				<button className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center">
					Log in
				</button>
				<button className="w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center">
					Register
				</button>
			</div>

			<div className="w-full flex items-center justify-center relative py-2">
				<div className="w-full h-[1px] bg-black"></div>
				<p className="text-lg absolute text-black bg-[#D3D3D3] ">or</p>
			</div> 

			<button className="w-full text-[#060606] my-2 bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center">
				<img src={GOOGLE_ICON} className="h-6 mr-2" />
					Sign in with Google
			</button>
			</div>
			<div className="w-full flex items-center justify-center">
				<p className="text-sm font-normal">Dont't have a account? <span className="font-semibold underline cursor-pointer">Sign up for free</span> </p>
			</div>
		</div>
	</div>
  ) 
}
