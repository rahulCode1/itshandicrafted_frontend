import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../utils/axios";

export const addToCartAsync = createAsyncThunk(
  "cart/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post(`cart/69a870245630f0e4e469fc6e`, data);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add cart.",
      );
    }
  },
);

export const getAllCartAsync = createAsyncThunk(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`cart/69a870245630f0e4e469fc6e`);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart",
      );
    }
  },
);

export const increaseCartQuantityAsync = createAsyncThunk(
  "cart/increase",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await API.patch(`cart/69a870245630f0e4e469fc6e`, {
        productId,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to increase quantity.",
      );
    }
  },
);

export const decreaseCartQuantityAsync = createAsyncThunk(
  "cart/decrease",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        `cart/decrease/69a870245630f0e4e469fc6e`,
        {
          productId,
        },
      );

      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to decrease quantity.",
      );
    }
  },
);

export const removeFromCartAsync = createAsyncThunk(
  "cart/remove",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await API.patch(`cart/remove/69a870245630f0e4e469fc6e`, {
        productId,
      });

      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart.",
      );
    }
  },
);

export const moveToWishlistAsync = createAsyncThunk(
  "cart/moveToWishlist",
  async (productId, { rejectWithValue }) => {
    // console.log(productId)
    try {
      const response = await API.patch(
        `cart/moveto_wishlist/69a870245630f0e4e469fc6e`,
        productId,
      );

      // console.log(response.data);

      return response.data;
    } catch (error) {
      rejectWithValue(
        error.response?.data?.message || "Failed to move to wishlist.",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],

    status: "idle",
    getCartsLoading: "idle",
    addTocartLoading: "idle",
    increaseQuantityLoading: "idle",
    decreaseQuantityLoading: "idle",
    removeFromCartLoading: "idle",
    moveToWishlistLoading: "idle",
    error: null,
  },

  reducers: {
    addToCart: (state, action) => {
      const productIndex = state.cart.findIndex(
        (cart) => cart.id === action.payload.id,
      );

      if (productIndex === -1) {
        state.cart.push(action.payload);
      } else {
        state.cart[productIndex].quantity += 1;
      }
    },

    emptyCartToPlaceOrder: (state, action)=>{
      state.cart = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCartAsync.pending, (state) => {
      state.getCartsLoading = "loading";
    });

    builder.addCase(getAllCartAsync.fulfilled, (state, action) => {
      const transformedCart = action.payload?.carts.map((cart) => ({
        ...cart.product,
        quantity: cart.quantity,
      }));

      state.getCartsLoading = "success";
      state.cart = transformedCart;
    });

    builder.addCase(getAllCartAsync.rejected, (state, action) => {
      state.getCartsLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(addToCartAsync.pending, (state) => {
      state.addTocartLoading = "loading";
    });

    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.addTocartLoading = "success";
      const productId = action.payload?.cart?.product?.id;

      const cartIndex = state.cart.findIndex(
        (product) => product.id === productId,
      );

      if (cartIndex > -1) {
        state.cart[cartIndex].quantity += 1;
      } else {
        state.cart.push({
          ...action.payload.cart.product,
          quantity: action.payload.cart.quantity,
        });
      }
    });

    builder.addCase(addToCartAsync.rejected, (state, action) => {
      state.addTocartLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(increaseCartQuantityAsync.pending, (state) => {
      state.increaseQuantityLoading = "loading";
    });
    builder.addCase(increaseCartQuantityAsync.fulfilled, (state, action) => {
      state.increaseQuantityLoading = "success";
      const cartIndex = state.cart.findIndex(
        (product) => product.id === action.payload.productId,
      );

      state.cart[cartIndex].quantity += 1;
    });

    builder.addCase(increaseCartQuantityAsync.rejected, (state, action) => {
      state.increaseQuantityLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(decreaseCartQuantityAsync.pending, (state) => {
      state.decreaseQuantityLoading = "loading";
    });

    builder.addCase(decreaseCartQuantityAsync.fulfilled, (state, action) => {
      const cartIndex = state.cart.findIndex(
        (cart) => cart.id === action.payload.productId,
      );

      if (cartIndex === -1) return;

      const productQuantity = state.cart[cartIndex].quantity;

      if (productQuantity !== 1) {
        state.cart[cartIndex].quantity -= 1;
      } else {
        state.cart.splice(cartIndex, 1);
      }

      state.decreaseQuantityLoading = "success";
    });

    builder.addCase(decreaseCartQuantityAsync.rejected, (state, action) => {
      state.decreaseQuantityLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(removeFromCartAsync.pending, (state) => {
      state.removeFromCartLoading = "loading";
    });

    builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
      const cartIndex = state.cart.findIndex(
        (cart) => cart.id === action.payload.productId,
      );

      if (cartIndex === -1) return;
      state.cart.splice(cartIndex, 1);
      state.removeFromCartLoading = "success";
    });

    builder.addCase(removeFromCartAsync.rejected, (state, action) => {
      state.decreaseQuantityLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(moveToWishlistAsync.pending, (state) => {
      state.moveToWishlistLoading = "loading";
    });

    builder.addCase(moveToWishlistAsync.fulfilled, (state, action) => {
      const productId = action.payload.productId;
      const productIndex = state.cart.findIndex(
        (cart) => cart.id === productId,
      );
      state.cart.splice(productIndex, 1);
      state.moveToWishlistLoading = "success";
    });

    builder.addCase(moveToWishlistAsync.rejected, (state, action) => {
      state.moveToWishlistLoading = "error";
      state.error = action.payload;
    });
  },
});

export const { addToCart , emptyCartToPlaceOrder} = cartSlice.actions;
export default cartSlice;
