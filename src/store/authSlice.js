import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  fetchLogin,
  fetchLogout,
  fetchSignUp,
  fetchUpdatePassword,
  fetchVerifySession,
} from "../jobportal_api/authAPI";

// Load token and user from localStorage on init
const savedToken = localStorage.getItem("jwt_token");
const savedUser = localStorage.getItem("user");

export const verifySession = createAsyncThunk(
  "auth/verifySession",
  async () => {
    const response = await fetchVerifySession();
    if (response.success && response.result) {
      return response.result;
    }
    return null;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }) => {
    const response = await fetchLogin(username, password);
    return response;
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData) => {
    const response = await fetchSignUp(formData);
    if (response && response.success) {
      return { success: true, data: response };
    }
    return { success: false };
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await fetchLogout();
});

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (formData) => {
    const result = await fetchUpdatePassword(formData);
    return result;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: savedToken || null,
    data: savedUser ? JSON.parse(savedUser) : null,
    status: !!savedUser,
    error: null,
  },
  reducers: {
    setAuthFromStorage: (state, action) => {
      state.token = action.payload.token;
      state.data = action.payload.user;
      state.status = true;
      state.error = null;
    },
    clearAuth: (state) => {
      state.token = null;
      state.data = null;
      state.status = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success && action.payload.data?.userId) {
          state.data = action.payload.data;
          state.status = true;
          state.token = localStorage.getItem("jwt_token");
          localStorage.setItem("user", JSON.stringify(action.payload.data));
        } else {
          state.data = null;
          state.status = false;
          state.token = null;
          state.error = action.payload?.message || "Login failed";
          localStorage.removeItem("user");
          localStorage.removeItem("jwt_token");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success && action.payload.data?.userId) {
          state.data = action.payload.data;
          state.status = true;
          localStorage.setItem("user", JSON.stringify(action.payload.data));
        } else {
          state.data = null;
          state.status = false;
          localStorage.removeItem("user");
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        localStorage.removeItem("user");
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        localStorage.removeItem("user");
        localStorage.removeItem("jwt_token");
        state.loading = false;
        state.data = null;
        state.status = false;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE PASSWORD
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // VERIFY SESSION
      .addCase(verifySession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySession.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload;

        if (!user) {
          // Clear user data if session invalid or expired
          state.status = false;
          state.data = null;
          state.token = null;
          localStorage.removeItem("user");
          localStorage.removeItem("jwt_token");
          return;
        }

        const currentUser = current(state.data);
        const isSameUser =
          currentUser?.userId === user.userId &&
          currentUser?.name === user.name &&
          currentUser?.role === user.role;

        if (!isSameUser) {
          state.data = user;
          state.status = true;
          localStorage.setItem("user", JSON.stringify(user));
        }
      })
      .addCase(verifySession.rejected, (state) => {
        state.loading = false;
        state.status = false;
        state.data = null;
        state.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("jwt_token");
      });
  },
});

export const { setAuthFromStorage, clearAuth } = authSlice.actions;
export default authSlice.reducer;
