import React, { useState } from "react";
import AddProductsModal from "../modals/AddProductsModal";

const ProductsDetails = ({
  lead,
  productDetails,
  productEntryInAllEntries,
  setShowProducts,
}) => {
  const [addProductModal, setAddProductModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [productEntries, setProductEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editRowData, setEditRowData] = useState({});

  const onAddProduct = () => {
    setAddProductModal(true);
  };

  const handleClose = () => {
    setShowProducts(false); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black focus:outline-none"
          aria-label="Close"
        >
          ✖
        </button>

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Products Information</h2>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 mr-8 rounded hover:bg-green-700"
            onClick={onAddProduct}
          >
            Add Product
          </button>
        </div>

        {/* Product Table */}
        <div className="my-4 bg-white text-center rounded-sm">
          {productDetails.length === 0 ? (
            <p>You haven't added any products yet. Click 'Add Product' to start!</p>
          ) : (
            <table className="border-collapse table-auto w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === productDetails.length}
                      onChange={() =>
                        setSelectedRows(
                          selectedRows.length === productDetails.length
                            ? []
                            : productDetails.map((_, i) => i)
                        )
                      }
                    />
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Item Code</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Description</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Unit</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">
                    Current Stock
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Quantity</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Price</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productDetails.map((entry, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() =>
                          setSelectedRows((prev) =>
                            prev.includes(index)
                              ? prev.filter((i) => i !== index)
                              : [...prev, index]
                          )
                        }
                      />
                    </td>
                    <td className="py-4 px-4 text-gray-700">{entry.leadItemCode}</td>
                    <td className="py-4 px-4 text-gray-700">
                      {entry.leadItemDescription}
                    </td>
                    <td className="py-4 px-4 text-gray-700">{entry.leadItemUnit}</td>
                    <td className="py-4 px-4 text-gray-700">
                      {entry.leadItemCurrentStock}
                    </td>
                    <td className="py-4 px-4 text-gray-700">{entry.leadItemQuantity}</td>
                    <td className="py-4 px-4 text-gray-700">{entry.leadItemPrice}</td>
                    <td className="py-4 px-4 text-gray-700">{entry.leadItemAmount}</td>
                    <td className="py-4 px-4">
                      {/* Actions for edit or save */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
