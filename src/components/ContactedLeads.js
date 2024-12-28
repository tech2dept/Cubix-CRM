import React, { useEffect, useState } from "react";

const ContactedLeads = ({ rows, setRows }) => {
  useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rows)); // Save rows to localStorage
  }, [rows]);

  const [contactedLeads, setContactedLeads] = useState(
    JSON.parse(localStorage.getItem("contactedLeads")) || [] // Initialize from localStorage if available
  );

  const [selectedRows, setSelectedRows] = useState([]); // State for selected rows

  useEffect(() => {
    localStorage.setItem("contactedLeads", JSON.stringify(contactedLeads)); // Save contacted leads to localStorage
  }, [contactedLeads]);

  const statusMapping = {
    newLead: "New Lead",
    contacted: "Contacted",
    attemptedToContact: "Attempted to Contact",
    qualified: "Qualified",
    unqualified: "Unqualified",
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
      setSelectedRows(contactedLeads.map((row) => row.id)); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  return (
    <div className="p-0 m-2">
    <div className="overflow-x-auto ">
      <h2 className="text-xl  mb-2">Contacted Leads</h2>
      <table className="table-auto w-[100%] border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {/* <th className="shadow-sm px-0.5 py-0.5 text-center"> */}
            <th className="shadow-sm  text-center">
              <input
                type="checkbox"
                className="rounded border border-sm shadow"
                onChange={handleSelectAll}
                checked={selectedRows.length === contactedLeads.length}
              />
            </th>
            <th className="shadow-sm px-0.5 py-0.5 text-left font-normal">Lead</th>
            <th className="shadow-sm px-0.5 py-0.5 text-left font-normal">Status</th>
            <th className="shadow-sm px-0.5 py-0.5 text-left font-normal">
            Organization
            </th>
            <th className="shadow-sm px-0.5 py-0.5 text-left font-normal">Title</th>
            <th className="shadow-sm px-0.5 py-0.5 text-left font-normal">Email</th>
            <th className="shadow-sm px-0.5 py-0.5 text-left font-normal">Phone</th>
            <th className="shadow-sm px-0.5 py-0.5 text-left font-normal">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {contactedLeads.map((row) => (
            <tr
              key={`${row.id}-${row.phone}`}
              className={`${
                selectedRows.includes(row.id) ? "bg-blue-200" : ""
              }`} // Highlight row when selected
            >
              {/* <td className="shadow-sm px-0.5 py-0.5 text-center"> */}
              <td className="shadow-sm  text-center">
                <input
                  type="checkbox"
                  className="rounded border border-sm"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleRowSelect(row.id)}
                />
              </td>
              <td className="shadow-sm px-0.5 py-0.5">{row.lead}</td>
              <td className="shadow-sm px-0.5 py-0.5">
                {row.status && (
                  <button
                    className={`w-full text-white text-center p-0.5  rounded ${
                      row.status === "newLead"
                        ? "bg-orange-400"
                        : row.status === "contacted"
                        ? "bg-blue-600"
                        : row.status === "attemptedToContact"
                        ? "bg-red-400"
                        : row.status === "qualified"
                        ? "bg-green-400"
                        : row.status === "unqualified"
                        ? "bg-red-600"
                        : "bg-gray-300" // default case if no match
                    }`}
                  >
                    {statusMapping[row.status] || row.status}
                  </button>
                )}
              </td>
              <td className="shadow-sm px-0.5 py-0.5">{row.organization}</td>
              <td className="shadow-sm px-0.5 py-0.5">{row.title}</td>
              <td className="shadow-sm px-0.5 py-0.5">{row.email}</td>
              <td className="shadow-sm px-0.5 py-0.5">{row.phone}</td>
              <td className="shadow-sm px-0.5 py-0.5">{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ContactedLeads;
