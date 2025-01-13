import React from 'react'

const LeadFilterModal = ({resetFilters}) => {
    
  return (
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
  )
}

export default LeadFilterModal
