import ResturantCrad from "../RestaurantCard";
import { useState, useEffect } from "react";
import  resList  from "../utils/mockdata";
const Body =() =>{
    const [listOfRestaurants, setListOfRestaurant]= useState(resList);
 
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async ()=> {
         const data = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
        );

        const json = await data.json();
        console.log(json);
        //  setListOfRestaurant(json?.data?.cards); 
      };
      if (listOfRestaurants.length === 0) {
        return
        <h1>Loading</h1>  ; 
      }
 
    return(
        <div className ="body">
            <div className ="filter">

                <button className="filter-btn" 
                onClick ={()=>{
                    const filteredList= listOfRestaurants.filter((res)=>res.info.avgRating > 4.4);
                    setListOfRestaurant(filteredList);
                               }}
                 >
                Top Rated Restaurants 
                </button>          
            </div> 
            <div className="res-container">  
            {
            listOfRestaurants.map(restaurant =>
            <ResturantCrad key={restaurant.info?.id} resData={restaurant}/>)
            }
</div>
</div>
    );
        };
  
export default Body;