import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ReactDOM from "react-dom";
import attachfile from '../utils/attachfile.png'


import CallIcon from "@mui/icons-material/Call";
import { AiOutlinePhone } from "react-icons/ai";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Checkbox, FormControlLabel } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { format } from "date-fns";
import whatsapp from "../utils/whatsapp.png";
import ScheduleActivityPopup from "../modals/ScheduleActivityModal";
import phone from "../utils/phone.png";
import HistoryDisplay from "./HistoryDisplay";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ActivityLog from "./ActivityLog";
import EscalateLead from "../modals/EscalateLead";
import ProductsDetails from "./ProductsDetails";
import QuoteLead from "../modals/QuoteLead";

const Drawer = ({
  showDrawer,
  setShowDrawer,
  selectedLead,
  handleInputChange,
  handleSave,
  stageMapping,
  leadsWithHistory,
  rows,
  setRows,
}) => {
 console.log("selectedLead in drawer:", selectedLead);
//  console.log("selectedLead in drawer:", selectedLead?.leadItemCode);
 
 
 const productDetails = [{
   leadItemCode:selectedLead?.leadItemCode,
   leadItemAmount:selectedLead?.leadItemAmount,
   leadItemCurrentStock:selectedLead?.leadItemCurrentStock,
   leadItemDescription:selectedLead?.leadItemDescription,
   leadItemPrice:selectedLead?.leadItemPrice,
   leadItemQuantity:selectedLead?.leadItemQuantity,
   leadItemUnit:selectedLead?.leadItemUnit,
  }]
  console.log("productDetails in drawer:", productDetails);
  // console.log("rows in drawer:", rows);

  const leadSourceMapping = {
    walkIn: "Walk-in",
    phone: "Phone",
    whatsapp: "Whatsapp",
    email: "E-mail",
    online: "Online",
    others: "Others",
  };

  const territoryMapping = {
    dubai: "Dubai",
    abudhabi: "Abu Dhabi",
    sharjah: "Sharjah",
    ajman: "Ajman",
    othersTerritory: "Others",
  };

  const countryMapping = {
    unitedStates: "United States",
    unitedKingdom: "United Kingdom",
    india: "India",
    canada: "Canada",
    australia: "Australia",
    otherCountry: "Others",
  };
  const [activitiesModal, setActivitiesModal] = useState(false);
  const [escalateModal, setEscalateModal] = useState(false);
  const [quoteModal, setQuoteModal] = useState(false);

  const handleClose = () => setActivitiesModal(false);
  const handleCloseEscalate = () => setEscalateModal(false);
  const handlePriorityClick = (level) => {
    // setFormData({ ...selectedLead, priority: level });
  };


  const [showProducts, setShowProducts] = useState(false);



  const [currentLead, setCurrentLead] = useState(null);
  const [currentLeadEscalate, setCurrentLeadEscalate] = useState(null);
  const [currentLeadQuote, setCurrentLeadQuote] = useState(null);


  console.log('currentLead::',currentLead)
  const onActivities = (leadId) => {
    const selectedLeadScheduleActivity = leadId;
    setCurrentLead(selectedLeadScheduleActivity);
    setActivitiesModal(true);
  };

  const onEscalateLead = (leadId) => {
    const selectedLeadEscalateLead = leadId;
    setCurrentLeadEscalate(selectedLeadEscalateLead);
    setEscalateModal(true);
  };

  const onQuoteLead = (leadId) => {
    const selectedLeadQuoteLead = leadId;
    setCurrentLeadQuote(selectedLeadQuoteLead);
    setQuoteModal(true);
  };

  const updateLeadActivityTimeline = (currentLead, activityEntry) => {
    const updatedLeads = rows.map((row) => {
      // Match the lead by its ID
      if (row.id === currentLead) {
        return {
          ...row,
          leadTimeline: [...(row.leadTimeline || []), activityEntry], // Update leadTimeline
        };
      }
      return row; // Keep other leads unchanged
    });

    setRows(updatedLeads); // Update state with new leads array
    localStorage.setItem("leads", JSON.stringify(updatedLeads)); // Save updated leads to localStorage
   // console.log("Updated Leads 143:", updatedLeads);
  };

  const theme = createTheme({
    typography: {
      fontFamily: `'Figtree', sans-serif`,
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value, setValue] = useState("1");

  const [fileName , setFileName] = useState('No file chosen')

  const addFileToLeadTimeline = (currentLead, file) => {
    const updatedLeads = rows.map((row) => {
      // Match the lead by its ID
      if (row.id === currentLead) {
       // console.log('row.id:',row.id)
       // console.log('currentLead:',currentLead)
        return {
          ...row,
          leadTimeline: [
            ...(row.leadTimeline || []),
            {
              type: "file", // Specify the type as 'file'
              fileName: file.name,
              fileSize: file.size,
              fileType: file.type,
              date: new Date().toISOString(), // Add a timestamp
            },
          ],
        };
      }
      return row; // Keep other leads unchanged
    });
  
   // console.log("Updated Leads with File:", updatedLeads);
    setRows(updatedLeads); // Update state with new leads array
    localStorage.setItem("leads", JSON.stringify(updatedLeads)); // Save updated leads to localStorage
   // console.log("Updated Leads with File:", updatedLeads);
  };
  
  const handleFileAttachment = (e, currentLead) => {
    const file = e.target.files[0]; // Get the first file from the input
    if (file) {
      setFileName(file.name);
      addFileToLeadTimeline(currentLead, file);
    } else {
      setFileName("No file chosen"); 
     // console.log("No file selected");
    }
  };

const [onProductTable,setOnProductTable] = useState(false)
   const handleProductTable=()=>{
    setOnProductTable(true)
  }

  const productEntryInAllEntries =(productEntryInAllEntries)=> {
    // itemCode:selectedLead.itemCode
    // itemCode:selectedLead.itemCode
    // itemCode:selectedLead.itemCode
    // itemCode:selectedLead.itemCode
    console.log('productEntryInAllEntries:::',productEntryInAllEntries)
  }


  const saveProductDetails = (updatedProducts) => {
    console.log("Updated Products:", updatedProducts);
    // Perform API call or update state in parent
  };


  return (
    <div
      style={{ backgroundColor: "#f8f8f8 " }}
      className={`fixed right-0 top-0 max-h-[100vh] w-1/2  shadow-lg z-50 p-3 overflow-y-auto transition-all duration-300 ease-in-out max-h-[100vh] overflow-y-auto scrollbar-thin ${
        showDrawer ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
        onClick={() => setShowDrawer(false)}
      >
        ✖
      </button>
      {selectedLead ? (
        <>
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-4 border-b pb-6 mb-6">
            {/* Profile Image */}
            {/* <img
    src={selectedLead.avatar || "https://via.placeholder.com/60"}
    alt={selectedLead.name}
    className="w-16 h-16 rounded-full object-cover"
  /> */}

            {/* Profile Details */}
            <div className="text-center">
              <h3 className="text-xl font-semibold">
                {selectedLead.lead || "David Collins"}
              </h3>
              {/* <p className="text-gray-500">
                Lead Created on:{" "}
                {format(
                  new Date(selectedLead.leadEntryTime),
                  "MMMM do, yyyy 'at' h:mm a"
                )}
              </p> */}
            </div>

            {/* Action Icons */}
            <div className="flex space-x-4">
              <button
                onClick={() => onActivities(selectedLead.id)}
                className=" flex items-center justify-center rounded-lg bg-blue-100 p-2 hover:bg-blue-200 text-blue-500"
                aria-label="Address"
              >
                Schedule Activity
                {/* <span> Schedule Activity</span> */}
              </button>

              <button
                onClick={() => onEscalateLead(selectedLead.id)}
                className=" flex items-center justify-center rounded-lg bg-blue-100 p-2 hover:bg-blue-200 text-blue-500"
                aria-label="Address"
              >
                Escalate Lead
              </button>

              <button
                onClick={() => onQuoteLead(selectedLead.id)}
                className=" flex items-center justify-center rounded-lg bg-blue-100 p-2 hover:bg-blue-200 text-blue-500"
                aria-label="Address"
              >
                Quotes & Invoice
              </button>

              {activitiesModal && selectedLead && 
                ReactDOM.createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center ">
                  <div className="relative z-100">
                    <ScheduleActivityPopup
                      lead={selectedLead}
                      updateLeadActivityTimeline={updateLeadActivityTimeline}
                      handleClose={handleClose}
                    />
                  </div>
                </div>,
                document.body 
              )}

              {escalateModal && selectedLead && 
                  ReactDOM.createPortal (
                <div className="fixed inset-0 z-50 flex items-center justify-center ">
                  <div className="relative z-100">
                    <EscalateLead
                      lead={selectedLead}
                      updateLeadActivityTimeline={updateLeadActivityTimeline}
                      handleClose={handleCloseEscalate}
                    />
                  </div>
                </div>,
              document.body  
              )
              }
            </div>


           

              {quoteModal && selectedLead && 
              ReactDOM.createPortal (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className=" rounded-lg  p-3  w-full mx-4" style={{background:"#f8f8f8"}}>
      <QuoteLead isOpen={quoteModal} onClose={() => setQuoteModal(false)} selectedLead={selectedLead} productDetails={productDetails}/>
                  </div>
                </div>,
            document.body  
            )
              }
            </div>




            {/* Contact Details */}
            <div className="text-center text-gray-500 space-y-1">
              {/* Lead Created on: {selectedLead.leadEntryTime } */}

              <p className="text-gray-500 font-normal">
                Phone: {selectedLead.phone || "(973) 401 1282"}
              </p>
              <p className="text-gray-500 font-normal">
                Email: {selectedLead.email || "d.collins@boyle.info"}
              </p>
              {/* <p className="text-gray-500 font-normal">
                stage: {selectedLead.stage || "d.collins@boyle.info"}
              </p> */}
              {/* <p className="text-gray-500 font-normal">
                Address:{" "}
                {selectedLead.address ||
                  "46 Smith Street, Perth Amboy, NJ 0709"}
              </p> */}
            </div>
          {/* </div> */}

          {/* Lead Info section  */}
          <div className="flex gap-3 max-h-[80vh] overflow-y-auto scrollbar-thin ">
            {/* Form Section */}
            <div className="formDiv  w-[40%]  bg-white p-4 rounded-md shadow-md max-h-[80vh] overflow-y-auto scrollbar-thin">
              <h3 className="text-xl font-semibold mb-4">Lead Info</h3>
              <form onSubmit={handleSave}>
                <div className="mb-4">
                  <TextField
                    label="Email"
                    fullWidth
                    variant="standard"
                    value={selectedLead.email || ""}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <div className="mb-4">
                    <TextField
                      label="Phone"
                      fullWidth
                      variant="standard"
                      value={selectedLead.phone || ""}
                      onChange={(e) => handleInputChange(e, "phone")}
                    />
                  </div>

                  <div className="mb-4 flex items-center space-x-2">
                    <label className="flex items-center">
                      {/* <input
      type="checkbox"
      checked={selectedLead.isPhoneWhatsApp || false}
      onChange={(e) =>
        handleInputChange(e, "isPhoneWhatsApp", e.target.checked)
      }
      className="w-6 h-6 rounded-full appearance-none bg-gray-200 checked:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition cursor-pointer"
    /> */}

                      <img
                        src={whatsapp}
                        alt="whatsapp-icon"
                        className="w-5 h-5 mr-2" // Adjust icon size and spacing
                      />
                      <input
                        type="checkbox"
                        checked={selectedLead.isPhoneWhatsApp || false}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "isPhoneWhatsApp",
                            e.target.checked
                          )
                        }
                        className="rounded border border-sm shadow"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="mb-4">
                    <TextField
                      label="Alternate Phone"
                      fullWidth
                      variant="standard"
                      value={selectedLead.alternatePhone || ""}
                      onChange={(e) => handleInputChange(e, "alternatePhone")}
                    />
                  </div>

                  {/* <div className="mb-4">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            selectedLead.isAlternatePhoneWhatsApp || false
                          }
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              "isAlternatePhoneWhatsApp",
                              e.target.checked
                            )
                          }
                          sx={{
                            borderRadius: "8px", // rounded border
                            border: "1px solid", // border
                            outline: "none",
                            padding: "0", // optional to adjust padding
                          }}
                          // className="rounded border border-sm" // Apply rounded border class to the checkbox
                        />
                      }
                      label={
                        <span className="text-xs">
                      Alternate <img src={whatsapp} alt="whatsapp-icon" /> ?</span>
                      } // Reduce label font size using text-sm
                    />
                  </div>
                </div> */}

                  <label className="flex items-center">
                    {/* <input
      type="checkbox"
      checked={selectedLead.isAlternatePhoneWhatsApp || false}
      onChange={(e) =>
        handleInputChange(e, "isAlternatePhoneWhatsApp", e.target.checked)
      }
      className="w-6 h-6 rounded-full appearance-none bg-gray-200 checked:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition cursor-pointer"
      /> */}

                    <img
                      src={whatsapp}
                      alt="whatsapp-icon"
                      className="w-5 h-5 mr-2" // Adjust icon size and spacing
                    />

                    <input
                      type="checkbox"
                      checked={selectedLead.isAlternatePhoneWhatsApp || false}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          "isAlternatePhoneWhatsApp",
                          e.target.checked
                        )
                      }
                      className="rounded border border-sm shadow"
                    />
                  </label>
                </div>

                <div className="mb-4">
                  <TextField
                    label="Oragnization"
                    fullWidth
                    variant="standard"
                    value={selectedLead.organization || ""}
                    onChange={(e) => handleInputChange(e, "organization")}
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    label="Title"
                    fullWidth
                    variant="standard"
                    value={selectedLead.title || ""}
                    onChange={(e) => handleInputChange(e, "title")}
                  />
                </div>

                <div className="mb-4">
                  <FormControl fullWidth variant="standard">
                    <InputLabel id="stage-label">Stage</InputLabel>
                    <Select
                      labelId="stage-label"
                      id="stage"
                      value={selectedLead.stage || ""}
                      onChange={(e) => handleInputChange(e, "stage")}
                    >
                      {Object.entries(stageMapping).map(
                        ([key, value], index) => (
                          <MenuItem key={`${key}-${index}`} value={key}>
                            {value && (
                              <button
                                className={`w-full text-white text-center p-1 my-0.5 rounded ${
                                  value === "New"
                                    ? "bg-purple-500"
                                    : value === "Discovery"
                                    ? "bg-violet-700"
                                    : value === "Proposal"
                                    ? "bg-blue-400"
                                    : value === "Negotiation"
                                    ? "bg-blue-800"
                                    : value === "Won"
                                    ? "bg-green-400"
                                    : value === "Lost"
                                    ? "bg-red-600"
                                    : "bg-gray-300"
                                }`}
                              >
                                {value}
                              </button>
                            )}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </div>

                <div className="mb-4">
                  <FormControl fullWidth variant="standard">
                    <InputLabel id="lead-source">Lead Source</InputLabel>
                    <Select
                      labelId="lead-source"
                      id="leadSource"
                      value={selectedLead.leadSource || ""}
                      onChange={(e) => handleInputChange(e, "leadSource")}
                    >
                      {Object.entries(leadSourceMapping).map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {/* Add any conditional styling or buttons here if needed */}
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="mb-4">
                  <TextField
                    label="Lead Probability (%)"
                    fullWidth
                    variant="standard"
                    value={selectedLead.probability || ""}
                    onChange={(e) => handleInputChange(e, "probability")}
                  />
                </div>
                <div className="mb-4 flex items-center space-x-4">
                  {/* Currency Selector */}
                  <TextField
                    select
                    label="Currency"
                    name="currency"
                    value={selectedLead.currency || ""}
                    onChange={(e) => handleInputChange(e, "currency")}
                    variant="standard"
                    sx={{
                      width: "100px",
                      "& .MuiInputLabel-root": {
                        fontFamily: "Figtree, sans-serif", // Apply Figtree font for label
                      },
                    }}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                    <MenuItem value="INR">INR</MenuItem>
                    <MenuItem value="JPY">JPY</MenuItem>
                    <MenuItem value="AUD">AUD</MenuItem>
                  </TextField>

                  {/* Booked Amount */}
                  <TextField
                    label="Booked Amount"
                    name="bookedAmount"
                    type="number"
                    value={selectedLead.bookedAmount || ""}
                    onChange={(e) => handleInputChange(e, "bookedAmount")}
                    fullWidth
                    variant="standard"
                    InputProps={{
                      inputProps: { min: 0 }, // Prevent negative amounts
                    }}
                    InputLabelProps={{
                      shrink: true, // Keeps the label above the input
                    }}
                    sx={{
                      "& .MuiInputLabel-root": {
                        fontFamily: "Figtree, sans-serif", // Apply Figtree font for label
                      },
                    }}
                  />
                </div>

                <div className="mb-4">
                  <FormControl fullWidth variant="standard">
                    <InputLabel id="territory">Territory</InputLabel>
                    <Select
                      labelId="territory"
                      id="territory"
                      value={selectedLead.territory || ""}
                      onChange={(e) => handleInputChange(e, "territory")}
                    >
                      {Object.entries(territoryMapping).map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {/* Add any conditional styling or buttons here if needed */}
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="mb-4">
                  <FormControl fullWidth variant="standard">
                    <InputLabel id="country">Country</InputLabel>
                    <Select
                      labelId="country"
                      id="country"
                      value={selectedLead.country || ""}
                      onChange={(e) => handleInputChange(e, "country")}
                    >
                      {Object.entries(countryMapping).map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {/* Add any conditional styling or buttons here if needed */}
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="mb-4">
                  <TextField
                    label="Street Address"
                    fullWidth
                    variant="standard"
                    value={selectedLead.streetAddress || ""}
                    onChange={(e) => handleInputChange(e, "streetAddress")}
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    label="City"
                    fullWidth
                    variant="standard"
                    value={selectedLead.city || ""}
                    onChange={(e) => handleInputChange(e, "city")}
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    label="Apartment"
                    fullWidth
                    variant="standard"
                    value={selectedLead.apartment || ""}
                    onChange={(e) => handleInputChange(e, "apartment")}
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    label="Location"
                    fullWidth
                    variant="standard"
                    value={selectedLead.location || ""}
                    onChange={(e) => handleInputChange(e, "location")}
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    label="Area"
                    fullWidth
                    variant="standard"
                    value={selectedLead.area || ""}
                    onChange={(e) => handleInputChange(e, "area")}
                  />
                </div>

                {/* Priority Selection */}
                <div className="mb-4  flex gap-3 items-center justify-center">
                  <label className="block font-medium  text-black text-opacity-60">
                    Priority
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((level, index) => (
                      <button
                        key={`${level}-${index}`}
                        type="button"
                        className={`text-2xl transition-all duration-300 ease-in-out ${
                          selectedLead.priority >= level
                            ? "text-yellow-500 transform scale-110"
                            : "text-gray-400 transform scale-100"
                        } hover:scale-125 hover:text-yellow-500`}
                        onClick={() => handlePriorityClick(level)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Attach File  */}

                <div className="mb-4 flex items-center justify-between">
                  <label className="block font-medium mb-2 text-black text-opacity-60">
                    Attach File
                  </label>
                  <label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 justify-center px-4 py-2 bg-gray-300 text-white rounded-lg cursor-pointer hover:bg-gray-400 transition-colors duration-200"
                  >
                    <img src={attachfile} alt="attachfile-icon" className="w-5 h-5" />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    name="file"
                    // onChange={(e) => handleInputChange(e, "file")}
                    onChange={(e) => handleFileAttachment(e, selectedLead.id)}
                    // className="rounded w-[90%] p-1"
                    className="hidden"
                  />
                      <p className=" text-sm text-gray-500 truncate">
                        {fileName}
                      </p>
                </div>




{/* <div className="my-4 flex items-center justify-center gap-4 ">
 
  <label className="block font-medium text-black text-opacity-60">
    Attach File
  </label>

    <label
      htmlFor="file-upload"
      className="flex items-center gap-2 justify-center px-4 py-2 bg-gray-300 text-white rounded-lg cursor-pointer hover:bg-gray-400 transition-colors duration-200"
    >

      <img src={attachfile} alt="attachfile-icon" className="w-5 h-5" />
    </label>
   
    <input
      id="file-upload"
      type="file"
      name="file"
      onChange={handleChange}
      className="hidden"
    />

    <p className=" text-sm text-gray-500 truncate">
      {fileName}
    </p>
</div>  */}






                {/* {selectedLead.file ? (
                  <div className="mb-4">
                    <p className="text-gray-600">Uploaded File:</p>
                    <p className="text-blue-500 underline">
                      {selectedLead.file.split("\\").pop() ||
                        "No name available"}
                    </p>
                  </div>
                ) : (
                  <p>No file uploaded</p>
                )} */}

                <div className="mb-4">
                  <TextField
                    label="Notes"
                    fullWidth
                    multiline
                    rows={1}
                    variant="standard"
                    value={selectedLead.notes || ""}
                    onChange={(e) => handleInputChange(e, "notes")}
                  />
                </div>

                {selectedLead.leadIsItemAdded && (                
<div className="  p-2 m-4 flex justify-center items-center " >
<button type="button" className="bg-yellow-400 px-2 py-2 rounded-lg"  onClick={() => setShowProducts(true)}>View Product Details</button>
{showProducts &&
  ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full mx-4">
        <ProductsDetails
          // lead={selectedLead.name}
          lead={selectedLead}
          productDetails={productDetails}
          productEntryInAllEntries={productEntryInAllEntries}
          setShowProducts={setShowProducts}
          onSaveProducts={saveProductDetails} // Pass save handler

        />
      </div>
    </div>,
    document.body // Render the overlay directly to the body
  )
}

                {/* <div className="mb-4">
                  <TextField
                    label="Lead Item Code"
                    fullWidth
                    variant="standard"
                    value={selectedLead.leadItemCode || ""}
                    onChange={(e) => handleInputChange(e, "leadItemCode")}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    label="Lead Item Description"
                    fullWidth
                    variant="standard"
                    value={selectedLead.leadItemDescription || ""}
                    onChange={(e) => handleInputChange(e, "leadItemDescription")}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    label="Lead Item Unit"
                    fullWidth
                    variant="standard"
                    value={selectedLead.leadItemUnit || ""}
                    onChange={(e) => handleInputChange(e, "leadItemUnit")}
                  />
                </div>
                <div className="mb-4"> 
                   <TextField
                    label="Lead Item Current Stock"
                    fullWidth
                    variant="standard"
                    value={selectedLead.leadItemCurrentStock || ""}
                    onChange={(e) => handleInputChange(e, "leadItemCurrentStock")}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    label="Lead Item Quantity"
                    fullWidth
                    variant="standard"
                    value={selectedLead.leadItemQuantity || ""}
                    onChange={(e) => handleInputChange(e, "leadItemQuantity")}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    label="Lead Item Price"
                    fullWidth
                    variant="standard"
                    value={selectedLead.leadItemPrice || ""}
                    onChange={(e) => handleInputChange(e, "leadItemPrice")}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    label="Lead Item Amount"
                    fullWidth
                    variant="standard"
                    value={selectedLead.leadItemAmount || ""}
                    onChange={(e) => handleInputChange(e, "leadItemAmount")}
                  />
                </div> */}
</div>
                )}





                <div className="flex justify-end space-x-4">
                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setShowDrawer(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>

            {/* Activity Timeline */}
            <div className="w-[60%] bg-white p-4 rounded-md shadow-md max-h-[80vh] overflow-y-scroll">
              <ThemeProvider theme={theme}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="">
                      <Tab label="Lead Timeline" value="1" />
                      <Tab label="Activity Log" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel sx={{ padding: 0 }} value="2">
                    <ActivityLog leadsWithHistory={leadsWithHistory} />
                  </TabPanel>
                  <TabPanel value="1" sx={{ padding: 0 }}>
                    <HistoryDisplay

                      rows2={rows}
                      leadsWithHistory={leadsWithHistory}
                      selectedLead={selectedLead}
                    />
                  </TabPanel>
                </TabContext>
              </ThemeProvider>
            </div>
          </div>
        </>
      ) : (
        <p>No lead selected</p>
      )}
    </div>
  );
};

export default Drawer;
