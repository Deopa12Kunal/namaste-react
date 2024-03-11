import { createSlice } from "@reduxjs/toolkit";
import ItemList from "../component/ItemList";
const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        items:[],
    },
    reducers:{
        addItem:(state, action)=>{
            //mutating the state over here
            state.items.push(action.payload);
        },
        removeItem:(state, action)=>{
            state.items.pop();
        },
         clearCart:(state)=>
         {
state.items.length =0;
         },
    },

});
export  const {addItem, removeItem,clearCart}= cartSlice.actions;
export default cartSlice.reducer;