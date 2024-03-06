import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header =()=> {
    //! To check that after change Header component is rendered again 
    //!console.log("Header rendered ")
     const [btnNameReact, setBtnNameReact]= useState("login");
     const onlineStatus = useOnlineStatus();
    return(
        <div className="flex justify-between bg-orange-300">
            <div className="logo-container">
                <img
                className="w-40"
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
                <li className="px-4">Cart</li>
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
            </ul>
        </div>
        </div>
    );
};
export default Header;