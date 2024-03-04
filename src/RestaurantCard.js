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
      <div className="p-4 m-1 w-[240px] bg-slate-100 rounded-xl hover:bg-slate-500" >
         <img 
         className="rounded-xl"
         alt="res-logo"
       src=
       {CDN_URL + cloudinaryImageId}
        />
    {/* <h3>{cuisines.join(" ,")}</h3> */}
    <h3 className="font-bold py-3 text-xl">{name}</h3>
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
