 import {useState} from "react";
  import ItemList from "./ItemList";
  const RestaurantCategory =({data,showItems, setShowIndex})=>{   
   //  console.log(data);
   const handledCllicked =()=>{
   setShowIndex();
   };
    return (
        <div>
               {/* <div className="w-6/12 bg-gray-100 my-4 shadow-sm shadow-gray-200  px-4 py-2"> */}

         <div className="w-6/12 mx-auto my-4 bg-gray-100 shadow-lg px-4 py-2">
            <div className="flex justify-between cursor-pointer "onClick={handledCllicked}>
            <span className="font-bold text-xl">
               {data.title}({data.itemCards.length})
               </span>
            <span>🔽</span>
            </div>  
            { showItems && <ItemList items ={data.itemCards}/>}
            

         </div>     
    </div>
    );
 };
    export default RestaurantCategory; 