import { useState } from "react";

const tabs = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "hightea", label: "High Tea" },
  { id: "dinner", label: "Dinner" },
];

export default function TabPanel() {
  const [activeTab, setActiveTab] = useState("breakfast");

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const tabWidth = 100 / tabs.length;

  const extraOffsetLeft = activeTab === "breakfast" ? 4 : 0;
  const extraOffsetRight = activeTab === "dinner" ? 4 : 0;

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div className="relative bg-gray-200 rounded-lg p-1 flex w-[500px]">
        <div
          className="absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-300 ease-out"
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

      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {tabs.find((tab) => tab.id === activeTab)?.label} Content
        </h2>
        <p className="text-gray-600">
          This is the content for the{" "}
          {tabs.find((tab) => tab.id === activeTab)?.label.toLowerCase()} tab.
        </p>
      </div>
    </div>
  );
}
