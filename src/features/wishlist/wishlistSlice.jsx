import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../utils/axios";

export const getAllWishlistAsync = createAsyncThunk(
  "wishlist/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`wishlist/69a870245630f0e4e469fc6e`);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist",
      );
    }
  },
);

export const addOrRemoveWishlistAsync = createAsyncThunk(
  "wishlist/addOrRemove",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `wishlist/69a870245630f0e4e469fc6e`,
        productId,
      );

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
      const response = await API.patch(
        `wishlist/69a870245630f0e4e469fc6e`,
        productId,
      );

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
      state.getWishlistLoading = action.payload;
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

export const { addToWishlist } = wishlistSlice.actions;
export default wishlistSlice;
