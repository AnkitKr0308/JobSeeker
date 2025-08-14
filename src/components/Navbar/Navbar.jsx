import React, { useEffect, useRef, useState } from "react";
import "../../css/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const user = useSelector((state) => state.auth.data);
  const loading = useSelector((state) => state.auth.loading);

  const [notifications, setNotifications] = useState([
    // { id: 1, text: "Your application has been viewed", read: false },
    // { id: 2, text: "New job posted in your field", read: false },
    // { id: 3, text: "Interview scheduled for 20th Aug", read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigateToProfile = () => navigate("/profile");
  const navigateToSettings = () => navigate("/settings");

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
        <div className="navbar-actions">
          <div
            className="navbar-user"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            ref={profileRef}
          >
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
          <div
            className="navbar-notification"
            onClick={() => setIsNotifOpen((prev) => !prev)}
            ref={notifRef}
          >
            <span className="notif-icon">🔔</span>
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
            {isNotifOpen && (
              <div className="dropdown-menu notif-dropdown">
                {notifications.length === 0 ? (
                  <div className="empty">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`notif-item ${n.read ? "read" : "unread"}`}
                    >
                      {n.text}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
