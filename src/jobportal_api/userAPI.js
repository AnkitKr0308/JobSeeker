import conf from "../conf/conf";
import { getAuthHeaders } from "./authAPI";

const base_url = `${conf.jobportal_base_url}/Users`;

export const fetchUserProfile = async (userId) => {
  try {
    const response = await fetch(`${base_url}/userprofile/${userId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

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
    const response = await fetch(`${base_url}/userprofile`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const result = await response.json();

    if (response) {
      return result;
    }
  } catch (e) {
    console.error("Error fetching profile", e);
    return { success: false, message: "Network error or server is down" };
  }
};

export const fetchUpdateProfile = async (data) => {
  try {
    const response = await fetch(`${base_url}/userprofile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await response.json();
    if (response) {
      return result;
    }
  } catch (e) {
    console.error("Error fetching profile", e);
    return { success: false, message: "Network error or server is down" };
  }
};

// export const fetchGetNotification = async () => {
//   try {
//     const response = await fetch(`${base_url}/notifications`, {
//       method: "GET",
//       headers: getAuthHeaders(),
//     });

//     const result = await response.json();

//     if (response) {
//       return result;
//     }
//   } catch (e) {
//     console.error("Error fetching notifications", e);
//     return { success: false, message: "Error fetching notifications" };
//   }
// };

// export const fetchUpdateNotificationStatus = async (notificationData) => {
//   try {
//     const response = await fetch(`${base_url}/updatenotifications`, {
//       method: "PUT",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(notificationData),
//     });
//     const result = await response.json();
//     if (response) {
//       return result;
//     }
//   } catch (e) {
//     console.error("Error updating notification status", e);
//     return { success: false, message: "Error updating notification status" };
//   }
// };
