import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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


  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  // Calculate the rows to display on the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = lostLeads.slice(startIndex, startIndex + rowsPerPage);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
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
  {currentRows.map((row) => (
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


            {/* Pagination Component */}
            <div className="flex justify-end mt-4">
            <Stack spacing={2}>
        <Pagination
          count={Math.ceil(lostLeads.length / rowsPerPage)} // Total number of pages
          page={currentPage}
          onChange={handleChangePage}
          // color="primary"
          // variant="outlined"
          // shape="rounded" 
          size="small"
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
        </Stack>
        
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500">No Lost leads available.</p> // Fallback message
  );
};

export default LostLeads;
