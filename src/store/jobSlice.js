import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCreateJob,
  fetchFindJobs,
  fetchFindJobsByJobId,
} from "../jobportal_api/jobsAPI";

export const postJob = createAsyncThunk("jobs/postjob", async (formData) => {
  const job = await fetchCreateJob(formData);
  return job;
});

export const findJob = createAsyncThunk("jobs/findjob", async (search) => {
  const jobdata = await fetchFindJobs(search);
  return jobdata;
});

export const getJobByJobID = createAsyncThunk(
  "jobs/jobbyjobid",
  async (jobid) => {
    const jobdetails = await fetchFindJobsByJobId(jobid);
    return jobdetails;
  }
);

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
      })
      .addCase(getJobByJobID.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobByJobID.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = action.payload.success;
      })
      .addCase(getJobByJobID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
