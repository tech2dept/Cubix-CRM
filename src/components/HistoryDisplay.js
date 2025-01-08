import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";

const HistoryDisplay = ({ selectedLead, activityEntry, rows2 }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (selectedLead && rows2) {
      // Match the selectedLead.id with an ID from rows2
      const matchedLead = rows2.find((row) => row.id === selectedLead.id);
      
      if (matchedLead && matchedLead.leadTimeline) {
        // Initialize rows with matched lead's timeline
        const sortedTimeline = matchedLead.leadTimeline.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setRows([...sortedTimeline]);

        // Save the initial timeline to local storage
        localStorage.setItem("leadsHistory", JSON.stringify(sortedTimeline));
      } else {
        // Clear rows if no match is found
        setRows([]);
      }
    }
  }, [selectedLead, rows2]);

  useEffect(() => {
    if (activityEntry) {
      // Append activityEntry dynamically when it's set
      setRows((prevRows) => {
        const updatedRows = [...prevRows, activityEntry].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        // Update local storage with the new timeline
        localStorage.setItem("leadsHistory", JSON.stringify(updatedRows));
        return updatedRows;
      });
    }
  }, [activityEntry]);

  return (
    <div>
      <h3 className="text-xl font-semibold my-4">Lead Timeline</h3>

      {rows && rows.length > 0 ? (
        <ul className="space-y-4">
          {rows.map((activity, index) => (
            <li key={index} className="flex items-start gap-4">
              {/* Date and time */}
              <div className="text-sm text-gray-500 w-32">
                {new Date(activity.date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>

              {/* Activity and optional details */}
              <div className="flex-1">
                {activity.type === "file" ? (
                  <div className="file-attachment">
                    <p className="text-sm font-medium mb-1">File Uploaded</p>
                    <p className="text-xs text-gray-500">File Name: {activity.fileName}</p>
                    <p className="text-xs text-gray-500">File Size: {(activity.fileSize / 1024).toFixed(2)} KB</p>
                    <p className="text-xs text-gray-500">File Type: {activity.fileType}</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <p className="text-sm font-medium mb-1">
                        {activity.activity || "No activity specified"}
                      </p>
                      {activity.tag && (
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
                          {activity.tag}
                        </span>
                      )}
                    </div>

                    {/* Notes and additional details */}
                    <Tooltip title={activity.notes || "No notes available"} arrow>
                      <p className="text-xs text-gray-500 truncate max-w-[50%]">
                         {activity.notes || ""}
                      </p>
                    </Tooltip>
                    {activity.dueDate && (
                      <p className="text-xs text-gray-500">
                        Due Date: {activity.dueDate}
                      </p>
                    )}
                    {activity.assignedTo && (
                      <p className="text-xs text-gray-500">
                        Assigned To: {activity.assignedTo}
                      </p>
                    )}
                    {activity.summary && (
                      <p className="text-xs text-gray-500">
                        Summary: {activity.summary}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No timeline activities available</p>
      )}
    </div>
  );
};

export default HistoryDisplay;
