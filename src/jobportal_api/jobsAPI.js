import conf from "../conf/conf";

const base_url = `${conf.jobportal_base_url}/Jobs`;

export const fetchCreateJob = async (data) => {
  try {
    const response = await fetch(`${base_url}/createjob`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorText = await response.text(); 
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || "Error posting job");
      } catch {
        throw new Error(errorText || "Error posting job");
      }
    }

    const result = await response.json();
    return { success: true, result };
  } catch (e) {
    console.error("Failed to post job", e);
    return { success: false, message: e.message };
  }
};

export const fetchFindJobs = async (search) => {
  try {
    const response = await fetch(`${base_url}/jobs?query=${search}`);
    const fetchedjobdata = await response.json();

    if (response.ok) {
      return { success: true, fetchedjobdata };
    } else {
      return { success: false, message: "Error fetching jobs" };
    }
  } catch (e) {
    console.error("Error fetching jobs", e);
  }
};

export const fetchFindJobsByJobId = async (jobid) => {
  try {
    const response = await fetch(`${base_url}/jobdetails/${jobid}`);
    const result = await response.json();

    if (response.ok) {
      return { success: true, result };
    } else if (response.status === 404) {
      return {
        success: false,
        message: (jobid, " doesn't exists in the database"),
      };
    } else {
      return { success: false, message: "Unable to get job details" };
    }
  } catch (e) {
    console.error("Error getting job details", e);
  }
};
