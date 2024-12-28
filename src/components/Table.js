import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

import LeadStatusModal from "../modals/LeadStatusModal";
import LeadDeleteModal from "../modals/LeadDeleteModal";
import LeadSelectModal from "../modals/LeadSelectModal";
import filter from "../utils/filter.png";

const TableComponent = ({ rows, setRows }) => {
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

  const addBlankRow = () => {
    const blankRow = {
      // id: rows.length + 1, // Unique ID for the new row
      id: Date.now(), // Unique ID for the new row
      lead: "",
      status: "",
      organization: "",
      title: "",
      email: "",
      phone: "",
      notes: "",
    };
    setRows([...rows, blankRow]); // Add the blank row to the table
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
    console.log("Editing:", rows);
    closeModal(); // Optionally close the modal
  };

  // Handle View Lead - Show details of the selected lead(s)
  const handleViewLead = (rows) => {
    // Implement your view lead logic here
    // For example, redirect to a detailed view or open a details modal
    console.log("Viewing lead details:", rows);
    closeModal(); // Optionally close the modal
  };

  const updateStatusToQualified = (leadId) => {
    // First, find the lead to update
    const leadToMove = rows.find((row) => row.id === leadId);

    if (leadToMove) {
      // Update the status of the lead to "Qualified" and add it to qualifiedLeads
      const updatedLead = { ...leadToMove, status: "qualified" };
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
    }

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
  const handleSearch = (term) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase();
    setFilteredRows(
      rows.filter(
        (row) =>
          row.lead.toLowerCase().includes(lowercasedTerm) ||
          row.status.toLowerCase().includes(lowercasedTerm) ||
          row.organization.toLowerCase().includes(lowercasedTerm) ||
          row.title.toLowerCase().includes(lowercasedTerm) ||
          row.email.toLowerCase().includes(lowercasedTerm) ||
          row.phone.toLowerCase().includes(lowercasedTerm) ||
          row.notes.toLowerCase().includes(lowercasedTerm)
      )
    );
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
      <div
        id="filterModal"
        className="hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
        style={{ zIndex: 70 }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Add Filters</h2>
            <div className="flex space-x-4">
              <button
                onClick={resetFilters}
                className="text-blue-500 hover:underline text-sm"
              >
                Clear All
              </button>
              <button
                onClick={() =>
                  document.getElementById("filterModal").classList.add("hidden")
                }
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="space-y-4">
            {/* Create Date */}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-700">Create Date</span>
              <select className="text-gray-500 text-sm border border-gray-300 rounded px-2 py-1">
                <option value="">Select</option>
                <option value="today">Today</option>
                <option value="last_week">Last Week</option>
                <option value="last_month">Last Month</option>
              </select>
            </div>

            {/* Last Activity Date */}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-700">Last Activity Date</span>
              <select className="text-gray-500 text-sm border border-gray-300 rounded px-2 py-1">
                <option value="">Select</option>
                <option value="yesterday">Yesterday</option>
                <option value="last_week">Last Week</option>
                <option value="last_month">Last Month</option>
              </select>
            </div>

            {/* Lead Status */}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-700">Lead Status</span>
              <select className="text-gray-500 text-sm border border-gray-300 rounded px-2 py-1">
                <option value="">Select</option>
                <option value="open">Contacted</option>
                <option value="closed">Qualified</option>
                <option value="declined">Unqualified</option>
              </select>
            </div>

            {/* Lead Source */}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-700">Lead Source</span>
              <select className="text-gray-500 text-sm border border-gray-300 rounded px-2 py-1">
                <option value="">Select</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="website">Website</option>
              </select>
            </div>

            {/* Coordinator */}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-700">Coordinator</span>
              <select className="text-gray-500 text-sm border border-gray-300 rounded px-2 py-1">
                <option value="">Select</option>
                <option value="john_doe">John Doe</option>
                <option value="jane_smith">Jane Smith</option>
                <option value="mike_jones">Mike Jones</option>
              </select>
            </div>

            {/* Advanced Filters */}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-700">Advanced Filters</span>
              <select className="text-gray-500 text-sm border border-gray-300 rounded px-2 py-1">
                <option value="">Select</option>
                <option value="high_value">High Value</option>
                <option value="recent_updates">Recently Updated</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            {/* Sales By */}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-700">Sales By</span>
              <select className="text-gray-500 text-sm border border-gray-300 rounded px-2 py-1">
                <option value="">Select</option>
                <option value="team_a">Team A</option>
                <option value="team_b">Team B</option>
                <option value="team_c">Team C</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto mt-4">
          <table className="table-auto w-[100%] border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="shadow-sm px-1 py-0.5 text-center">
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
                <tr
                  key={`${row.id}-${index}`}
                  className={` ${
                    selectedRows.includes(row.id) ? "bg-blue-200" : ""
                  }`} // Highlight row when selected
                >
                  <td className="shadow-sm px-1 py-0.5 text-center">
                    <input
                      type="checkbox"
                      className="rounded border border-sm"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => {
                        handleRowSelect(row.id); // Select/deselect the row
                        if (!selectedRows.includes(row.id)) {
                          openModal(row); // Open modal only if the row is selected
                        } else {
                          closeModal(); // Close modal if deselected
                        }
                      }}

                      // onChange={() => {
                      //   setSelectedRows((prev) =>
                      //     prev.includes(row.id)
                      //       ? prev.filter((id) => id !== row.id)
                      //       : [...prev, row.id]
                      //   );
                      // }}
                    />
                  </td>
                  <td className="shadow-sm px-1 py-0.5">{row.lead}</td>
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
      </div>

      {/* Modal for selecting lead  */}
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
