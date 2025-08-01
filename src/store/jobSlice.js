import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAppliedJobs,
  fetchApplyJob,
  fetchCheckAppliedJob,
  fetchCreateJob,
  fetchFindJobs,
  fetchFindJobsByJobId,
  fetchGetApplications,
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

export const applyJob = createAsyncThunk("jobs/applyjob", async (data) => {
  const res = await fetchApplyJob(data);
  return res;
});

export const appliedJobs = createAsyncThunk("jobs/appliedjobs", async () => {
  const res = await fetchAppliedJobs();
  return res;
});

export const applications = createAsyncThunk("jobs/applications", async () => {
  const res = await fetchGetApplications();
  return res;
});

export const CheckAppliedJobs = createAsyncThunk(
  "jobs/checkappliedjobs",
  async ({ jobId }) => {
    const res = await fetchCheckAppliedJob(jobId);
    return res;
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
      })
      .addCase(applyJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = action.payload.success;
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(appliedJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(appliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = action.payload.success;
      })
      .addCase(appliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(applications.pending, (state) => {
        state.loading = true;
      })
      .addCase(applications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = action.payload.success;
      })
      .addCase(applications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(CheckAppliedJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(CheckAppliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = action.payload.success;
      })
      .addCase(CheckAppliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
