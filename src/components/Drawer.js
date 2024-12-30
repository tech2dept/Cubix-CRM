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
import phone from '../utils/phone.png'
// import HistoryDisplay from "./HistoryDisplay";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Drawer = ({
  showDrawer,
  setShowDrawer,
  selectedLead,
  handleInputChange,
  handleSave,
  stageMapping,
  leadsWithHistory
}) => {
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

  const handlePriorityClick = (level) => {
    // setFormData({ ...selectedLead, priority: level });
  };

  // Attach File
  // const handleInputChange = (event, field, value) => {
  //   const { type, files } = event.target;

  //   const newValue = type === "file" ? files[0] : value !== undefined ? value : event.target.value;

  //   setSelectedLead((prevLead) => ({
  //     ...prevLead,
  //     [field]: newValue,
  //   }));
  // };

  // const handleInputChange = (event, field, value) => {
  //   const newValue = value !== undefined ? value : event.target.value;
  //     setSelectedLead((prevLead) => ({
  //       ...prevLead,
  //       [field]: newValue,
  //     }));
  // };

  const onActivities = () => {
    setActivitiesModal(true);
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
  // const formattedDate = format(new Date(selectedLead.leadEntryTime), "MMMM do, yyyy 'at' h:mm a");

  return (
    <div
      style={{ backgroundColor: "#f8f8f8 " }}
      className={`fixed right-0 top-0 max-h-[100vh] w-1/2  shadow-lg z-50 p-3 overflow-y-auto transition-all duration-300 ease-in-out ${
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
              <p className="text-gray-500">
                {/* Lead Created on: {formattedDate = format(new Date(selectedLead.leadEntryTime), "MMMM do, yyyy 'at' h:mm a");} */}
                Lead Created on:  {format(new Date(selectedLead.leadEntryTime), "MMMM do, yyyy 'at' h:mm a")}
              </p>

            
            </div>

            {/* Action Icons */}
            <div className="flex space-x-4">
              {/* <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 text-blue-500"
                aria-label="Call"
              >
                <CallIcon />
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 text-blue-500"
                aria-label="Email"
              >
                <EmailIcon />
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 text-blue-500"
                aria-label="Address"
              >
                <LocationOnIcon />
              </button> */}

              <button
                onClick={onActivities}
                className=" flex items-center justify-center rounded-lg bg-blue-100 p-2 hover:bg-blue-200 text-blue-500"
                aria-label="Address"
              >
                <span> Schedule Activity</span>
              </button>
            </div>

            {/* Contact Details */}
            <div className="text-center text-gray-500 space-y-1">
                {/* Lead Created on: {selectedLead.leadEntryTime } */}

              <p className="text-gray-700 font-medium">
                Phone: {selectedLead.phone || "(973) 401 1282"}
              </p>
              <p className="text-gray-700 font-medium">
                Email: {selectedLead.email || "d.collins@boyle.info"}
              </p>
              <p className="text-gray-700 font-medium">
                Address:{" "}
                {selectedLead.address ||
                  "46 Smith Street, Perth Amboy, NJ 0709"}
              </p>
            </div>
          </div>

          {/* Lead Info section  */}
          <div className="flex gap-3 ">
            {/* Form Section */}
            <div className="formDiv  w-[40%]  bg-white p-4 rounded-md shadow-md max-h-[80vh] overflow-y-scroll">
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
                <div className="mb-4 flex gap-4 items-center justify-between">
                  <label className="block font-medium mb-2 text-black text-opacity-60">
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
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => handleInputChange(e, "file")}
                    className="rounded w-[90%] p-1"
                  />
                </div>

                {selectedLead.file ? 
                
                // console.log('selectedLead:',selectedLead)
                (
  <div className="mb-4">
    <p className="text-gray-600">Uploaded File:</p>
    <p className="text-blue-500 underline">
      {/* {selectedLead.file.name || "No name available"} */}
      {selectedLead.file.split("\\").pop()  || "No name available"}
    </p>
  </div>
) : (
  <p>No file uploaded</p>
)}

                <div className="mb-4">
                  <TextField
                    label="Notes"
                    fullWidth
                    multiline
                    rows={3}
                    variant="standard"
                    value={selectedLead.notes || ""}
                    onChange={(e) => handleInputChange(e, "notes")}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setShowDrawer(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </div>

            {/* Activity Timeline */}



      {/* <div> */}
        {/* <h1 className="text-2xl font-bold">Lead History</h1> */}
        {/* <HistoryDisplay history={selectedLead.leadHistory} /> */}
        {/* <HistoryDisplay history={selectedLead.leadHistory} /> */}
        {/* <HistoryDisplay leadsWithHistory={leadsWithHistory} /> */}
      {/* </div>  */}


{/* Activity Timeline */}
{/* <div> */}
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
  <h3 className="text-xl font-semibold my-4">Activity Log</h3>

  {/* Today Section */}
  <div>
    <h4 className="text-lg font-bold text-gray-700 mb-2">Today</h4>
    <ul className="space-y-4">
      {leadsWithHistory
        .filter((entry) => {
          const today = new Date();
          const entryDate = new Date(entry.date);
          return (
            today.toDateString() === entryDate.toDateString()
          ); // Filter for today's entries
        })
        .map((activity, index) => (
          <li key={index} className="flex items-start space-x-4">
            {/* Time */}
            <div className="text-sm text-gray-500 w-20">
              {new Date(activity.date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">
                {activity.activity}{" "}
                <span
                  className="px-2 py-1 rounded-full text-xs font-normal text-white flex items-center gap-1"
                  style={{
                    backgroundColor:
                      activity.tag === "Underwriting"
                        ? "#de85f"
                        : activity.tag === "Requirement Closed"
                        ? "#28A745"
                        : "#FFC107",
                  }}
                >
                  {activity.tag || "General"}
                </span>
              </p>
              <p className="text-xs text-gray-500">{activity.note}</p>
            </div>
          </li>
        ))}
    </ul>
  </div>

  {/* Divider */}
  <hr className="my-4 border-gray-300" />

  {/* Yesterday Section */}
  <div>
    <h4 className="text-lg font-bold text-gray-700 mb-2">Yesterday</h4>
    <ul className="space-y-4">
      {leadsWithHistory
        .filter((entry) => {
          const today = new Date();
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);
          const entryDate = new Date(entry.date);
          return (
            yesterday.toDateString() === entryDate.toDateString()
          ); // Filter for yesterday's entries
        })
        .map((activity, index) => (
          <li key={index} className="flex items-start space-x-4">
            {/* Time */}
            <div className="text-sm text-gray-500 w-20">
              {new Date(activity.date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">
                {activity.activity}{" "}
                <span
                  className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                  style={{
                    backgroundColor:
                      activity.tag === "Requirement Pending"
                        ? "#FFC107"
                        : "#17A2B8",
                  }}
                >
                  {activity.tag || "General"}
                </span>
              </p>
              <p className="text-xs text-gray-500">{activity.note}</p>
            </div>
          </li>
        ))}
    </ul>
  </div>
</TabPanel>
          <TabPanel value="1">
  <h3 className="text-xl font-semibold mb-4">Lead Timeline</h3>

            {/* <AllEntriesForm onFormSubmit={handleFormSubmit} /> */}
          </TabPanel>
        </TabContext>
      </ThemeProvider>
</div>


          </div>
        </>
      ) : (
        <p>No lead selected</p>
      )}

{activitiesModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center ">
    <div className="relative z-100">
      <ScheduleActivityPopup />
    </div>
  </div>
)}
</div>
);
};

export default Drawer;
