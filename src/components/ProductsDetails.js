import React, { useState, useEffect } from "react";
import AddProductsModal from "../modals/AddProductsModal";

const ProductsDetails = ({
  lead,
  productDetails,
  setShowProducts,
  productEntryInAllEntries,
}) => {
  const [addProductModal, setAddProductModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [products, setProducts] = useState(productDetails); // Use state to manage the product list

  // Sync productEntries with the parent component
  useEffect(() => {
    productEntryInAllEntries(products); // Notify parent component of product changes
  }, [products, productEntryInAllEntries]);

  const onAddProduct = () => {
    setAddProductModal(true); // Open modal for adding products
  };

  const handleClose = () => {
    setShowProducts(false); // Close the modal
  };

  // Handle changes when editing a product
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditRowData({ ...products[index] });
  };

  // Handle changes in the input fields
  const handleChange = (e, field) => {
    const value = e.target.type === "number" ? parseFloat(e.target.value) || "" : e.target.value;
    setEditRowData({ ...editRowData, [field]: value });
  };

  // Save the edited row
  const handleSave = () => {
    const updatedProducts = [...products];
    updatedProducts[editingIndex] = editRowData;
    setProducts(updatedProducts);
    setEditingIndex(null);
    setEditRowData({});
  };

  // Cancel the editing
  const handleCancel = () => {
    setEditingIndex(null);
    setEditRowData({});
  };

  // Delete selected products
  const handleDeleteSelected = () => {
    setProducts((prevProducts) => 
      prevProducts.filter((_, index) => !selectedRows.includes(index))
    );
    setSelectedRows([]);
  };

  // Select or deselect all rows
  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === products.length ? [] : products.map((_, index) => index)
    );
  };

  // Select or deselect a single row
  const handleSelectRow = (index) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-thin text-sm">
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

<div className="flex  items-centet justify-around">

        {/* Header */}
        <div className="flex justify-between items-center mb-4 gap-12">
          <h2 className="text-2xl font-thin">Products Information</h2>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 mr-8 rounded hover:bg-green-700"
            onClick={onAddProduct}
          >
            Add Product
          </button>
        </div>


        {selectedRows.length > 0 && (
          <div className="flex justify-end mb-4">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDeleteSelected}
            >
              Delete Selected
            </button>
          </div>
        )}
</div>

        {/* Product Table */}
        <div className=" bg-white text-center rounded-sm">
          {products.length === 0 ? (
            <p>You haven't added any products yet. Click 'Add Product' to start!</p>
          ) : (
            <table className="  w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === products.length}
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
                {products.map((entry, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleSelectRow(index)}
                      />
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {editingIndex === index ? (
                        <input
                          type="text"
                          value={editRowData.leadItemCode}
                          onChange={(e) => handleChange(e, "leadItemCode")}
                          className="w-full px-2 py-1 rounded"
                        />
                      ) : (
                        entry.leadItemCode
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {editingIndex === index ? (
                        <input
                          type="text"
                          value={editRowData.leadItemDescription}
                          onChange={(e) => handleChange(e, "leadItemDescription")}
                          className="w-full px-2 py-1 rounded"
                        />
                      ) : (
                        entry.leadItemDescription
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
        {editingIndex === index ? (
          <input
            type="text"
            value={editRowData.leadItemUnit}
            onChange={(e) => handleChange(e, "leadItemUnit")}
            className="w-full px-2 py-1 rounded"
          />
        ) : (
          entry.leadItemUnit
        )}
      </td>
      <td className="py-4 px-4 text-gray-700">
        {editingIndex === index ? (
          <input
            type="number"
            value={editRowData.leadItemCurrentStock}
            onChange={(e) => handleChange(e, "leadItemCurrentStock")}
            className="w-full px-2 py-1 rounded"
          />
        ) : (
          entry.leadItemCurrentStock
        )}
      </td>
      <td className="py-4 px-4 text-gray-700">
        {editingIndex === index ? (
          <input
            type="number"
            value={editRowData.leadItemQuantity}
            onChange={(e) => handleChange(e, "leadItemQuantity")}
            className="w-full px-2 py-1 rounded"
          />
        ) : (
          entry.leadItemQuantity
        )}
      </td>
      <td className="py-4 px-4 text-gray-700">
        {editingIndex === index ? (
          <input
            type="number"
            value={editRowData.leadItemPrice}
            onChange={(e) => handleChange(e, "leadItemPrice")}
            className="w-full px-2 py-1 rounded"
          />
        ) : (
          entry.leadItemPrice
        )}
      </td>
      <td className="py-4 px-4 text-gray-700">
        {editingIndex === index ? (
          <input
            type="number"
            value={editRowData.leadItemAmount}
            onChange={(e) => handleChange(e, "leadItemAmount")}
            className="w-full px-2 py-1 rounded"
          />
        ) : (
          entry.leadItemAmount
        )}
      </td>
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
                            className="bg-gray-400 text-white px-3 py-1 rounded"
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
          )}
        </div>


      </div>
    </div>
  );
};

export default ProductsDetails;
