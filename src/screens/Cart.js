import React from 'react';
import axios from 'axios';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const nav = useNavigate();
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png")' }}>
        <div className="flex items-center justify-center h-full">
          <div className="m-5 text-center text-white p-5 text-4xl">The Cart is Empty!!!</div>
        </div>
      </div>
    );
  }

  console.log("Data: ", data);

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    try {
      const response = await axios.post("https://food-app-mern.onrender.com/api/orderData", {
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      });

      console.log("JSON RESPONSE:::::", response.status);
      nav("/")
      if (response.status === 200) {
        dispatch({ type: "DROP" });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png")' }}>
      <h1 className="text-white p-1 text-4xl">MY CART</h1>
      <div className="container mx-auto p-5">
        <div className="overflow-x-auto">
          <table className="table-fixed w-full border-collapse border border-red-500 m-2">
            <thead className="text-red-500 text-lg">
              <tr>
                <th className="border border-red-500 bg-white text-red">No.</th>
                <th className="border border-red-500 bg-white text-red">Name</th>
                <th className="border border-red-500 bg-white text-red">Quantity</th>
                <th className="border border-red-500 bg-white text-red">Option</th>
                <th className="border border-red-500 bg-white text-red">Amount</th>
                <th className="border border-red-500 bg-white text-red">Remove</th>
              </tr>
            </thead>
            <tbody className="max-h-40vh overflow-y-auto">
              {data.map((food, index) => (
                <tr key={index} className="border border-red-500 transition duration-300 ease-in-out hover:shadow-md">
                  <td className="border border-red-500 bg-white text-red">{index + 1}</td>
                  <td className="border border-red-500 bg-white text-red">{food.name}</td>
                  <td className="border border-red-500 bg-white text-red">{food.qty}</td>
                  <td className="border border-red-500 bg-white text-red">{food.size}</td>
                  <td className="border border-red-500 bg-white text-red">{food.price}</td>
                  <td className="border border-red-500 bg-white text-red">
                    <button
                      type="button"
                      className="p-0"
                      onClick={() => {
                        dispatch({ type: 'REMOVE', index: index });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h1 className="text-2xl m-4 text-white">Total Price: {totalPrice} /-</h1>
        </div>

        <div className="flex justify-center mt-5">
          <button className="bg-red-500 text-white rounded p-3" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
