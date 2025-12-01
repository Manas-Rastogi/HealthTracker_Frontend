
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 12, background: "#fff", borderBottom: "1px solid #eee" }}>
      <div style={{ fontWeight: 700, color: "#b91c1c" }}>HealthTraker</div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {!role && <Link to="/" style={{ color: "#555" }}>Home</Link>}
        {role && <button onClick={logout} style={{ background: "#ef4444", color: "white", border: "none", padding: "8px 12px", borderRadius: 8 }}>Logout</button>}
      </div>
    </div>
  );
}
