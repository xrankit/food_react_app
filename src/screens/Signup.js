import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");

  const hname = (event) => { setName(event.target.value); };
  const hemail = (event) => { setEmail(event.target.value); };
  const hpass = (event) => { setPassword(event.target.value); };
  const hlocat = (event) => { setLocation(event.target.value); };

  const save = async (event) => {
    event.preventDefault();

    if (name.length <= 5) {
      alert("Name should be at least 5 characters");
      return;
    }
    if (password.length <= 6) {
      alert("Password should be at least 6 characters");
      return;
    }
    if (location.length <= 5) {
      alert("Location should be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post("https://food-app-mern.onrender.com/api/signup", {
        name,
        email,
        password,
        location,
      });

      console.log(response.data);
      setName("");
      setEmail("");
      setPassword("");
      setLocation("");

      nav("/Login");
    } catch (error) {
      console.log(error);
      alert("Email already in use");
    }
  };

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png")' }}>
      <div className="container mx-auto p-8 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md">
          <div className="px-10 py-8">
            <h2 className="text-2xl font-bold mb-4">Create Your Account</h2>

            <form onSubmit={save}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2 flex">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={hname}
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2 flex">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={hemail}
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2 flex">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={hpass}
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 font-bold mb-2 flex">
                  Address
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={hlocat}
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your address"
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Sign Up"
                  className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
