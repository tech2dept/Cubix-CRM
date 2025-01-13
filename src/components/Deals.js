import React, { useState } from 'react'
import WonLeads from './WonLeads';
import LostLeads from './LostLeads';

const Deals = ({rowsPerPage}) => {
  console.log('rowsPerPage',rowsPerPage)
      const [rows, setRows] = useState(() => {
        const savedWonData = localStorage.getItem("wonLeads");
        return savedWonData ? JSON.parse(savedWonData) : [];
    });
    
    const [lostRows,setLostRows] = useState(()=>{
        const savedLostData = localStorage.getItem("lostLeads")
        return savedLostData ? JSON.parse(savedLostData) : [];
      })

      // const rowsPerPage='10'
  return (
    <div className='p-6 relative text-sm font-thin'>
    <h2 className='text-xl font-normal mb-2'>Deals</h2> 
    <WonLeads rows={rows} setRows={setRows}  rowsPerPage={rowsPerPage}/>
    <LostLeads rows={lostRows} setRows={setLostRows} rowsPerPage={rowsPerPage} />

    </div>
  )
}

export default Deals
