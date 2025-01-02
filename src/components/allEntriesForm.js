import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// import TableComponent from "./Table";
import { Checkbox, FormControlLabel } from "@mui/material";

const AllEntriesForm = ({ onFormSubmit }) => {
  const initialFormData = {
    id: Date.now(),
    name: "",
    phone: "",//
    alternatePhone: "",//
    isPhoneWhatsApp: false,//
    isAlternatePhoneWhatsApp: false,//
    status: "",
    organization: "",//
    title: "",//
    email: "",//
    notes: "",//
    leadSource: "",//
    leadDateAndTimeEntry: "",
    probability: "",//
    bookedAmount: "",//
    territory: "",//
    country: "",//
    streetAddress: "",//
    city: "",//
    apartment: "",//
    location: "",//
    area: "",//
    leadEntryTime: "",
    timeline: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // setting stored data from localStorage
  // Load data from localStorage when the component mounts
  // useEffect(() => {
  //     const savedData = JSON.parse(localStorage.getItem("leadFormData"));
  //     console.log('savedData:',savedData)
  //     if (savedData) {
  //       setFormData(savedData);
  //     }
  //   }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : name === "territory" ? value.toLowerCase() : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allowedTerritories = ["dubai", "abudhabi", "sharjah", "ajman", "othersTerritory"];
    
    if (!allowedTerritories.includes(formData.territory)) {
      alert("Please select a valid territory.");
      return;
    }
    
    const currentTimestamp = new Date().toISOString(); // Get the current timestamp
    // const formDataWithTimestamp = { ...formData, leadEntryTime: currentTimestamp };
    const formDataWithTimestamp = { ...formData, leadEntryTime: currentTimestamp ,
      timeline: [
      {
        date: currentTimestamp,
        activity: "Lead created",
      },
    ], };

    console.log("Form Data with Lead Entry Time and timeline: ", formDataWithTimestamp);
    
    onFormSubmit(formDataWithTimestamp);
    alert("Form Data Submitted Succesfully!");

    setFormData(initialFormData);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handlePriorityClick = (level) => {
    setFormData({ ...formData, priority: level });
  };

  return (
    <div className=" min-h-screen flex  justify-center items-center">
      <form
        className="bg-white rounded-lg px-4 py-2 w-full  shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* <div className="m-auto flex justify-between "> */}
        <h2 className="text-2xl font-semibold text-center my-3">
          Lead Entry Form
        </h2>

        {/* <button className="w-30 h-10 bg-blue-200 p-2 rounded ">
            <NavLink to="/">⬅</NavLink>
          </button> */}
        {/* </div> */}

        <div className="grid grid-cols-4 gap-4">
          <div className="mb-0">
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter lead Name"
              fullWidth
              required
              variant="standard"
              id="standard"
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif", // Force Figtree font for label
                },
              }}
            />
          </div>

          <div className="mb-0">
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter lead Email"
              fullWidth
              required
              variant="standard"
              id="standard"
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif", // Force Figtree font for label
                },
              }}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="mb-0">
              <TextField
                label="Phone"
                name="phone"
                type="number"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter lead Phone Number"
                fullWidth
                required
                variant="standard"
                id="standard"
                sx={{
                  "& .MuiInputLabel-root": {
                    fontFamily: "Figtree, sans-serif",
                  },
                  width: "100%",
                }}
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isPhoneWhatsApp"
                    checked={formData.isPhoneWhatsApp}
                    onChange={handleCheckboxChange}
                  />
                }
                label="WhatsApp"
                sx={{
                  marginLeft: 2,
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="mb-0">
              <TextField
                label="Alternate Phone"
                name="alternatePhone"
                type="number"
                value={formData.alternatePhone}
                onChange={handleChange}
                placeholder="Enter Alternate Phone Number"
                fullWidth
                variant="standard"
                id="standard"
                sx={{
                  "& .MuiInputLabel-root": {
                    fontFamily: "Figtree, sans-serif", // Force Figtree font for label
                  },
                }}
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isAlternatePhoneWhatsApp"
                    checked={formData.isAlternatePhoneWhatsApp}
                    onChange={handleCheckboxChange}
                  />
                }
                label="WhatsApp"
                sx={{
                  marginLeft: 2,
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              />
            </div>
          </div>

          <div className="mb-0">
            <TextField
              label="Organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Enter lead Organization"
              fullWidth
              variant="standard"
              id="standard"
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif", // Force Figtree font for label
                },
              }}
            />
          </div>

          <div className="mb-0">
            <TextField
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
              required
              variant="standard"
              id="standard"
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif", // Force Figtree font for label
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Status
              </MenuItem>
              <MenuItem value="newLead">
                <button className="w-full bg-orange-400 text-white px-4 py-2 rounded">
                  New Lead
                </button>
              </MenuItem>

              <MenuItem value="contacted">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded">
                  Contacted
                </button>
              </MenuItem>

              <MenuItem value="attemptedToContact">
                <button className="w-full bg-red-400 text-white px-4 py-2 rounded">
                  Attempted to Contact
                </button>
              </MenuItem>

              <MenuItem value="qualified">
                <button className="w-full bg-green-400 text-white px-4 py-2 rounded">
                  Qualified
                </button>
              </MenuItem>

              <MenuItem value="unQualified">
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded">
                  Unqualified
                </button>
              </MenuItem>
            </TextField>
          </div>

          <div className="mb-0">
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter lead Title"
              fullWidth
              variant="standard"
              id="standard"
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif", // Force Figtree font for label
                },
              }}
            />
          </div>

          <div className="mb-0">
            <TextField
              label="Lead Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter lead Notes"
              fullWidth
              variant="standard"
              id="standard"
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif", // Force Figtree font for label
                },
              }}
            />
          </div>

          <div className="mb-0">
            <TextField
              select
              label="Lead Source"
              name="leadSource"
              value={formData.leadSource}
              onChange={handleChange}
              fullWidth
              variant="standard"
              id="standard"
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif", // Force Figtree font for label
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Status
              </MenuItem>
              <MenuItem value="walkin">Walk-in</MenuItem>
              <MenuItem value="phone">Phone</MenuItem>
              <MenuItem value="whatsapp">Whatsapp</MenuItem>
              <MenuItem value="email">E-mail</MenuItem>
              <MenuItem value="online">Online</MenuItem>
              <MenuItem value="otherSource">Others</MenuItem>
            </TextField>
          </div>


          <div className="mb-0">
            <TextField
              label="Lead Probability (%)"
              name="probability"
              type="number"
              value={formData.probability || ""}
              onChange={handleChange}
              fullWidth
              variant="standard"
              id="leadProbability"
              InputProps={{
                inputProps: { min: 0, max: 100 }, // Restricts input to between 0 and 100
              }}
              InputLabelProps={{
                shrink: true, // Keeps the label above the input
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif", // Apply Figtree font for the label
                },
              }}
            />
          </div>

          <div className="mb-4 flex items-center space-x-4">
  {/* Currency Selector */}
  <TextField
    select
    label="Currency"
    name="currency"
    value={formData.currency || ""} // Separate state for currency
    onChange={handleChange}
    variant="standard"
    sx={{
      width: "100px",
      "& .MuiInputLabel-root": {
        fontFamily: "Figtree, sans-serif",
      },
    }}
  >
    <MenuItem value="AED">AED</MenuItem>
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
    value={formData.bookedAmount || ""} // Separate state for booked amount
    onChange={handleChange}
    fullWidth
    variant="standard"
    InputProps={{
      inputProps: { min: 0 }, // Prevent negative amounts
    }}
    InputLabelProps={{
      shrink: true,
    }}
    sx={{
      "& .MuiInputLabel-root": {
        fontFamily: "Figtree, sans-serif",
      },
    }}
  />
</div>

          <div className="mb-0">
            <TextField
              select
              label="Territory"
              name="territory"
              value={formData.territory}
              onChange={handleChange}
              fullWidth
              variant="standard"
              id="territory"
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif", // Force Figtree font for label
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Territory
              </MenuItem>
              <MenuItem value="dubai">Dubai</MenuItem>
              <MenuItem value="abudhabi">Abu Dhabi</MenuItem>
              <MenuItem value="sharjah">Sharjah</MenuItem>
              <MenuItem value="ajman">Ajman</MenuItem>
              <MenuItem value="otherTerritory">Others</MenuItem>
            </TextField>
          </div>

          {/* Country Field */}
          <div className="mb-0">
            <TextField
              select
              label="Country"
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
              fullWidth
              variant="standard"
              id="country"
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif",
                },
              }}
            >
              <MenuItem value="US">United States</MenuItem>
              <MenuItem value="UK">United Kingdom</MenuItem>
              <MenuItem value="IN">India</MenuItem>
              <MenuItem value="CA">Canada</MenuItem>
              <MenuItem value="AU">Australia</MenuItem>
              <MenuItem value="OtherCurrency">Others</MenuItem>
            </TextField>
          </div>

          {/* Street Address Field */}
          <div className="mb-0">
            <TextField
              label="Street Address"
              name="streetAddress"
              value={formData.streetAddress || ""}
              onChange={handleChange}
              fullWidth
              variant="standard"
              id="streetAddress"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif",
                },
              }}
            />
          </div>

          {/* City Field */}
          <div className="mb-0">
            <TextField
              label="City"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              fullWidth
              variant="standard"
              id="city"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif",
                },
              }}
            />
          </div>

          {/* Apartment Field */}
          <div className="mb-0">
            <TextField
              label="Apartment (Optional)"
              name="apartment"
              value={formData.apartment || ""}
              onChange={handleChange}
              fullWidth
              variant="standard"
              id="apartment"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif",
                },
              }}
            />
          </div>

          <div className="mb-0">
            <TextField
              label="Location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter lead Location"
              fullWidth
              variant="standard"
              id="standard"
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif", // Force Figtree font for label
                },
              }}
            />
          </div>

          <div className="mb-0">
            <TextField
              label="Area Name"
              name="area"
              type="text"
              value={formData.area}
              onChange={handleChange}
              placeholder="Enter lead Area name"
              fullWidth
              variant="standard"
              id="standard"
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Figtree, sans-serif", // Force Figtree font for label
                },
              }}
            />
          </div>

          <div className="my-4  flex items-center justify-between">
            <label className="block font-medium mb-2 text-black text-opacity-60">
              Attach File
            </label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className=" rounded w-[70%] p-1  "
            />
          </div>

          {/* Priority Selection */}
          <div className="my-4 flex gap-4 items-center justify-between">
            <label className="block font-medium mb-2 text-black text-opacity-60">
              Priority
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3].map((level,index) => (
                <button
                  key={`${level}-${index}`}
                  type="button"
                  className={`text-2xl transition-all duration-300 ease-in-out ${
                    formData.priority >= level
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
          <br></br>
        </div>

        <div className="productsContainer bg-blue-300 rounded px-4 py-2">
          <h2 className="text-2xl font-semibold text-center my-3">
            Products Information
          </h2>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded "
          >
            Add Product
          </button>
          {/* click this button to add producucts , show this below message when items are empty  */}
          <div className="my-4 bg-white text-center p-6 rounded-sm">
            {/* <TableComponent
              title="Products"
              rows={rows}
              headCells={headCells}
              onDelete={handleDelete}
              onFilter={handleFilter}
            /> */}
            You haven't added any products yet. Click 'Add Product' to start!
          </div>
        </div>

        <div className="flex justify-center pt-6 pb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-1/2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AllEntriesForm;
