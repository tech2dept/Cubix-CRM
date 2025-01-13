import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/sidebar";
import Leads from "./components/Leads";
import QualifiedLeads from "./components/QualifiedLeads";
import Contacts from "./components/Contacts";
import Emails from "./components/Emails";
import Settings from "./components/Settings";
import LeadForm from "./components/LeadForm";
import AllEntriesForm from "./components/allEntriesForm";
import Home from "./components/Home";
import Deals from "./components/Deals";

function App() {

  const [isSidebarOpen,setIsSidebarOpen]=useState(false)

  const [rowsPerPage, setRowsPerPage]=useState('5')
  
  const toggleSidebar=()=>{
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <Router>

      <div className="flex h-screen max-h-[100vh] overflow-y-auto scrollbar-thin  ">
        
        <Sidebar isOpen={isSidebarOpen} />

        <div className="flex-1 flex flex-col h-screen bg-blue-400 ">
          <Header toggleSidebar={toggleSidebar}/>

            <main className="flex-1  px-6 ml-16 pt-24" style={{ backgroundColor: '#f8f8f8 ' }}>
              <Routes>
                <Route path="/" element={<Leads />}></Route>
                <Route path="/qualifiedLeads" element={<QualifiedLeads />}></Route>
                <Route path="/contacts" element={<Contacts />}></Route>
                <Route path="/emails" element={<Emails />}></Route>
                <Route path="/settings" element={<Settings rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />}></Route>
                <Route path="/leadForm" element={<LeadForm />}></Route>
                <Route path="/allEntriesForm" element={<AllEntriesForm />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/deals" element={<Deals rowsPerPage={rowsPerPage} />}></Route>
              </Routes>      
            </main>
        
        </div>

      </div>

    </Router>
  );
}

export default App;
