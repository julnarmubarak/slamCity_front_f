import React from "react";
import Navbar from "./components/Navbar/Navbar";

import Home from "./Pages/Home/Home";
import Leagues from "./Pages/Leagues/Leagues";
import Teams from "./Pages/Teams/Teams";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import PlayersTable from "./Pages/PlayersTable/PlayersTable";
import Matches from "./Pages/Matches/Matches";
import Statistics from "./Pages/Statistics/Statistics";
import Poll from "./Pages/Poll/Poll";
import ChatRoom from "./Pages/ChatRoom/ChatRoom";

import EmployeeMatch from "./Pages/Employee/EmployeeMatch/EmployeeMatch";
import EmployeeStatistics from "./Pages/Employee/EmployeeStatistics/EmployeeStatistics";
import EmployeePlayers from "./Pages/Employee/EmployeePlayers/EmployeePlayers";
import EmployeeCandidates from "./Pages/Employee/EmployeeCandidates/EmployeeCandidates";
import EmployeeWallet from "./Pages/Employee/EmployeeWallet/EmployeeWallet";

import Wallet from "./Pages/Wallet/Wallet";
import SeatBooking from "./Pages/SeatBooking/SeatBooking";
import Rank from "./Pages/Rank/Rank";
import CustomerBooking from "./Pages/CustomerBooking/CustomerBooking";

// import AddUsers from "./Pages/AddUsers/AddUsers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminAddUsers from "./Pages/Admin/AdminAddUsers/AdminAddUsers";

function App() {
  // Function to handle the click event

  return (
    <Router>
      <div className="APP">
        <Navbar />
        <div className="body">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Leagues" element={<Leagues />} />
            <Route path="/Teams" element={<Teams />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/PlayersTable" element={<PlayersTable />} />
            <Route path="/Matches" element={<Matches />} />
            <Route path="/Statistics" element={<Statistics />} />

            {/* Admin             */}
            {localStorage.getItem("r_id") &&
            localStorage.getItem("token") &&
            localStorage.getItem("r_id") == 1 ? (
              <>
                <Route path="/AdminAddUsers" element={<AdminAddUsers />} />
              </>
            ) : null}

            {/* Customer  */}
            {localStorage.getItem("r_id") &&
            localStorage.getItem("token") &&
            localStorage.getItem("r_id") == 2 ? (
              <>
                <Route path="/Poll" element={<Poll />} />
                <Route path="/ChatRoom" element={<ChatRoom />} />
                <Route path="/Wallet" element={<Wallet />} />
                <Route path="/SeatBooking" element={<SeatBooking />} />
                <Route path="/CustomerBooking" element={<CustomerBooking />} />
            <Route path="/Rank" element={<Rank />} />

              </>
            ) : null}
            {/* Employee  */}

            {localStorage.getItem("r_id") &&
            localStorage.getItem("token") &&
            localStorage.getItem("r_id") == 3 ? (
              <>
                <Route path="/EmployeeMatch" element={<EmployeeMatch />} />
                <Route
                  path="/EmployeeStatistics"
                  element={<EmployeeStatistics />}
                />
                <Route path="/EmployeePlayers" element={<EmployeePlayers />} />
                <Route
                  path="/EmployeeCandidates"
                  element={<EmployeeCandidates />}
                />
                <Route
                  path="/EmployeeWallet"
                  element={<EmployeeWallet />}
                />
              </>
            ) : null}


          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
