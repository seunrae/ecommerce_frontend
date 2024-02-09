import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


export default function Home() {
	const [users, setUsers] = useState([]);
	const token = localStorage.getItem('token');

	useEffect(()=> {
		loadUsers()
	}, []);

	const loadUsers = async (e)=>{
		try{
		const result = await axios.get("http://localhost:8081/api/v1/user/get-all-users",{
			headers: {
			Authorization: `Bearer ${token}`,
		},
	});
		console.log(result.data);
		setUsers(result.data);
	} catch(err) {
		console.log(err);
	}
	}

	const handleDelete = async (id)=> {
		try{
			const result = await axios.delete(`http://localhost:8081/api/v1/user/delete-user/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		loadUsers();
		console.log(result); 
	}catch(err){
		console.log(err);
	}

	}

  return (
	<div className="container">
		<div className="py-4 px-5">
			<table className="table-auto border shadow-md">
				<thead className="p-2 border-b-2 border-solid border-b-black">
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Email</th>
						<th>Address</th>
						<th>Phone</th>
						<th>Role</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{
						users.map((user, index)=> (
					<tr className="border-solid border-b-black border-b-[1px]">
						<th scope="row" key={index}>{index + 1}</th>
						<td className="px-4">{user.name}</td>
						<td className="px-4">{user.email}</td>
					    <td className="px-4">{user.address}</td>
						<td className="px-4">{user.phone}</td>
						<td className="px-4">{user.role}</td>
						<td>
							<Link to={`/view-user/${user.userId}`} className="w-auto h-auto bg-blue-400 p-2  m-2 rounded-md shadow-md">view</Link>
							<Link to={`/update-user/${user.userId}`} className="w-auto h-auto bg-yellow-400 p-2 m-2 rounded-md shadow-md">edit</Link>
							<button onClick={()=>handleDelete(user.userId)} className="w-auto h-auto bg-red-400 p-2 m-2 rounded-md shadow-md">delete</button>
						</td>
					</tr>
						))
					}
					
				</tbody>
			</table>
		</div>
	</div>
  )
}
