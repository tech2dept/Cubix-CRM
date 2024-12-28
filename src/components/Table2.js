// Main Leads Table Component
import React, { useState, useEffect } from 'react';
import TableRow from './TableRow';
import LeadModal from './LeadModal';
import DeleteModal from './DeleteModal';

const LeadsTable = () => {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    const storedRows = JSON.parse(localStorage.getItem('leads')) || [];
    setRows(storedRows);
  }, []);

  useEffect(() => {
    localStorage.setItem('leads', JSON.stringify(rows));
  }, [rows]);

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleAddRow = () => {
    const newRow = { id: Date.now(), lead: '', status: 'New' };
    setRows((prev) => [...prev, newRow]);
  };

  const handleDeleteRows = () => {
    setRows((prev) => prev.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    setShowDeleteModal(false);
  };

  const openLeadModal = (lead) => {
    setSelectedLead(lead);
    setShowLeadModal(true);
  };

  const closeLeadModal = () => {
    setSelectedLead(null);
    setShowLeadModal(false);
  };

  const updateLead = (updatedLead) => {
    setRows((prev) =>
      prev.map((row) => (row.id === updatedLead.id ? updatedLead : row))
    );
    closeLeadModal();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Leads Table</h1>
      <button onClick={handleAddRow} className="btn btn-primary mb-4">
        Add Lead
      </button>
      <button
        onClick={() => setShowDeleteModal(true)}
        className="btn btn-danger mb-4 ml-2"
        disabled={selectedRows.length === 0}
      >
        Delete Selected
      </button>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Select</th>
            <th>Lead</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              selectedRows={selectedRows}
              handleRowSelect={handleRowSelect}
              openLeadModal={openLeadModal}
            />
          ))}
        </tbody>
      </table>

      {showLeadModal && (
        <LeadModal
          selectedLead={selectedLead}
          onClose={closeLeadModal}
          onSave={updateLead}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleDeleteRows}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default LeadsTable;










// <div className="relative flex justify-end mb-4">
//   <input
//     type="text"
//     className="w-64 py-2 pl-10 pr-4 rounded-lg bg-white text-black placeholder-gray-400 border border-none shadow-sm"
//     placeholder="Search table..."
//     value={searchTerm}
//     onChange={(e) => handleSearch(e.target.value)}
//   />
//   {/* Search Icon */}
//   <div className="absolute left-auto right-[17rem] top-1/2 transform -translate-y-1/2">
//     <AiOutlineSearch className="text-gray-500" />
//   </div>
//   {/* Clear Icon */}
//   {searchTerm && (
//     <div
//       className="absolute right-[4.5rem] top-1/2 transform -translate-y-1/2 cursor-pointer"
//       onClick={() => handleSearch("")} // Clear the search term when clicked
//     >
//       <AiOutlineClose className="text-gray-500" />
//     </div>
//   )}
// </div>
