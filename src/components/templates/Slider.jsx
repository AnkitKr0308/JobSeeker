import React, { useEffect, forwardRef } from "react";
import "../../css/slider.css";

const Slider = forwardRef(({ isOpen, onClose, children, title }, ref) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className={`slider-overlay ${isOpen ? "open" : ""}`}>
      <div
        className={`slider-panel ${isOpen ? "slide-in" : "slide-out"}`}
        ref={ref}
      >
        <div className="slider-header">
          {title && <h3 className="slider-title">{title}</h3>}
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="slider-content">{children}</div>
      </div>
    </div>
  );
});

export default Slider;
