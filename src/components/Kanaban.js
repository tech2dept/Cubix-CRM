import React, { useState } from "react";
import emptyList from '../utils/emptyList.png'
import expand from '../utils/expand.png'
import { v4 as uuidv4 } from "uuid";
import products from "../utils/products.png";

const statusMapping = {
  newLead: "New Lead",
  contacted: "Contacted",
  attemptedToContact: "Attempted to Contact",
  qualified: "Qualified",
  unQualified: "Unqualified",
};

const statusClasses = {
  newLead: "bg-orange-400",
  contacted: "bg-blue-600",
  attemptedToContact: "bg-red-400",
  qualified: "bg-green-400",
  unQualified: "bg-red-600",
};

const KanbanViewLeads = ({ rows, setRows }) => {
      const [showSidebar, setShowSidebar] = useState(false); // Sidebar visibility state
    
  // Group rows by their status
  const groupedRows = rows.reduce((acc, row) => {
    acc[row.status] = acc[row.status] || [];
    acc[row.status].push(row);
    return acc;
  }, {});

  // Handle drag and drop
  const onDragStart = (e, leadId, fromStatus) => {
    e.dataTransfer.setData("leadId", leadId);
    e.dataTransfer.setData("fromStatus", fromStatus);
  };

  const onDrop = (e, newStatus) => {
    const leadId = e.dataTransfer.getData("leadId");
    const fromStatus = e.dataTransfer.getData("fromStatus");

    if (fromStatus === newStatus) return; // Skip if the status is unchanged

    // Update the row's status
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === parseInt(leadId, 10)
          ? { ...row, status: newStatus }
          : row
      )
    );
  };

  const allowDrop = (e) => {
    e.preventDefault(); // Allow dropping
  };


//   const viewLead = (id) => {
//     const lead = qualifiedLeads.find((lead) => lead.id === id);
//     setSelectedLead(lead);
//     setShowSidebar(true); // Show sidebar
//   };


//     const handleSave = (e) => {
//     e.preventDefault();
//     const updatedLeads = qualifiedLeads.map((lead) =>
//       lead.id === selectedLead.id ? selectedLead : lead
//     );
//     setQualifiedLeads(updatedLeads);
//     localStorage.setItem("qualifiedLeads", JSON.stringify(updatedLeads));
//     setShowSidebar(false); // Close sidebar after saving
//   };

//   const handleInputChange = (e, field) => {
//     setSelectedLead((prevLead) => ({
//       ...prevLead,
//       [field]: e.target.value,
//     }));
//   };

  return (
    <div className="flex gap-4 p-4">
      {Object.keys(statusMapping).map((status,index) => (
        <div
          key={`${status}-${index}`}
          className="flex-1 bg-gray-100 rounded shadow-md "
          // role="button"
          // aria-dropeffect="move"
          onDragOver={allowDrop}
          onDrop={(e) => onDrop(e, status)}
        >
          <h2
            className={`text-lg font-normal text-center p-2 mb-2 text-white ${
              statusClasses[status]
            } rounded-t`}
          >
            {statusMapping[status]}
          </h2>
          <div className="flex flex-col gap-2 py-4 ">
            
            {groupedRows[status]?.map((lead,index) => (
              <div
              key={`${lead.id}-${index}`}
                draggable
                onDragStart={(e) =>
                  onDragStart(e, lead.id, lead.status)
                }
                className="bg-white rounded shadow p-6 m-2 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between items-center ">
                <h3 className="font-normal">{lead.lead}</h3>
                                  {lead.leadIsItemAdded && (
                                  <img
                                  src={products}
                                  alt="products-icon"
                                  className="w-1 h-1 bg-green-500 text-xs p-1 rounded-lg m-1"
                                  />
                                  )}
                <img src={expand} alt='expand-icon' className="w-4 h-4" />
                </div>
                <p className="text-sm text-gray-600">
                  {lead.organization || "No organization"}
                </p>
                <p className="text-sm text-gray-600">
                  {lead.title || "No title"}
                </p>
                <p className="text-sm text-gray-600">
                  {lead.email || "No email"}
                </p>
              </div>
            ))}

{/* groupedRows[status]?.forEach(lead => {
  console.log(`Key: ${lead.id}`);
}); */}
            
            {!groupedRows[status]?.length && (
                <div className="flex flex-col justify-center items-center text-gray-500">
                  <img src={emptyList} alt="emptylist" className="w-32 h-24" />
                  <p className="text-gray-400 pb-2 text-center">No leads</p>
                </div>
            )}
          </div>
        </div>
      ))}



{/* {showSidebar && (
  <div
    className={`fixed right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 p-6 overflow-y-auto  transition-all duration-300 ease-in-out ${
      showSidebar ? "translate-x-0" : "translate-x-full"
    }`}
  >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                onClick={() => setShowSidebar(false)}
              >
                ✖
              </button>
              <h3 className="text-2xl font-semibold mb-4">Lead Details</h3>

              {selectedLead ? (
                <div>
                  <form onSubmit={(e) => handleSave(e)}>
                    <div className="mb-4">
                      <TextField
                        label="Lead"
                        id="lead"
                        fullWidth
                        variant="standard"
                        value={selectedLead.lead}
                        onChange={(e) => handleInputChange(e, "lead")}
                      />
                    </div>

                    <div className="mb-4">
                      <FormControl fullWidth variant="standard">
                        <InputLabel id="stage-label">Stage</InputLabel>
                        <Select
                          labelId="stage-label"
                          id="stage"
                          value={selectedLead.stage}
                          onChange={(e) => handleInputChange(e, "stage")}
                          label="stage"
                        >
                          {Object.entries(stageMapping).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div className="mb-4">
                      <TextField
                        label="Organization"
                        id="organization"
                        fullWidth
                        variant="standard"
                        value={selectedLead.organization}
                        onChange={(e) => handleInputChange(e, "organization")}
                      />
                    </div>

                    <div className="mb-4">
                      <TextField
                        label="Title"
                        id="title"
                        fullWidth
                        variant="standard"
                        value={selectedLead.title}
                        onChange={(e) => handleInputChange(e, "title")}
                      />
                    </div>

                    <div className="mb-4">
                      <TextField
                        label="Email"
                        id="email"
                        fullWidth
                        variant="standard"
                        value={selectedLead.email}
                        onChange={(e) => handleInputChange(e, "email")}
                      />
                    </div>

                    <div className="mb-4">
                      <TextField
                        label="Phone"
                        id="phone"
                        fullWidth
                        variant="standard"
                        value={selectedLead.phone}
                        onChange={(e) => handleInputChange(e, "phone")}
                      />
                    </div>



                    <div className="mb-4">
                      <TextField
                        label="Notes"
                        id="notes"
                        fullWidth
                        multiline
                        rows={4}
                        variant="standard"
                        value={selectedLead.notes}
                        onChange={(e) => handleInputChange(e, "notes")}
                      />
                    </div>

                    <div className="mb-4">
                      <TextField
                        label="Address"
                        id="address"
                        fullWidth
                        multiline
                        rows={4}
                        variant="standard"
                        value={selectedLead.address}
                        onChange={(e) => handleInputChange(e, "address")}
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button
                        variant="standard"
                        color="secondary"
                        onClick={() => setShowSidebar(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="contained" color="primary" type="submit">
                        Save
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <p>No lead selected</p>
              )}
            </div>
          )}*/}
    </div>
  );
}; 

export default KanbanViewLeads;
