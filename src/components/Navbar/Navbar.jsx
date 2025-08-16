import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import {
  getNotifications,
  updateNotificationStatus,
  addNotification,
} from "../../store/notificationSlice";
import "../../css/Navbar.css";
import notificationService from "../../conf/NotificationService";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const user = useSelector((state) => state.auth.data);
  const notifications = useSelector(
    (state) => state.notification.notifications || []
  );

  const loading = useSelector((state) => state.auth.loading);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Close dropdowns when clicking outside
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // SignalR connection setup
  useEffect(() => {
    if (!user) return;

    dispatch(getNotifications());

    const token = localStorage.getItem("token");

    notificationService.startConnection(token, (notification) => {
      dispatch(addNotification(notification));
    });

    return () => {
      notificationService.stopConnection();
    };
  }, [user, dispatch]);

  const logout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const markNotificationAsRead = async (id) => {
    const payload = { notificationIds: [id], isRead: true };
    const result = await dispatch(updateNotificationStatus(payload));
    if (result.payload?.success) return;
  };

  const clearNotifications = async () => {
    const payload = {
      notificationIds: notifications.map((n) => n.id),
      isRead: true,
      isClear: true,
    };
    await dispatch(updateNotificationStatus(payload));
  };

  if (loading) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        JobSeeker
      </div>

      {user && (
        <div className="navbar-actions">
          {/* Profile */}
          <div
            className="navbar-user"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            ref={profileRef}
          >
            <span className="greeting">Hello, {user.name}</span>
            <span className="profile-icon">👤</span>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => navigate("/profile")}>My Profile</button>
                <button onClick={() => navigate("/settings")}>Settings</button>
                <hr />
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>

          {/* Notifications */}
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
                        onClick={clearNotifications}
                      >
                        Clear All
                      </button>
                    </div>
                    <hr />
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`notif-item ${n.isRead ? "read" : "unread"}`}
                        onClick={() => markNotificationAsRead(n.id)}
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
