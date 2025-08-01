import conf from "../conf/conf";

const base_url = conf.jobportal_base_url;

export const getAuthHeaders = () => {
  const token = localStorage.getItem("jwt_token");
  return token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : { "Content-Type": "application/json" };
};

export const fetchRoles = async () => {
  try {
    const response = await fetch(`${base_url}/Roles/roles`, {
      // headers: getAuthHeaders(),
    });
    if (!response.ok) {
      console.error("No roles found");
    } else {
      return await response.json();
    }
  } catch (e) {
    console.error("Error fetching roles:", e);
  }
};

export const fetchVerifySession = async () => {
  try {
    const response = await fetch(`${base_url}/Users/session`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      return { success: false };
    }
    const result = await response.json();

    if (!result || !result.userId) {
      return { success: false };
    }

    return { success: true, result };
  } catch (e) {
    console.error("Session verification failed:", e);
    return { success: false };
  }
};

export const fetchLogin = async (username, password) => {
  try {
    const response = await fetch(`${base_url}/Users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    });

    const result = await response.json();

    if (response.ok && result.token) {
      localStorage.setItem("jwt_token", result.token);
      return { success: true, data: result.user };
    } else {
      return { success: false, message: result.message || "Login failed" };
    }
  } catch (e) {
    console.error("Error logging in:", e);
    return { success: false, message: "Network error" };
  }
};

export const fetchSignUp = async (data) => {
  try {
    const response = await fetch(`${base_url}/Users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error signing up:", e);
    return null;
  }
};

export const fetchUpdatePassword = async (formData) => {
  try {
    const response = await fetch(
      `${base_url}/Users/updatepassword/${formData.email}`,
      {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();
    return response.ok ? result : null;
  } catch (e) {
    console.error("Error updating password:", e);
    return null;
  }
};

export const fetchLogout = async () => {
  localStorage.removeItem("jwt_token");
  return null;
};
