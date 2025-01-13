import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineInteraction,
  AiOutlineExport,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineSetting,
  AiOutlineCheckCircle,
  AiOutlineTeam,
} from "react-icons/ai";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      // ${isOpen ? 'w-1/6' : 'w-16'}
      className={`fixed top-0 left-0 h-full w-24
           px-4   transition-all duration-300 ease-in-out`}
      style={{ zIndex: 10, backgroundColor: "#f8f8f8" }}
    >
      <ul className="space-y-3 flex flex-col justify-center items-start mt-28 ">
        <li className="flex justify-center gap-10 text-center items-center bg-white rounded p-1 pl-1 w-full">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-indigo-500 flex items-center"
                : "font-medium flex items-center"
            }
          >
            <div className="flex flex-col justify-center items-center p-1">
              <AiOutlineHome className="w-6 h-6" />
              <span className="text-xs">Home</span>
            </div>

            {/* <AiOutlineHome  />           */}
            {/* {isOpen && 
        <span className='ml-2'>Home</span>  
      } */}
          </NavLink>
        </li>

        <li className="flex justify-center text-center items-center bg-white rounded p-1 w-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-indigo-500 flex items-center"
                : "font-medium flex items-center"
            }
          >
            <div className="flex flex-col justify-center items-center p-1">
              <AiOutlineUser className="w-6 h-6" />
              <span className="text-xs">Leads</span>
            </div>

            {/* <AiOutlineUser/> */}
            {/* {isOpen && 
        <span className='ml-2'>Leads</span>  
           } */}
          </NavLink>
        </li>

        <li className="flex justify-center text-center items-center bg-white rounded p-1 w-full">
          <NavLink
            to="/qualifiedLeads"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-indigo-500 flex items-center"
                : "font-medium flex items-center"
            }
          >
            <div className="flex flex-col justify-center items-center text-center p-1">
              <AiOutlineCheckCircle className="w-6 h-6" />
              <span className="text-xs transform scale-90">
                Qualified Leads
              </span>
            </div>

            {/* <AiOutlineCheckCircle   /> */}
            {/* {isOpen && 
        <span className='ml-2'>Qualified Leads</span>  
           } */}
          </NavLink>
        </li>

        <li className="flex justify-center text-center items-center bg-white rounded p-1 w-full">
          <NavLink
            to="/deals"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-indigo-500 flex items-center"
                : "font-medium flex items-center"
            }
          >
            <div className="flex flex-col justify-center items-center p-1">
              {/* <AiOutlineUsergroupAdd className='w-6 h-6' />           */}
              <AiOutlineInteraction className="w-6 h-6" />
              <span className="text-xs">Deals</span>
            </div>

            {/* <AiOutlineUser/> */}
            {/* {isOpen && 
        <span className='ml-2'>Leads</span>  
           } */}
          </NavLink>
        </li>

        <li className="flex justify-center text-center items-center bg-white rounded p-1 w-full">
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-indigo-500 flex items-center"
                : "font-medium flex items-center"
            }
          >
            <div className="flex flex-col justify-center items-center text-center p-1">
              <AiOutlineTeam className="w-6 h-6" />
              <span className="text-xs">Contacts</span>
            </div>

            {/* <AiOutlineTeam   /> */}
            {/* {isOpen &&
            <span className='ml-2'>Contacts</span>
            } */}
          </NavLink>
        </li>

        <li className="flex justify-center text-center items-center bg-white rounded p-1 w-full">
          <NavLink
            to="/emails"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-indigo-500 flex items-center"
                : "font-medium flex items-center"
            }
          >
            <div className="flex flex-col justify-center items-center text-center p-1">
              <AiOutlineMail className="w-6 h-6" />
              <span className="text-xs">Emails</span>
            </div>

            {/* <AiOutlineMail   /> */}
            {/* {isOpen && 
        <span className='ml-2'>Emails</span>  
           } */}
          </NavLink>
        </li>

        <li className="flex justify-center text-left items-left bg-white rounded p-1 w-full">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-indigo-500 flex items-center"
                : "font-medium flex items-center"
            }
          >
            <div className="flex flex-col justify-center items-center text-center p-1">
              <AiOutlineSetting className="w-6 h-6" />
              <span className="text-xs ">Settings</span>
            </div>

            {/* <AiOutlineSetting className=' mr-2'   /> */}
            {/* {isOpen && 
        <span className='ml-2'>Settings</span>  
           } */}
          </NavLink>
        </li>
      </ul>

      {/* Sign Out */}
      <div className="absolute bottom-4 left-4 right-4">
        <button className="flex justify-center items-center w-full bg-red-500 text-white p-2 rounded">
          <div className="flex flex-col justify-center items-center text-center ">
            <AiOutlineExport className="w-6 h-6" />
            <span className="text-xs">Sign Out</span>
          </div>

          {/* <AiOutlineExport /> */}
          {/* {isOpen && <span className="ml-2">Sign Out</span>} */}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
