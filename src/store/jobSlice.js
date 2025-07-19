import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCreateJob } from "../jobportal_api/jobsAPI";

export const postJob = createAsyncThunk("jobs/postjob", async (formData) => {
  const job = await fetchCreateJob(formData);
  return job;
});

const jobSlice = createSlice({
  name: "job",
  initialState: {
    loading: false,
    error: null,
    data: {},
    status: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = action.payload.success;
      })
      .addCase(postJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
