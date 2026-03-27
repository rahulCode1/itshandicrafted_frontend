import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../../utils/axios";

export const fetchUserAddressAsync = createAsyncThunk(
  "address/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await privateApi.get(`/address/getAllAddress`);

       
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user address.",
      );
    }
  },
);

export const addNewAddressAsync = createAsyncThunk(
  "address/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await privateApi.post(`/address/new`, data);
      // console.log(res.data);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add new address.",
      );
    }
  },
);

export const removeUserAddressAsync = createAsyncThunk(
  "address/remove",
  async (addressId, { rejectWithValue }) => {
    try {
      const res = await privateApi.delete(`/address/${addressId}`);

      // console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user address.",
      );
    }
  },
);

export const updateAddressAsync = createAsyncThunk(
  "address/edit",
  async (data, { rejectWithValue }) => {
    try {
      const res = await privateApi.patch(`/address/update/${data.addressId}`, data);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user address",
      );
    }
  },
);

export const setDefaultAddressAsync = createAsyncThunk(
  "address/setDefault",
  async (addressId, { rejectWithValue }) => {
    try {
      const res = await privateApi.patch(`/address/update/${addressId}/default`);
      // console.log(res.data);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to set default address",
      );
    }
  },
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
    status: "idle",
    fetchUserAddressLoading: "idle",
    addNewAddressLoading: "idle",
    removeAddressLoading: "idle",
    updateAddressLoading: "idle",
    setDefaultAddressLoading: "idle",
    
    error: null,
    
  },

  reducers: {
    clearError: (state)=>{
      state.error = null 
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAddressAsync.pending, (state) => {
      state.fetchUserAddressLoading = "loading";
    });

    builder.addCase(fetchUserAddressAsync.fulfilled, (state, action) => {
      state.address = action.payload?.address;
      state.fetchUserAddressLoading = "success";
    });

    builder.addCase(fetchUserAddressAsync.rejected, (state, action) => {
      state.fetchUserAddressLoading = "error";
      state.error = null;
    });

    builder.addCase(addNewAddressAsync.pending, (state) => {
      state.addNewAddressLoading = "loading";
    });

    builder.addCase(addNewAddressAsync.fulfilled, (state, action) => {
      state.address.push(action.payload?.address);
      state.addNewAddressLoading = "success";
    });

    builder.addCase(addNewAddressAsync.rejected, (state, action) => {
      state.addNewAddressLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(removeUserAddressAsync.pending, (state) => {
      state.removeAddressLoading = "loading";
    });

    builder.addCase(removeUserAddressAsync.fulfilled, (state, action) => {
      const addressIndex = state.address.findIndex(
        (address) => address.id === action.payload?.addressId,
      );

      state.address.splice(addressIndex, 1);
      state.removeAddressLoading = "success";
    });

    builder.addCase(removeUserAddressAsync.rejected, (state, action) => {
      state.removeAddressLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(updateAddressAsync.pending, (state) => {
      state.updateAddressLoading = "loading";
    });

    builder.addCase(updateAddressAsync.fulfilled, (state, action) => {
      const addressIndex = state.address.findIndex(
        (address) => address.id === action.payload?.address?.id,
      );

      state.address[addressIndex] = action.payload?.address;
      state.updateAddressLoading = "success";
    });

    builder.addCase(updateAddressAsync.rejected, (state, action) => {
      state.updateAddressLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(setDefaultAddressAsync.pending, (state) => {
      state.setDefaultAddressLoading = "loading";
    });

    builder.addCase(setDefaultAddressAsync.fulfilled, (state, action) => {
      const findDefaultAddress = state.address.find(
        (address) => address.isDefault === true,
      );

      if (findDefaultAddress) {
        findDefaultAddress.isDefault = false;
        const addressIndex = state.address.findIndex(
          (address) => address.id === action.payload?.address?.id,
        );
          state.address[addressIndex].isDefault = true;
      } else {
        const addressIndex = state.address.findIndex(
          (address) => address.id === action.payload?.address?.id,
        );

        state.address[addressIndex].isDefault = true;
      }
      state.setDefaultAddressLoading = "success";
    });

    builder.addCase(setDefaultAddressAsync.rejected, (state, action) => {
      state.setDefaultAddressLoading = "error";
      state.error = action.payload;
    });
  },
});


export const { clearError } = addressSlice.actions
export default addressSlice;
