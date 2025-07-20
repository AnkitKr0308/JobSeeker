import conf from "../conf/conf";

const base_url = `${conf.jobportal_base_url}/Jobs`;

export const fetchCreateJob = async (data) => {
  try {
    const response = await fetch(`${base_url}/createjob`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, result };
    } else {
      return { message: result.message };
    }
  } catch (e) {
    console.error("Failed to post job", e);
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
