import React, { useEffect, useState } from "react";
import Drawer from "./Drawer";
import Pagination from "@mui/material/Pagination";
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const WonLeads = ({ rows, setRows ,rowsPerPage}) => {


  useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rows)); // Save rows to localStorage
  }, [rows]);

  const [wonLeads, setWonLeads] = useState(
    JSON.parse(localStorage.getItem("wonLeads")) || [] // Initialize from localStorage if available
  );

  const [selectedRows, setSelectedRows] = useState([]); // State for selected rows

  useEffect(() => {
    localStorage.setItem("wonLeads", JSON.stringify(wonLeads)); // Save contacted leads to localStorage
  }, [wonLeads]);

    const [showDrawer, setShowDrawer] = useState(false); // Drawer visibility state


    const viewLead = (id) => {
      // const lead = qualifiedLeads.find((lead) => lead.id === id);
      // setSelectedLead(lead);
      setShowDrawer(true); // Show Drawer
    };




    const handleInputChange = (e, field) => {
      // setSelectedLead((prevLead) => ({
        // ...prevLead,
        // [field]: e.target.value,
      // }));
    };
  
    const handleSave = (e) => {
    //   e.preventDefault();
  
    //     // Loop through the fields of selectedLead to detect changes
    // const updatedLead = { ...selectedLead };
    // // const leadTimeline = 
  
  
    // let isChanged = false; // Flag to track if any field has changed
    // const updatedHistory = updatedLead.history || []; // Ensure history exists
  
    // // Compare fields and add changes to history
    // Object.keys(updatedLead).forEach((field) => {
    //   const oldValue = qualifiedLeads.find((lead) => lead.id === selectedLead.id)[field];
    //   const newValue = updatedLead[field];
    //   if (oldValue !== newValue) {
    //     // If the field has changed, add an activity to the history
    //     updatedHistory.push({
    //       date: new Date().toISOString(),
    //       activity: `Field "${field}" updated`,
    //       note: `Changed from "${oldValue}" to "${newValue}"`,
    //     });
  
    //     isChanged = true; // Set flag to true if any field has changed
    //   }
    // });
  
    // // Only update history and save if there are changes
    // if (isChanged) {
    //   updatedLead.history = updatedHistory;
    //   setHistory(updatedHistory); // Update history state
    //   console.log('updatedLead.leadHistory',updatedLead.leadHistory)
    //   console.log('updatedLead.history',updatedLead.history)
    // }
  
  
    //   const updatedLeads = qualifiedLeads.map((lead) =>
    //     lead.id === selectedLead.id ? selectedLead : lead
    //   );
    //   setQualifiedLeads(updatedLeads);
    //   localStorage.setItem("qualifiedLeads", JSON.stringify(updatedLeads));
    //   setShowDrawer(false); // Close Drawer after saving
    };




//   const stageMapping = {
//     new: "New",
//     discovery: "Discovery",
//     proposal: "Proposal",
//     negotiation: "Negotiation",
//     won: "Won",
//     lost: "Lost",
//   };

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
      setSelectedRows(wonLeads.map((row) => row.id)); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };



    const [currentPage, setCurrentPage] = useState(1);
    // const rowsPerPage = rowsPerPage; // Number of rows per page
  
    // Calculate the rows to display on the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentRows = wonLeads.slice(startIndex, startIndex + rowsPerPage);
  
    // Handle page change
    const handleChangePage = (event, newPage) => {
      setCurrentPage(newPage);
    };


  return wonLeads.length> 0? ( 
    
    <div className="py-6">
      <h2 className="text-xl mb-2">Won Leads</h2>
      {/* {selectedRows.length>0 &&
          <div className="mb-2">
            <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            disabled={selectedLeads.length === 0}
            >
              Delete Selected
            </button>
          </div>
            } */}
      <table className="table-auto w-[100%] border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="shadow-sm px-1 py-0.5 text-center">
              <input
                type="checkbox"
                className="rounded border border-sm shadow"
                onChange={handleSelectAll}
                checked={selectedRows.length === wonLeads.length}
              />
            </th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">Lead</th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">Stage</th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">Organization</th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">Title</th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">Email</th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">Phone</th>
            <th className="shadow-sm px-1 py-0.5 text-left font-normal">Notes</th>
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
              <td
                    className="shadow-sm px-1 py-0 cursor-pointer "
                    onClick={() => viewLead(row.id)}
                  >
                    {row.lead}
                  </td>
              <td className="shadow-sm px-1 py-0.5">
                {/* {row.stage && (
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
                )} */}

                <button className="w-full text-white text-center p-1 my-0.5 rounded bg-green-400">Won</button>
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
                count={Math.ceil(wonLeads.length / rowsPerPage)} // Total number of pages
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


      <Drawer
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            // selectedLead={selectedLead}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            // leadsWithHistory={history}
            // stageMapping={stageMapping}
            // updatedLead.leadHistory
            // leadTimeline={selectedLead.leadTimeline}
          />
    </div>
  ) : (
    <p className="text-center text-gray-500">No Won leads available.</p> // Fallback message
  );
};

export default WonLeads;
