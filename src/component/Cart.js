import React from 'react';
import { useDispatch, useSelector} from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";
//  import { UseDispatch } from "react-redux";


const Cart = ()=>{
  const cartItems = useSelector((store)=>store.cart.items);

     const dispatch = useDispatch();
      const handleClearCart =()=>{
        dispatch(clearCart());
      };
    return(
                <div className="text-center m-4 p-4"> 
                <h1 className="text-2xl font-bold">Cart</h1>
                <div className="w-7/12 m-auto ">
                <button className="p-2 m-2 text-white bg-black rounded-xl"
                onClick={handleClearCart}
                >
                  Clear Cart
                </button>
                {cartItems.length === 0 && (
                    <h1>Your Cart Is Currently Empty</h1>
                    
                )}
                <ItemList items={cartItems} />
               </div>       
            </div> 
    );
};
 export default Cart;