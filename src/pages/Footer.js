import React from 'react'
import Banner from '../assets/dark-pattern.jpg'
import FooterLogo from '../assets/shoplogo2.png'

import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from 'react-icons/fa';

const BannerImg = {
	backgroundImage: `url(${Banner})`,
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	height: "100%",
	width: "100%"
};

const FooterLinks = [
	{
		title: "Home",
		link: "/#",
	},
	{
		title: "About",
		link: "/#about",	
	},
	{
		title: "Contact",
		link: "/#contact",
	},
	{
		title: "Blog",
		link: "/#blog",
	},
];

export default function Footer() {
  return (
	<div className='text-white bg-black'>
		<div className='container'>
			<div data-aos="zoom-in"className='grid md:grid-cols-3 pb-44 pt-5 '>
				{/* company details */}
				<div className='py-8 px-4'>
					<h1 className='sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3'>
						<img src={FooterLogo} alt='' className='max-w-[50px] bg-white' />
						Shop_4l</h1>
					<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
					</p>
				</div>

				{/* footer links */}
				<div className='grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10'>
					<div>
						<div className='py-8 px-4'>
							<h1 className='sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3'>
								Important Links
							</h1>
							<ul className='flex flex-col gap-3'>
								{
									FooterLinks.map((link)=>(
										<li className='cursor-pointer hover:text-tomato hover:translate-x-1 duration-300 text-gray-200' key={link.title}>
											<span>{link.title}</span>
										</li>
									))
								}
							</ul>
						</div>
					</div>
					<div>
						<div className='py-8 px-4'>
							<h1 className='sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3'>
								Links
							</h1>
							<ul className='flex flex-col gap-3'>
								{
									FooterLinks.map((link)=>(
										<li className='cursor-pointer hover:text-tomato hover:translate-x-1 duration-300 text-gray-200' key={link.title}>
											<span>{link.title}</span>
										</li>
									))
								}
							</ul>
						</div>
					</div>
					{/* social links */}
					<div>
						<div className='flex items-center gap-3 mt-6'>
							<a href='#'>
								<FaInstagram  className='text-3xl bg-black'/>
							</a> 
							<a href='#'>
								<FaFacebook  className='text-3xl'/>
							</a>
							<a href='#'>
								<FaLinkedin  className='text-3xl'/>
							</a>
						</div>
						<div className='mt-6'>
							<div className='flex items-center gap-3 bg-black'>
								<FaLocationArrow  />
								<p>Lagos, Nigeria</p>
							</div>
							<div className='flex items-center gap-3 bg-black'>
								<FaMobileAlt />
								<p>08139904849</p>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
  )
}
