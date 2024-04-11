import React from 'react'
import Banner from '../assets/pink-pattern.jpg';

const BannerImg = {
	backgroundImage: `url(${Banner})`,
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	height: "100%",
	width: "100%",
};
export default function Subscribe() {
  return (
	<div
	className='mb-20 bg-gray-100 dark:bg-gray-800 text-white'
	style={BannerImg}
	>
		<div className='container backdrop-blur-sm py-10'>
			<div className='space-y-6 max-w-xl mx-auto'>
				<h1
				className='text-2xl !text-center sm:text-left sm:text-4xl font-semibold'
				>Get notified about new products</h1>
				<input
				data-aos="fade-up"
				type='text'
				placeholder='enter your email'
				className='w-full p-3'
				/>
			</div>
		</div>
	</div>
  )
}
