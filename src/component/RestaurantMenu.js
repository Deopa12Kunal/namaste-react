import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";
const RestaurantMenu = () => {

     const[resInfo, setResInfo]= useState(null);
     const { resId } = useParams();
      console.log(resId);
     useEffect(()=>{
        fetchMenu();
     },[]);

      const fetchMenu = async()=>{
         try{
         const data = await fetch(MENU_API+ resId);
          const json = await data.json();
           console.log(json);
           setResInfo(json.data);
         }catch (error) {
            console.error("Error fetching menu:", error);
          }
      };

  if (resInfo === null) 
  return <Shimmer />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    areaName,
    sla,
    totalRatingsString,
    feeDetails,
  } = resInfo?.cards?.card?.card?.info || {};


  const { itemCards } =
  // resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(
  //   (card) => card?.card?.card?.itemCards
  (resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card) || {};    
  console.log(itemCards);

return(
    <div className="menu">
        <h1>Menu</h1>
        <ul>
            {/* using Map function to itterate over item cards */}
            {itemCards?.map((item=>(
            <li key = {item?.card?.info?.id}>
              {item.card.info.name} -{"Rs-"}
            {item.card.info.price /10}
            
            </li>
           ) ))}
        </ul>   
    </div>
)

  
};

export default RestaurantMenu;