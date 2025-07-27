import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProfiles, fetchUserProfile } from "../jobportal_api/userAPI";

export const userProfile = createAsyncThunk("user/profile", async (userId) => {
  const userData = await fetchUserProfile(userId);
  return userData;
});

export const profiles = createAsyncThunk("user/userprofile", async () => {
  const res = await fetchProfiles();
  return res;
});

// const savedUser = JSON.parse(localStorage.getItem("userData"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    loading: false,
    error: null,
    status: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.profiledata || {};
        state.status = action.payload.success;
      })

      .addCase(userProfile.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      })
      .addCase(profiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(profiles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = action.payload.success;
      })
      .addCase(profiles.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
