import React from "react";
import FindJob from "../components/Jobs/FindJob";
import { Outlet } from "react-router-dom";

function FindJobPage() {
  return (
    <div>
      <FindJob />
     <div id="job-details-section">
        <Outlet />
      </div>
    </div>
  );
}

export default FindJobPage;
