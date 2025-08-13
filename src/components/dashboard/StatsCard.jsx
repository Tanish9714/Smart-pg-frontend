// StatsCard.jsx
import React from "react";

const StatsCard = ({ icon: Icon, title, value }) => {
  return (
    <div className="stats-wrapper">
      <div className="stats-icon-circle">
        <Icon className="stats-icon" />
      </div>
      <div className="stats-content">
        <h3>{title}</h3>
        <p>{value.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default StatsCard;
