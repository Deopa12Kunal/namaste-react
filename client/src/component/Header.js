import { LOGO_URL } from "../utils/constants";
import { useState ,useContext} from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
 import { useSelector } from "react-redux";
const Header =()=> {
    //! To check that after change Header component is rendered again 
    //!console.log("Header rendered ")
     const [btnNameReact, setBtnNameReact]= useState("login");
     const onlineStatus = useOnlineStatus();
     
     //TODO: Using UseContext inside Header
     const {loggedInUser} = useContext(UserContext);

     //subscribing to the store using selector this gives acces to which portion of our store need access
      const cartItems = useSelector((store)=> store.cart.items);
console.log(cartItems);
    return(
        <div className="flex justify-between bg-orange-200">
            <div className="logo-container">
                <img
                className="w-20"
                src={LOGO_URL }
            />
        </div>
        <div className="flex items-center">
            <ul className="flex p-4 m-4">   
                <li className="px-4">
                    Online Status:{onlineStatus ?"✅" :"🔴" }
                    </li>             
                <li className="px-4 text-base" >
                    <Link to ="/ ">Home</Link></li>
                <li className="px-4">
                    <Link to ="/about">About</Link>
                </li>
                <li className="px-4">
                    <Link to ="/contact">Contact</Link>
                </li>         

                <li className="px-4 ">
                    <Link to="/cart">Cart🛒({cartItems.length }-items)</Link>
                    </li>
                <button className="login"
                onClick={()=>
                {
                    btnNameReact === "Login"
                    ?  setBtnNameReact("Logout")
                    :setBtnNameReact("Login"); 
            }
        }
                >
{btnNameReact}
                </button>
                <li className="px-4 font-bold">{loggedInUser}</li>
            </ul>
        </div>
        </div>
    );
};
export default Header;