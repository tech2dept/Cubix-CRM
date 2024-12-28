import React, { useState } from "react";
import salesDood2 from '../utils/salesDood2.png';
import {
  AiOutlineSetting,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineMail,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineClose,
} from "react-icons/ai"; // AiOutline icons

const Header = ({ toggleSidebar }) => {
  const [searchItem, setSearchItem] = useState("");

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  };

  const clearSearchItem = () => {
    setSearchItem("");
  };

  return (
    // <header className="bg-gradient-to-r from-blue-200 to-blue-500 text-black p-4 flex items-center justify-between fixed w-full top-0 left-0 z-20 text-black">
    // <header style={{ backgroundColor: '#F4F1EA' }} className="text-black p-4 flex items-center justify-between fixed w-full top-0 left-0 z-20 text-black">
    <header style={{ backgroundColor: '#f8f8f8' }} className="text-black p-4 flex items-center justify-between fixed w-full top-0 left-0 z-20 text-black">
      
      {/* Menu Button (Sidebar Toggle) */}
 <div className="flex gap-16 justify-between items-center">     
      <button className=" text-2xl" onClick={toggleSidebar}>
        {/* <AiOutlineMenu /> */}
      </button>

      {/* Title */}
      {/* <div className="text-xl text-black font-semibold">CUBIX CRM</div> */}

      {/* Logo */}
      <div>
        <img src={salesDood2} alt="CUBIX CRM" className="rounded  w-auto h-14 text-xl text-black font-semibold " />
      </div>
  </div>


<div className="flex justify-center items-center gap-12">

      {/* Search Bar */}
      <div className="relative ">
        <input
          type="text"
          value={searchItem}
          onChange={handleSearchChange}
          placeholder="Search Anything …"
          className="w-full py-2 pl-10 pr-4 rounded-lg bg-white text-black placeholder-gray-400 border border-none"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <AiOutlineSearch className="text-gray-500" />
        </div>
        {/* Clear "X" Icon */}
        {searchItem && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={clearSearchItem} // Clear the search term when clicked
          >
            <AiOutlineClose className="text-gray-500" />
          </div>
        )}
      </div>

      {/* Notification and Profile Icons */}
      <div className="flex items-center gap-6 space-x-4 bg-none px-4 py-2 rounded-md">
        <button className="text-black  relative">
          <AiOutlineMail className="text-xl" />
          <span className="absolute bottom-2 left-2 bg-red-500 text-black text-m  rounded-full w-5 h-4 flex items-center justify-center">
            4
          </span>
        </button>
        <button className="text-black relative">
          <AiOutlineBell className="text-xl" />
          <span className="absolute bottom-2 left-2 bg-red-500 text-black text-m rounded-full w-5 h-4 flex items-center justify-center">
            7
          </span>
        </button>
        <button className="text-black">
          <AiOutlineUser className="text-xl" />
        </button>
        <button className="text-black">
          <AiOutlineSetting className="text-xl" />
        </button>
        <img
          src="https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      </div>
    </header>
  );
};

export default Header;
