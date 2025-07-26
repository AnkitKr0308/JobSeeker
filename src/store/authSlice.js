import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  fetchLogin,
  fetchLogout,
  fetchSignUp,
  fetchUpdatePassword,
  fetchVerifySession,
} from "../jobportal_api/authAPI";

// Thunks

export const verifySession = createAsyncThunk(
  "auth/verifySession",
  async () => {
    try {
      const response = await fetchVerifySession(); // must return { success: true, result: {...} }
      if (response.success && response.result) {
        return response.result;
      }
      return null;
    } catch (error) {
      return null;
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

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData) => {
    const user = await fetchSignUp(formData);
    return user;
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

// Load from localStorage
const savedUser = localStorage.getItem("user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    data: savedUser ? JSON.parse(savedUser) : null,
    status: !!savedUser,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.success && action.payload.data?.userId) {
          state.data = action.payload.data;
          state.status = true;
          localStorage.setItem("user", JSON.stringify(action.payload.data));
        } else {
          state.data = null;
          state.status = false;
          state.error = action.payload?.message || "Login failed";
        }
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.userId) {
          state.data = action.payload;
          state.status = true;
          localStorage.setItem("user", JSON.stringify(action.payload));
        } else {
          state.data = null;
          state.status = false;
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        localStorage.removeItem("user");
        state.loading = false;
        state.data = null;
        state.status = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE PASSWORD
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
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
      })
      .addCase(verifySession.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload;

        if (!user) {
          state.status = false;
          state.data = null;
          localStorage.removeItem("user");
          return;
        }

        const currentUser = current(state.data);
        const isSameUser =
          currentUser?.userId === user.userId &&
          currentUser?.name === user.name &&
          currentUser?.role === user.role;

        console.log("Redux before update:", currentUser);
        console.log("Fetched user:", user);
        console.log("isSameUser:", isSameUser);

        if (!isSameUser) {
          state.data = user;
          state.status = true;
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          console.log("No change, skipping state update");
        }
      })
      .addCase(verifySession.rejected, (state) => {
        state.loading = false;
        state.status = false;
        state.data = null;
        localStorage.removeItem("user");
      });
  },
});

export default authSlice.reducer;
