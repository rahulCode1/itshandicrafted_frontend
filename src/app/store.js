import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/product/productSlice";
import cartSlice from "../features/cart/cartSlice";
import wishlistSlice from "../features/wishlist/wishlistSlice";
import addressSlice from "../features/address/addressSlice";
import userSlice from "../features/user/userSlice";


const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        cart: cartSlice.reducer,
        wishlist: wishlistSlice.reducer,
        address: addressSlice.reducer,
        user: userSlice.reducer
    }
})

export default store 