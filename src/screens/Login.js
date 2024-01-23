import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://food-app-mern.onrender.com/api/login", { email, password });
      const { success } = response.data;

      console.log("RESPONSE DATA ", response.data)
      if (success) {
        // Redirect to home page upon successful login
        localStorage.setItem("userEmail", email); 
        localStorage.setItem("Authtoken", response.data.token);
        nav("/");
      } else {
        setError("Incorrect Email or Password");
      }
    } catch (error) {
      console.log(error);
      setError("Incorrect Email or Password");
    }
  };

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png")' }}>
      <div className="container mx-auto p-8 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md">
          <div className="px-10 py-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2 flex">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2 flex">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div>
                <input
                  type="submit"
                  value="Log In"
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

export default LoginPage;
