import React, { useEffect, useRef, useState } from "react";
import "../../css/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import {
  getNotifications,
  updateNotificationStatus,
} from "../../store/userSlice";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const user = useSelector((state) => state.auth.data);
  const loading = useSelector((state) => state.auth.loading);

  const [notifications, setNotifications] = useState([]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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

  const clearNotifications = async () => {
    if (notifications.length === 0) return;

    const payload = {
      notificationIds: notifications.map((n) => n.id),
      userId: user.userId,
      isRead: true,
      isClear: true,
    };

    try {
      const result = await dispatch(updateNotificationStatus(payload));
      if (result.payload?.success) {
        setNotifications([]);
      }
    } catch (e) {
      console.error("Error updating notification status");
    }
  };

  const markNotificationAsRead = async (id) => {
    const payload = {
      notificationIds: [id],
      isRead: true,
    };

    try {
      const result = await dispatch(updateNotificationStatus(payload));
      if (result.payload.success) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
      }
    } catch (e) {
      console.error("Error updating notification status");
    }
  };

  useEffect(() => {
    const notificationMessage = async () => {
      try {
        const result = await dispatch(getNotifications());
        if (result.payload?.success) {
          setNotifications(result.payload.notifications);
        }
      } catch (e) {
        console.error("Error fetching notification");
      }
    };
    notificationMessage();
  }, [dispatch]);

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
            <span className="notif-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="white"
              >
                <path d="M12 2C10.343 2 9 3.343 9 5v1C6.243 6 4 8.243 4 11v5l-1 1v1h18v-1l-1-1v-5c0-2.757-2.243-5-5-5V5c0-1.657-1.343-3-3-3zM12 22c1.104 0 2-.896 2-2h-4c0 1.104.896 2 2 2z" />
              </svg>
            </span>
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
            {isNotifOpen && (
              <div className="dropdown-menu notif-dropdown">
                {notifications.length === 0 ? (
                  <div className="empty">No notifications</div>
                ) : (
                  <>
                    <div className="notif-header">
                      <button
                        className="clear-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearNotifications();
                        }}
                      >
                        Clear
                      </button>
                    </div>
                    <hr className="notif-separator" />

                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`notif-item ${n.isRead ? "read" : "unread"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          markNotificationAsRead(n.id);
                        }}
                      >
                        {n.message}
                      </div>
                    ))}
                  </>
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
