import React, { useEffect, useRef, useState } from "react";
import "../../css/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.auth.data);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const navigateToSettings = () => {
    navigate("/settings");
  };

  const logout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  if (loading) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        JobSeeker
      </div>
      {user && (
        <div className="navbar-user" onClick={toggleDropdown} ref={dropdownRef}>
          <span className="greeting">Hello, {user.name}</span>
          <span className="profile-icon">👤</span>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={navigateToProfile}>My Profile</button>
              <button onClick={navigateToSettings}>Settings</button>
              <hr />
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
