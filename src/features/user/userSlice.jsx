import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../utils/axios";

export const sentOtpAsync = createAsyncThunk(
  "user/sent-otp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post(`/user/send-otp`, data);

      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send otp.",
      );
    }
  },
);

export const reSentOtpAsync = createAsyncThunk(
  "user/resend-otp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/user/resend-otp`, data);

      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend otp.",
      );
    }
  },
);

export const verifyOtpAsync = createAsyncThunk(
  "user/verify-otp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/user/verify-otp`, data);

      // console.log(res.data);
      const token = res.data?.token;
      const userId = res.data?.user?.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify otp.",
      );
    }
  },
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      name: "",
      phoneNumber: "",
      userId: "",
    },

    sentOtpLoading: "idle",
    verifyOtpLoading: "idle",
    resendOtpLoading: "idle",
    isOtpSent: false,
    state: "idle",
    error: null,
  },
  reducers: {
    setIsOtpSent: (state) => {
      state.isOtpSent = false;
    },

    clearError: (state)=>{
      state.error = null 
    }
  
  },
  extraReducers: (builder) => {
    builder.addCase(sentOtpAsync.pending, (state) => {
      state.sentOtpLoading = "loading";
    });

    builder.addCase(sentOtpAsync.fulfilled, (state) => {
      state.sentOtpLoading = "success";
      state.isOtpSent = true;
    });

    builder.addCase(sentOtpAsync.rejected, (state, action) => {
      state.sentOtpLoading = "error";
      state.error = action.payload;
    });

    builder.addCase(reSentOtpAsync.pending, (state) => {
      state.resendOtpLoading = "loading";
    });

    builder.addCase(reSentOtpAsync.fulfilled, (state) => {
      state.resendOtpLoading = "success";
    });

    builder.addCase(reSentOtpAsync.rejected, (state, action) => {
      state.resendOtpLoading = "error";
      state.error = action.payload;
    });
    builder.addCase(verifyOtpAsync.pending, (state) => {
      state.verifyOtpLoading = "loading";
    });

    builder.addCase(verifyOtpAsync.fulfilled, (state, action) => {
      state.user = action.payload?.user;
      state.verifyOtpLoading = "success";
    });

    builder.addCase(verifyOtpAsync.rejected, (state, action) => {
      state.verifyOtpLoading = "error";
      state.error = action.payload;
    });
  },
});

export const { setIsOtpSent , clearError} = userSlice.actions;
export default userSlice;
