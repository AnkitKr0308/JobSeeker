import React from "react";
import "../../css/card.css";

function Card({ title, subtitle, description, footer, isExpanded }) {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      {!isExpanded && (
        <>
          {(subtitle || description) && (
            <div className="card-info-row">
              {subtitle && <h4 className="card-subtitle">{subtitle}</h4>}
              {description && (
                <p className="card-text">
                  <strong>Skills Required:</strong> {description}
                </p>
              )}
            </div>
          )}
        </>
      )}

      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

export default Card;
