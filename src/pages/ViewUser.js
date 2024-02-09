import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function ViewUser() {
	const { id } = useParams();
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


  return (
	<div className="flex items-center justify-center w-full h-screen">
		<div className="container w-auto h-auto p-5 bg-slate-600 rounded-md">
			<h1 className="text-center text-4xl">User details</h1>
			<div className="py-2">
				<p>Name: </p>
				<p>{formData.name}</p>
			</div>
			<div className="py-2">
				<p>Address: </p>
				<p>{formData.address}</p>
			</div>
			<div className="py-2">
				<p>Phone: </p>
				<p>{formData.phone}</p>
			</div>
			<div className="py-2">
				<p>Email: </p>
				<p>{formData.email}</p>
			</div>
		</div>

	</div>
  )
}
