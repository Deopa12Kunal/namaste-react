import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
const RestaurantMenu = () => {

    //  const[resInfo, setResInfo]= useState(null);
     const { resId } = useParams();
     const resInfo =useRestaurantMenu(resId);
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
    totalRatingsString,
    feeDetails,
  } = (resInfo?.cards?.[0]?.card?.card?.info) || {};
  const{itemCards} = (resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card) || {};
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