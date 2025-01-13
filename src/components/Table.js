import React, { useState, useRef } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import products from "../utils/products.png";

import LeadStatusModal from "../modals/LeadStatusModal";
import LeadDeleteModal from "../modals/LeadDeleteModal";
import LeadSelectModal from "../modals/LeadSelectModal";
import LeadFilterModal from "../modals/LeadFilterModal";
import filter from "../utils/filter.png";


import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

const TableComponent = ({ rows, setRows }) => {
  console.log("rows in table", rows);
  const [filters, setFilters] = useState({
    leadCreateDate: "",
    lastActivityDate: "",
    leadStatus: "",
    leadSource: "",
    coordinator: "",
    salesBy: "",
  });

  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [filteredRows, setFilteredRows] = useState(rows);
  const tableEndRef = useRef(null);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const filtered = rows.filter((row) => {
      return (
        (!filters.leadCreateDate ||
          row.leadCreateDate === filters.leadCreateDate) &&
        (!filters.lastActivityDate ||
          row.lastActivityDate === filters.lastActivityDate) &&
        (!filters.leadStatus || row.status === filters.leadStatus) &&
        (!filters.leadSource || row.leadSource === filters.leadSource) &&
        (!filters.coordinator || row.coordinator === filters.coordinator) &&
        (!filters.salesBy || row.salesBy === filters.salesBy)
      );
    });
    setFilteredRows(filtered);
  };

  const resetFilters = () => {
    setFilters({
      leadCreateDate: "",
      lastActivityDate: "",
      leadStatus: "",
      leadSource: "",
      coordinator: "",
      salesBy: "",
    });
    setFilteredRows(rows);
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null); // Track selected lead for the modal
  const [showModal, setShowModal] = useState(false); // To control the visibility of the modal

  const [showStatusModal, setShowStatusModal] = useState(false); // To control the visibility of the modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // To control the visibility of the modal

  const [contactedLeads, setContactedLeads] = useState(
    JSON.parse(localStorage.getItem("contactedLeads")) || [] // Initialize from localStorage if available
  );

  const [qualifiedLeads, setQualifiedLeads] = useState(
    JSON.parse(localStorage.getItem("qualifiedLeads")) || [] // Initialize from localStorage if available
  );

  // const addBlankRow = () => {
    // const blankRow = {
    // id: rows.length + 1, // Unique ID for the new row
    //   id: Date.now(), // Unique ID for the new row
    //   lead: "",
    //   status: "",
    //   organization: "",
    //   title: "",
    //   email: "",
    //   phone: "",
    //   notes: "",
    // };
    // setRows([...rows, blankRow]); // Add the blank row to the table

    const addBlankRow = () => {
      const newRow = {
        id: Date.now(),
        lead: "",
        status: "newLead",
        organization: "",
        title: "",
        email: "",
        phone: "",
        notes: "",
      };
    
  // Add the new row to the table by updating the state
  // setRows((prevRows) => {
    // const updatedRows = [...prevRows, newRow]; // Create the updated rows array
    // localStorage.setItem("rows", JSON.stringify(updatedRows)); // Update localStorage
    // return updatedRows; // Return the updated rows state
  // });

  setRows((prevRows)=>[...prevRows,newRow])

  // Optionally, scroll to the end of the table after adding the row
  // setTimeout(() => {
  //   tableEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, 0);
};

  const statusMapping = {
    newLead: "New Lead",
    contacted: "Contacted",
    attemptedToContact: "Attempted",
    qualified: "Qualified",
    unQualified: "Unqualified",
  };

  // const handleRowSelect = (id) => {
  //   setSelectedRows((prev) =>
  //     prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
  //   );
  // };

  // Handle row selection/deselection
  const handleRowSelect = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        // Deselect row
        const newSelectedRows = prevSelected.filter((rowId) => rowId !== id);
        if (newSelectedRows.length === 0) {
          setShowModal(false); // Close the modal if no rows are selected
        }
        return newSelectedRows;
      } else {
        // Select row
        const newSelectedRows = [...prevSelected, id];
        setSelectedLead(rows.find((row) => row.id === id)); // Update selected lead for modal
        setShowModal(true); // Show the modal
        return newSelectedRows;
      }
    });
  };

  // Handle "Select All" checkbox toggle
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(rows.map((row) => row.id)); // Select all rows
      setSelectedLead(rows); // Set all rows to selected for modal
      setShowModal(true); // Show the modal
    } else {
      setSelectedRows([]); // Deselect all rows
      setShowModal(false); // Close the modal
    }
  };

  // Open modal to view and edit the selected lead
  const openModal = (lead) => {
    setSelectedLead(lead); // Set the selected lead in the state
    setShowModal(true); // Show the modal
  };

  const openStatusModal = (lead) => {
    setSelectedLead(lead);
    setShowStatusModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false); // Hide the modal
    setSelectedLead(null); // Reset the selected lead
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
  };

  const openDeletePopup = (rows) => {
    setShowDeleteModal(true);
  };

  // Handle Delete - Removes selected rows from the list
  const handleDelete = (selectedRows) => {
    console.log("handleDelete from table", selectedRows);
    // Filter out the selected rows from the 'rows' state
    const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));

    // Update the state and localStorage to reflect the deletion
    setRows(updatedRows);
    localStorage.setItem("rows", JSON.stringify(updatedRows));

    // Close the modal after deletion
    closeModal();
  };

  // Handle Edit - Open an edit form (this is a placeholder function)
  const handleEdit = (rows) => {
    // Implement your edit logic here
    // For example, you could redirect to an edit page or show an edit form
    // console.log("Editing:", rows);
    closeModal(); // Optionally close the modal
  };

  // Handle View Lead - Show details of the selected lead(s)
  const handleViewLead = (rows) => {
    // Implement your view lead logic here
    // For example, redirect to a detailed view or open a details modal
    // console.log("Viewing lead details:", rows);
    closeModal(); // Optionally close the modal
  };

  const updateStatusToQualified = (leadId) => {
    // First, find the lead to update
    const leadToMove = rows.find((row) => row.id === leadId);

    if (!leadToMove) {
      console.error("Lead not found");
      return;
    }

    // Ensure timeline is an array or initialize it if not present
    const timeline = Array.isArray(leadToMove.timeline)
      ? leadToMove.timeline
      : [];

    // Create a new timeline entry for the status change
    const currentTimestamp = new Date().toISOString();
    const statusChangeTimeline = {
      date: currentTimestamp,
      activity: "Status changed to Qualified",
    };

    // Add the status change activity to the lead's timeline
    const updatedLead = {
      ...leadToMove,
      status: "qualified",
      timeline: [...timeline, statusChangeTimeline], // Add the new timeline entry
    };

    // Update the list of qualified leads
    const updatedQualifiedLeads = [...qualifiedLeads, updatedLead];
    setQualifiedLeads(updatedQualifiedLeads);

    // Remove the lead from the current rows list
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== leadId);

      // Save the updated rows and qualified leads to localStorage
      localStorage.setItem("rows", JSON.stringify(updatedRows));
      localStorage.setItem(
        "qualifiedLeads",
        JSON.stringify(updatedQualifiedLeads)
      );

      return updatedRows;
    });

    // Close the modal after updating
    setShowStatusModal(false);
  };

  const updateStatusToContacted = (leadId) => {
    // Find the lead to update
    const leadToMove = rows.find((row) => row.id === leadId);

    if (!leadToMove) return; // Guard against invalid ID

    // Update the lead's status to "Contacted"
    const updatedLead = { ...leadToMove, status: "contacted" };

    // Update the rows and remove the updated lead from the list
    setRows((prevRows) => prevRows.filter((row) => row.id !== leadId));

    // Add the updated lead to the contactedLeads list
    const updatedContactedLeads = [...contactedLeads, updatedLead];
    setContactedLeads(updatedContactedLeads);

    // Save the updated rows and contacted leads to localStorage
    localStorage.setItem(
      "rows",
      JSON.stringify(rows.filter((row) => row.id !== leadId))
    );
    localStorage.setItem(
      "contactedLeads",
      JSON.stringify(updatedContactedLeads)
    );

    setShowStatusModal(false);
  };

  // Update filteredRows whenever the search term changes
  // const handleSearch = (term) => {
  //   setSearchTerm(term);
  //   const lowercasedTerm = term.toLowerCase();
  //   setFilteredRows(
  //     rows.filter(
  //       (row) =>
  //         row.lead.toLowerCase().includes(lowercasedTerm) ||
  //         row.status.toLowerCase().includes(lowercasedTerm) ||
  //         row.organization.toLowerCase().includes(lowercasedTerm) ||
  //         row.title.toLowerCase().includes(lowercasedTerm) ||
  //         row.email.toLowerCase().includes(lowercasedTerm) ||
  //         row.phone.toLowerCase().includes(lowercasedTerm) ||
  //         row.notes.toLowerCase().includes(lowercasedTerm)
  //     )
  //   );
  // };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredRows(rows);
    } else {
      setFilteredRows(
        rows.filter((row) =>
          Object.values(row)
            .join(" ")
            .toLowerCase()
            .includes(term.toLowerCase())
        )
      );
    }
  };

  const updateRow = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
    setFilteredRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };


  ////////////////////////////////////////////////////////////////

  const getStatusClass = (status) => {
    switch (status) {
      case "newLead":
        return "bg-orange-400";
      case "contacted":
        return "bg-blue-600";
      case "attemptedToContact":
        return "bg-red-400";
      case "qualified":
        return "bg-green-400";
      case "unQualified":
        return "bg-red-600";
      default:
        return "bg-gray-300";
    }
  };

  // Define DataGrid columns
  const columns = [
    {
      field: "select",
      headerName: "",
      sortable: false,
      width: 50,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(params.row.id)}
          onChange={() => {
            setSelectedRows((prev) =>
              prev.includes(params.row.id)
                ? prev.filter((id) => id !== params.row.id)
                : [...prev, params.row.id]
            );
          }}
        />
      ),
    },
    { field: "lead", headerName: "Lead", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Button
          style={{
            width: "100%",
            color: "white",
            padding: "0.25rem",
            borderRadius: "0.25rem",
          }}
          className={getStatusClass(params.value)}
          onClick={() => console.log("Open Status Modal", params.row)}
        >
          {params.value}
        </Button>
      ),
    },
    { field: "organization", headerName: "Organization", flex: 1 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "notes", headerName: "Notes", flex: 1 },
  ];


  const calculateAgedDays = (leadEntryTime) => {
    const entryTime = new Date(leadEntryTime);
    const currentTime = new Date();
    const diffInMilliseconds = currentTime - entryTime;
  
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    return `Aged Days: ${diffInDays} days, ${diffInHours} hrs`;
  };
  


  return (
    <div className="m-2">
      {/* <h2 className="text-xl   mb-4">Leads Table</h2> */}
      <div className="flex items-center gap-10 text-center mb-4 ">
        {/* <h2 className="text-xl font-normal   mb-4">Leads</h2> */}
        {/* <div></div> */}
        <button
          onClick={addBlankRow}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
        >
          Add Lead
        </button>

        {/* Search Bar */}
        <div className="relative flex justify-end my-2 ">
          <input
            type="text"
            className=" py-2 pl-10 pr-4 rounded-lg  text-black placeholder-gray-400 border border-none shadow-sm bg-white w-full"
            placeholder="Search table..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {/* Search Icon */}
          <div className="absolute left-3  top-1/2 transform -translate-y-1/2 ">
            <AiOutlineSearch className="text-gray-500" />
          </div>

          {/* Clear Icon */}
          {searchTerm && (
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => handleSearch("")} // Clear the search term when clicked
            >
              <AiOutlineClose className="text-gray-500" />
            </div>
          )}
        </div>

        {/* filter button  */}
        <button
          className="flex items-center space-x-2 px-2 py-1 border border-none rounded bg-white hover:bg-gray-100"
          onClick={() =>
            document.getElementById("filterModal").classList.remove("hidden")
          }
        >
          <img src={filter} alt="filter-icon" className="w-6 h-6" />
          {/* <span className="text-sm text-gray-600">Filter</span> */}
        </button>
      </div>

      {/* Filter Modal */}
      <LeadFilterModal />

      <div>
        <div className="overflow-x-auto mt-4 max-h-[50vh] overflow-y-auto scrollbar-thin">
          <table className="table-auto w-[100%] border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="shadow-sm px-1 py-0.5 text-left">
                  <input
                    type="checkbox"
                    className="rounded border border-sm shadow"
                    checked={selectedRows.length === rows.length}
                    // onChange={handleSelectAll}
                    onChange={(e) =>
                      setSelectedRows(
                        e.target.checked
                          ? filteredRows.map((row) => row.id)
                          : []
                      )
                    }
                  />
                </th>
                <th className="shadow-sm px-1 py-0.5 text-left font-normal">
                  Lead
                </th>
                <th className="shadow-sm px-1 py-0.5 text-left font-normal">
                  Status
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
              {/* {rows.map((row, index) => ( */}
              {filteredRows.map((row, index) => (
                // <tr
                //   key={`${row.id}-${index}`}
                //   className={` ${
                //     selectedRows.includes(row.id) ? "bg-blue-200" : ""
                //   }`} // Highlight row when selected
                // >

                <tr key={row.id}>
                  <td className="shadow-sm px-1 py-0.5 text-center">
                    <div className=" flex justify-right items-center gap-1.5">
                      <input
                        type="checkbox"
                        className="rounded border border-sm"
                        checked={selectedRows.includes(row.id)}
                        // onChange={() => {
                        //   handleRowSelect(row.id); // Select/deselect the row
                        //   if (!selectedRows.includes(row.id)) {
                        //     openModal(row); // Open modal only if the row is selected
                        //   } else {
                        //     closeModal(); // Close modal if deselected
                        //   }
                        // }}
                        onChange={() =>
                          setSelectedRows((prev) =>
                            prev.includes(row.id)
                              ? prev.filter((id) => id !== row.id)
                              : [...prev, row.id]
                          )
                        }
                      />

                      {row.leadIsItemAdded && (
                        <img
                          src={products}
                          alt="products-icon"
                          className="w-1 h-1 bg-green-500 text-xs p-1 rounded-lg"
                        />
                      )}
                    </div>
                  </td>

                  <td className=" shadow-sm px-1 py-0.5   ">
                    <div className="flex items-start justify-between gap-2 cursor-pointer">
                      <div>
                      {row.lead}
                      </div>


                      <div className="text-xs font-thin bg-gray-400 px-0.5 rounded-lg text-white">
                      {calculateAgedDays(row.leadEntryTime)}
                      </div>

                    </div>
                  </td>
                  <td
                    className={`shadow-sm px-1 py-0.5 cursor-pointer `}
                    onClick={() => openStatusModal(row)}
                  >
                    {row.status && (
                      <button
                        // onClick={() => updateStatusToQualified(row.id)}
                        className={`w-full text-white text-center p-1 rounded ${
                          row.status === "newLead"
                            ? "bg-orange-400"
                            : row.status === "contacted"
                            ? "bg-blue-600"
                            : row.status === "attemptedToContact"
                            ? "bg-red-400"
                            : row.status === "qualified"
                            ? "bg-green-400"
                            : row.status === "unQualified"
                            ? "bg-red-600"
                            : "bg-gray-300" // default case if no match
                        }`}
                      >
                        {statusMapping[row.status] || row.status}{" "}
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

          {/* ///////////////////////////// */}

          {/* <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              getRowId={(row) => row.id}
              checkboxSelection={false} // We handle checkboxes manually
              disableSelectionOnClick
              density="compact"
              hideFooter
              onRowSelectionModelChange={(ids) => {
                setSelectedRows(ids); // Update selected rows
              }}
            />
          </Box> */}
        </div>
      {/* </div> */}

      {showModal && selectedLead && (
        <LeadSelectModal
          closeModal={closeModal}
          selectedRows={selectedRows}
          selectedLead={selectedLead}
          openDeletePopup={openDeletePopup}
          handleEdit={handleEdit}
          handleViewLead={handleViewLead}
        />
      )}

      {/* Modal for deleting lead  */}
      {showDeleteModal && selectedLead && (
        <LeadDeleteModal
          closeModal={closeModal}
          selectedRows={selectedRows}
          selectedLead={selectedLead}
          handleDelete={handleDelete}
        />
      )}

      {/* Modal Dialog for selecting lead status */}
      {showStatusModal && (
        <LeadStatusModal
          showStatusModal={showStatusModal}
          closeStatusModal={closeStatusModal}
          updateStatusToContacted={updateStatusToContacted}
          updateStatusToQualified={updateStatusToQualified}
          selectedLeadId={selectedLead.id}
        />
      )}
    </div>
  );
};

export default TableComponent;
