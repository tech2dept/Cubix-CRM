import React from 'react'
import checkedList from "../utils/checkedList.png";
import {
    AiOutlineDelete,
    AiOutlineEye,
    AiOutlineEdit,
} from "react-icons/ai";


const LeadSelectModal = ({
    closeModal,
    selectedRows,
    selectedLead,
    openDeletePopup,
    handleEdit,
    handleViewLead

}) => {

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
    <div className=" bg-white rounded-lg shadow-lg p-3 max-w-sm w-full text-center relative">
      {/* image section  */}
      <div className="flex justify-center mb-4">
        <img
          src={checkedList}
          alt="Lead Icon"
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
            Are you sure you want to perform actions for{" "}
            {selectedLead.lead} ?
          </span>
        ) : (
          <span className="font-bold">
            Are you sure you want to perform actions for these{" "}
            {selectedRows.length} leads?
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="  flex justify-between">
        {/* Delete Button */}
        <button
          className="px-1 py-0.5 bg-white text-black rounded border border-gray-300 hover:bg-gray-200 flex items-center space-x-2"
          onClick={() => {
            openDeletePopup(selectedRows); // Call delete popup
          }}
        >
          <AiOutlineDelete className="text-lg" /> {/* Delete Icon */}
          <span>Delete</span>
        </button>

        {/* Edit Button */}
        <button
          className="px-1 py-0.5 bg-white text-black rounded border border-gray-300 hover:bg-gray-200 flex items-center space-x-2"
          onClick={() => {
            handleEdit(selectedRows); // Call edit function
          }}
        >
          <AiOutlineEdit className="text-lg" /> {/* Edit Icon */}
          <span>Edit</span>
        </button>

        {/* View Lead Button */}
        <button
          className="px-1 py-0.5 bg-white text-black rounded border border-gray-300 hover:bg-gray-200 flex items-center space-x-2"
          onClick={() => {
            handleViewLead(selectedRows); // Call view lead function
          }}
        >
          <AiOutlineEye className="text-lg" /> {/* View Icon */}
          <span>View Lead</span>
        </button>

        {/* Cancel Button */}
        <button
          className="px-1 py-0.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default LeadSelectModal
