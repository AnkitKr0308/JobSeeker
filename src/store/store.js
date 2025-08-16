import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import userReducer from "./userSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;
