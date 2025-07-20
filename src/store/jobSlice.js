import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCreateJob, fetchFindJobs } from "../jobportal_api/jobsAPI";

export const postJob = createAsyncThunk("jobs/postjob", async (formData) => {
  const job = await fetchCreateJob(formData);
  return job;
});

export const findJob = createAsyncThunk("jobs/findjob", async (search) => {
  const jobdata = await fetchFindJobs(search);
  return jobdata;
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
      })
      .addCase(findJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(findJob.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = action.payload.success;
      })
      .addCase(findJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
