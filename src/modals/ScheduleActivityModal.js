import React, { useState } from "react";
import CalendarPicker from "../components/Calendar";

export default function ScheduleActivityPopup({ lead, updateLeadActivityTimeline, handleClose }) {
  const [formData, setFormData] = useState({
    activityType: "",
    summary: "",
    dueDate: "",
    assignedTo: "",
    notes: "",
  });

  const [selectedDateTime, setSelectedDateTime] = useState({
    date: null,
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectDateTime = ({ date, startTime, endTime }) => {
    setSelectedDateTime({ date, startTime, endTime });
  };

  const handleSubmit = () => {
    const { date, startTime, endTime } = selectedDateTime;
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
      dueDate: date
        ? new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        : null,
      timeRange: `${startTime} - ${endTime}`,
      summary: formData.summary,
      activity: `${formData.activityType} scheduled`,
      assignedTo: formData.assignedTo,
      notes: formData.notes,
    };

    console.log("Activity Entry:", activityEntry);
    updateLeadActivityTimeline(lead.id, activityEntry);
    handleClose(); // Close the popup
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Schedule Activity</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
            <select
              name="activityType"
              value={formData.activityType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select...</option>
              <option value="Call">Call</option>
              <option value="Meeting">Meeting</option>
              <option value="Email">Email</option>
              <option value="Follow-Up">Follow-Up</option>
              <option value="Demo">Demo</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
            <input
              type="text"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
            <input
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Log a Note</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500"
              rows={4}
            />
          </div>
        </div>

          <div className="md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <CalendarPicker onSelectDateTime={handleSelectDateTime} />
          </div>

        <div className="flex justify-end items-center mt-8 space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Submit
          </button>
          <button
            onClick={handleClose}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
