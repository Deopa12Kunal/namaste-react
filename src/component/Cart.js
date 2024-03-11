import { useDispatch, useSelector} from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";
 import { UseDispatch } from "react-redux";

const Cart = ()=>{
     const dispatch = useDispatch();
      const handleClearCart =()=>{
        dispatch(clearCart());
      };
     const cartItems = useSelector((store)=>store.cart.items);
    return(
                <div className="text-center m-4 p-4"> 
                <h1 className="text-2xl font-bold">Cart</h1>
                <div className="w-7/12 m-auto ">
                <button className="p-2 m-2 text-white bg-black rounded-xl"
                onClick={handleClearCart}
                >Clear Cart</button>
                {cartItems.lenght===0 && (
                    <div>
                    <img 
                    src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fuxwing.com%2Ffood-cart-icon%2F&psig=AOvVaw3yOvwA9LGK3cQM5mK9II_g&ust=1710247864431000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMDd4_Wf7IQDFQAAAAAdAAAAABAF"></img>
                <h1>Your Cart Is Currently Empty</h1>
                </div>
                )}
               < ItemList items ={cartItems}/>
               </div>       
            </div> 
    )
};
 export default Cart;