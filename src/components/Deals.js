import React, { useState } from 'react'
import WonLeads from './WonLeads';
import LostLeads from './LostLeads';

const Deals = () => {
      const [rows, setRows] = useState(() => {
        const savedWonData = localStorage.getItem("wonLeads");
        return savedWonData ? JSON.parse(savedWonData) : [];
    });
    
    const [lostRows,setLostRows] = useState(()=>{
        const savedLostData = localStorage.getItem("lostLeads")
        return savedLostData ? JSON.parse(savedLostData) : [];
      })
  return (
    <div className='p-6 relative'>
    <h2 className='text-xl font-normal mb-2'>Deals</h2> 
    <WonLeads rows={rows} setRows={setRows} />
    <LostLeads rows={lostRows} setRows={setLostRows} />

    </div>
  )
}

export default Deals
