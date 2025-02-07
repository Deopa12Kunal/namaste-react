import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem, removeItem } from "../utils/cartSlice";

const ItemList = ({ items, showRemoveButton }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const isItemInCart = (item) => {
        return cartItems.some(cartItem => cartItem.id === item.card.info.id);
    };

    // const handleToggleItem = (item) => {
    //     if (isItemInCart(item)) {
    //         console.log("Removing item:", item.card.info.id);
    //         dispatch(removeItem({ id: item.card.info.id }));
    //     } else {
    //         console.log("Adding item:", item);
    //         dispatch(addItem({ id: item.card.info.id, ...item.card.info }));
    //     }
    // };
    const handleAction = (item) => {
        if (showRemoveButton) {
            // Remove button action
            dispatch(removeItem(item));
        } else {
            // Add button action
            dispatch(addItem(item));
        }


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
                            {/* <button className="px-3 py-0.5 rounded-md bg-white text-black hover:border-2 hover:border-black"
                                onClick={() => handleToggleItem(item)}
                            >
                                - Add +
                            </button> */}
                               <button className={`${showRemoveButton ? 'remove-button' : 'add-button'} bg-slate-200 text-black px-4 py-2 rounded-lg mx-2 hover:bg-slate-500`}
                            onClick={() => handleAction(item)}>
                            {showRemoveButton ? 'Remove' : 'Add'}
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
