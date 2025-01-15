import React, { useState } from "react";

export default function EscalateLead({ lead, updateLeadActivityTimeline, handleClose }) {
  const [assignedTo, setAssignedTo] = useState("");
  console.log('lead from escalate lead',lead)

  // Dummy data for assignees
  const dummyAssignees = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
  ];

  const handleChange = (e) => {
    setAssignedTo(e.target.value);
  };

  const handleSubmit = () => {
    if (!assignedTo) {
      alert("Please select a person to assign the lead.");
      return;
    }

    const currentTimestamp = new Date().toISOString();

    const activityEntry = {
      date: new Date(currentTimestamp).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      activity: "Lead escalated",
      assignedTo,
      notes: `Lead escalated to ${assignedTo}.`,
    };

    updateLeadActivityTimeline(lead.id, activityEntry);
    handleClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[40vw] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Escalate Lead</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>
        <div>
          <p className="text-gray-700 mb-4">
            Escalate lead <strong>{lead.lead}</strong> to a new assignee.
          </p>
          <label className="block text-sm font-medium mb-2">Assign To</label>
          <select
            value={assignedTo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="" disabled>
              Select an assignee
            </option>
            {dummyAssignees.map((assignee) => (
              <option key={assignee.id} value={assignee.name}>
                {assignee.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            onClick={handleClose}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
