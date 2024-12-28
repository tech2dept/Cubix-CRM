import React, { useEffect, useState } from "react";

const DiscoveryLeads = ({ rows, setRows }) => {
  useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rows)); // Save rows to localStorage
  }, [rows]);

  const [discoveryLeads, setDiscoveryLeads] = useState(
    JSON.parse(localStorage.getItem("discoveryLeads")) || [] // Initialize from localStorage if available
  );

  const [selectedRows, setSelectedRows] = useState([]); // State for selected rows

  useEffect(() => {
    localStorage.setItem("discoveryLeads", JSON.stringify(discoveryLeads)); // Save contacted leads to localStorage
  }, [discoveryLeads]);

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
      setSelectedRows(discoveryLeads.map((row) => row.id)); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  return discoveryLeads.length> 0? ( 
    
    <div className="py-6">
      <h2 className="text-xl mb-2">Discovery Leads</h2>
      <table className="table-auto w-[100%] border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="shadow-sm px-1 py-0.5 text-center">
              <input
                type="checkbox"
                className="rounded border border-sm shadow"
                onChange={handleSelectAll}
                checked={selectedRows.length === discoveryLeads.length}
              />
            </th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">Lead</th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">Stage</th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">
            Organization
            </th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">Title</th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">Email</th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">Phone</th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {discoveryLeads.map((row) => (
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
                {row.stage && (
                  <button
                    className={`w-full text-white text-center p-1 my-0.5 rounded ${
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
                    }`}




                  >
                    {stageMapping[row.stage] || row.stage}
                  </button>
                )}
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
    <p className="text-center text-gray-500">No discovery leads available.</p> // Fallback message
  );
};

export default DiscoveryLeads;
