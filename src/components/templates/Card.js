import React from "react";
import "../../css/card.css";

function Card({
  title,
  subtitle,
  description,
  footer,
  isExpanded,
  status,
  subdescription,
}) {
  return (
    <div className="card">
      {(title || status) && (
        <div className="card-header-row">
          <h3 className="card-title">{title}</h3>
          {status && (
            <div className="card-status">
              <span className="status-label">Status:</span>{" "}
              <span className="status-value">{status}</span>
            </div>
          )}
        </div>
      )}

      {(subtitle || description) && !isExpanded && (
        <hr className="card-divider" />
      )}

      {!isExpanded && (
        <>
          {(subtitle || description) && (
            <div className="card-info-row">
              {subtitle && <h4 className="card-subtitle">{subtitle}</h4>}
              <br />
              {description && (
                <p className="card-text">
                  <strong>Skills Required:</strong>
                  {description}
                </p>
              )}

              {subdescription && <p className="card-text">{subdescription}</p>}
            </div>
          )}
        </>
      )}

      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

export default Card;
