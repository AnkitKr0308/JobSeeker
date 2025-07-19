import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <>
      <style>{`
        .unauthorized-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background-color: #fff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          margin: 10% auto;
          font-family: 'Segoe UI', sans-serif;
        }

        .unauthorized-container h1 {
          font-size: 80px;
          color: #e74c3c;
          margin-bottom: 10px;
        }

        .unauthorized-container h2 {
          font-size: 24px;
          margin-bottom: 10px;
          color: #333;
        }

        .unauthorized-container p {
          font-size: 16px;
          color: #777;
          margin-bottom: 20px;
        }

        .unauthorized-container a {
          text-decoration: none;
          color: white;
          background-color: #0a2540;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

        .unauthorized-container a:hover {
          background-color: #163d65;
        }
      `}</style>

      <div className="unauthorized-container">
        <h1>401</h1>
        <h2>Unauthorized</h2>
        <p>You do not have permission to access this page.</p>
        <Link to="/">Return Home</Link>
      </div>
    </>
  );
};

export default Unauthorized;
