import { useEffect } from "react";   
//! use effect takes two arguments 1 call back function   
const RestaurantMenu = () => {
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=23846&catalog_qa=undefined&submitAction=ENTER");
                const json = await data.json();
                console.log(json);
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };

        fetchMenu();
    }, []);

    return(
        <div>
            <h1>Resataurant Menu as follows</h1>
        </div>
    )

    
}
 export default RestaurantMenu;