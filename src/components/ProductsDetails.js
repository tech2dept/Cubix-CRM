import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import addProduct from "../utils/addProducts.png";
import deleteIcon from "../utils/delete.png";

const ProductsDetails = ({
  lead,
  productDetails,
  setShowProducts,
  productEntryInAllEntries,
  onSaveProducts,
}) => {
  console.log('productDetails:',productDetails)
  const [products, setProducts] = useState(productDetails);
  const [selectedRows, setSelectedRows] = useState([]);
  const apiRef = useGridApiRef();

  useEffect(() => {
    productEntryInAllEntries(products);
  }, [products]);

  useEffect(() => {
    // Transform productDetails to match column keys
    const transformedProducts = productDetails.map((detail, index) => ({
      id: index, // Add a unique id if not present
      itemCode: detail.leadItemCode,
      itemDescription: detail.leadItemDescription,
      itemUnit: detail.leadItemUnit,
      itemCurrentStock: detail.leadItemCurrentStock,
      itemQuantity: detail.leadItemQuantity,
      itemPrice: detail.leadItemPrice,
      itemAmount: detail.leadItemAmount,
    }));
    setProducts(transformedProducts);
  }, [productDetails]);

  const columns = [
    { field: "itemCode", headerName: "Item Code", width:250, editable: true, flex: 1 },
    { field: "itemDescription", headerName: "Description", width:250, editable: true, flex: 1 },
    { field: "itemUnit", headerName: "Unit", width: 250, editable: true, flex: 1 },
    { field: "itemCurrentStock", headerName: "Current Stock", width: 250, editable: true, flex: 1 },
    { field: "itemQuantity", headerName: "Quantity", width:250, editable: true, flex: 1 },
    { field: "itemPrice", headerName: "Price", width:250, editable: true, flex: 1 },
    { field: "itemAmount", headerName: "Amount", width:250, editable: true, flex: 1 },
  ];

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      itemCode: "",
      itemDescription: "",
      itemUnit: "",
      itemCurrentStock: "",
      itemQuantity: "",
      itemPrice: "",
      itemAmount: "",
    };
    setProducts((prev) => [...prev, newRow]);

    setTimeout(() => {
      apiRef.current.setCellFocus(newRow.id, columns[0].field,);
      apiRef.current.startCellEditMode({ id: newRow.id, field: columns[0].field, });
    }, 0);
  };

  const handleDeleteSelected = () => {
    setProducts((prev) => prev.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const handleRowSelection = (ids) => {
    setSelectedRows(ids);
  };

  const handleSave = () => {
    // Propagate updated products back to the parent or save via API
    const updatedProducts = products.map((product) => ({
      leadItemCode: product.itemCode,
      leadItemDescription: product.itemDescription,
      leadItemUnit: product.itemUnit,
      leadItemCurrentStock: product.itemCurrentStock,
      leadItemQuantity: product.itemQuantity,
      leadItemPrice: product.itemPrice,
      leadItemAmount: product.itemAmount,
    }));
    onSaveProducts(updatedProducts); // Call the save function
    alert("Product details saved successfully!");
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-thin text-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative">
        <button
          onClick={() => setShowProducts(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black focus:outline-none"
        >
          ✖
        </button>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-thin">Products Information</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddRow}
              className="text-white px-4 py-2 rounded"
            >
              <img src={addProduct} alt="Add Product" className="w-4 h-4" />
            </button>
            {selectedRows.length > 0 && (
              <button
                type="button"
                onClick={handleDeleteSelected}
                className="  text-white px-4 py-2 rounded "
              >
                <img src={deleteIcon} alt="Delete" className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={products}
            columns={columns}
            getRowId={(row) => row.leadItemCode || row.id} 
            apiRef={apiRef}
            checkboxSelection
            disableSelectionOnClick
            disableColumnResize
            processRowUpdate={(newRow) => {
              setProducts((prev) =>
                prev.map((row) => (row.id === newRow.id ? newRow : row))
              );
              return newRow;
            }}
            onRowSelectionModelChange={handleRowSelection}
            density="compact"
            experimentalFeatures={{ newEditingApi: true }}
            hideFooterPagination
            hideFooter
          />
        </Box>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
