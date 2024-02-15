import React, { useState, useEffect } from "react";
import RestaurantCard from "../RestaurantCard";
// import resList from "../utils/mockdata";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
     //! creating  another state variable for only filtered restaurants
  const [filteredRestaurants , setFilteredRestaurants]= useState([]);
   const[searchText, setSearchText] = useState(" ");

  useEffect(() => {
    fetchData();
  }, []);
//  console.log("body rendered");
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading state to true before fetching data
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      console.log(json);
 
      // filter all api data here acc to your need

      const filteredRestaurantData = json?.data?.cards?.filter(
        (card) => card?.card?.card?.id == "top_brands_for_you" 
        //!we can also add any id instead of top brands for you using (||)
      );

      // !! map all filtered data and merege into one
      let allResData = [];
      filteredRestaurantData.map((f) =>
        allResData.push(
          ...f?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )
      );
      setListOfRestaurant(allResData);
      setFilteredRestaurants(allResData);
      // setFilteredRestaurants(allResData); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Ensure loading state is set to false in case of error
    }
  };
  //! FOR TOP RATED RESTAURANT BUTTON
  const filterTopRatedRestaurants = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res?.info?.avgRating > 4.4
    );
    setFilteredRestaurants(filteredList);
  };
//!FOR FAKE CARDS USING SHIMMER
  if (loading) {
return <Shimmer/>
  }

  return (
   
        
    <div className="body">
      <div className="filter">
      
        <div className="search">
          <input 
          type = "text"
           className ="search-box" 
          value={searchText}
          onChange={(e)=>{
            setSearchText(e.target.value);
          }}
          />
          <button
           onClick ={
            ()=>{
                          //! filter the restaurant card and updrade the UI
                          const searchTextTrimmed = searchText.trim().toLowerCase();
              console.log(searchText);
              const filteredRestaurants=listOfRestaurants.filter((res)=>
                res?.info?.name.toLowerCase().includes(searchTextTrimmed)
              
              );
              setFilteredRestaurants(filteredRestaurants);
              // we are updating the list of restaurant with filtered list 
              //rather we will keep another copy of filtered list
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
        {filteredRestaurants.map((restaurant, index) => (
          <RestaurantCard key={index} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};
 export default Body;
