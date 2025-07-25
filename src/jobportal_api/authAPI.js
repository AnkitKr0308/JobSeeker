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
      localStorage.setItem("user", JSON.stringify(result));
      return { success: true, result };
    } else if (result.message === "User not found") {
      return { success: false, msg: result.message };
    } else if (result.message === "Invalid password") {
      return { success: false, msg: result.message };
    } else {
      alert("Login failed. Please try again later.");
      return { success: false };
    }
  } catch (e) {
    console.error("Error logging user:", e);
    alert("Something went wrong. Please try again later.");
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
      localStorage.setItem("user", JSON.stringify(result));
      return { success: true, result };
    } else if (result.message === "User with this email already exists") {
      return { success: false, msg: result.message };
    } else if (result.message === "Please enter correct email address") {
      const msg = result.message;
      return { success: false, msg };
    } else {
      alert("Error creating the account");
      return { success: false };
    }
  } catch (e) {
    console.error("Error registering user account", e);
    alert("Something went wrong. Please try again later.");
  }
};

export const fetchUpdatePassword = async (formData) => {
  try {
    const response = await fetch(
      `${base_url}/Users/updatepassword/${formData.email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();

    if (response.ok) {
      return { success: true, result };
    } else {
      return { success: false, message: "Failed to update password" };
    }
  } catch (e) {
    console.error("Error updating password", e);
  }
};

export const fetchVerifySession = async () => {
  try {
    const response = await fetch(`${base_url}/Users/session`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Session expired");
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Not able to verify session", e);
  }
};

export const fetchLogout = async () => {
  await fetch(`${base_url}/Users/logout`, {
    method: "POST",
    credentials: "include",
  });
  return null;
};
