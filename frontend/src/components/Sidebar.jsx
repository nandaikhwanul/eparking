import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut, IoMenu, IoChevronBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const toggleSidebar = () => {
    console.log("Toggle sidebar, current state:", isOpen);
    setIsOpen(!isOpen);
  };
  
  const closeSidebar = () => {
    console.log("Closing sidebar");
    setIsOpen(false);
  };

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsOpen(false); // Ubah ke false agar tersembunyi saat layar besar
      } else {
        setIsOpen(false); // Tetap tersembunyi saat layar kecil
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Panggil sekali saat komponen mount
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="relative">
      {/* Hamburger Icon for Mobile View */}
      {!isOpen && (
        <div
          className={`fixed left-0 top-0 w-full h-14 p-3 z-30 md:block transition duration-300 ${
            isScrolled ? "backdrop-sepia-0 bg-white/30 backdrop-blur-md shadow-md" : "bg-transparent"
          }`}
        >
          <button onClick={toggleSidebar} className="text-3xl ml-4 hover:text-blue-600 transition-colors">
            <IoMenu />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-gradient-to-b from-blue-600 to-blue-800 p-6 shadow-xl h-full z-20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <div className="flex gap-2">
            <button 
              onClick={closeSidebar} 
              className="text-white hover:text-gray-300 text-xl transition-colors"
            >
              <IoChevronBack />
            </button>
          </div>
        </div>

        <ul className="flex flex-col space-y-4 mt-8 border-t border-blue-500 pt-8">
          {user && user.role === "admin" && (
            <div className="space-y-4">
              <NavLink 
                to="/dashboard"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-white text-blue-600" 
                      : "text-white hover:bg-blue-700"
                  }`
                }
              >
                <IoHome className="text-xl" />
                <span>Dashboard</span>
              </NavLink>

              <NavLink 
                to="/users"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-white text-blue-600" 
                      : "text-white hover:bg-blue-700"
                  }`
                }
              >
                <IoPerson className="text-xl" />
                <span>Add Users</span>
              </NavLink>
            </div>
          )}

          {user && user.role === "dosen" && (
            <div className="space-y-4">
              {/* Dosen menu items here */}
            </div>
          )}

          <button
            onClick={() => {
              closeSidebar();
              logout();
            }}
            className="flex items-center space-x-3 px-4 py-3 mt-auto w-full text-white hover:bg-red-500 rounded-lg transition-colors"
          >
            <IoLogOut className="text-xl" />
            <span>Logout</span>
          </button>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 transition-opacity duration-300"
          onClick={closeSidebar}
        ></div>
      )}
    </nav>
  );
};

export default Sidebar;
