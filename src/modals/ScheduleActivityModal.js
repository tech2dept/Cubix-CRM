import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import CalendarPicker from "../components/Calendar";


export default function ScheduleActivityPopup() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    activityType: "",
    summary: "",
    dueDate: "",
    assignedTo: "",
    notes: "",
  });



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    handleClose();
  };

  return (
    <div>
      {/* Uncomment if you need a button to open the popup */}
      {/* <Button variant="contained" color="primary" onClick={handleOpen}>
        Schedule Activity
      </Button> */}

      <Dialog open={true} onClose={handleClose} fullWidth maxWidth="sm">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-80 ">
          <div className="bg-white rounded-lg shadow-lg w-[80vw]  p-3 max-h-[60vh] overflow-y-scroll ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-normal">Schedule Activity</h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-xl"
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            <div className="bg-red-100 flex items-center justify-between">
            {/* <div className="space-y-flex"> */}
            <div className=" bg-blue-100 w-1/3 space-y-6">
              {/* Activity Type */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Activity Type
                </label>
                <select
                  name="activityType"
                  value={formData.activityType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">Select...</option>
                  <option value="Call">Call</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Email">Email</option>
                  <option value="Follow-Up">Follow-Up</option>
                  <option value="Demo">Demo</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-medium mb-1">Summary</label>
                <input
                  type="text"
                  name="summary"
                  placeholder="e.g., Discuss proposal"
                  value={formData.summary}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>



              {/* Assigned To */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Assigned To
                </label>
                <input
                  type="text"
                  name="assignedTo"
                  placeholder="Enter assignee name"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              {/* Log a Note */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Log a Note
                </label>
                <textarea
                  name="notes"
                  placeholder="Add additional notes..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  rows={3}
                ></textarea>
              </div>

              </div>




                            {/* Due Date */}
              <div>
                <label className="block text-sm font-medium mb-1 w-full">
                  Due Date
                </label>
                {/* <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                /> */}
                <CalendarPicker />
              </div>
            </div>



            <div className="flex justify-end items-center mt-6 gap-3">
              <button
                onClick={handleSubmit}
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
              >
                Schedule
              </button>
              {/* <button
                onClick={() => {
                  handleSubmit();
                  console.log("Marked as Done and Scheduled");
                }}
                className="bg-gray-100 text-purple-600 py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                Schedule & Mark as Done
              </button>
              <button
                onClick={() => {
                  handleSubmit();
                  console.log("Done & Scheduled Next");
                }}
                className="bg-gray-100 text-purple-600 py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                Done & Schedule Next
              </button> */}
              <button
                onClick={handleClose}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>



        
        {/* <DialogTitle>Schedule Activity</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Activity Type"
            name="activityType"
            value={formData.activityType}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="To-Do">To-Do</MenuItem>
            <MenuItem value="Call">Call</MenuItem>
            <MenuItem value="Meeting">Meeting</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Summary"
            name="summary"
            placeholder="e.g., Discuss proposal"
            value={formData.summary}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            label="Assigned to"
            name="assignedTo"
            placeholder="Enter assignee name"
            value={formData.assignedTo}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Log a Note"
            name="notes"
            placeholder="Add additional notes..."
            value={formData.notes}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
          />
        </DialogContent> */}

        {/* <DialogActions>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Schedule
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              console.log("Marked as Done and Scheduled");
            }}
            color="primary"
            variant="outlined"
          >
            Schedule & Mark as Done
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              console.log("Done & Scheduled Next");
            }}
            color="primary"
            variant="outlined"
          >
            Done & Schedule Next
          </Button>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}




// import React, { useState } from "react";
// import CalendarPicker from "../components/Calendar";


// export default function ScheduleActivityPopup() {
//   const [open, setOpen] = useState(true); // Set to true for demonstration
//   const [formData, setFormData] = useState({
//     activityType: "",
//     summary: "",
//     dueDate: "",
//     assignedTo: "",
//     notes: "",
//   });

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = () => {
//     console.log("Submitted Data:", formData);
//     handleClose();
//   };

//   return (
//     <div>
//       {open && (

//       )}
      
//     </div>
//   );
// }
