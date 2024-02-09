import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function UpdateUser() {
	const {id}=useParams();
	const token = localStorage.getItem('token');
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		phone: "",
		email: "",
		role: ""
	});

	useEffect(()=>{
		getUserById()
	},[])


	const getUserById = async ()=>{
	try{
	const result = await axios.get(`http://localhost:8081/api/v1/user/get-user/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	console.log(result.data);
	setFormData(result.data);
}
	catch (err){
		console.log(err);
	}
	console.log(formData);
	}
	const handleChange = (e)=>{
		setFormData({...formData, [e.target.name]: e.target.value});
	}

	const handleSubmit = async (e)=>{
		e.preventDefault();
	try{
		const result = await axios.put(`http://localhost:8081/api/v1/user/update-user/${id}`, formData,{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(result.data);
	}catch(err){
		console.log(err);
	}
	// setFormData({
	// 	name: "",
	// 	address: "",
	// 	phone: "",
	// 	email: "",
	// 	password: "",
	// 	role: ""
	// });
	}
  return (
	<div>
		<div className="container mx-auto  max-w-xl h-auto bg-blue-300 p-7 rounded shadow-xl my-8 flex items-center justify-center">
	<form onSubmit={handleSubmit}>
		<div className="pb-9"><h1 className="text-center font-bold text-4xl">Update Profile</h1> </div>
		<div className="mx-6">
			<input
								type="text"
								name="name"
								value={formData.name}
								id="name"
								placeholder="Enter your Full name"
								className="rounded-md w-[500px] border-2 border-sky-400 h-9 p-3"
								onChange={handleChange}
							/>

							<input
								type="text"
								name="address"
								value={formData.address}
								id="address"
								placeholder="Enter your Address"
								className="rounded-md w-[500px] border-2 border-sky-400 h-9 p-3"
								onChange={handleChange}
							/>

							<input
								type="text"
								name="phone"
								value={formData.phone}
								id="phone"
								placeholder="Enter your Phone number"
								className="rounded-md w-[500px] border-2 border-sky-400 h-9 p-3"
								onChange={handleChange}
							/>

							<input
								type="email"
								name="email"
								value={formData.email}
								id="email"
								placeholder="Enter your email"
								className="rounded-md w-[500px] border-2 border-sky-400 h-9 p-3"
								onChange={handleChange}
							/>


							{/* <input
								type="password"
								name="password"
							
								id="password"
								placeholder="Enter your password"
								className="rounded-md w-[500px] border-2 border-sky-400 h-9 p-3"
								onChange={handleChange}
							/> */}

			<div className="px-5 my-5">
				<button className="rounded-md w-[500px]  bg-green-400 hover:bg-green-200 h-9 p-3 flex items-center justify-center shadow-md" type="submit">submit</button>
			</div>
		</div>
	</form>
	</div>
	</div>
  )
}
