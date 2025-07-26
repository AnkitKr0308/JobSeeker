import conf from "../conf/conf";

const base_url = conf.jobportal_base_url;

export const fetchRoles = async () => {
  try {
    const response = await fetch(`${base_url}/Roles/roles`);

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
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok || !result.userId) {
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
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, data: result };
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
        headers: { "Content-Type": "application/json" },
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
  await fetch(`${base_url}/Users/logout`, {
    method: "POST",
    credentials: "include",
  });
  return null;
};
