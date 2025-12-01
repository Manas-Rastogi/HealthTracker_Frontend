// src/pages/UserDashboard.jsx
import React from "react";
import Navbar from "../components/Navbar.jsx";

export default function UserDashboard(){
  return (
    <>
      <Navbar />
      <div className="container" style={{marginTop:20}}>
        <div className="card">
          <h2>Patient Dashboard</h2>
          <p className="small-muted">Welcome — search hospitals, request donations and manage your profile.</p>

          <div style={{display:"flex", gap:12, marginTop:12}}>
            <div style={{flex:1}}>
              <div className="card">
                <h3>Total Donations</h3>
                <p style={{fontSize:24}}>12</p>
              </div>
            </div>
            <div style={{flex:1}}>
              <div className="card">
                <h3>Upcoming Appointments</h3>
                <p style={{fontSize:24}}>1</p>
              </div>
            </div>
            <div style={{flex:1}}>
              <div className="card">
                <h3>Health Score</h3>
                <p style={{fontSize:24}}>87%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
