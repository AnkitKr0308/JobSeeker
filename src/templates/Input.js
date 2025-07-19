import React from "react";
import "../css/inputstyle.css";

function Input({
  label,

  fields = [],
  required,
  readOnly = false,

  onChange,
  value,
  error,
  formData,
  ...props
}) {
  return (
    
    <div className="input-group">
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="input-label">
            {field.label}
          </label>

          <input
            id={field.id}
            className={`text-input ${error ? "input-error" : ""}`}
            placeholder={field.placeholder}
            type={field.type || "text"}
            onChange={onChange}
            readOnly={field.readOnly || false}
            value={formData[field.id] || ""}
            required={field.required || false}
            {...props}
          />
        </div>
      ))}

      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}

export default Input;
