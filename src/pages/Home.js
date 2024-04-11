import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Hero from './Hero';
import Products from './Products';
import TopProducts from './TopProducts';
import Banner from './Banner';
import Subscribe from './Subscribe';
import Testimonials from './Testimonials';
import Footer from './Footer';
import Popup from './Popup';


export default function Home() {
	const[orderPopup, setOrderPopup] = useState(false);

	const handleOrderPopup = ()=>{
		setOrderPopup(!orderPopup);
	}

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
	<div className='bg-white dark:bg-gray-900 dark:text-white duration-200'>
	<Navbar   handleOrderPopup={handleOrderPopup}/> 
	<Hero handleOrderPopup={handleOrderPopup}/>
	<Products />
	<TopProducts handleOrderPopup={handleOrderPopup}/>
	<Banner />
	<Subscribe />
	<Products />
	<Testimonials />
	<Footer />
	<Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup}/>
	</div>
  )
}
