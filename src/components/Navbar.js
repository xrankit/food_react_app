import React from 'react';
import { useState,useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from './ContextReducer';

export default function Navbar() {
  let data = useCart();
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Authtoken");
    nav("/Login");
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  }

  return (
    <div>
      <nav className="bg-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-white font-semibold text-lg">Food App</h1>
              </div>
              <div className={isSmallScreen ? 'hidden ' : 'ml-10'}>
                <div className="flex items-baseline space-x-4">
                  <Link to="/" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                  <Link to="/Aboutus" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">AboutUs</Link>
                  <Link to="/Contact" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                  {(localStorage.getItem("Authtoken")) ?
                    <Link to="/myOrder" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">MyOrders</Link>
                    : null
                  }
                </div>
              </div>
              <div className="md:hidden ml-auto">
                <button
                  className="text-white hover:text-gray-200 focus:outline-none absolute top-4 right-4"
                  onClick={toggleMenu}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {!(localStorage.getItem("Authtoken")) ? (
              <div className={isSmallScreen ? 'hidden ' : 'md:block ml-4'}>
             
                <Link
                  to="/Login"
                  className="inline-block text-sm px-4 py-2  leading-none border rounded text-white border-white hover:border-transparent hover:text-red-500 hover:bg-white mt-4 mr-2 md:mt-0"
                >
                  Log In
                </Link>
                <Link
                  to="/Signup"
                  className="inline-block text-sm px-4 py-2  leading-none border rounded text-white border-white hover:border-transparent hover:text-red-500 hover:bg-white mt-4 md:mt-0  "

                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className={isSmallScreen ? 'hidden ' : ' md:flex items-center space-x-2'}>
            
                <div
                  className="flex items-center text-md px-2  py-1 leading-none border rounded border-white hover:border-transparent text-red-500 bg-white"
                  onClick={() => {
                    nav("/Cart");
                  }}
                >
                  My Cart
                  {data.length === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  ) : (
                    <span className="ml-1 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium px-1 bg-red-500 text-white">
                      {data.length}
                    </span>
                  )}
                </div>
                <div
                  className="flex items-center text-md px-5 py-2 leading-none border rounded border-white hover:border-transparent text-red-500 bg-white"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* //For medium size screen navbar */}
      {isMenuOpen && (
        <div className=" md:hidden">
          <div className="flex flex-col space-y-2 px-4 py-3 bg-red-500">
            <Link
              to="/"
              className="text-white hover:text-gray-200 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/Aboutus"
              className="text-white hover:text-gray-200 py-2 rounded-md text-sm font-medium"
            >
              AboutUs
            </Link>
            <Link
              to="/Contact"
              className="text-white hover:text-gray-200 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
            {localStorage.getItem("Authtoken") && (
              <Link
                to="/myOrder"
                className="text-white hover:text-gray-200 py-2 rounded-md text-sm font-medium"
              >
                MyOrders
              </Link>
            )}
            {localStorage.getItem("Authtoken") ? (
              <div className=" md:flex items-center space-x-2">
                <div
                  className="text-white hover:text-gray-200 py-2 rounded-md text-sm font-medium"
                  onClick={() => {
                    nav("/Cart");
                  }}
                >
                  My Cart
                  {data.length === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 inline-flex"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  ) : (
                    <span className="ml-1 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium px-1 bg-white text-red-500">
                      {data.length}
                    </span>
                  )}
                </div>
                <div
                  className="text-white hover:text-gray-200 py-2 rounded-md text-sm font-medium"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div >
                <Link
                  to="/Login"
                  className="text-white hover:text-gray-200 py-2 rounded-md text-sm font-medium "
                >
                  Log In
                </Link>
                <div className="mt-2">
                <Link
                  to="/Signup"
                  className="text-white hover:text-gray-200 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
