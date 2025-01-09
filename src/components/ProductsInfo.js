import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import addProduct from "../utils/addProducts.png";
import deleteIcon from "../utils/delete.png";

const ProductsInfo = ({ productEntryInAllEntries }) => {
  const [productEntries, setProductEntries] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // Load initial product entries from localStorage
  useEffect(() => {
    const savedProductEntries = localStorage.getItem("productEntries");
    if (savedProductEntries) {
      setProductEntries(JSON.parse(savedProductEntries));
    }
  }, []);

  // Update localStorage and notify the parent component when productEntries change
  useEffect(() => {
    localStorage.setItem("productEntries", JSON.stringify(productEntries));
    productEntryInAllEntries(productEntries); // Notify parent
  }, [productEntries]);

  // Add a new empty row for product entry
  const handleAddRow = () => {
    setProductEntries((prevEntries) => [
      ...prevEntries,
      {
        id: prevEntries.length + 1,
        itemCode: "",
        itemDescription: "",
        itemUnit: "",
        itemCurrentStock: "",
        itemQuantity: "",
        itemPrice: "",
        itemAmount: "",
      },
    ]);
  };

  // Delete selected rows
  const handleDeleteSelected = () => {
    setProductEntries((prevEntries) =>
      prevEntries.filter((entry) => !selectedRows.includes(entry.id))
    );
    setSelectedRows([]);
  };

  // Columns definition for the DataGrid
  const columns = [
    { field: "itemCode", headerName: "Item Code", width: 150, editable: true },
    {
      field: "itemDescription",
      headerName: "Description",
      width: 200,
      editable: true,
    },
    { field: "itemUnit", headerName: "Unit", width: 100, editable: true },
    {
      field: "itemCurrentStock",
      headerName: "Current Stock",
      width: 150,
      type: "number",
      editable: true,
    },
    {
      field: "itemQuantity",
      headerName: "Quantity",
      width: 150,
      type: "number",
      editable: true,
    },
    { field: "itemPrice", headerName: "Price", width: 150, type: "number", editable: true },
    { field: "itemAmount", headerName: "Amount", width: 150, type: "number", editable: true },
  ];

  return (
    <div className="productsContainer rounded p-2 mt-2" style={{ background: "#f8f8f8" }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl pl-8 font-thin">Products Information</h2>
        <button
          type="button"
          className="text-white px-2 py-2 rounded hover:bg-gray-200"
          onClick={handleAddRow}
        >
          <img src={addProduct} alt="addProduct-icon" className="w-4 h-4 text-black" />
        </button>
        {selectedRows.length > 0 && (
          <button
            type="button"
            className="text-white px-2 py-2 rounded hover:bg-gray-200"
            onClick={handleDeleteSelected}
          >
            <img src={deleteIcon} alt="delete-icon" className="w-4 h-4 text-black" />
          </button>
        )}
      </div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={productEntries}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
          processRowUpdate={(newRow, oldRow) => {
            const updatedRows = productEntries.map((row) =>
              row.id === newRow.id ? newRow : row
            );
            setProductEntries(updatedRows);
            return newRow;
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
};

export default ProductsInfo;
