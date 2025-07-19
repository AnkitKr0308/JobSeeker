import conf from "../conf/conf";

const base_url = conf.jobportal_base_url;

export const fetchCreateJob = async (data) => {
  try {
    const response = await fetch(`${base_url}/Jobs/createjob`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: result.message };
    } else {
      return { message: result.message };
    }
  } catch (e) {
    console.error("Failed to post job", e);
  }
};
