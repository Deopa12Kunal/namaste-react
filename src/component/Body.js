import React, { useState, useEffect } from "react";
import RestaurantCard from "../RestaurantCard";
import resList from "../utils/mockdata";
import Shimmer from "./shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
   const[searchText, setSearchText] = useState(" ");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();

      // filter all api data here acc to your need
      const filteredResturantData = json?.data?.cards?.filter(
        (card) => card?.card?.card?.id == "top_brands_for_you" 
      );

      // map all filtered data and merege into one
      let allResData = [];
      filteredResturantData.map((f) =>
        allResData.push(
          ...f?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )
      );
      setListOfRestaurant(allResData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const filterTopRatedRestaurants = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res?.info?.avgRating > 4.4
    );
    setListOfRestaurant(filteredList);
  };

  if (loading) {
return <Shimmer/>
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input type = "text" className ="search-box" 
          value={searchText}
          onChange={(e)=>{
            setSearchText(e.target.value);
          }}

          />
          <button
           onClick ={
            ()=>{
              console.log("searched text");
              const fileredrestautant=listOfRestaurants.filter((res)=>
                res.data.name.tolowerCase().includes(searchText.toLowerCase())
              
              );
              setSearchText(fileredrestautant);
            }
     }    
>
            Search</button>
        </div>
        <button 
        className="filter-btn"
         onClick={filterTopRatedRestaurants
         }>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant, index) => (
          <RestaurantCard key={index} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};
 export default Body;
