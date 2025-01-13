import React, { useState } from "react";

const QuotationDocs = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={togglePopup}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Quotation Docs
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="absolute top-12 left-0 mr-12 bg-white shadow-lg border rounded p-4 w-72 z-50">
          <h3 className="text-lg font-semibold mb-2">Attach Files</h3>
          <input
            type="file"
            className="block w-full border border-gray-300 rounded px-2 py-1 text-sm mb-4"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={togglePopup}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={togglePopup}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              Attach
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotationDocs;
