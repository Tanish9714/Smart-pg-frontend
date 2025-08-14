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

  const tabWidth = 100 / tabs.length;
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const extraOffsetLeft = activeTab === "breakfast" ? 4 : 0;
  const extraOffsetRight = activeTab === "dinner" ? 4 : 0;

  return (
    <div className="dashboard flex flex-col items-center p-4 ">
      {/* Tabs */}
      <div className="relative bg-white rounded-lg p-1 flex w-[500px] shadow-sm">
        <div
          className="absolute top-1 bottom-1 bg-[#e3f2fd] rounded-md shadow-sm transition-all duration-300 ease-out"
          style={{
            left: `calc(${activeIndex * tabWidth}% + ${extraOffsetLeft}px)`,
            width: `calc(${tabWidth}% - ${
              extraOffsetRight + extraOffsetLeft
            }px)`,
          }}
        />

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-200
              ${
                activeTab === tab.id
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-800"
              }`}
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
