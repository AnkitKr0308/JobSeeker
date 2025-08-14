import React, { useState } from "react";
import "../../css/buttonstyle.css";
import "../../css/dropdownstyle.css";

function Button({
  type = "button",
  onClick,
  label,
  children,
  dropdownOptions = [],
  disabled = false,
  onDropdownSelect,
  fullwidth = false,
  className,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggle = () => {
    if (dropdownOptions.length) {
      setShowDropdown(!showDropdown);
    } else {
      onClick && onClick();
    }
  };

  const isDropdown = dropdownOptions.length > 0;

  return (
    <div className={`dropdown ${fullwidth ? "full-width" : ""}`}>
      <button
        type={type}
        className={`btn ${
          className || (isDropdown ? "btn-white" : "btn-blue")
        }`}
        onClick={handleToggle}
        disabled={disabled}
      >
        {label} {isDropdown && <span>▾</span>}
      </button>

      {isDropdown && showDropdown && (
        <div className="dropdown-content">
          {dropdownOptions.map((option, idx) => (
            <button
              id={option.id}
              key={idx}
              className="dropdown-item"
              onClick={() => {
                onDropdownSelect?.(option.label);
                setShowDropdown(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Button;
