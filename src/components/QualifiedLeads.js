import React, { useEffect, useState } from "react";
import delete_Vector from "../utils/delete_Vector.jpg";

import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  ButtonGroup,
} from "@mui/material";
import KanbanViewQualified from "./KanbanQualified";
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineCopy,
  AiOutlineArrowUp,
  AiOutlineEdit,
} from "react-icons/ai";
import kanban from "../utils/kanban.png";
import table from "../utils/table.png";
import DiscoveryLeads from "./DiscoveryLeads";
import WonLeads from "./WonLeads";
import Drawer from "./Drawer";
import HistoryDisplay from "./HistoryDisplay";
import products from "../utils/products.png";
const QualifiedLeads = () => {
  const [discoveryLeads, setDiscoveryLeads] = useState(
    JSON.parse(localStorage.getItem("discoveryLeads")) || [] // Initialize from localStorage if available
  );

  const [wonLeads, setWonLeads] = useState(
    JSON.parse(localStorage.getItem("wonLeads")) || [] // Initialize from localStorage if available
  );

  const [lostLeads, setLostLeads] = useState(
    JSON.parse(localStorage.getItem("lostLeads")) || [] // Initialize from localStorage if available
  );

  const [showStageModal, setShowStageModal] = useState(false); // To control the visibility of the modal

  const [qualifiedLeads, setQualifiedLeads] = useState(
    JSON.parse(localStorage.getItem("qualifiedLeads"))?.map((lead) => ({
      ...lead,
      stage: lead.stage || "new",
    })) || [] // Initialize from localStorage if available
  );

  const [selectedLeads, setSelectedLeads] = useState([]); // State to track selected leads
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal state
  const [showDrawer, setShowDrawer] = useState(false); // Drawer visibility state
  const [selectedLead, setSelectedLead] = useState(null); // Store selected lead for
  const [viewMode, setViewMode] = useState("Tabular"); // View mode state
  const [history, setHistory] = useState([]); // State to track history of selected lead
  // const [timeline, setTimeline] = useState([]); // State to track history of selected lead

  const [rows, setRows] = useState(() => {
    const savedData = localStorage.getItem("qualifiedLeads");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("qualifiedLeads", JSON.stringify(qualifiedLeads)); // Save qualified leads to localStorage
  }, [qualifiedLeads]);

  // // console.log('qualifiedLeads in qualified leads:',qualifiedLeads)
  // // console.log('qualifiedLeads in qualified leads.leadTimeline:',qualifiedLeads.leadTimeline)
  // setTimeline(qualifiedLeads)
  const stageMapping = {
    new: "New",
    discovery: "Discovery",
    proposal: "Proposal",
    negotiation: "Negotiation",
    won: "Won",
    lost: "Lost",
  };

  const handleCheckboxChange = (id) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]
    );
  };

  const deleteSelectedLeads = () => {
    const updatedLeads = qualifiedLeads.filter(
      (lead) => !selectedLeads.includes(lead.id)
    );
    setQualifiedLeads(updatedLeads);
    setSelectedLeads([]); // Clear selected leads after deletion
    setShowDeleteModal(false); // Close modal after deletion
  };

  const closeModal = () => {
    setShowDeleteModal(false); // Close modal
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false); // Close modal
  };

  const viewLead = (id) => {
    const lead = qualifiedLeads.find((lead) => lead.id === id);
    setSelectedLead(lead);
    setShowDrawer(true); // Show Drawer
  };

  const handleInputChange = (e, field) => {
    setSelectedLead((prevLead) => ({
      ...prevLead,
      [field]: e.target.value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Loop through the fields of selectedLead to detect changes
    const updatedLead = { ...selectedLead };
    // const leadTimeline =

    let isChanged = false; // Flag to track if any field has changed
    const updatedHistory = updatedLead.history || []; // Ensure history exists

    // Compare fields and add changes to history
    Object.keys(updatedLead).forEach((field) => {
      const oldValue = qualifiedLeads.find(
        (lead) => lead.id === selectedLead.id
      )[field];
      const newValue = updatedLead[field];
      if (oldValue !== newValue) {
        // If the field has changed, add an activity to the history
        updatedHistory.push({
          date: new Date().toISOString(),
          activity: `Field "${field}" updated`,
          note: `Changed from "${oldValue}" to "${newValue}"`,
        });

        isChanged = true; // Set flag to true if any field has changed
      }
    });

    // Only update history and save if there are changes
    if (isChanged) {
      updatedLead.history = updatedHistory;
      setHistory(updatedHistory); // Update history state
      // console.log('updatedLead.leadHistory',updatedLead.leadHistory)
      // console.log('updatedLead.history',updatedLead.history)
    }

    const updatedLeads = qualifiedLeads.map((lead) =>
      lead.id === selectedLead.id ? selectedLead : lead
    );
    setQualifiedLeads(updatedLeads);
    localStorage.setItem("qualifiedLeads", JSON.stringify(updatedLeads));
    setShowDrawer(false); // Close Drawer after saving
  };

  const openStatusModal = (lead) => {
    setSelectedLead(lead);
    setShowStageModal(true);
  };

  const closeStatusModal = () => {
    setShowStageModal(false);
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setHistory(lead.history || []); // Initialize history for the selected lead
    setShowDrawer(true);
  };
  // const updateStageToDiscovery = (leadId) => {
  //   // First, find the lead to update
  //   const leadToMove = rows.find((row) => row.id === leadId);

  //   if (leadToMove) {
  //     // Update the status of the lead to "Qualified" and add it to qualifiedLeads
  //     const updatedLead = { ...leadToMove, stage: "discovery" };
  //     const updatedQualifiedLeads = [...qualifiedLeads, updatedLead];
  //     setQualifiedLeads(updatedQualifiedLeads);

  //     // Remove the lead from the current rows list
  //     setRows((prevRows) => {
  //       const updatedRows = prevRows.filter((row) => row.id !== leadId);
  //       // Save the updated rows and qualified leads to localStorage
  //       localStorage.setItem("rows", JSON.stringify(updatedRows));
  //       localStorage.setItem(
  //         "qualifiedLeads",
  //         JSON.stringify(updatedQualifiedLeads)
  //       );
  //       return updatedRows;
  //     });
  //   }

  //   // Close the modal after updating
  //   setShowStageModal(false);
  // };

  const updateStageToDiscovery = (leadId) => {
    // Find the lead to update
    const leadToMove = rows.find((row) => row.id === leadId);
    if (!leadToMove) return; // Guard against invalid ID

    // Update the lead's stage to "discovery"
    const updatedQualifiedLead = { ...leadToMove, stage: "discovery" };

    // Update the rows state and remove the updated lead
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== leadId);
      // console.log("updatedRows", updatedRows);

      // Save updated rows to localStorage
      localStorage.setItem("qualifiedLeads", JSON.stringify(updatedRows));

      return updatedRows; // Update state with the filtered rows
    });

    // Add the updated lead to the discoveryLeads list
    const updatedDiscoveryLeads = [...discoveryLeads, updatedQualifiedLead];
    setDiscoveryLeads(updatedDiscoveryLeads);
    // console.log("updatedDiscoveryLeads", updatedDiscoveryLeads);

    // Save updated discoveryLeads to localStorage
    localStorage.setItem(
      "discoveryLeads",
      JSON.stringify(updatedDiscoveryLeads)
    );

    // Close the modal
    setShowStageModal(false);
  };

  const updateStageToWon = (leadId) => {
    // Find the lead to update
    const leadToMoveWon = rows.find((row) => row.id === leadId);
    if (!leadToMoveWon) return; // Guard against invalid ID

    // Create a new timeline entry for the status change to "Won"
    const currentTimestamp = new Date().toISOString(); // Get the current timestamp
    const statusChangeTimeline = {
      date: currentTimestamp,
      activity: "Stage changed to Won",
    };

    // Ensure timeline exists and is an array, then add the new activity
    const updatedQualifiedLeadWon = {
      ...leadToMoveWon,
      stage: "won", // Update stage to won
      timeline: Array.isArray(leadToMoveWon.timeline)
        ? [...leadToMoveWon.timeline, statusChangeTimeline] // Add the new timeline entry
        : [statusChangeTimeline], // If no timeline, create a new array with the status change
    };

    // Update the rows state and remove the updated lead from rows
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== leadId);
      // console.log("updatedRows", updatedRows);

      // Save updated rows to localStorage
      localStorage.setItem("qualifiedLeads", JSON.stringify(updatedRows));

      return updatedRows; // Update state with the filtered rows
    });

    // Add the updated lead to the wonLeads list
    const updatedWonLeads = [...wonLeads, updatedQualifiedLeadWon];
    setWonLeads(updatedWonLeads);
    // console.log("updatedWonLeads", updatedWonLeads);

    // Save updated wonLeads to localStorage
    localStorage.setItem("wonLeads", JSON.stringify(updatedWonLeads));

    // Close the modal
    setShowStageModal(false);
  };

  const updateStageToLost = (leadId) => {
    // Find the lead to update
    const leadToMoveLost = rows.find((row) => row.id === leadId);
    if (!leadToMoveLost) return; // Guard against invalid ID

    // Update the lead's stage to "lost"
    const updatedQualifiedLeadLost = { ...leadToMoveLost, stage: "lost" };

    // Update the rows state and remove the updated lead
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== leadId);
      // console.log("updatedRows", updatedRows);

      // Save updated rows to localStorage
      localStorage.setItem("qualifiedLeads", JSON.stringify(updatedRows));
      // localStorage.setItem("lostLeads", JSON.stringify(updatedRows));

      return updatedRows; // Update state with the filtered rows
    });

    // Add the updated lead to the wonLeads list
    const updatedLostLeads = [...lostLeads, updatedQualifiedLeadLost];
    setLostLeads(updatedLostLeads);
    // console.log("updatedLostLeads", updatedLostLeads);

    // Save updated discoveryLeads to localStorage
    localStorage.setItem("lostLeads", JSON.stringify(updatedLostLeads));

    // Close the modal
    setShowStageModal(false);
  };
  // console.log('selectedLeadddd:',selectedLead)
  // // console.log('selectedLead.leadTimeline:',selectedLead.leadTimeline)

  const calculateAgedDays = (leadEntryTime) => {
    const entryTime = new Date(leadEntryTime);
    const currentTime = new Date();
    const diffInMilliseconds = currentTime - entryTime;
  
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    return `Aged Days: ${diffInDays} days, ${diffInHours} hours`;
  };

  return (
    <div className="p-6 relative text-sm font-thin">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-normal mb-2">Qualified Leads</h2>
        <ButtonGroup
          variant="outlined"
          sx={{
            backgroundColor: "white",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", // shadow-sm equivalent
            "& .MuiButton-outlined": {
              border: "none", // Removes the outline
            },
          }}
        >
          <Button
            onClick={() => setViewMode("Kanban")}
            sx={{
              backgroundColor: viewMode === "transparent", // Light blue for selected
              "& img": {
                filter:
                  viewMode === "Kanban"
                    ? "invert(29%) sepia(98%) saturate(2942%) hue-rotate(202deg) brightness(95%) contrast(92%)"
                    : "none", // Blue color for selected
              },
            }}
          >
            <img src={kanban} alt="kanban-icon" className="w-6 h-6" />
          </Button>
          <Button
            onClick={() => setViewMode("Tabular")}
            sx={{
              backgroundColor: viewMode === "transparent", // Light blue for selected
              "& img": {
                filter:
                  viewMode === "Tabular"
                    ? "invert(29%) sepia(98%) saturate(2942%) hue-rotate(202deg) brightness(95%) contrast(92%)"
                    : "none", // Blue color for selected
              },
            }}
          >
            <img src={table} alt="table-icon" className="w-6 h-6" />
          </Button>
        </ButtonGroup>
      </div>

      {viewMode === "Kanban" ? (
        <KanbanViewQualified rows={rows} setRows={setRows} />
      ) : (
        <div>
          {selectedLeads.length > 0 && (
            <div className="mb-2">
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                disabled={selectedLeads.length === 0}
              >
                Delete Selected
              </button>
            </div>
          )}
          <div className=" overflow-x-auto mt-4 max-h-[50vh] overflow-y-auto scrollbar-thin">
          <table className="table-auto w-[100%] border-collapse border border-gray-200">
            <thead className=" bg-gray-100">
              <tr className="">
                <th className="shadow-sm px-1 py-0 text-left font-normal">
                  <input
                    type="checkbox"
                    className="rounded border border-sm shadow"
                    onChange={(e) =>
                      setSelectedLeads(
                        e.target.checked
                          ? qualifiedLeads.map((lead) => lead.id)
                          : []
                      )
                    }
                    checked={
                      selectedLeads.length > 0 &&
                      selectedLeads.length === qualifiedLeads.length
                    }
                  />
                </th>
                <th className="shadow-sm px-1 py-0.5 text-left font-normal">
                  Lead
                </th>
                <th className="shadow-sm px-1 py-0 text-left font-normal">
                  Stage
                </th>
                <th className="shadow-sm px-1 py-0 text-left font-normal">
                  Organization
                </th>
                <th className="shadow-sm px-1 py-0 text-left font-normal">
                  Title
                </th>
                <th className="shadow-sm px-1 py-0 text-left font-normal">
                  Email
                </th>
                <th className="shadow-sm px-1 py-0 text-left font-normal">
                  Phone
                </th>
                <th className="shadow-sm px-1 py-0 text-left font-normal">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {console.log('qualifiedLeads in tbody:',qualifiedLeads)}
              {/* {console.log('qualifiedLeads in tbody:',qualifiedLeads.leadEntryTime)} */}
              {qualifiedLeads.map((row) => (
                <tr key={`${row.id}-${row.stage}`}>
                  <td className="shadow-sm px-1 py-0 w-10">
                    <div className=" flex justify-right items-center gap-1.5">

                    <input
                      type="checkbox"
                      className="rounded border border-sm shadow"
                      checked={selectedLeads.includes(row.id)}
                      onChange={() => handleCheckboxChange(row.id)}
                      />

                    {row.leadIsItemAdded && (
                      <img
                      src={products}
                      alt="products-icon"
                      className="w-1 h-1 bg-green-500 text-xs p-1 rounded-lg"
                      />
                    )}
                    </div>
                  </td>

                  <td
                    onClick={() => viewLead(row.id)}
                    className=" shadow-sm px-1 py-0.5 cursor-pointer  "
                  >
                    {/* <div className="flex items-center justify-left gap-2 cursor-pointer">
                    {row.leadIsItemAdded && (
                      <img src={products} alt="products-icon" className="w-5 h-5  bg-green-200  text-xs p-0.5  rounded-lg" />
                    )}
                    {row.lead}
                    </div> */}

                    <div className="flex items-end text-left justify-between  w-auto">
                    <div>
                    {row.lead}
                    </div>

                    <div className="text-xs font-thin bg-gray-400 px-0.5 rounded-lg text-white">
                    {/* <div className="text-xs font-thin"> */}
                    {calculateAgedDays(row.leadEntryTime)}
                    </div>
                    </div>
                  </td>

                  <td
                    className="shadow-sm px-1 py-0"
                    onClick={() => openStatusModal(row)}
                  >
                    {/* {row.status && ( */}
                    {row.stage && (
                      <button
                        className={`w-full text-white text-center rounded p-1 mb-0.5  ${
                          row.stage === "new"
                            ? "bg-purple-500"
                            : row.stage === "discovery"
                            ? "bg-violet-700"
                            : row.stage === "proposal"
                            ? "bg-blue-400"
                            : row.stage === "negotiation"
                            ? "bg-blue-800"
                            : row.stage === "won"
                            ? "bg-green-400"
                            : row.stage === "lost"
                            ? "bg-red-500"
                            : "bg-gray-300"
                        }`}
                      >
                        {stageMapping[row.stage] || row.stage}
                      </button>
                    )}
                  </td>
                  <td className="shadow-sm px-1 py-0">{row.organization}</td>
                  <td className="shadow-sm px-1 py-0">{row.title}</td>
                  <td className="shadow-sm px-1 py-0">{row.email}</td>
                  <td className="shadow-sm px-1 py-0">{row.phone}</td>
                  <td className="shadow-sm px-1 py-0 ">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <Drawer
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            selectedLead={selectedLead}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            rows={rows}
            setRows={setRows} // Passing state and updater function
            leadsWithHistory={history}
            stageMapping={stageMapping}
            // updatedLead.leadHistory
            // leadTimeline={selectedLead.leadTimeline}
          />

          {/* Delete Confirmation Modal */}
          {showDeleteModal && selectedLeads.length > 0 && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center relative">
                {/* Image Section */}
                <div className="flex justify-center mb-2">
                  <img
                    src={delete_Vector}
                    alt="Delete Icon"
                    className="w-1/2 h-auto max-w-xs"
                  />
                </div>

                {/* Close Button */}
                <button
                  className="absolute top-6 right-8 text-gray-500 hover:text-black"
                  onClick={closeDeleteModal}
                >
                  ✖
                </button>

                {/* Title Section */}
                <div className="text-xl font-semibold text-black">
                  {selectedLeads.length === 1
                    ? "Lead Selected"
                    : "Leads Selected"}
                </div>
                <div className="text-gray-700 mb-6">
                  {/* Display different message based on the number of selected rows */}
                  {selectedLeads.length === 1 ? (
                    <span className="font-bold">
                      Are you sure you want to delete {selectedLeads.length}{" "}
                      lead?
                    </span>
                  ) : (
                    <span className="font-bold">
                      Are you sure you want to delete {selectedLeads.length}{" "}
                      leads?
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                  {/* Delete Button */}
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={deleteSelectedLeads} // Call delete function
                  >
                    Delete
                  </button>

                  {/* Cancel Button */}
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    onClick={closeDeleteModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Dialog for select stage */}
          {showStageModal && selectedLead && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 ">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80 ">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl   mb-4 text-center">
                    Update Lead Stage
                  </h3>
                  <div
                    onClick={closeStatusModal}
                    className="cursor-pointer text-gray-600 hover:text-gray-900"
                  >
                    <AiOutlineClose />
                  </div>
                </div>

                <div className="flex flex-col gap-1 justify-center">
                  <button className="bg-purple-500 text-white px-1 py-2 rounded">
                    New
                  </button>
                  <button
                    // key={`${index}`}
                    onClick={() => updateStageToDiscovery(selectedLead.id)} // Use lead.id directly
                    className="bg-violet-700 text-white px-1 py-2 w-full rounded"
                  >
                    Discovery
                  </button>
                  {/* ))} */}
                  <button className="bg-blue-400 text-white px-1 py-2 rounded">
                    Proposal
                  </button>
                  <button
                    // onClick={() => updateStatusToQualified(selectedLead.id)} // Pass the selectedLead.id
                    className="bg-blue-800 text-white px-1 py-2  rounded"
                  >
                    Negotiation
                  </button>
                  <button
                    onClick={() => updateStageToWon(selectedLead.id)}
                    className="bg-green-400 text-white px-1 py-2 rounded"
                  >
                    Won
                  </button>
                  <button
                    onClick={() => updateStageToLost(selectedLead.id)}
                    className="bg-red-500 text-white px-1 py-2 rounded"
                  >
                    Lost
                  </button>
                  <hr className="mt-4 border-gray-400" />
                  <button className="bg-none text-black px-4 py-1 rounded">
                    Edit Labels
                  </button>
                </div>
              </div>
            </div>
          )}

          <DiscoveryLeads rows={rows} setRows={setRows} />
        </div>
      )}
    </div>
  );
};

export default QualifiedLeads;
