import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchGetNotification,
  fetchUpdateNotificationStatus,
} from "../jobportal_api/notificationAPI";

// 🔹 Async Thunks
export const getNotifications = createAsyncThunk(
  "notification/getNotifications",
  async () => {
    const res = await fetchGetNotification();
    return res; // expecting { success: true, notifications: [...] }
  }
);

export const updateNotificationStatus = createAsyncThunk(
  "notification/updateNotificationStatus",
  async (notificationData) => {
    const res = await fetchUpdateNotificationStatus(notificationData);
    return res; // expecting { success: true, updatedNotification: {...} }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
    status: false,
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications || [];
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateNotificationStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNotificationStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.success;
      })
      .addCase(updateNotificationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addNotification, markNotificationRead } =
  notificationSlice.actions;

export default notificationSlice.reducer;
