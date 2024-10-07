import React from "react";

const HeaderComponent = ({ title }) => {
  return (
    <div className="heading-container">
      <h2 className="heading-style">{title}</h2>
      <style jsx>{`
        .heading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin: 20px 0;
        }

        .heading-style {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-weight: 800;
          padding: 20px 40px;
          border-radius: 12px;
          display: inline-block;
          text-align: center;
          font-size: 2rem;
          font-family: "Poppins", sans-serif;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: transform 0.3s ease;
        }

        .heading-style:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default HeaderComponent;
