import React, { useEffect, useState } from "react";
import emptyList from '../utils/emptyList.png';
import expand from '../utils/expand.png';
import products from "../utils/products.png";


import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Button,
    ButtonGroup,
  } from "@mui/material";
import Drawer from "./Drawer";

const stageMapping = {
  new: "New",
  discovery: "Discovery",
  proposal: "Proposal",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

const stageClasses = {
  new: "bg-purple-500",
  discovery: "bg-violet-600",
  proposal: "bg-blue-400",
  negotiation: "bg-blue-800",
  won: "bg-green-400",
  lost: "bg-red-500",
};

const KanbanViewQualified = ({ setRows }) => {
  const [selectedLead, setSelectedLead] = useState(null); // Store selected lead for Drawer
  // const [showDrawer, setShowDrawer] = useState(false); // Drawer visibility state
  const [showDrawer, setShowDrawer] = useState(false);
  const [qualifiedLeads, setQualifiedLeads] = useState(
    JSON.parse(localStorage.getItem("qualifiedLeads"))?.map((lead) => ({
      ...lead,
      stage: lead.stage || "new",
    })) || [] // Fetch leads from localStorage
  );

  useEffect(() => {
    // Save updated leads to localStorage whenever they change
    localStorage.setItem("qualifiedLeads", JSON.stringify(qualifiedLeads));
  }, [qualifiedLeads]);

  // Group leads by stage
  const groupedLeads = (qualifiedLeads || []).reduce((acc, lead) => {
    acc[lead.stage] = acc[lead.stage] || [];
    acc[lead.stage].push(lead);
    return acc;
  }, {});

  // Handle drag-and-drop start
  const onDragStart = (e, leadId, fromStage) => {
    e.dataTransfer.setData("leadId", leadId);
    e.dataTransfer.setData("fromStage", fromStage);
  };

  // Handle drop event
  const onDrop = (e, newStage) => {
    const leadId = e.dataTransfer.getData("leadId");
    const fromStage = e.dataTransfer.getData("fromStage");

    if (!leadId || !fromStage || fromStage === newStage) return;

    // Update lead stage after drop
    setQualifiedLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === parseInt(leadId, 10) ? { ...lead, stage: newStage } : lead
      )
    );
  };

  // Allow dropping into the columns
  const allowDrop = (e) => {
    e.preventDefault();
  };


  const viewLead = (id) => {
    const lead = qualifiedLeads.find((lead) => lead.id === id);
    setSelectedLead(lead);
    setShowDrawer(true); // Show Drawer
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedLeads = qualifiedLeads.map((lead) =>
      lead.id === selectedLead.id ? selectedLead : lead
    );
    setQualifiedLeads(updatedLeads);
    localStorage.setItem("qualifiedLeads", JSON.stringify(updatedLeads));
    setShowDrawer(false); // Close Drawer after saving
  };

  const handleInputChange = (e, field) => {
    setSelectedLead((prevLead) => ({
      ...prevLead,
      [field]: e.target.value,
    }));
  };

  const stageMapping = {
    new: "New",
    discovery: "Discovery",
    proposal: "Proposal",
    negotiation: "Negotiation",
    won: "Won",
    lost: "Lost",
  };

  return (
    <div className="flex gap-4 p-4">
      {Object.keys(stageMapping).map((stage,index) => (
        <div
          key={`${stage}-${index}`}
          className="flex-1 bg-gray-100 rounded shadow-md "
          onDragOver={allowDrop}
          onDrop={(e) => onDrop(e, stage)}
        >
          {/* stage Header */}
          <h2
            className={`text-lg font-normal rounded-t text-center p-2 text-white ${stageClasses[stage]}`}
          >
            {stageMapping[stage]}
          </h2>


          {/* Kanban Column Content */}
          <div className=" flex flex-col gap-2 py-4 ">

              {groupedLeads[stage]?.map((lead) => (
                <div
                key={`${stage}-${lead.id}`}
                  className="bg-white shadow-md p-6 m-2 rounded cursor-pointer opacity-1 "
                  draggable
                  onDragStart={(e) =>{
                    e.currentTarget.classList.add("dragging");
                    e.currentTarget.style.opacity='1';
                    onDragStart(e, lead.id, lead.stage)

                    
                  }}
                  onDragEnd={(e) => {
                    e.currentTarget.classList.remove("dragging");
                  }}
                  onClick={() => viewLead(lead.id)} // You can replace with a modal or detailed view
                >
                  <div className="flex justify-between items-center">
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

            {!groupedLeads[stage]?.length && (
              <div className="flex flex-col justify-center items-center  text-gray-500">
                <img src={emptyList} alt="No leads" className="w-32 h-24" />
                <p className="text-gray-400 pb-2 text-center">No Qualified Leads</p>
              </div>
            ) } 
          </div>
        </div>
      ))}



      <Drawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        selectedLead={selectedLead}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        stageMapping={stageMapping}
      />


    </div>
  );
};

export default KanbanViewQualified;
