import React from 'react'
import { useContext, createContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {

  switch (action.type) {
    case "ADD":
      return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]

    case "REMOVE":
      let newArr = [...state]
      newArr.splice(action.index, 1)
      return newArr;

    case "DROP":
      let empArr = []
      return empArr;

    case "UPDATE":
      let arr = [...state]
      console.log(arr);
      arr.find((food,index ) => {
        console.log(food, action);
        if (food.id === action.id) {
          console.log('updated', action, food);
          arr[index] = { ...food, qty: (parseInt(action.qty) + food.qty), price: (action.price + food.price) } // a is the array jo abhi tk cart m prda tha and action contains the updated object's details
        }
      })

      return arr


    default:
      console.log("Error in Reducer");


  }
}

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>


  )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

