import React, { useState } from "react";

const QuotationDocs = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setSelectedFile(file); // Update state with the selected file
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
        <div className="absolute top-full mt-2 left-0 bg-white shadow-lg border rounded p-4 w-72 z-50">
          <h3 className="text-lg font-semibold mb-2">Attach Files</h3>
          {/* File Upload */}
          <input
            type="file"
            onChange={handleFileChange} // Handle file selection
            className="block w-full border border-gray-300 rounded px-2 py-1 text-sm mb-4"
          />
          {/* Display Selected File */}
          {selectedFile && (
            <div className="mt-2 text-sm text-gray-700">
              <p>
                <strong>Selected File:</strong> {selectedFile.name}
              </p>
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
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
