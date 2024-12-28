import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const LeadStatusModal = ({
  showStatusModal,
  closeStatusModal,
  updateStatusToContacted,
  updateStatusToQualified,
  selectedLeadId,
}) => {
  if (!showStatusModal) return null;
  console.log("selectedLeadId:", selectedLeadId);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 ">
        <div className="flex justify-between items-center">
          <h3 className="text-xl   mb-4 text-center">Update Lead Status</h3>
          <div
            onClick={closeStatusModal}
            className="cursor-pointer text-gray-600 hover:text-gray-900"
          >
            <AiOutlineClose />
          </div>
        </div>

        <div className="flex flex-col gap-1 justify-center">
          <button className="bg-orange-400 text-white px-1 py-2 rounded">
            New Lead
          </button>
          <button
            onClick={() => updateStatusToContacted(selectedLeadId)}
            className="bg-blue-600 text-white px-1 py-2 rounded"
          >
            Contacted
          </button>
          <button className="bg-red-400 text-white px-1 py-2 rounded">
            Attempted to Contact
          </button>
          <button
            onClick={() => updateStatusToQualified(selectedLeadId)} // Pass the selectedLead.id
            className="bg-green-400 text-white px-1 py-2  rounded"
          >
            Qualified
          </button>
          <button className="bg-red-600 text-white px-1 py-2 rounded">
            Unqualified
          </button>
          <hr className="mt-4 border-gray-400" />
          <button className="bg-none text-black px-4 py-1 rounded">
            Edit Labels
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadStatusModal;
