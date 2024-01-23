import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from './Footer';

function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    try {
      const response = await axios.post("https://food-app-mern.onrender.com/api/myorderData", {
        email: localStorage.getItem('userEmail')
      });
      const data = response.data.orderData;
      console.log("Order Data ", data);
      setOrderData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow overflow-y-auto bg-cover bg-center" style={{ backgroundImage: 'url("https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png")' }}>
          <Navbar />
          <div className="container mx-auto py-10">
            {orderData && orderData.orders && orderData.orders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {orderData.orders.map((order) => (
                  <div key={order.order_date} className="mb-8">
                    <h3 className="text-xl font-bold mb-3 text-white">{order.order_date}</h3>
                    <hr className="border-white mb-2 w-full"></hr>
                    <div className="grid grid-cols-1 gap-4">
                      {order.order_data.map((item) => (
                        <div key={item.id}>
                          <div className="card bg-white rounded shadow-md">
                            <div className="card-body">
                              <h5 className="card-title text-lg font-semibold mb-2">{item.name}</h5>
                              <div className="flex flex-wrap justify-between mb-2">
                                <span className="text-sm">{item.qty}</span>
                                <span className="text-sm">{item.size}</span>
                                <span className="text-sm">{order.order_date}</span>
                                <div className="text-lg font-semibold">
                                  ₹{item.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-white text-center mt-40">
                <p>You have not ordered anything in the past.</p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyOrder;
