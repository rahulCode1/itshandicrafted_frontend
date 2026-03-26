import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi, API } from "../../utils/axios";

export const addProductAsync = createAsyncThunk(
  "products/addProduct",
  async (data, { rejectWithValue }) => {
    console.log(data);

    try {
      const response = await privateApi.post(`/product/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return (
        rejectWithValue(error.response?.data?.message) ||
        "Something went wrong, Failed to add product."
      );
    }
  },
);

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/products");

      // console.log(res.data)
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products.",
      );
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle",
    fetchAllProductLoading: "idle",
    error: null,
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.products.push(action.payload.product);
    });

    builder.addCase(addProductAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchAllProductsAsync.pending, (state) => {
      state.fetchAllProductLoading = "loading";
    });

    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      state.fetchAllProductLoading = "success";
      state.products = action.payload?.products;
    });

    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      state.fetchAllProductLoading = "error";
      state.error = action.payload;
    });
  },
});

export const { clearError } = productSlice.actions;
export default productSlice;
