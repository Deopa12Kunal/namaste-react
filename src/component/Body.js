import React, { useState, useEffect } from "react";
import RestaurantCard from "../RestaurantCard";
import resList from "../utils/mockdata";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurant] = useState(resList);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      console.log(json);
      // setListOfRestaurant(json?.data?.cards.map((card) => card));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const filterTopRatedRestaurants = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4.4
    );
    setListOfRestaurant(filteredList);
  };

  if (loading) {
    return <h1>Loading.....</h1>;
  }

  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={filterTopRatedRestaurants}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
     
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info?.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
