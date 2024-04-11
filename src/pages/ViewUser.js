import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from './Footer';

export default function ViewUser() {
	const { id } = useParams();
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		phone: "",
		email: "",
		role: ""
	});
	useEffect(() => {
		getUserById()
	}, [])

	const getUserById = async () => {
		try {
			const result = await axios.get(`http://localhost:8081/api/v1/user/get-user/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(result.data);
			setFormData(result.data);
		}
		catch (err) {
			console.log(err);
		}
		console.log(formData);
	}
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	const updateUser = async (e) => {
		e.preventDefault();
		try {
			const result = await axios.put(`http://localhost:8081/api/v1/user/update-user/${id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(result.data);
			navigate(`/view-user/${id}`)
		} catch (err) {
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

	const deleteUser = async ()=> {
	if(window.confirm("Are you sure you want to delete account?")){
			try{
				const result = await axios.delete(`http://localhost:8081/api/v1/user/delete-user/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(result); 
			}catch(err){
				console.log(err);
			}
	}
	else{
		
	}
}

  return (
	<div>
		<Navbar />
	<div className="flex items-center justify-center w-full h-screen dark:bg-gray-900 dark:text-white duration-200">
		
		<div className="container w-auto h-[100%] p-7 bg-white rounded-md drop-shadow-lg my-10 dark:bg-gray-800">
			<h1 className="text-center sm:text-4xl text-2xl my-10 font-bold">User details</h1>
			<div className='sm:grid sm:grid-cols-2 gap-2 flex flex-col'>
			<div className="py-2">
				<label htmlFor='' className='block'> Name</label>
				<input type="text"
					name='name'
					id='name'
					placeholder="full name"
					value={formData.name}
					onChange={handleChange}
					className="w-[200px] sm:w-[400px] group-hover:w-[300px] transition-all duration-300 rounded-md
					border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800 dark:text-white"
					/>
			</div>
			<div className="py-2">
			<label htmlFor='' className='block'> Address</label>
				<input type="text"
				name='address'
				id='address'
					placeholder="address"
					value={formData.address}
					onChange={handleChange}
					className="w-[200px] sm:w-[400px] group-hover:w-[300px] transition-all duration-300 rounded-md
					border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800  dark:text-white"
					/>
			
			</div>
			<div className="py-2">
			<label htmlFor='' className='block'> Phone</label>
				<input type="text"
				name='phone'
				id='phone'
					placeholder="phone"
					value={formData.phone}
					onChange={handleChange}
					className="w-[200px] sm:w-[400px] group-hover:w-[300px] transition-all duration-300 rounded-md
					border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800  dark:text-white"
					/>
			</div>
			<div className="py-2">
			<label htmlFor='' className='block'> Email</label>
				<input 
					type="text"
					name='email'
					id='email'
					placeholder="search"
					value={formData.email}
					onChange={handleChange}
					className="w-[200px] sm:w-[400px] group-hover:w-[300px] transition-all duration-300 rounded-md
					border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800  dark:text-white"
					/>
			</div>
			<div className='p-2'>
			<button
                  className="px-2 py-2 mr-5  bg-blue-500 shadow-md rounded-sm hover:bg-blue-200 duration-200 transition-all"
				  onClick={updateUser}
                >
                  update profile
                </button>
				<button
                  className="px-2 py-2 mb-3  bg-red-500 shadow-md rounded-sm hover:bg-red-200 duration-200 transition-all"
				  onClick={deleteUser}
                >
                  delete profile
                </button>
			</div>
			</div>
		</div>

	</div>
	<Footer />
	</div>
  )
}
