import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLogin,
  fetchSignUp,
  fetchUpdatePassword,
} from "../jobportal_api/authAPI";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }) => {
    const user = await fetchLogin(username, password);
    return user;
  }
);

export const signupUser = createAsyncThunk("auth/signup", async (formData) => {
  const user = await fetchSignUp(formData);
  return user;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
});

export const updatePassword = createAsyncThunk(
  "auth/updatepassword",
  async (formData) => {
    const result = await fetchUpdatePassword(formData);
    return result;
  }
);

const savedUser = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    data: savedUser || null,
    error: null,
    status: savedUser?.success || false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = action.payload.success;
        if (action.payload.success) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = action.payload.success;
        if (action.payload.success) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {};
        state.status = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        state.status = action.payload.success;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
