import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../utils/axios";

export const addProductAsync = createAsyncThunk(
  "products/addProduct",
  async (data, { rejectWithValue }) => {
    try {
    
      const response = await API.post(`product/add`, data, {
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

export const fetchProductAsync = createAsyncThunk("product/fetch", async(_, {rejectWithValue})=>{
  
})

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle",
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
  },
});

export const { clearError } = productSlice.actions;
export default productSlice;
