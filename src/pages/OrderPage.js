import React, { useEffect, useState } from 'react'
import Navbar from '../layout/Navbar'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Footer from './Footer';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OrderPage() {
	const {id} = useParams();
	const navigate = useNavigate();
	const userId = localStorage.getItem('id');
	const token = localStorage.getItem('token');
	const [product, setProduct] = useState({});
	var [itemCount, setItemCount] = useState(0);
	

	const increaseCount = ()=>{
		setItemCount(++itemCount);
	}
	const decreaseCount = ()=>{
		if (itemCount > 0){
			setItemCount(--itemCount);
		}else{
			return;
		}
	}
	const getProduct = async()=>{
		try{
			const result = await axios.get(`http://localhost:8081/api/v1/product/get-product/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		setProduct(result.data);
		console.log(result.data);

		}
		catch(err){
			console.log(err);
		}
	}
	const orderProduct = async ()=>{
		try{
			const result = await axios.post(`http://localhost:8081/api/v1/product/order-product/${userId}/${id}/${itemCount}`, {}, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		toast.success('Product ordered successfully', {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			transition: Flip,
		});
		setItemCount(0)
		setTimeout(()=>{
		 navigate(`/order-page/${id}`);
		}, 5);

		console.log(result.data);
		}
		catch(err){
			toast.error('Please fill out all the fields', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Flip,
				});
			console.log(err);
		}
		
	}

	useEffect(()=>{
		getProduct();
	}, [])
  return (
	<div className='dark:bg-gray-900'>
		<Navbar />
	<div className='dark:bg-gray-900 dark:text-white m-6'>
		<div className='px-10 py-5'>
			<h1 className='text-3xl font-bold'>Order Product</h1>
		</div>
		<div className='container p-4 rounded-md shadow-xl flex sm:flex-row flex-col dark:bg-gray-800 mb-16 '>
			{/* product image */}
			<div className='p-6'>
				<img src={product.imagePath} alt='' className='sm:w-[400px] sm:h-[400px] w-[150px] h-[220px] m-5 object-contain' />
			</div>
			{/* product details */}
			<div className='p-6'>
				<h1 className='text-3xl font-bold uppercase mb-5'>{product.productName}</h1>
				<p className='font-bold text-2xl mb-5'>NGN {product.price}</p>
				<p className='mb-5 max-w-2xl sm:text-base text-sm'>My name is Ademilua Oluseun Gabriel, I am 24 years old , and a Nigerian. I studied Computer Science and Mathematics at Babcock University ilishan Remo Ogun State.
I applied to Conestoga college located at 299 Doon Valley Dr. Kitchener, Ontario N2G 4M4, Canada. for web development with course code(1536) for the Ontario College Graduate Certificate (Post-Graduate) for 4 Semester(s)
The duration is 18 months and classes will begin on September 03, 2024 and it will end on December 14, 2025</p>
				<p className='mb-5'>Availability: {product.quantity > 0 ? (<span>IN STOCK</span>) : (<span>OUT OF STOCK</span>)}</p>
				<div className='flex flex-row'>
				<div className='flex flex-row'>
					<button onClick={decreaseCount} className='w-[45px] h-[50px] border border-gray-500 text-center  hover:text-tomato'>-</button>
					<p className='w-[45px] h-[50px] border border-gray-500 border-l-0 border-r-0 text-center pt-3'>{itemCount}</p>
					<button onClick={increaseCount} className='w-[45px] h-[50px] border border-gray-500 text-center  hover:text-tomato'>+</button>
				</div>
				<div className='px-6'>
					<button className="bg-tomato hover:scale-105 duration-300 text-white py-1 sm:px-4 md:px-4 lg:px-4 px-2 rounded-full mt-4 group-hover:bg-white group-hover:text-tomato" onClick={orderProduct}>order</button>
				</div>
				</div>
			</div>
		</div>
	</div>
	<Footer />
	<ToastContainer />
	</div>
  )
}
