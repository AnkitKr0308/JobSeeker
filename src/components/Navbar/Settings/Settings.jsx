import React from "react";
import "../../../css/homestyle.css";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth.data);

  const navigateToManageUsers = () => {};

  return (
    <div>
      <span className="imgbtn">
        {user.role === "Admin" && (
          <div className="img-item">
            <img
              src="/manageuser.png"
              alt="Manage Users"
              onClick={navigateToManageUsers}
              title="Manage User"
            />
            <p>Manage Users</p>
          </div>
        )}
      </span>
    </div>
  );
}

export default Home;
