import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../../utils/axios";

export const getAllWishlistAsync = createAsyncThunk(
  "wishlist/getAllItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateApi.get(`wishlist/getAllWishlist`);

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist",
      );
    }
  },
);

export const addOrRemoveWishlistAsync = createAsyncThunk(
  "wishlist/toggle",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await privateApi.post(`wishlist/toggle`, productId);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update wishlist",
      );
    }
  },
);

export const wishlistToCartAsync = createAsyncThunk(
  "wishlist/moveToCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await privateApi.patch(`wishlist/moveToCart`, productId);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to wishlist.",
      );
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    wishlist: [],
    getWishlistLoading: "idle",
    addOrRemoveWishlistLoading: "idle",
    moveToCartLoading: "idle",
    error: null,
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },

    clearError: (state) => {
      state.error = null;
    },

    clearWishlist: (state) => {
      state.wishlist = [];
    },

    clearWishlistError: (state)=>{
      state.error = null 
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllWishlistAsync.pending, (state) => {
      state.getWishlistLoading = "loading";
    });
    builder.addCase(getAllWishlistAsync.fulfilled, (state, action) => {
      const transformWishlist = action.payload.wishlist.map((wishlist) => ({
        ...wishlist.product,
      }));
      state.wishlist = transformWishlist;
      state.getWishlistLoading = "success";
    });

    builder.addCase(getAllWishlistAsync.rejected, (state, action) => {
      state.getWishlistLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(addOrRemoveWishlistAsync.pending, (state) => {
      state.addOrRemoveWishlistLoading = "loading";
    });

    builder.addCase(addOrRemoveWishlistAsync.fulfilled, (state, action) => {
      const type = action.payload.type;

      if (type === "add") {
        state.wishlist.push(action.payload.wishlistProduct);
      } else {
        const productId = action.payload?.wishlistProduct;
        const productIndex = state.wishlist.findIndex(
          (product) => product.id === productId,
        );

        state.wishlist.splice(productIndex, 1);
      }
      state.addOrRemoveWishlistLoading = "success";
    });

    builder.addCase(addOrRemoveWishlistAsync.rejected, (state, action) => {
      state.addOrRemoveWishlistLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(wishlistToCartAsync.pending, (state) => {
      state.moveToCartLoading = "loading";
    });

    builder.addCase(wishlistToCartAsync.fulfilled, (state, action) => {
      const productId = action.payload.productId;
      const productIndex = state.wishlist.findIndex(
        (product) => product.id === productId,
      );

      state.wishlist.splice(productIndex, 1);
      state.moveToCartLoading = "success";
    });

    builder.addCase(wishlistToCartAsync.rejected, (state, action) => {
      state.moveToCartLoading = "error";
      state.error = action.payload;
    });
  },
});

export const { addToWishlist, clearError, clearWishlist , clearWishlistError} = wishlistSlice.actions;
export default wishlistSlice;
