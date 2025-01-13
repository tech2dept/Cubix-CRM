import React from "react";

const Settings = ({ rowsPerPage,setRowsPerPage }) => {
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <>
      <h3 className="p-4 text-lg font-semibold text-gray-800 mb-4">Settings</h3>
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-xs mx-4">
      <div className="flex items-center justify-between">
        <label htmlFor="rowsPerPage" className="text-sm text-gray-600">
          Rows per page on Deals:
        </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="block w-28 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
    </>

  );
};

export default Settings;
