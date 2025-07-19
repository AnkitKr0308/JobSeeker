import React, { useEffect, useState } from "react";
import "../../css/homestyle.css";
import Button from "../templates/Button"
import Input from "../templates/Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchRoles } from "../../jobportal_api/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../../store/authSlice";

function AuthPage() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const user = useSelector((state) => state.auth.data?.user);
  const navigate = useNavigate();
  const [role, setRoles] = useState([]);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const loginFields = [
    {
      id: "email",
      label: "Email",
      required: true,
      type: "email",
      placeholder: "Enter email address",
    },
    {
      id: "password",
      label: "Password",
      required: true,
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const signupFields = [
    {
      id: "name",
      label: "Name",
      required: true,
      placeholder: "Enter full name",
    },
    {
      id: "email",
      label: "Email",
      required: true,
      type: "email",
      placeholder: "Enter email address",
    },
    {
      id: "password",
      label: "Password",
      required: true,
      type: "password",
      placeholder: "Enter password",
    },
    {
      id: "contact",
      label: "Contact",
      required: true,
      type: "phone",
      placeholder: "Enter mobile number",
    },
  ];

  const handleChange = async (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const login = async () => {
    const result = await dispatch(
      loginUser({ username: formData.email, password: formData.password })
    );

    const response = result.payload;

    if (response.success) {
      navigate("/");
    } else {
      setError(response?.msg);
    }
  };

  const signup = async () => {
    const result = await dispatch(signupUser(formData));

    const response = result.payload;

    if (response.success) {
      navigate("/");
    } else {
      setError(response?.msg);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      const loadRoles = async () => {
        const fetchedRoles = await fetchRoles();
        setRoles(fetchedRoles);
      };
      loadRoles();
    }
  }, [setRoles, navigate, user]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isLogin) {
          login();
        } else {
          signup();
        }
      }}
    >
      <div className="login-container">
        <div className="login-left">
          <img src="/jobsearchlogo.jpg" alt="JobPortal Logo" className="logo" />
          <h1>JobPortal</h1>
          <p>Your Gateway to Smarter Hiring and Careers</p>
        </div>

        <div className="login-right">
          <div className="login-box">
            {isLogin ? (
              <div>
                <h1>Login</h1>
                <Input
                  fields={loginFields}
                  onChange={handleChange}
                  formData={formData}
                  error={error}
                />
                <Button type="submit" label="Login" fullwidth={true} />
                <label>
                  Don't have an Account?{" "}
                  <Link to="/signup" className="text-blue underline">
                    Click here to Signup
                  </Link>
                </label>
              </div>
            ) : (
              <div>
                <h1>Signup</h1>
                <Input
                  fields={signupFields}
                  onChange={handleChange}
                  formData={formData}
                  error={error}
                />
                <div style={{ marginBottom: "12px" }}>
                  <Button
                    label={formData.gender || "Gender"}
                    dropdownOptions={[
                      {
                        label: "Male",
                      },
                      {
                        label: "Female",
                      },
                      {
                        label: "Others",
                      },
                    ]}
                    onDropdownSelect={(selected) =>
                      setFormData((prev) => ({ ...prev, gender: selected }))
                    }
                  />
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <Button
                    label={formData.role || "Roles"}
                    dropdownOptions={role.map((role) => ({ label: role.role }))}
                    onDropdownSelect={(selected) =>
                      setFormData((prev) => ({ ...prev, role: selected }))
                    }
                  />
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <Button
                    label="Register Account"
                    fullwidth={true}
                    type="submit"
                  />
                </div>
                <label>
                  Already have an Account?{" "}
                  <Link to="/login" className="text-blue underline">
                    Click here to Login
                  </Link>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default AuthPage;
