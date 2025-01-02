import React from "react";
import Tooltip from '@mui/material/Tooltip';
const ActivityLog = ({ leadsWithHistory }) => {
  return (
    <>
      <h3 className="text-xl font-semibold my-4">Activity Log</h3>

      {/* Today Section */}
      <div>
        <h4 className="text-lg font-bold text-gray-700 mb-2">Today</h4>
        <ul className="space-y-4 overflow-x-hidden relative">
          {leadsWithHistory
            .filter((entry) => {
              const today = new Date();
              const entryDate = new Date(entry.date);
              return today.toDateString() === entryDate.toDateString(); // Filter for today's entries
            })
            .map((activity, index, arr) => (
              <li
                key={index}
                className="flex items-start gap-4 relative"
              >
                {/* Vertical Dotted Line */}
                {index !== arr.length - 1 && (
                  <span className="absolute left-8 top-7 h-[90%] border-l-2 border-dotted border-gray-400"></span>
                )}

                {/* Time */}
                <div className="text-sm my-1 py-1 text-gray-500 whitespace-nowrap">
                  {new Date(activity.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex gap-2">
                    <p className="text-sm font-medium mb-1">{activity.activity} </p>
                    <span
                      className="mb-1 px-1 py-0.5 rounded-full text-xs font-normal text-white flex items-center gap-1"
                      style={{
                        backgroundColor:
                          activity.tag === "Underwriting"
                            ? "#de85f"
                            : activity.tag === "Requirement Closed"
                            ? "#28A745"
                            : "#FFC107",
                      }}
                    >
                      {activity.tag || "Lead Info"}
                    </span>
                  </div>
                  <Tooltip title={activity.note} arrow>
                  <p
                    className="text-xs text-gray-500 truncate max-w-[50%]"
                    title={activity.note}
                  >
                    {activity.note}
                  </p>
                  </Tooltip>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-300" />

      {/* Yesterday Section */}
      <div>
        <h4 className="text-lg font-bold text-gray-700 mb-2">Yesterday</h4>
        <ul className="space-y-4 relative">
          {leadsWithHistory
            .filter((entry) => {
              const today = new Date();
              const yesterday = new Date();
              yesterday.setDate(today.getDate() - 1);
              const entryDate = new Date(entry.date);
              return yesterday.toDateString() === entryDate.toDateString(); // Filter for yesterday's entries
            })
            .map((activity, index, arr) => (
              <li
                key={index}
                className="flex items-start gap-4 relative "
              >
                {/* Vertical Dotted Line */}
                {index !== arr.length - 1 && (
                  <span className="absolute left-3 top-6 h-full border-l-2 border-dotted border-gray-400"></span>
                )}

                {/* Time */}
                <div className="text-sm text-gray-500 w-[15%] whitespace-nowrap">
                  {new Date(activity.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">
                    {activity.activity}{" "}
                    <span
                      className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                      style={{
                        backgroundColor:
                          activity.tag === "Requirement Pending"
                            ? "#FFC107"
                            : "#17A2B8",
                      }}
                    >
                      {activity.tag || "General"}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {activity.note}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default ActivityLog;
