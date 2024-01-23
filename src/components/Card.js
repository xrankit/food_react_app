import React, { useRef } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Card(props) {
  const priceRef = useRef();

  
  let option = props.options;
  let priceOptions = Object.keys(option[0]);
  
  let dispatch = useDispatchCart();
  let data = useCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  let finalPrice = qty * parseInt(option[0][size]);

  const handleaddCart = async () => {

    let food = []

    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    console.log(food);


    if (food !==[]) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id:  props.foodItem._id,price: finalPrice, qty: qty })
        return
      }

      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id,name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        console.log("Size Different so simply add one more to the list")
        return
      }
      return
    }
   
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });


  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="card-container ml-4 mr-2">
      <div className="bg-white rounded overflow-hidden shadow-md relative hover:shadow-lg">
        <img src={props.foodItem.img} alt="stew" className="w-full h-35  object-fill sm:h-48 " />
        <div className="m-4">
          <span className="font-bold">{props.foodName}</span>

          <div className="container w-100">
            <select className="m-4 h-100 bg-red-500 rounded text-white" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className="m-2 h-100 bg-red-500 rounded text-white" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="inline-block h-100 text-size-5">
              Rs {finalPrice}/-
            </div>
          </div>

          <hr />

          <button className="m-4 h-100 p-1 text-red-500 hover:shadow hover:border-red-500  hover:bg-red-500 hover:text-white rounded" onClick={handleaddCart} style={{ border: '1px solid red' }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

