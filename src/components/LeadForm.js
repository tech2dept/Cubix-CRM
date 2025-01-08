import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    status: "",
    organization: "",
    title: "",
    email: "",
    attachFile: "",
    priority: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Data : ", formData);
    localStorage.setItem('leadFormData',JSON.stringify(formData))
    alert("Form Data Submitted Succesfully!");
  };

  const handlePriorityClick = (level) => {
    setFormData({ ...formData, priority: level });
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <form
        className="bg-white rounded-lg px-8 py-4 w-1/2 max-w-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center my-3">
          Leads Entry Form
        </h2>

        <div className="mb-4">
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
                '& .MuiInputLabel-root': {
                  fontFamily: 'Figtree, sans-serif', // Force Figtree font for label
                },
              }}
          />
        </div>

 

        <div className="mb-4">
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
                '& .MuiInputLabel-root': {
                  fontFamily: 'Figtree, sans-serif', // Force Figtree font for label
                },
              }}
          >
            <MenuItem value="" disabled>
              Select Status
            </MenuItem>
            <MenuItem value="newLead">New Lead</MenuItem>
            <MenuItem value="contacted">Contacted</MenuItem>
            <MenuItem value="attemptedToContact">Attempted to Contact</MenuItem>
            <MenuItem value="qualified">Qualified</MenuItem>
            <MenuItem value="unQualified">Unqualified</MenuItem>
          </TextField>
        </div>

        <div className="mb-4">
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
                '& .MuiInputLabel-root': {
                  fontFamily: 'Figtree, sans-serif', // Force Figtree font for label
                },
              }}
          />
        </div>

        <div className="mb-4">
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
                '& .MuiInputLabel-root': {
                  fontFamily: 'Figtree, sans-serif', // Force Figtree font for label
                },
              }}
          />
        </div>

        <div className="mb-4">
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
                '& .MuiInputLabel-root': {
                  fontFamily: 'Figtree, sans-serif', // Force Figtree font for label
                },
              }}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Attach File</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="bg-gray-200 rounded w-full px-4 py-2"
          />
        </div>

        {/* Priority Selection */}
        <div className="mb-4 flex gap-4 items-center">
          <label className="block font-medium mb-2">Priority</label>
          <div className="flex space-x-2">
            {[1, 2, 3].map((level,index) => (
              <button
              key={`${level}-${index}`} // Unique key
                type="button"
                className={`text-xl ${
                  formData.priority >= level
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
                onClick={() => handlePriorityClick(level)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            <NavLink to='/allEntriesForm'>All Entries</NavLink>
            {/* <NavLink to='/leadForm'>Add Lead</NavLink>   */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
