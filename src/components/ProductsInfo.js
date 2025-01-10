import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import addProduct from "../utils/addProducts.png";
import deleteIcon from "../utils/delete.png";

const ProductsInfo = ({ productEntryInAllEntries }) => {
  const defaultRow = {
    id: Date.now(),
    itemCode: "",
    itemDescription: "",
    itemUnit: "",
    itemCurrentStock: "",
    itemQuantity: "",
    itemPrice: "",
    itemAmount: "",
  };

  const [productEntries, setProductEntries] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const apiRef = useGridApiRef();

  const columns = [
    {
      field: "itemCode",
      headerName: "Item Code",
      width: 150, 
      editable: true,
      flex: 1,
    },
    {
      field: "itemDescription",
      headerName: "Description",
      width: 150,
      editable: true,
      flex: 1,
    },
    {
      field: "itemUnit",
      headerName: "Unit",
      width: 150,
      editable: true,
      flex: 1,
    },
    {
      field: "itemCurrentStock",
      headerName: "Current Stock",
      width: 150,
      // type: "number",
      editable: true,
      flex: 1,
    },
    {
      field: "itemQuantity",
      headerName: "Quantity",
      width: 150,
      // type: "number",
      editable: true,
      flex: 1,
    },
    {
      field: "itemPrice",
      headerName: "Price",
      width: 150,
      // type: "number",
      editable: true,
      flex: 1,
    },
    {
      field: "itemAmount",
      headerName: "Amount",
      width: 150,
      // type: "number",
      editable: true,
      flex: 1,
    },
  ];

  useEffect(() => {
    const savedProductEntries = localStorage.getItem("productEntries");
    if (savedProductEntries) {
      setProductEntries(JSON.parse(savedProductEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("productEntries", JSON.stringify(productEntries));
    productEntryInAllEntries(productEntries);
  }, [productEntries]);

  // const handleAddRow = () => {
  //   setProductEntries((prevEntries) => [
  //     ...prevEntries,
  //     {
  //       id: Date.now(),
  //       itemCode: "",
  //       itemDescription: "",
  //       itemUnit: "",
  //       itemCurrentStock: "",
  //       itemQuantity: "",
  //       itemPrice: "",
  //       itemAmount: "",
  //     },
  //   ]);
  // };


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
  
    setProductEntries((prevEntries) => [...prevEntries, newRow]);


    setTimeout(() => {
      apiRef.current.setCellFocus(newRow.id, columns[0].field);
      apiRef.current.startCellEditMode({
        id: newRow.id,
        field: columns[0].field,
      });
    }, 0);
  };






  const handleDeleteSelected = () => {
    const remainingRows = productEntries.filter(
      (entry) => !selectedRows.includes(entry.id)
    );

    // Ensure at least one row exists
    if (remainingRows.length === 0) {
      remainingRows.push({ ...defaultRow, id: Date.now() });
    }

    setProductEntries(remainingRows);
    setSelectedRows([]);
  };




  const handleCellKeyDown = (params, event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default Enter behavior
  
      const currentColumnIndex = columns.findIndex(
        (col) => col.field === params.field
      );
      const nextColumnIndex = currentColumnIndex + 1;
  
      if (nextColumnIndex < columns.length) {
        // Move to the next column in the same row
        const nextField = columns[nextColumnIndex].field;
        apiRef.current.setCellFocus(params.id, nextField); // Focus the next column
        apiRef.current.startCellEditMode({ id: params.id, field: nextField }); // Start editing in the next cell
      } else {
        // If we're at the last column, move to the first column of the next row
        const currentRowIndex = productEntries.findIndex(
          (row) => row.id === params.id
        );
        const nextRowIndex = currentRowIndex + 1;
  
        if (nextRowIndex < productEntries.length) {
          // Focus on the first column of the next row
          apiRef.current.setCellFocus(
            productEntries[nextRowIndex].id,
            columns[0].field
          );
          apiRef.current.startCellEditMode({
            id: productEntries[nextRowIndex].id,
            field: columns[0].field,
          });
        } else {
          // If it's the last row, add a new row
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
          setProductEntries((prevEntries) => [...prevEntries, newRow]);
  
          // Focus on the first column of the newly added row
          setTimeout(() => {
            const newRowIndex = productEntries.length; // Next index after the last row
            apiRef.current.setCellFocus(newRow.id, columns[0].field);
            apiRef.current.startCellEditMode({
              id: newRow.id,
              field: columns[0].field,
            });
          }, 0);
        }
      }
    }
  };
  
  

  const handleRowSelection = (ids) => {
    // Filter selected rows based on checkbox interaction
    setSelectedRows(ids);
  };

  return (
    <div
      className="productsContainer rounded px-3 py-2 mt-2"
      style={{ background: "#f8f8f8" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl pl-8 font-thin">Products Information</h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="text-white px-2 py-2 rounded hover:bg-gray-200"
            onClick={handleAddRow}
          >
            <img
              src={addProduct}
              alt="addProduct-icon"
              className="w-4 h-4 text-black"
            />
          </button>
          <button
            type="button"
            className={`text-white px-2 py-2 rounded hover:bg-gray-200 ${
              selectedRows.length === 0 ? "invisible" : ""
            }`}
            onClick={handleDeleteSelected}
          >
            <img
              src={deleteIcon}
              alt="delete-icon"
              className="w-4 h-4 text-black"
            />
          </button>
        </div>
      </div>
      <Box sx={{ height: 150, width: "100%", background: "#ffffff" }}>
        <DataGrid
          rows={productEntries}
          columns={columns}
          apiRef={apiRef}
          autoWidth
          checkboxSelection
          disableSelectionOnClick
          disableColumnResize
          onRowSelectionModelChange={handleRowSelection}
          processRowUpdate={(newRow) => {
            const updatedRows = productEntries.map((row) =>
              row.id === newRow.id ? newRow : row
            );
            setProductEntries(updatedRows);
            return newRow;
          }}
          onCellKeyDown={handleCellKeyDown}
          experimentalFeatures={{ newEditingApi: true }}
          hideFooterPagination
          hideFooter
          density="compact"
        />
      </Box>
    </div>
  );
};

export default ProductsInfo;
