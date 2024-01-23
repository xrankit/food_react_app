import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import axios from 'axios';

const Contact = () => {
  const nav = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !email || !query) {
      alert('Please fill in all fields.');
      return;
    }
    const data = {
      name: name,
      email: email,
      query: query,
    };
    alert('Thank You for Contacting Us. We will reach back to you soon.');
    nav("/");

    try {
      const response = await axios.post('https://food-app-mern.onrender.com/api/contactus', data);

      console.log('Data saved successfully:', response.data);

      setName('');
      setEmail('');
      setQuery('');
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-4">
                We would love to hear from you! If you have any questions, feedback, or suggestions, please feel free to
                contact us using the information below. Our dedicated support team is here to assist you.
              </p>
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>

                <span className="text-gray-700">123 Churchgate, Mumbai, India</span>
              </div>

              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="text-gray-700">+91 12323 67880</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>

                <span className="text-gray-700">vaghasiyayashvi@gmail.com</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="text-gray-700 text-sm font-bold mb-1 flex" htmlFor="name">
                    Name:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-gray-700 text-sm font-bold mb-1 flex" htmlFor="email">
                    Email:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-gray-700 text-sm font-bold mb-1 flex" htmlFor="message">
                    Message:
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Enter your message"
                    value={query}
                    onChange={handleMessageChange}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
      <Footer />
      </div>
    </>
  );
};

export default Contact;
