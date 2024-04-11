import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import Footer from "./Footer";


const CategoryList = [
	{
	  id: 1,
	  category: "GADGETS",
	},
	{
	  id: 2,
	  category: "MEDICINE",
	},
	{
	  id: 3,
	  category: "FASHION",
	},
	{
	  id: 4,
	  category: "FOOD",
	},
	{
	  id: 5,
	  category: "ENTERTAINMENT",
	},
	{
	  id: 6,
	  category: "OTHER",
	},
  ];

export default function AddProduct() {
	const [formData, setFormData] = useState({})
	const [file, setFile] = useState("");
	const token = localStorage.getItem('token');
	const id = localStorage.getItem('id');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}
	const handleInputChange = (e)=>{
		setFile(e.target.files[0]);
	}

	const uploadImage = async (id)=>{
		console.log(file);
		const formData = new FormData();
		formData.append('file', file);
		try{
		const boundary = `----${new Date().getTime()}`;
		const path = await axios.post(`http://localhost:8081/api/v1/product/upload-photo/${id}`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': `multipart/form-data; boundary=${boundary}`,
			},
		});
		console.log(path.data);
	}catch(err){
		console.log(err);
	}
	}
	const handleSubmit = async (e)=>{
		e.preventDefault()
		try{
		const result  = await axios.post(`http://localhost:8081/api/v1/product/create-product/${id}`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		uploadImage(result.data.productId);
		console.log(result.data);
	}catch(err){
		console.log(err);
	}
	}
  return (
    <div>
      <Navbar />
	  <div className="flex items-center justify-center dark:bg-gray-900 dark:text-white h-screen">
	  <div className="container shadow-xl rounded-md w-auto h-[100%] dark:bg-gray-800 p-7 my-10">
		<h1 className="text-4xl font-bold text-center my-10">Add a Product</h1>
		<form  onSubmit={handleSubmit} className="sm:grid sm:grid-cols-2 sm:gap-2 flex flex-col">
			<div className="py-2">
			<label htmlFor='' className='block'>Product name:</label>
				<input type="text"
					name='productName'
					id='name'
					placeholder="product name"
					value={formData.productName}
					onChange={handleChange}
					className="w-[200px] sm:w-[400px] group-hover:w-[300px] transition-all duration-300 rounded-md
					border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800 dark:text-white"
					/>
			</div>
			<div className="py-2">
			<label htmlFor='' className='block'>Description</label>
				<input type="text"
					name='description'
					id='name'
					placeholder="description"
					value={formData.description}
					onChange={handleChange}
					className="w-[200px] sm:w-[400px] group-hover:w-[300px] transition-all duration-300 rounded-md
					border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800 dark:text-white"
					/>
			</div>
			<div className="py-2">
			<label htmlFor='' className='block'>Price:</label>
				<input type='number'
					name='price'
					id='name'
					placeholder="price"
					value={formData.price}
					onChange={handleChange}
					className="w-[200px] sm:w-[400px] group-hover:w-[300px] transition-all duration-300 rounded-md
					border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800 dark:text-white"
					/>
			</div>
			<div className="py-2">
			<label htmlFor='' className='block'>Quantity:</label>
				<input type='number'
					name='quantity'
					id='name'
					placeholder="quantity"
					value={formData.quantity}
					onChange={handleChange}
					className="w-[200px] sm:w-[400px] group-hover:w-[300px] transition-all duration-300 rounded-md
					border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800 dark:text-white"
					/>
			</div>
			<div className="py-2">
			<label htmlFor='' className='block'>Category</label>
			<select
                  className="bg-gray-600 px-2 py-2 rounded-md focus:outline-none text-white sm:w-[400px] w-[200px]"
				  name="category"
                  onChange={handleChange}
                  value={formData.category}
                >
                  {CategoryList.map((data) => (
                    <option>{data.category}</option>
                  ))}
                </select>
			</div>
			<div className="py-2">
			<label htmlFor='' className='block'>Image:</label>
				<input 
				name="imagePath"
				id="file"
				type="file"
				onChange={handleInputChange}
				className="w-[200px] sm:w-[400px] group-hover:w-[300px] transition-all duration-300 rounded-md
					border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800 dark:text-white"
				/>
			</div>
			<div className="py-2">
			<button type="submit"
                  className="px-2 py-2 mr-5  bg-blue-500 shadow-md rounded-sm hover:bg-blue-200 duration-200 transition-all"
                >
                  Add Product
                </button>
			</div>
		</form>
	   </div>
	  </div>
	  <Footer />   
    </div>
  );
}
