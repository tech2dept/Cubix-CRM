import React, { useEffect, useState } from "react";
// import React, { useEffect } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AllEntriesForm from "./allEntriesForm";
import TableComponent from "./Table";
import ContactedLeads from "./ContactedLeads";
import KanbanViewLeads from "./Kanaban";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  ButtonGroup,
} from "@mui/material";

import kanban from "../utils/kanban.png";
import table from "../utils/table.png";

const Leads = () => {
  const [rows, setRows] = useState(() => {
    const savedData = localStorage.getItem("leadTableData");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("leadTableData", JSON.stringify(rows));
  }, [rows]);

  const handleFormSubmit = (formData) => {
  const existingLead = rows.find((row) => row.id === formData.id); // Find the existing lead by ID

  const newHistory = [];

  if (existingLead) {
    // Compare each field and add to history if it has changed
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== existingLead[key]) {
        newHistory.push({
          date: new Date().toISOString(), // Record the timestamp
          activity: `Field "${key}" updated`,
          note: `Changed from "${existingLead[key]}" to "${formData[key]}"`,
        });
      }
    });

    // Update the existing lead with new data and updated history
    const updatedLead = {
      ...existingLead,
      ...formData,
      leadHistory: [...existingLead.leadHistory, ...newHistory], // Append new history entries
    };

    setRows(rows.map((row) => (row.id === formData.id ? updatedLead : row)));
  } else {

    

    const newRow = {
      // id: rows.length + 1, // Unique ID for each row
      id: formData.id, // Unique ID for each row
      lead: formData.name,
      status: formData.status,
      organization: formData.organization,
      title: formData.title,
      email: formData.email,
      phone: formData.phone,
      isPhoneWhatsApp: formData.isPhoneWhatsApp,
      alternatePhone: formData.alternatePhone,
      isAlternatePhoneWhatsApp: formData.isAlternatePhoneWhatsApp,
      notes: formData.notes,
      leadSource: formData.leadSource,
      leadDateAndTimeEntry: formData.leadDateAndTimeEntry,
      probability: formData.probability,
      bookedAmount: formData.bookedAmount,
      territory: formData.territory,
      country: formData.country,
      streetAddress: formData.streetAddress,
      city: formData.city,
      apartment: formData.apartment,
      location: formData.location,
      area: formData.area,
      leadEntryTime: formData.leadEntryTime,
      leadHistory: formData.history,



    };
    setRows([...rows, newRow]); // Add the new row to the table
  };
  };

  const [viewMode, setViewMode] = useState("Tabular"); // View mode state
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    typography: {
      fontFamily: `'Figtree', sans-serif`,
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="">
              <Tab label="Main Table" value="1" />
              <Tab label="Lead Form" value="2" />
            </TabList>
          </Box>

          <TabPanel sx={{ padding: 0 }} value="1">
            <div className="mt-4">
              <div className=" flex flex-col justify-between   ">
                <div className="mb-0 mx-2 flex justify-between ">
                  <h2 className="text-xl font-normal   mb-1">Leads</h2>
                  {/* <div></div> */}
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
                  <KanbanViewLeads rows={rows} setRows={setRows} />
                ) : (
                  <div>
                    <TableComponent rows={rows} setRows={setRows} />
                    <ContactedLeads rows={rows} setRows={setRows} />
                    {/* {rows.some((lead) => lead.status === "contacted") && ( // Check if any lead has status "contacted"
                      <ContactedLeads
                        rows={rows.filter(
                          (lead) => lead.status === "contacted"
                        )}
                        setRows={setRows}
                      />
                    )} */}
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <AllEntriesForm onFormSubmit={handleFormSubmit} />
          </TabPanel>
        </TabContext>
      </ThemeProvider>
    </div>
  );
};

export default Leads;
