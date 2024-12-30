import React, { useEffect, useState } from "react";

const HistoryDisplay = ({ history,leadsWithHistory }) => {
console.log('history',history)
console.log('leadsWithHistory',leadsWithHistory)
    const [rows,setRows]=useState('')
    
    useEffect(() => {
        const savedLeads = localStorage.getItem("leadsHistory");
        if (savedLeads) {
          setRows(JSON.parse(savedLeads));
        }
        // console.log('leadsHistory',savedLeads)
        console.log('leadsHistory',rows)
      }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold">History</h3>
      <ul className="mt-4 space-y-4">
        {history && history.length > 0 ? (
          history.map((entry, index) => (
            <li key={`history-${index}`} className="flex flex-col space-y-2">
              {/* Time */}
              <div className="text-sm text-gray-500">
                {new Date(entry.date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
              {/* Activity */}
              <div className="text-sm font-medium">{entry.activity}</div>
              {/* Note */}
              {entry.note && (
                <div className="text-sm text-gray-700 italic">{entry.note}</div>
              )}
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">No history available</p>
        )}


      
        {/* Render leadsWithHistory */}
        {leadsWithHistory && leadsWithHistory.length > 0 ? (
          leadsWithHistory.map((lead, index) => (
            <li key={`leadsWithHistory-${index}`} className="flex flex-col space-y-2">
              <div className="text-sm text-gray-500">
                {new Date(lead.date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
              <div className="text-sm font-medium">{lead.activity}</div>
              {lead.note && (
                <div className="text-sm text-gray-700 italic">{lead.note}</div>
              )}
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">No leads with history available</p>
        )}  
      </ul>
    </div>
  );
};

export default HistoryDisplay;
