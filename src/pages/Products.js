import React from 'react'
import Image1 from '../assets/appleImg.png'
import Image2 from '../assets/ps5.png'
import Image3 from '../assets/tvimg.png'
import Image4 from '../assets/image1.png'
import Image5 from '../assets/image2.png'
import { FaStar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'



const ProductsData = [
	{
		id: 1,
		img: Image1,
		title: "Iphone 15",
		rating: 5.0,
		color: "blue",
		aosDelay: "0"
	},
	{
		id: 2,
		img: Image2,
		title: "Play-Station 5",
		rating: 4.5,
		color: "white",
		aosDelay: "200"	
	},
	{
		id: 3,
		img: Image3,
		title: "Samsung Tv",
		rating: 4.7,
		color: "black",
		aosDelay: "400"
	},
	{
		id: 4,
		img: Image4,
		title: "Nike air 1",
		rating: 4.4,
		color: "green",
		aosDelay: "600"
	},
	{
		id: 5,
		img: Image5,
		title: "Nike air 2",
		rating: 4.5,
		color: "red",
		aosDelay: "800"
	}
]

export default function Products() {
  return (
	<div className='mt-14 mb-12'>
		<div className='container'>
			{/* Header section */}
			<div className='text-center mb-10 max-w-[600px] mx-auto'>
				<p data-aos="fade-up" className='text-sm text-tomato'>Top selling products for you</p>
				<h1 data-aos="fade-up" className='text-3xl font-bold'>Products </h1>
				<p data-aos="fade-up"  className='text-xs text-gray-400'>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
			</div>
			{/* Body section */}
			<div>
				<div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5'>
					{/* card section */}
					{ProductsData.map((data)=>(
						<div 
						data-aos="fade-up"
						data-aos-delay={data.aosDelay}
						key={data.id} className='space-y-3'>
							<img src= {data.img} alt=''
							className='h-[220px] w-[150px] object-contain rounded-md'
							/>
							<div>
								<h3 className='font-semibold'>{data.title}</h3>
								<p className='text-sm text-gray-600'>{data.color}</p>
								<div className='flex items-center gap-1'>
									<FaStar className="text-blue-400"/>
									<span>{data.rating}</span>
								</div>
							</div>
						</div>
					))}
				</div>
				{/* view all button */}
				<div className='flex justify-center'>
					<Link
					className='text-center mt-10 cursor-pointer bg-tomato text-white py-1 px-5 rounded-md' to='/all-products'
					>View all button</Link>
				</div>
			</div>
		</div>
	</div>
  )
}
