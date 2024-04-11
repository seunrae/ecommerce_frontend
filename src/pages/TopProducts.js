import React from 'react';
import Image1 from '../assets/white-shirt.png';
import Image2 from '../assets/hoddie1.png';
import Image3 from '../assets/hoodie2.png';
import { FaStar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';


const ProductsData = [
	{
		id: 1,
		img: Image1,
		title: "Casual wear",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: 2,
		img: Image2,
		title: "Casual wear",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: 3,
		img: Image3,
		title: "Casual wear",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	}

]

export default function TopProducts({handleOrderPopup}) {


  return (
	<div>
		<div className='container'>
			{/* Header section */}
			<div className='text-left mb-24'>
				<p data-aos="fade-up" className='text-sm text-tomato'>Top Rated products for you</p>
				<h1 data-aos="fade-up" className='text-3xl font-bold'>Best Products </h1>
				<p data-aos="fade-up"  className='text-xs text-gray-400'>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
			</div>
			{/* Body section */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center'>
				{
					ProductsData.map((data)=>(
						<div 
						data-aos="zoom-in"
						className='rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-tomato
						hover:text-white relative shadow-xl duration-300 group max-w-[300px]'>
							{/* image section */}
							<div>
								<img src={data.img} alt=''
								className='max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300
								drop-shadow-md
								'
								/>
							</div>
							{/* details section */}
							<div className='p-4 text-center'> 
								{/* star rating */}
								<div className='w-full flex items-center justify-center gap-1'>
								<FaStar className="text-blue-400"/>
								<FaStar className="text-blue-400"/>
								<FaStar className="text-blue-400"/>
								<FaStar className="text-blue-400"/>
								</div>
								<h1 className='text-xl'>{data.title}</h1>
								<p className='text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2'>{data.description}</p>
								<div className='mt-4'>
								<Link
								className='bg-tomato hover:scale-105 duration-300 text-white py-2  px-4 rounded-full mt-6 group-hover:bg-white group-hover:text-tomato'
								to='/all-products'
								>Order now</Link>
								</div>
							</div>
						</div>
					))
				}
			</div>
		</div>
	</div>
  )
}
