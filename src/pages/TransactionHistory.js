import React, { useEffect, useState } from 'react'
import Navbar from '../layout/Navbar'
import axios from 'axios';
import Footer from './Footer';

export default function TransactionHistory() {
	const id = localStorage.getItem('id');
	const token = localStorage.getItem('token');
	const [orders, setOrders] = useState([]);
	const [user, setUser] = useState();

	const getUser = async ()=>{
		try {
			const result = await axios.get(`http://localhost:8081/api/v1/user/get-user/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(result.data);
			setUser(result.data)
			setOrders(result.data.orderItems);
		}
		catch (err) {
			console.log(err);
		}
	}
	useEffect(()=>{
		getUser();
	},[]);

  return (
	<div>
		<Navbar />
	<div className='dark:bg-gray-900 dark:text-white '>
	
		<div className='container'>
		<div className='py-5'>
			<h1 className='font-bold text-3xl'>Transaction History</h1>
		</div>
		<div className="py-5 px-5 w-[100%] overflow-auto border-collapse">
			<table className="table-auto border shadow-xl sm:w-[1000px] w-[400px] dark:bg-gray-800 dark:border-gray-800">
				<thead className="p-2 border-b-2 border-solid border-b-black">
					<tr>
						<th>#</th>
						<th>Product name</th>
						{/* <th>Description</th> */}
						<th>Price</th>
						<th>Category</th>
						<th>Quantity</th>
						<th>Date</th>
						<th>Reference No.</th>
					</tr>
				</thead>
				<tbody>
					{
						orders.map((order, index)=> (
							<tr className="border-solid border-b-black border-b-[1px]">
								<th scope="row" key={index}>{index + 1}</th>
								<td className="px-4 text-center">{order.product.productName}</td>
								{/* <td className="px-4 text-center">{product.description}</td> */}
								<td className="px-4 text-center">{order.product.price}</td>
								<td className="px-4 text-center">{order.product.category}</td>
								<td className="px-4 text-center">{order.quantity}</td>
								<td className="px-4 text-center">{order.createdAt}</td>
								<td className="px-4 text-center">{order.referenceNumber}</td>

								{/* <td>
									<Link to={`/view-user/${user.userId}`} className="w-auto h-auto bg-blue-400 p-2  m-2 rounded-md shadow-md">view</Link>
									<Link to={`/update-user/${user.userId}`} className="w-auto h-auto bg-yellow-400 p-2 m-2 rounded-md shadow-md">edit</Link>
									<button onClick={()=>handleDelete(user.userId)} className="w-auto h-auto bg-red-400 p-2 m-2 rounded-md shadow-md">delete</button>
								</td> */}
							</tr>
						))
					}
					
				</tbody>
			</table>
		</div>
		</div>
		
	</div>
	<Footer />
	</div>
  );
}
