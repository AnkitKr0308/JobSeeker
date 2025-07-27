import conf from "../conf/conf";

const base_url = `${conf.jobportal_base_url}/Users`;

export const fetchUserProfile = async (userId) => {
  try {
    const response = await fetch(`${base_url}/userprofile/${userId}`);

    const profiledata = await response.json();

    if (response.ok) {
      return { success: true, profiledata };
    } else {
      return { success: false, message: "Failed to fetch user profile" };
    }
  } catch (e) {
    console.error("Error fetching profile", e);
    return { success: false, message: "Network error or server is down" };
  }
};

export const fetchProfiles = async () => {
  try {
    const response = await fetch(`${base_url}/userprofile`);

    const result = await response.json();

    if (response) {
      return result;
    }
  } catch (e) {
    console.error("Error fetching profile", e);
    return { success: false, message: "Network error or server is down" };
  }
};
