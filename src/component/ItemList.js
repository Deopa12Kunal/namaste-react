import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
 import { addItem } from "../utils/cartSlice";

const ItemList = ({ items, dummy }) => {
    // console.log(items); 
     const dispatch  = useDispatch();
     const handleAddItem = (item)=>{ 
        // dispatch an action when the user clicked on the button
        dispatch(addItem(item));
     }

    return (
        <div>
            {items.map((item) => (
                <div key={item.card.info.id} className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between">
                    <div className="w-9/12">
                        <div className="py-3">
                            <span className="font-bold text-lg">{item.card.info.name}</span>
                            <span> - ₹ {item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100}</span>
                        </div>
                        <p className="text-xs">{item.card.info.description}</p>
                    </div>
                    <div className="w-3/12 p-1">
                        <div className="absolute">
                            <button className="px-3 py-0.5 rounded-md bg-white text-black hover:border-2 hover:border-black "
                            //TODO: here we will pass the original items present in restaurant card
                            onClick={()=>handleAddItem(item)}
                            >
                                Add +
                            </button>
                        </div>
                        <img src={CDN_URL + item.card.info.imageId} className="w-full" alt={item.card.info.name} />

                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemList;
