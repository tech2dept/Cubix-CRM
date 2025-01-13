import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,       
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import QuotationDocs from "./QuotationDocs";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import RelatedDocs from "./RelatedDocs";


const QuotationComponent = ({productDetails,onClose,selectedLead}) => {
console.log('productDetails:in quote lead',productDetails)
console.log('selectedLead:in quote lead',selectedLead)

    const apiRef = useGridApiRef();
    const [products, setProducts] = useState(productDetails);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    const handleImageClick = (rowId) => {
        const selectedProduct = products.find((product) => product.id === rowId);
        if (selectedProduct.image) {
          alert(`Displaying image for product: ${selectedProduct.image}`);
          // You can use a modal or lightbox library to display the image.
        } else {
          const fileInput = document.getElementById(`file-upload-${rowId}`);
          if (fileInput) {
            fileInput.click(); // Trigger file input dialog.
          }
        }
      };
    
      const handleImageUpload = (event, rowId) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file); // Generate a preview URL.
          setProducts((prev) =>
            prev.map((product) =>
              product.id === rowId ? { ...product, image: imageUrl } : product
            )
          );
        }
      };
    

    const columns = [
        { field: "leadItemCode", headerName: "Item Code", width:250, editable: true, flex: 1 },
        { field: "leadItemDescription", headerName: "Description", width:250, editable: true, flex: 1 },
        { field: "leadItemUnit", headerName: "Unit", width: 250, editable: true, flex: 1 },
        {
            field: "image",
            headerName: "Image",
            width: 100,
            flex: 0.5,
            sortable: false,
            renderCell: (params) => (
              <div className="flex items-center justify-center">
                <IconButton
                  onClick={() => handleImageClick(params.row.id)}
                  color="primary"
                >
                  <PhotoCameraIcon />
                </IconButton>
                <input
                  type="file"
                  id={`file-upload-${params.row.id}`}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, params.row.id)}
                />
              </div>
            ),
          },
        { field: "leadItemCurrentStock", headerName: "Current Stock", width: 250, editable: true, flex: 1 },
        { field: "leadItemQuantity", headerName: "Quantity", width:250, editable: true, flex: 1 },
        { field: "leadItemPrice", headerName: "Price", width:250, editable: true, flex: 1 },
        { field: "leadItemDiscount", headerName: "Discount %", width:250, editable: true, flex: 1 },
        { field: "leadItemAmount", headerName: "Amount", width:250, editable: true, flex: 1 },
        { field: "leadItemType", headerName: "Type", width:250, editable: true, flex: 1 },
      ];

      const [selectedTab, setSelectedTab] = useState(0);

      const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
      };

    const handleRowSelection = (ids) => {
        setSelectedRows(ids);
      };

      const togglePopup = () => {
        // setIsPopupOpen(!isPopupOpen);
        onClose()
      };

      const [selectedDate, setSelectedDate] = useState("2025-01-13"); // Initialize with a default value in ISO format

      const handleDateChange = (event) => {
        setSelectedDate(event.target.value); // Update the state with the new date
      };

        const [selectedLeadName, setSelectedLeadName] = useState({ lead: "" });
  return (
    
    <div className="quotation-container  p-4 rounded-lg  max-h-[100vh] overflow-y-auto scrollbar-thin" >
    {/* <div className="quotation-container  rounded-lg shadow-md"> */}
      {/* Header Section */}
      <div className="flex items-center  justify-between">

      <h3 className="text-xl font-semibold mb-4">Quotation and Invoice</h3>
      <button
              onClick={togglePopup}
              className="text-gray-500 hover:text-gray-700 transition"
              >
              ✖
      </button>
     </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <TextField label="Stage" value="Draft" size="small" disabled  />
          <button
        // onClick={togglePopup}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Send for Approval
      </button>
          <TextField label="QO No" value="451551" size="small" />
          <TextField label="Riv No" value="" size="small" />
        </div>
        <div className="flex gap-4 items-center">
        <TextField
      label="Date"
      value={selectedDate}
      size="small"
      type="date"
      onChange={handleDateChange}
      InputLabelProps={{
        shrink: true, // Ensures the label stays above the input
      }}
    />          {/* <button className="bg-blue-500 text-white" onClick={onQuotationDocs}>
            QUOTATION DOCS
          </button>  */}
          <QuotationDocs />
          <div></div>
        </div>


      </div>

      {/* User Details Section */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <TextField label="User" value="ADMIN" size="small" />
        <TextField label="Salesman" value="AJEEB" size="small" />
        <TextField label="Coordinator" value="Soorya" size="small" />
      </div>

      {/* Customer Details */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <TextField label="Customer" value="SADECO DECOR LLC" size="small" />
          <TextField label="Address" value="12050458" size="small" />
        </div>
        <div className="flex flex-col gap-2">
          <TextField label="LEAD REF#" value="32053" size="small" />
          <div className="flex gap-2">
            {/* <Button variant="contained" color="success" size="small">
              RELATED DOCS
            </Button> */}
            <RelatedDocs/>
            {/* <Button variant="contained" color="primary" size="small">
              FOLLOW-UP
            </Button> */}
            <button
        // onClick={togglePopup}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Follow Up
      </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TextField label="Subject" size="small" />
          <TextField
      label="Attention Person Info"
      size="small"
      value={selectedLead.lead}
      onChange={(e) => setSelectedLeadName({ lead: e.target.value })}
    />
    
           </div>
      </div>







      <Box sx={{ height: 200, width: "100%" }}>
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

              {/* Tabs Section */}
      <Box>
        <Tabs value={selectedTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          <Tab label="Delivery" />
          <Tab label="Payment" />
          <Tab label="Validity" />
          <Tab label="Remarks" />
          <Tab label="Terms" />
        </Tabs>
        <Box sx={{ p: 2, mt: 2, border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#fff" }}>
          {selectedTab === 0 && <div>Delivery details: Delivered within 7 business days.</div>}
          {selectedTab === 1 && <div>Payment terms: 50% advance, 50% upon delivery.</div>}
          {selectedTab === 2 && <div>Validity: Quotation valid for 30 days from issuance.</div>}
          {selectedTab === 3 && <div>Remarks: Please ensure all details are accurate before confirming.</div>}
          {selectedTab === 4 && <div>Terms: Standard terms and conditions apply.</div>}
        </Box>
      </Box>
    </div>
  );
};

export default QuotationComponent;
