import React, { useState } from "react";

const RelatedDocs = ({ selectedLead }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

  console.log("selectedLead from related docs", selectedLead);
  console.log("selectedLead from related docs2222", selectedLead.docs);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    setSelectedFile(file); // Update the state
  };

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={togglePopup}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Related Docs
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="absolute top-12 left-0 bg-white shadow-lg border rounded p-4 w-80 z-50">
          <h3 className="text-lg font-semibold mb-2">Related Documents</h3>
          <p className="text-sm mb-4">
            Attach or view related documents for this quotation.
          </p>
          <div className="flex flex-col gap-2">
            {/* File Upload */}
            <input
              type="file"
              onChange={handleFileChange} // Handle file change
              className="block w-full border border-gray-300 rounded px-2 py-1 text-sm"
            />
            {/* Display Selected File */}
            {selectedFile && (
              <div className="mt-2 text-sm text-gray-700">
                <p>
                  <strong>Selected File:</strong> {selectedFile.name}
                </p>
              </div>
            )}
            {/* Display Documents */}
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {selectedLead.docs &&
                selectedLead.docs
                  .filter((doc) => doc instanceof File || doc instanceof Blob) // Filter only valid docs
                  .map((doc, index) => (
                    <li key={index}>
                      <a
                        href={URL.createObjectURL(doc)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {doc.name}
                      </a>
                    </li>
                  ))}
              {(!selectedLead.docs || selectedLead.docs.length === 0) && (
                <p className="text-gray-500">No documents attached.</p>
              )}
            </ul>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={togglePopup}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition"
            >
              Close
            </button>
            <button
              onClick={togglePopup}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedDocs;
