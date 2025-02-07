import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { resInfo, error, loading } = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(0);

  // Show shimmer while loading
  if (loading || resInfo === null) {
    return <Shimmer />;
  }

  // Show error if any
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Safely access the restaurant info
  const cards = resInfo?.cards || [];

  // Find the card containing restaurant info
  const restaurantCard = cards.find((card) => card?.card?.card?.info != null)
    ?.card?.card?.info;

  // Find the card containing menu categories
  const menuCard = cards.find(
    (card) => card?.groupedCard?.cardGroupMap?.REGULAR != null
  );

  // If we can't find the required data, show an error
  if (!restaurantCard || !menuCard) {
    return (
      <div className="text-center text-red-500">
        Unable to load restaurant data
      </div>
    );
  }

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
  } = restaurantCard;

  // Get categories from the menu card
  const categories =
    menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  return (
    <div className="text-center">
      <h1 className="font-bold my-5 text-2xl">{name}</h1>
      <p className="font-bold">
        {cuisines?.join(", ")} : {areaName} {city}
      </p>

      {/* Categories */}
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card.title}
            data={category?.card?.card}
            showItems={index === showIndex}
            setShowIndex={() =>
              setShowIndex(index === showIndex ? null : index)
            }
          />
        ))
      ) : (
        <p className="text-gray-500 mt-4">No menu categories available</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
