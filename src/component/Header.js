import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header =()=> {
    //! To check that after change Header component is rendered again 
    //!console.log("Header rendered ")
     const [btnNameReact, setBtnNameReact]= useState("Login");
     const onlineStatus = useOnlineStatus();
    return(
        <div className="header">
            <div className="logo-container">
                <img
                className="logo"
                src={LOGO_URL }
            />
        </div>
        <div className="nav-items">
            <ul>   
                <li>
                    Online Status:{onlineStatus ?"✅" :"🔴" }
                    </li>             
                <li><Link to ="/ ">Home</Link></li>
                <li>
                    <Link to ="/about">About</Link>
                </li>
                <li>
                    <Link to ="/contact">Contact</Link>
                </li>         
                <li>Cart</li>
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