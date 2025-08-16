import conf from "../conf/conf";
import { getAuthHeaders } from "./authAPI";

const base_url = `${conf.jobportal_base_url}/Notification`;

export const fetchGetNotification = async () => {
  try {
    const response = await fetch(`${base_url}/notifications`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const result = await response.json();

    if (response) {
      return result;
    }
  } catch (e) {
    console.error("Error fetching notifications", e);
    return { success: false, message: "Error fetching notifications" };
  }
};

export const fetchUpdateNotificationStatus = async (notificationData) => {
  try {
    const response = await fetch(`${base_url}/updatenotifications`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(notificationData),
    });
    const result = await response.json();
    if (response) {
      return result;
    }
  } catch (e) {
    console.error("Error updating notification status", e);
    return { success: false, message: "Error updating notification status" };
  }
};
