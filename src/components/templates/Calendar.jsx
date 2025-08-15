import React, { useState } from "react";
import "../../css/calendar.css";

function Calendar({ value, onChange, min, max }) {
  const [tempValue, setTempValue] = useState(value || "");

  const handleConfirm = () => {
    onChange(tempValue);
  };

  return (
    <div className="dt-field">
      <input
        type="datetime-local"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        min={min}
        max={max}
        aria-label="Select interview date and time"
        placeholder="Select date & time"
      />
      <svg
        className="dt-icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
        onClick={(e) => e.target.previousSibling.showPicker?.()}
        style={{ cursor: "pointer" }}
      >
        <path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm12 6H5v11h14V8z" />
      </svg>
      <button type="button" className="dt-ok-button" onClick={handleConfirm}>
        OK
      </button>
    </div>
  );
}

export default Calendar;
