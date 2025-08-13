import { useState } from "react";
import React from "react";
import ReactApexChart from "react-apexcharts";
import "./Dashboard.css";
import {
  tabs,
  mealData,
  getPieChartConfig,
  floorChart5,
  floorChart6,
} from "./chartsData";
import StatsCard from "./StatsCard.jsx";

import {
  BarChart as BarChartIcon,
  Restaurant as RestaurantIcon,
  ListAlt as ListAltIcon,
  Check as CheckIcon,
} from "@mui/icons-material";

const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState("breakfast");
  const [activeFloorChart, setActiveFloorChart] = useState("floor5");

  const currentData = mealData[activeTab];

  const bookingPieChart = getPieChartConfig(
    "Today's Booking Status",
    ["Booked", "Not Booked"],
    currentData.bookedPercentage
  );
  const servingPieChart = getPieChartConfig(
    "Today's Serving Status",
    ["Served", "Not Served"],
    currentData.servedPercentage
  );
  const wastePieChart = getPieChartConfig(
    "Food Waste Analysis",
    ["Waste", "No Waste"],
    currentData.wastePercentage
  );

  const selectedFloorChart =
    activeFloorChart === "floor5" ? floorChart5 : floorChart6;

  const statsConfig = [
    {
      gridClass: "div2",
      icon: BarChartIcon,
      title: "Weekly Avg Booked",
      value: currentData.weeklyAvgBooked,
    },
    {
      gridClass: "div3",
      icon: RestaurantIcon,
      title: "Weekly Avg Served",
      value: currentData.weeklyAvgServed,
    },
    {
      gridClass: "div4",
      icon: ListAltIcon,
      title: "Total Booked",
      value: currentData.totalBooked,
    },
    {
      gridClass: "div5",
      icon: CheckIcon,
      title: "Total Served",
      value: currentData.totalServed,
    },
  ];

  return (
    <div className="dashboard">
      {/* Tabs */}
      <div className="dashboard-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            style={{
              borderBottomColor:
                activeTab === tab.id ? tab.color : "transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="dashboard-grid-parent">
        <div className="grid-item div1">
          <ReactApexChart {...bookingPieChart} type="pie" width="100%" />
        </div>

        {statsConfig.map(({ gridClass, ...props }) => (
          <div key={gridClass} className={`grid-item ${gridClass}`}>
            <StatsCard {...props} />
          </div>
        ))}

        {/* Floor Chart Switcher */}
        <div
          className="grid-item div6"
          style={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <button
              onClick={() =>
                setActiveFloorChart(
                  activeFloorChart === "floor5" ? "floor6" : "floor5"
                )
              }
              style={{
                background: "#5E81F4",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "25px",
                cursor: "pointer",
              }}
            >
              Switch to {activeFloorChart === "floor5" ? "6 Floor" : "5 Floor"}
            </button>
          </div>
          <ReactApexChart
            {...selectedFloorChart}
            type="bar"
            height={350}
            width="100%" // fill wrapper
            style={{ width: "90%" }}
          />
          <div></div>
        </div>

        <div className="grid-item div8">
          <ReactApexChart {...servingPieChart} type="pie" width="100%" />
        </div>

        <div className="grid-item div9">
          <ReactApexChart {...wastePieChart} type="pie" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
