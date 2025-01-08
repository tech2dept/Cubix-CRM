import React, { useEffect, useState } from "react";
import AddProductsModal from "../modals/AddProductsModal";

const ProductsInfo = ({ lead, productEntryInAllEntries }) => {
  const [addProductModal, setAddProductModal] = useState(false);
  const [productEntries, setProductEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  // Load product entries from localStorage on component mount
  useEffect(() => {
    const savedProductEntries = localStorage.getItem("productEntries");
    if (savedProductEntries) {
      setProductEntries(JSON.parse(savedProductEntries));
    }
  }, []);

  // Save product entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("productEntries", JSON.stringify(productEntries));
  }, [productEntries]);

  const onAddProduct = () => {
    setAddProductModal(true);
  };

  const handleClose = () => {
    setAddProductModal(false);
  };

  const updateLeadProductTimeline = (productEntryTimeline) => {
    setProductEntries((prevEntries) => [
      ...prevEntries,
      productEntryTimeline.productDetails.productFormData,
    ]);

    productEntryInAllEntries(productEntryTimeline);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditRowData({ ...productEntries[index] });
  };

  const handleChange = (e, field) => {
    setEditRowData({ ...editRowData, [field]: e.target.value });
  };

  const handleSave = () => {
    setProductEntries((prevEntries) =>
      prevEntries.map((entry, index) =>
        index === editingIndex ? editRowData : entry
      )
    );
    setEditingIndex(null);
    setEditRowData({});
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditRowData({});
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === productEntries.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(productEntries.map((_, index) => index));
    }
  };

  const handleDeleteSelected = () => {
    const filteredEntries = productEntries.filter(
      (_, index) => !selectedRows.includes(index)
    );
    setProductEntries(filteredEntries);
    setSelectedRows([]);
  };

  return (
    <div className="productsContainer rounded px-0 py-0 mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-center my-3">
          Products Information
        </h2>
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={onAddProduct}
        >
          Add Product
        </button>
      </div>

      <div className="my-4 bg-white text-center rounded-sm">
        {productEntries.length === 0 ? (
          <p>You haven't added any products yet. Click 'Add Product' to start!</p>
        ) : (
          <>
            {selectedRows.length>0 &&
            <div className="flex justify-end mb-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteSelected}
                disabled={selectedRows.length === 0}
                >
                Delete Selected
              </button>
            </div>
            }


            <table className="border-collapse table-auto w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === productEntries.length}
                      onChange={handleSelectAll}
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
                {productEntries.map((product, index) => (
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
                        onChange={() => handleSelectRow(index)}
                      />
                    </td>
                    {Object.keys(product).map((field, fieldIndex) => (
                      <td key={fieldIndex} className="py-4 px-4 text-gray-700">
                        {editingIndex === index ? (
                          <input
                            type="text"
                            value={editRowData[field]}
                            onChange={(e) => handleChange(e, field)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          product[field]
                        )}
                      </td>
                    ))}
                    <td className="py-4 px-4">
                      {editingIndex === index ? (
                        <div className="flex gap-2">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={handleSave}
                          >
                            Save
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {addProductModal && (
          <AddProductsModal
            handleClose={handleClose}
            lead={lead}
            updateLeadProductTimeline={updateLeadProductTimeline}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsInfo;
