import React, { useEffect, useState } from "react";

const LostLeads = ({ rows, setRows }) => {
  useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rows)); // Save rows to localStorage
  }, [rows]);

  const [lostLeads, setLostLeads] = useState(
    JSON.parse(localStorage.getItem("lostLeads")) || [] // Initialize from localStorage if available
  );

  const [selectedRows, setSelectedRows] = useState([]); // State for selected rows

  useEffect(() => {
    localStorage.setItem("lostLeads", JSON.stringify(lostLeads)); // Save contacted leads to localStorage
  }, [lostLeads]);

  const stageMapping = {
    new: "New",
    discovery: "Discovery",
    proposal: "Proposal",
    negotiation: "Negotiation",
    won: "Won",
    lost: "Lost",
  };

  // Handle row selection/deselection
  const handleRowSelect = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((rowId) => rowId !== id); // Deselect row
      } else {
        return [...prevSelected, id]; // Select row
      }
    });
  };

  // Handle "Select All" checkbox toggle
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(lostLeads.map((row) => row.id)); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  return lostLeads.length > 0 ? (
    <div className="py-6">
      <h2 className="text-xl mb-2">Lost Leads</h2>
      <table className="table-auto w-[100%] border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="shadow-sm px-1 py-0.5 text-center">
              <input
                type="checkbox"
                className="rounded border border-sm shadow"
                onChange={handleSelectAll}
                checked={selectedRows.length === lostLeads.length}
              />
            </th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">
              Lead
            </th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">
              Stage
            </th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">
              Organization
            </th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">
              Title
            </th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">
              Email
            </th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">
              Phone
            </th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {lostLeads.map((row) => (
            <tr
              key={`${row.id}-${row.lead}`}
              className={`${
                selectedRows.includes(row.id) ? "bg-blue-200" : ""
              }`} // Highlight row when selected
            >
              <td className="shadow-sm px-1 py-0.5 text-center">
                <input
                  type="checkbox"
                  className="rounded border border-sm"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleRowSelect(row.id)}
                />
              </td>
              <td className="shadow-sm px-1 py-0.5">{row.lead}</td>
              <td className="shadow-sm px-1 py-0.5">
                {/* {row.stage && (
                  <button
                    className={`w-full text-white text-center p-1 my-0.5 rounded
                         ${
                      row.stage === "new"
                        ? "bg-purple-500"
                        : row.stage === "discovery"
                        ? "bg-violet-600"
                        : row.stage === "proposal"
                        ? "bg-blue-400"
                        : row.stage === "negotiation"
                        ? "bg-blue-800"
                        : row.stage === "won"
                        ? "bg-green-400"
                        : row.stage === "lost"
                        ? "bg-red-400"
                        : "bg-gray-300" // default case if no match
                    }
                    `}
                  >
                    {stageMapping[row.stage] || row.stage}
                  </button>
                )} */}
                <button className="w-full text-white text-center p-1 my-0.5 rounded bg-red-600">
                  Lost
                </button>
              </td>
              <td className="shadow-sm px-1 py-0.5">{row.organization}</td>
              <td className="shadow-sm px-1 py-0.5">{row.title}</td>
              <td className="shadow-sm px-1 py-0.5">{row.email}</td>
              <td className="shadow-sm px-1 py-0.5">{row.phone}</td>
              <td className="shadow-sm px-1 py-0.5">{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-center text-gray-500">No Lost leads available.</p> // Fallback message
  );
};

export default LostLeads;
