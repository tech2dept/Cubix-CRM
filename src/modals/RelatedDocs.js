import React, { useState } from "react";

const RelatedDocs = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
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
              className="block w-full border border-gray-300 rounded px-2 py-1 text-sm"
            />
            {/* Document Links */}
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>
                <a href="#doc1" className="text-blue-500 hover:underline">
                  Document1.pdf
                </a>
              </li>
              <li>
                <a href="#doc2" className="text-blue-500 hover:underline">
                  Document2.pdf
                </a>
              </li>
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
