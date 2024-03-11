import React, { useState, useEffect, useContext } from "react";
import RestaurantCard,{WithPromotedLabel} from "../RestaurantCard";
// import resList from "../utils/mockdata";
import Shimmer from "./Shimmer";
 import {Link} from "react-router-dom";
 import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
const Body = () => {
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
     //! creating  another state variable for only filtered restaurants
  const [filteredRestaurants , setFilteredRestaurants]= useState([]);
   const[searchText, setSearchText] = useState(" ");
 //!create a restaurant card component which has promoted label
 const RestaurantCardPromoted = WithPromotedLabel(RestaurantCard);
    // console.log(listOfRestaurants);

  useEffect(() => {
    fetchData();
  }, []);
//  console.log("body rendered");
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading state to true before fetching data
      const data = await fetch(
        "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"

        // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      console.log(json);
 
      // filter all api data here acc to your need

      const filteredRestaurantData = json?.data?.cards?.filter(
        (card) => card?.card?.card?.id == "top_brands_for_you"  
        // || card?.card?.card?.id  =="restaurant_grid_listing"

        //!we can also add any id instead of top brands for you using (||)
      );
       console.log(filteredRestaurantData);

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
  // ! adding online status
  const onlineStatus = useOnlineStatus();
  if(onlineStatus ==false)
  return (<h1>look's like you're offline pls check your internet connection</h1>);
 const {loggedInUser,setUserName} = useContext(UserContext);

//!FOR FAKE CARDS USING SHIMMER
  if (loading) {
return <Shimmer/>
  }

  return (
   
        
    <div className="body">
      <div className="filter flex">
      
        <div className="search p-4 m-4">
          <input 
          type = "text"
           className ="border border-solid  border-black" 
          value={searchText}
          onChange={(e)=>{
            setSearchText(e.target.value);
          }}
          />
          <button className="px-5  py-1 m-4 bg-cyan-300  rounded-xl"
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
        <div className="px-5  py-1 m-4 flex items-center ">
        <button 
        className=" px-5 py-2  bg-gray-500 rounded-xl" 
         onClick={filterTopRatedRestaurants
         }>
          Top Rated Restaurants
        </button>

        </div>
        <div className="px-5  py-1 m-4 flex items-center ">
          <label className="p-2">User Name </label>        
        <input className=" px-3 border border-solid  border-black cursor-pointer hover: text-xl " 
        value={loggedInUser}
        onChange={(e)=> setUserName(e.target.value)
        }
        /> 
        </div>
        
      </div>
      <div className="flex flex-wrap ">
        {
        filteredRestaurants.map((restaurant, index) => (
          <Link
          key={restaurant.info.id}
          to={"/restaurants/"+ restaurant.info.id}
          >
           {restaurant.info.isOpen ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
             )} 
            
          </Link>
        ))}
      </div>
    </div>
  );
};
 export default Body;
