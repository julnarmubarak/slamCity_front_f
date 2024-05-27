import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [full_name, setFullName] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navbarItems_default = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Leagues", href: "/leagues" },
  ];

  const navbarItems_employee = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Match", href: "/EmployeeMatch" },
    { id: 3, name: "Statistics", href: "/EmployeeStatistics" },
    { id: 4, name: "Players", href: "/EmployeePlayers" },
    { id: 5, name: "Candidates", href: "/EmployeeCandidates" },
    { id: 6, name: "Customers wallet", href: "/EmployeeWallet" },
    
  
  ];

  const navbarItems_customer = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Chatroom", href: "/ChatRoom" },
    { id: 3, name: "Poll", href: "/Poll" },
    { id: 4, name: "Wallet", href: "/Wallet" },
    { id: 5, name: "Leagues", href: "/leagues" },
    { id: 6, name: "My bookings", href: "/CustomerBooking" },
    { id: 7, name: "Rank", href: "/Rank" },
    

  ];

  const navbarItems_admin = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Add Users", href: "/AdminAddUsers" },
  ];

  const [items, setItems] = useState(navbarItems_default);
  const prepare = () => {
    if (localStorage.getItem("token"))
      setFullName(localStorage.getItem("full_name"));
    if (localStorage.getItem("r_id")) {
      const r_id = localStorage.getItem("r_id");
      if (r_id === "1") setItems(navbarItems_admin);
      else if (r_id === "2") setItems(navbarItems_customer);
      else if (r_id === "3") setItems(navbarItems_employee);
      else setItems(navbarItems_default);
    }
  };
  useEffect(() => {
    prepare();
  }, [localStorage.getItem("full_name")]);
  useEffect(() => {
    prepare();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("full_name");
    localStorage.removeItem("r_id");
    setFullName(null);
    setItems(navbarItems_default);
    window.location.href = "/";
  };
  return (
    <nav className="navbar">
      <h1 className="navbar-title" onClick={() => navigate("/")}>
        SlamCity
      </h1>
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {items.map((ele) => (
          <Link
            key={ele.id}
            className="navbar-item"
            to={ele.href}
            onClick={() => setMenuOpen(false)}
          >
            {ele.name}
          </Link>
        ))}
      </div>
      <div className="navbar-user">
        {full_name && <span className="user-name">{full_name}</span>}
        {full_name ? (
          <Link
            className="navbar-item"
            to="#"
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
          >
            Logout
          </Link>
        ) : (
          <Link
            className="navbar-item"
            to="/Login"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
      <div className="navbar-menu" onClick={toggleMenu}>
        <span className="navbar-menu-icon">&#9776;</span>
      </div>
    </nav>
  );
};

export default Navbar;
