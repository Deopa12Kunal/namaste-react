import {CDN_URL} from "./utils/constants";
 const ResturantCrad = (props) =>{
    const {resData} = props;
    const {
      cloudinaryImageId,
     cuisines,
      name,
      avgRating,
      costForTwo,
      sla,
      availability,
    } = resData?.info || {};
     return (
      <div className="res-card" >
         <img className="res-logo"
         alt="res-logo"
       src={CDN_URL + cloudinaryImageId}
        />
    {/* <h3>{cuisines.join(" ,")}</h3> */}
    <h3>{name}</h3>
      {cuisines && Array.isArray(cuisines) && cuisines.length > 0 ? (
        <h3>{cuisines.join(", ")}</h3>
      ) : (
        <h3>No cuisines available</h3>
      )}
    <h3>Rating:-{avgRating}</h3>
    <h3>{costForTwo}</h3>
    <h3>Delivery-Time :-{sla.deliveryTime}</h3>
    <h3>{availability.nextCloseTime}</h3>
      </div>
     );

 };
 export default ResturantCrad;
