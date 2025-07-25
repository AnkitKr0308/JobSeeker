import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLogin,
  fetchLogout,
  fetchSignUp,
  fetchUpdatePassword,
  fetchVerifySession,
} from "../jobportal_api/authAPI";

export const verifySession = createAsyncThunk(
  "auth/verifySession",
  async () => {
    try {
      const data = await fetchVerifySession();
      return data;
    } catch (error) {
      throw new Error("Session expired");
    }
  }
);

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
  await fetchLogout;
});

export const updatePassword = createAsyncThunk(
  "auth/updatepassword",
  async (formData) => {
    const result = await fetchUpdatePassword(formData);
    return result;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    data: null,
    error: null,
    status: false,
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
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
        state.status = false;
        state.error = null;
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
        state.status = action.payload.success;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(verifySession.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifySession.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.data = action.payload;
      })
      .addCase(verifySession.rejected, (state) => {
        state.loading = false;
        state.status = false;
        state.data = null;
      });
  },
});

export default authSlice.reducer;
