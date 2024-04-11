import React from 'react'
import Image1 from '../assets/image1.png'
import Image2 from '../assets/image2.png'
import Image3 from '../assets/image3.png'
import Slider   from 'react-slick'
import { Link } from 'react-router-dom'

const ImageList = [
	{
		id: 1,
		img: Image1,
		title: "Up to 50% off on all Men's Wear",
		description: 
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	},
	{
		id: 2,
		img: Image2,
		title: "Up to 30% off on all Men's Wear",
		description: 
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
	},
	{
		id: 3,
		img: Image3,
		title: "Up to 70% off on all Men's Wear",
		description: 
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
	}
]
export default function Hero({handleOrderPopup}) {
	var settings = {
		dots: false,
		arrows:false,
		infinte: true,
		speed: 800,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		cssEase: 'ease-in-out',
		pauseOnHover: false,
		pauseOnFocus: true,
	};  
  return (
	<div className='relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center
	dark:bg-gray-950 dark:text-white duration-200'>
		{/* background pattern */}
		<div className='h-[700px] w-[700px] bg-tomato/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]'></div>
		{/* hero section */}
		<div className='container pb-8 sm:pb-0'>
			<Slider {... settings}>
			{ImageList.map((data)=>(
			<div>
			<div className='grid grid-cols-1 sm:grid-cols-2'>
				{/* text content section */}
				<div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left
				order-2 sm:order-1 relative z-10'>
					<h1 
					data-aos='zoom-out'
					data-aos-duration='500'
					data-aos-once='true'
					className='text-5xl sm:text-6xl lg:text-7xl font-bold'>{data.title}</h1>
					<p 
					data-aos='fade-up'
					data-aos-duration='500'
					data-aos-delay='100'
					className='text-sm'>
					{data.description}
					</p>
					<div 
					data-aos='fade-up'
					data-aos-duration='500'
					data-aos-delay='300'
					>
						<Link className='bg-gradient-to-r from-tomato to-neon hover:scale-105 duration-200 text-white py-2
						px-4 rounded-full'to='/all-products'>
							Order Now
						</Link>
					</div>
				</div>
				{/* image section */}
				<div className='order-1 sm:order-2'>
					<div 
					data-aos='zoom-in'
					data-aos-once='true'
					className='relative z-10'>
						<img src={data.img} alt='' className='w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto'/>
					</div>
				</div>
			</div>
		</div>	
			))}	
			</Slider>
		</div>
	</div>
  )
}
