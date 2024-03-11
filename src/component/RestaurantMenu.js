import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
const RestaurantMenu = () => {
    //  const[resInfo, setResInfo]= useState(null);
     const { resId } = useParams();
     const resInfo =useRestaurantMenu(resId);
     const [showIndex, setShowIndex] = useState(0);
    //   console.log(resId);
    //  

  if (resInfo === null) 
  return <Shimmer />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    areaName,
    sla,
    city,
    totalRatingsString,
    feeDetails,
  } = (resInfo?.cards?.[0]?.card?.card?.info) || {};
  const{itemCards} = (resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card) || {};
console.log(resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
const categories =
 resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) => c.card?.card?.["@type"]== 
'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory' );
//  console.log(categories);
return (
<div className="text-center">
<h1 className="font-bold my-5 text-2xl" >{name} </h1>
 <p className="font-bold">{cuisines.join(" ,")} : {areaName } {city}</p>
 {/* TODO: Building Accordian */}
{categories.map((category, index)=>(
<RestaurantCategory 
key={category?.card?.card.title } 
data = {category?.card?.card}
showItems={index ===showIndex}
setShowIndex={() => setShowIndex(index === showIndex ? null : index)}

/>

))}
</div>
); 
};

export default RestaurantMenu;