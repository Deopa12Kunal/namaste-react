import { useContext } from "react";
import {CDN_URL} from "./utils/constants";
import UserContext from "./utils/UserContext";

 const ResturantCard = (props) =>{
    const {resData} = props;
    const {loggedInUser}= useContext(UserContext);

    const {
      cloudinaryImageId,
     cuisines,
      name,
      avgRating,
      costForTwo,
      sla,
      availability,
    } = resData?.info || {};
     return (
      <div className="p-4 m-1 w-[240px] bg-slate-100 rounded-xl hover:bg-slate-500" >
         <img 
         className="rounded-xl"
         alt="res-logo"
       src=
       {CDN_URL + cloudinaryImageId}
        />
    {/* <h3>{cuisines.join(" ,")}</h3> */}
    <h3 className="font-bold py-3 text-xl">{name}</h3>
      {cuisines && Array.isArray(cuisines) && cuisines.length > 0 ? (
        <h3>{cuisines.join(", ")}</h3>
      ) : (
        <h3>No cuisines available</h3>
      )}
    <h3>Rating:-{avgRating}</h3>
    <h3>{costForTwo}</h3>
    {/* <h3>Delivery-Time :-{sla.deliveryTime}</h3> */}
    {sla && sla.deliveryTime && (
                <h3>Delivery Time: {sla.deliveryTime}</h3>
            )}
    {/* <h3>{availability.nextCloseTime}</h3> */}
    {availability && availability.nextCloseTime && (
                <h3>Next Close Time: {availability.nextCloseTime}</h3>
            )}
                            <h3>User: {loggedInUser}</h3>

      </div>
     );  
 };

  // higher order component 
// !take input as => RestaurantCard => and output as promotedRestaurantCard
export const WithPromotedLabel =(RestaurantCard)=>{
  return(props)=>{
    return (
      <div>
      <div className="absolute bg-green-200 h-9 rounded-bl-lg rounded-tl-lg w-4 "></div>
        <label 
        className="absolute bg-green-200 text-black w-24 p-0.5 rounded-sm rounded-tl-sm items-center justify-center flex shadow-lg shadow-green-400/40">
          Open
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
export default ResturantCard;
