import React from 'react'

const FilterModal = ({ filters, setFilters, applyFilters }) => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFilters((prev) => ({ ...prev, [name]: value }));
    };
  
    return (
      <div className="absolute top-10 right-0 bg-white p-4 shadow-md rounded-md">
        <div>
          <label className="block text-sm font-medium">Lead Create Date</label>
          <input
            type="date"
            name="createDate"
            value={filters.createDate}
            onChange={handleInputChange}
            className="w-full mt-1 border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Activity Date</label>
          <input
            type="date"
            name="lastActivityDate"
            value={filters.lastActivityDate}
            onChange={handleInputChange}
            className="w-full mt-1 border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Lead Status</label>
          <select
            name="leadStatus"
            value={filters.leadStatus}
            onChange={handleInputChange}
            className="w-full mt-1 border-gray-300 rounded"
          >
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Lead Source</label>
          <select
            name="leadSource"
            value={filters.leadSource}
            onChange={handleInputChange}
            className="w-full mt-1 border-gray-300 rounded"
          >
            <option value="">All</option>
            <option value="online">Online</option>
            <option value="referral">Referral</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Coordinator</label>
          <input
            type="text"
            name="coordinator"
            value={filters.coordinator}
            onChange={handleInputChange}
            className="w-full mt-1 border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Sales By</label>
          <input
            type="text"
            name="salesBy"
            value={filters.salesBy}
            onChange={handleInputChange}
            className="w-full mt-1 border-gray-300 rounded"
          />
        </div>
        <button
          onClick={applyFilters}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>
    );
  };
 

export default FilterModal


 