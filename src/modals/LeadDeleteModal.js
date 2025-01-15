import React from "react";
import delete_Vector from "../utils/delete_Vector.jpg";
import {
    AiOutlineDelete,
  } from "react-icons/ai";

  const LeadDeleteModal = ({
    closeModal,
    selectedRows,
    selectedLead,
    handleDelete,
}) => {


  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center relative">
        {/* image section  */}
        <div className="flex justify-center mb-4">
          <img
            src={delete_Vector}
            alt="Delete Icon"
            className="w-1/2 h-auto max-w-xs"
          />
        </div>

        {/* Close Button */}
        <button
          className="absolute top-6 right-8 text-gray-500 hover:text-black"
          onClick={closeModal}
        >
          ✖
        </button>

        {/* Image Section */}

        {/* Title Section */}
        <div className="text-xl font-semibold text-black">
          {selectedRows.length === 1 ? "Lead Selected" : "Leads Selected"}
        </div>
        <div className="text-gray-700 mb-6">
          {/* Display different message based on the number of selected rows */}
          {selectedRows.length === 0 ? (
            <span className="font-bold">No leads selected</span>
          ) : selectedRows.length === 1 ? (
            <span className="font-bold">
              Are you sure you want to perform actions for {selectedLead.lead} ?
            </span>
          ) : (
            <span className="font-bold">
              Are you sure you want to perform actions for these{" "}
              {selectedRows.length} leads?
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          {/* Delete Button */}
          <button
            className="px-4 py-2 bg-gray-100 text-black rounded hover:bg-gray-300"
            onClick={() => {
              handleDelete(selectedRows); // Call delete function
              // openDeletePopup(selectedRows);  // Call delete popup
            }}
          >
            <div className="flex justify-between items-center gap-2">
              <AiOutlineDelete className="text-lg" />
              <span>Delete</span>
            </div>
          </button>

          {/* Cancel Button */}
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-300"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDeleteModal;
