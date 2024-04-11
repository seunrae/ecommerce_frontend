import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { FaCaretDown, FaCartShopping, FaStar } from "react-icons/fa6";
import img from "../assets/tvimg.png";
import Footer from "./Footer";
import { IoMdSearch } from "react-icons/io";
import Logo from "../assets/shoplogo2.png";
import DarkMode from "../layout/DarkMode";
import { Link, useNavigate, useParams } from "react-router-dom";
const product = require("../layout/Navbar");

// const logOut = ()=>{
//   localStorage.removeItem('token');
// }
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

const fieldList = [
  {
    id: 1,
    field: "PRODUCTNAME",
    value: "productName",
  },
  {
    id: 2,
    field: "CATEGORY",
    value: "category",
  },
  {
    id: 3,
    field: "PRICE",
    value: "price",
  },
  {
    id: 4,
    field: "QUANTITY",
    value: "quantity",
  },
];

export default function AllProducts() {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [category, setCategory] = useState("CATEGORY");
  const [field, setField] = useState("SELECT FIELD");
  const [searchInput, setSearchInput] = useState();
  const [priceRange, setPriceRange] = useState({
    lowest: 0,
    highest: 0,
  });
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem('role');

  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(0);
  // const [pageNumbers, setPageNumbers] = useState([]);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const npage = Math.ceil(size / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)
 




  const getProducts = async () => {
    try{
      const result = await axios.get(
        `http://localhost:8081/api/v1/product/get-all-products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSize(result.data.length)
      paginate()
      console.log(result.data);
      // setProducts(result.data);
      // console.log(products);
    }catch(err){
      console.log(err);
    }
  };

  const logOut = ()=>{
		localStorage.removeItem('token');
		navigate('/login')
	  }

  const paginate = async ()=>{
    
    try{
      const result = await axios.get(
        `http://localhost:8081/api/v1/product/pagination/${currentPage}/${recordsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(result.data);
      setProducts(result.data);
    }catch(err){
      console.log(err);
    }
  }

  const prePage = ()=>{
    if (currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }

  }
  const changePage = (id)=>{
    setCurrentPage(id)
  }
  const nextPage = ()=>{
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleChange = (e, name) => {
    return setCategory(e.target.value)
      ? name == "category"
      : setField(e.target.value);
  };

  const handleInputChange = (e, name) => {

    return setPriceRange({ ...priceRange, [e.target.name]: e.target.value })
    ? name == "price" : setSearchInput(e.target.value);
  };

  const filterCategory = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/product/search-category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            name: category,
          },
        }
      );
      console.log(result.data);
      setProducts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterField = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/product/search-field",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            field,
          },
        }
      );
      console.log(result.data);
      setProducts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterPrice = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/product/search-price-range",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            lowest: priceRange.lowest,
            highest: priceRange.highest,
          },
        }
      );
      setProducts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchProducts = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/product/search-name",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            name: searchInput,
          },
        }
      );
      console.log(result.data);
      setProducts(result.data);
      product = result.data;
    } catch (err) {
      console.log(err);
    }
  };

  const gotoOrderPage = (id)=>{
    navigate(`/order-page/${id}`);
  }

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
      <div>
        <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
          {/* upper navbar */}
          <div className="bg-tomato/40 py-2 w-screen">
            <div className="container flex justify-between items-center">
              <div>
                <a
                  href="#"
                  className="font-bold text-2xl sm:text-3xl flex gap-2"
                >
                  <img src={Logo} alt="logo" className="w-10" />
                  Shop_4l
                </a>
              </div>
              {/* search bar and order button */}
              <div className="flex justify-between items-center gap-4">
                <div className="relative group hidden sm:block">
                  <input
                    type="text"
                    placeholder="search"
                    value={searchInput}
                    onChange={(e) => handleInputChange(e, "search")}
                    className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full
					border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800"
                  />
                  <IoMdSearch
                    className="text-gray-500 group-hover:text-tomato absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                    onClick={searchProducts}
                  />
                </div>
                {/* order button */}
                <button className="bg-gradient-to-r from-tomato to-neon transition-all ease-in-out duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group">
                  <span className="group-hover:block hidden transition-all duration-200">
                    Order
                  </span>
                  <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
                </button>
                {/* DarkMode Switch */}
                <div>
                  <DarkMode />
                </div>
              </div>
            </div>
          </div>
          {/* lower navbar */}
          <div data-aos="zoom-in" className="flex justify-center">
            <ul className="sm:flex hidden items-center gap-4">
              <li>
                <Link
                  to="/"
                  className="inline-block px-4 hover:text-tomato duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-products"
                  className="inline-block px-4 hover:text-tomato duration-200"
                >
                  Products
                </Link>
              </li>
              <li>
                <a
                  href=""
                  className="inline-block px-4 hover:text-tomato duration-200"
                >
                  Categories
                </a>
              </li>
              <li className="group relative cursor-pointer">
                <p className="flex items-center gap-[2px] py-2">
                  Account
                  <span>
                    <FaCaretDown className="trasition-all duration-200 group-hover:rotate-180" />
                  </span>
                </p>
                {
					role == 'BUYER' ? 
				(
				<div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md dark:bg-gray-800 dark:text-white">
					<ul>
						<li><Link to={`/view-user/${id}`} className="inline-block w-full rounded-md p-2 hover:bg-tomato/20">your account</Link></li>
						<li><Link to={`/transaction-history`} className="inline-block w-full rounded-md p-2 hover:bg-tomato/20">transaction history</Link></li>
						<li><a onClick={logOut}  className="inline-block w-full rounded-md p-2 hover:bg-tomato/20">log-out</a></li>
					</ul>
				</div>
				) 
				:
				(
					<div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md dark:bg-gray-800 dark:text-white">
						<ul>
							<li><Link to={`/view-user/${id}`} className="inline-block w-full rounded-md p-2 hover:bg-tomato/20">Your account</Link></li>
							<li><Link to={`/add-product`} className="inline-block w-full rounded-md p-2 hover:bg-tomato/20">Add product</Link></li>
							<li><Link to={`/transaction-history`} className="inline-block w-full rounded-md p-2 hover:bg-tomato/20">Your products</Link></li>
							<li><a  onClick={logOut}  className="inline-block w-full rounded-md p-2 hover:bg-tomato/20" >Log-out</a></li>
						</ul>
					</div>
				)
					}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sm:flex md:flex mt-14 mb-12 flex-row">
        <div className="sm:w-[270px] sm:h-[500px] sm:block hidden bg-white dark:bg-gray-800 rounded-xl ml-6 shadow-xl">
          <div className="my-10 mx-5 font-bold text-tomato">
            <h2>Filter products</h2>
            <hr className="border border-gray-500" />
          </div>

          <div className="flex flex-col mx-3">
            <div className="scale-90">
              <div>
                <select
                  className="bg-tomato px-2 py-2  my-2 rounded-full focus:outline-none text-white"
                  onChange={(e) => handleChange(e, "category")}
                  value={category}
                >
                  {CategoryList.map((data) => (
                    <option>{data.category}</option>
                  ))}
                </select>
                <button
                  className="px-2 py-2 mb-3 bg-gray-400 shadow-md rounded-full dark:bg-gray-600"
                  onClick={filterCategory}
                >
                  Filter by category
                </button>
              </div>
              <div>
                <select
                  className="rounded-full bg-tomato px-2 py-2 my-2 focus:outline-none text-white"
                  onChange={(e) => handleChange(e, "field")}
                  value={field}
                >
                  {fieldList.map((data) => (
                    <option value={data.value}>{data.field}</option>
                  ))}
                </select>
                <button
                  className="px-2 py-2 mb-3 bg-gray-400 shadow-md rounded-full dark:bg-gray-600"
                  onClick={filterField}
                >
                  Filter By field
                </button>
              </div>
            </div>
            <div className="scale-90">
              <div className="mx-1">
                <label htmlFor="lowest">Lowest</label>
                <input
                  type="text"
                  id="lowest"
                  name="lowest"
                  value={priceRange.lowest}
                  className="px-2 my-1 rounded-full border border-gray-300 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800"
                  placeholder="Enter amount"
                  onChange={(e) => handleInputChange(e, "price")}
                />
              </div>
              <div className="mx-1">
                <label htmlFor="highest" className="pb-1">
                  Highest
                </label>
                <input
                  type="text"
                  id="highest"
                  name="highest"
                  value={priceRange.highest}
                  className="px-2 mt-1 mb-2 rounded-full border border-gray-300 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800"
                  placeholder="Enter amount"
                  onChange={(e) => handleInputChange(e, "price")}
                />
                <button
                  className="px-2 py-2 mb-3 bg-gray-400 shadow-md rounded-full dark:bg-gray-600"
                  onClick={filterPrice}
                >
                  Filter By Price Range
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          {/* Header section */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <p data-aos="fade-up" className="text-sm text-tomato">
              Top selling products for you
            </p>
            <h1 data-aos="fade-up" className="text-3xl font-bold">
              All Products
            </h1>
            <div className="grid grid-cols-2 mb-10 sm:hidden ">
              <div className="scale-75 flex flex-col">
              <select className="m-3 rounded-full bg-tomato px-2 py-2 focus:outline-none text-white text-sm" onChange={(e) => handleChange(e, "category")}
                  value={category} >
                <option>CATEGORY</option>
                <option>GADGETS</option>
                <option>MEDICINE</option>
                <option>FASHION</option>
                <option>FOOD</option>
                <option>ENTERTAINMENT</option>
                <option>OTHER</option>
              </select>
              <button
                  className="px-2 py-2 mb-3 bg-gray-400 shadow-md rounded-full dark:bg-gray-600"
                  onClick={filterCategory}
                >
                  Filter category
                </button>
              
              </div>
              <div className="scale-75 flex flex-col">
              <select className="m-3 rounded-full bg-tomato px-2 py-2 focus:outline-none text-white text-sm "  onChange={(e) => handleChange(e, "field")}
                  value={field}>
                <option>FIELD</option>
                <option value="productName">PRODUCT NAME</option>
                <option value="category">CATEGORY</option>
                <option value="price">PRICE</option>
                <option value="quantity">QUANTITY</option>
              </select>
               <button
                  className="px-2 py-2 mb-3 bg-gray-400 shadow-md rounded-full dark:bg-gray-600"
                  onClick={filterField}
                >
                  Filter field
                </button>  
              </div>             
              

              <div className="mx-3 scale-75 flex flex-col">
                <label htmlFor="lowest" className="mx-1">
                  Lowest
                </label>
                <input
                  type="text"
                  id="lowest"
                  name="lowest"
                  value={priceRange.lowest}
                  className="px-2 mt-1 mb-3 rounded-full border border-gray-300 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800"
                  placeholder="Enter amount"
                  onChange={(e) => handleInputChange(e, "price")}
                />
                 <button
                  className="px-2 py-2 mb-3 bg-gray-400 shadow-md rounded-full dark:bg-gray-600"
                  onClick={filterPrice}
                >
                  Filter Price 
                </button>
              </div>
              <div className="mx-3 scale-75 flex flex-col">
                <label htmlFor="highest" className="mx-1">
                  Highest
                </label>
                <input
                  type="text"
                  id="highest"
                  name="highest"
                  value={priceRange.highest}
                  className="px-2 my-1 rounded-full border border-gray-300 focus:outline-none focus:border-1 focus:border-tomato dark:border-gray-500 dark:bg-gray-800"
                  placeholder="Enter amount"
                  onChange={(e) => handleInputChange(e, "price")}
                />
              </div>
            </div>
          </div>
          {/* Body section */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
            {products.map((data) => (
              <div
                data-aos="zoom-in"
                className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-tomato
						hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
              >
                {/* image section */}
                <div>
                  <img
                    src={data.imagePath}
                    alt=""
                    className="p-4 max-w-[200px] w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] block mx-auto group-hover:scale-105 duration-300
								drop-shadow-md object-contain
								"
                  />
                </div>
                {/* details section */}
                <div className="p-4 text-center">
                  {/* star rating */}
                  <div className="w-full flex items-center justify-center gap-1">
                    <FaStar className="text-blue-400" />
                    <FaStar className="text-blue-400" />
                    <FaStar className="text-blue-400" />
                    <FaStar className="text-blue-400" />
                  </div>
                  <h1 className="text-xl">{data.productName}</h1>
                  {/* <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                    {data.description}
                  </p> */}
                  <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                    N{data.price}
                  </p>
                  {/* <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                    {data.quantity}pcs
                  </p> */}
                  <div className="sm:my-2">
                  <Link
                  to={`/order-page/${data.productId}`}
                    className="bg-tomato hover:scale-105 duration-300 text-white py-1 sm:px-4 md:px-4 lg:px-4 px-2 rounded-full mt-4 group-hover:bg-white group-hover:text-tomato"
                    // onClick={handleOrderPopup}
                  >
                    Order now
                  </Link> 
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
          {/* pagination */}
          <div className="sm:scale-105 scale-75 mt-10 p-3 flex items-center justify-center">
            <div className="flex flex-row">
              <button className="w-4 h-8 border border-white  mx-3 px-6 flex items-center justify-center transiton-all duration-200 hover:border-tomato hover:bg-white hover:text-tomato" onClick={prePage}>Prev</button>
              {
              numbers.map((number, index) =>(
                 <button className={`w-4 h-8 border mx-3 px-4 flex items-center justify-center  transiton-all duration-200 hover:border-tomato${currentPage === number ? 'active: border-blue-400' : ''}`} key={index} onClick={() => changePage(number)} >{number}</button>
              ))
              }
              <button className="w-4 h-8 border  mx-3 px-6 flex items-center justify-center  border-white  transiton-all duration-200 hover:border-tomato hover:bg-white hover:text-tomato" onClick={nextPage}>Next</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
