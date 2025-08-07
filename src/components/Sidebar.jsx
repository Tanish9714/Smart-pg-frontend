import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import GridViewIcon from "@mui/icons-material/GridView";
import AddIcon from "@mui/icons-material/Add";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PgLogo from "../assets/Passport Photo.jpg";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/dashboard" && location.pathname === "/") {
      return true;
    }
    return location.pathname === path;
  };

  function onToggle() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div
      className={`bg-white h-full shadow-lg transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-72"
      } flex flex-col`}
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 
            className={`text-xl font-bold text-[#5E81F4] transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto ml-3"
            }`}
          >
            PG Name
          </h1>
          <button
            onClick={onToggle}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center p-4 border-l-4 transition-all duration-300 ease-in-out ${
                isActive("/dashboard")
                  ? "bg-blue-100 text-[#5E81F4] border-[#5E81F4]"
                  : "border-transparent text-gray-700 hover:bg-gray-100"
              }`}
            >
              <GridViewIcon
                className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? "mx-auto" : "mx-4"}`}
              />
              <span 
                className={`font-medium transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
                  isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
              >
                Dashboard
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/add-activity"
              className={`flex items-center p-4 border-l-4 transition-all duration-300 ease-in-out ${
                isActive("/add-activity")
                  ? "bg-blue-100 text-[#5E81F4] border-[#5E81F4]"
                  : "border-transparent text-gray-700 hover:bg-gray-100"
              }`}
            >
              <AddIcon
                className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? "mx-auto" : "mx-4"}`}
              />
              <span 
                className={`font-medium transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
                  isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
              >
                Add Activity
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/tenants"
              className={`flex items-center p-4 border-l-4 transition-all duration-300 ease-in-out ${
                isActive("/tenants")
                  ? "bg-blue-100 text-[#5E81F4] border-[#5E81F4]"
                  : "border-transparent text-gray-700 hover:bg-gray-100"
              }`}
            >
              <PeopleOutlineIcon
                className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? "mx-auto" : "mx-4"}`}
              />
              <span 
                className={`font-medium transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
                  isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
              >
                Tenants
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      <div 
        className={`p-6 border-t border-gray-100 transition-all duration-300 ease-in-out ${
          isCollapsed ? "opacity-0 h-0 p-0 overflow-hidden" : "opacity-100 h-auto"
        }`}
      >
        <div className="flex items-center">
          <img
            src={PgLogo}
            alt="User Avatar"
            className="w-12 h-12 rounded-full flex-shrink-0"
          />
          <div 
            className={`ml-3 transition-all duration-300 ease-in-out overflow-hidden ${
              isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
          >
            <p className="text-sm font-medium text-gray-900 whitespace-nowrap">Tanish</p>
            <p className="text-xs text-gray-500 whitespace-nowrap">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
