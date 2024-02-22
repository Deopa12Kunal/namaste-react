import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
const Header =()=> {
    //! To check that after change Header component is rendered again 
    //!console.log("Header rendered ")
     const [btnNameReact, setBtnNameReact]= useState("Login");
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
                <li><Link to ="/ ">Home</Link></li>
                <li>
                    <Link to ="/about">About</Link>
                </li>
                <li>
                    <Link to ="/contact">About</Link>
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