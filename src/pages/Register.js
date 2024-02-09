import axios from 'axios'
import React, { useState } from 'react'
import COVER_IMAGE from '../gadgets.png'
import GOOGLE_ICON from '../icons8-google.svg'
import { Link, useNavigate } from 'react-router-dom'


export default function Register() {
	let navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		phone: "",
		email: "",
		password: "",
		role: ""
	});


	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		try {
			const result = await axios.post("http://localhost:8081/api/v1/auth/register", formData);
			console.log(result.data);
			navigate("/login");
		} catch (error) {
			console.log(error)
		}
		setFormData({
			name: "",
			address: "",
			phone: "",
			email: "",
			password: "",
			role: ""
		})
	}


	return (
		<div className="w-full h-screen flex sm:items-start items-center justify-center">
			<div className="sm:relative sm:w-1/2 sm:flex sm:flex-col w-full h-full absolute">
				<img src={COVER_IMAGE}
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
							<h3 className="sm:text-3xl sm:font-semibold sm:mb-2 text-2xl font-bold mb-1">Register your Account</h3>
						</div>

						<div className="sm:w-full flex flex-col">

							<input
								type="text"
								name="name"
								value={formData.name}
								id="name"
								placeholder="Enter your Full name"
								className="w-full text-black sm:py-2 sm:my-2 py-1 my-1 bg-transparent border-b border-black outline-none focus:outiline-none"
								onChange={handleChange}
							/>

							<input
								type="text"
								name="address"
								value={formData.address}
								id="address"
								placeholder="Enter your Address"
								className="w-full text-black sm:py-2 sm:my-2 py-1 my-1 bg-transparent border-b border-black outline-none focus:outiline-none"
								onChange={handleChange}
							/>

							<input
								type="text"
								name="phone"
								value={formData.phone}
								id="phone"
								placeholder="Enter your Phone number"
								className="w-full text-black sm:py-2 sm:my-2 py-1 my-1 bg-transparent border-b border-black outline-none focus:outiline-none"
								onChange={handleChange}
							/>

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

							<select name='role' id="role" value={formData.role} onChange={handleChange} className="w-full text-black sm:py-2 sm:my-2 py-1 my-2 bg-transparent border-b border-black outline-none focus:outiline-none">
								<option>Choose your role</option>
								<option value="BUYER">Buyer</option>
								<option value="SELLER">Seller</option>
							</select>			
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
								Register
							</button>
							{/* <button className="w-full text-[#060606] my-2 bg-white border-2  hover:bg-slate-200  rounded-md p-4 text-center flex items-center justify-center">
								Register
							</button> */}
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
					<p className="text-sm font-normal">Already have an account? <Link to='/login' className="font-semibold underline cursor-pointer">Click here to login</Link> </p>
				</div>
			</div>
		</div>
	)
}
