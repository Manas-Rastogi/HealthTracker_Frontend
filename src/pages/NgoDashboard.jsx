// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const NgoDashboard = () => {
//     const [ngoData, setNgoData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchNgoData();
//     }, []);

//     const fetchNgoData = async () => {
//         try {
//             const token = localStorage.getItem("ngo_token");
            
//             const response = await fetch("http://localhost:8080/registration_user/getregisteruser", {
//                 method: "GET",
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setNgoData(data);
//                 setLoading(false);
//             } else {
//                 setError("Access denied. Redirecting to login...");
//                 setTimeout(() => navigate("/ngo-login"), 2000);
//             }
//         } catch (err) {
//             setError("Failed to load data");
//             setLoading(false);
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("ngo_token");
//         navigate("/ngo-login");
//     };

//     if (loading) {
//         return (
//             <div style={{
//                 minHeight: "100vh",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 background: "linear-gradient(135deg, #0e1a3d 0%, #1a3a63 50%, #009688 100%)",
//                 color: "white"
//             }}>
//                 <div style={{ textAlign: "center" }}>
//                     <div style={{ fontSize: "48px", marginBottom: "20px" }}>🔄</div>
//                     <h2>Loading NGO Dashboard...</h2>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div style={{
//             minHeight: "100vh",
//             background: "linear-gradient(135deg, #0e1a3d 0%, #1a3a63 50%, #009688 100%)",
//             color: "#e0f7fa",
//             padding: "20px",
//             fontFamily: "'Poppins', sans-serif",
//             position: "relative",
//             overflow: "hidden"
//         }}>
//             {/* 🌌 Floating Background Elements */}
//             <div style={{
//                 position: "absolute",
//                 top: "10%", left: "10%", width: "100px", height: "100px",
//                 background: "#00e6e6", borderRadius: "50%", opacity: 0.1,
//                 animation: "float 20s infinite linear"
//             }} />
//             <div style={{
//                 position: "absolute",
//                 top: "70%", right: "10%", width: "80px", height: "80px",
//                 background: "#ff4081", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
//                 opacity: 0.1, animation: "float 25s infinite linear reverse"
//             }} />

//             <style>{`
//                 @keyframes float {
//                     0%, 100% { transform: translateY(0px); }
//                     50% { transform: translateY(-20px); }
//                 }
//             `}</style>

//             <div style={{
//                 maxWidth: "1400px",
//                 margin: "0 auto",
//                 background: "rgba(255, 255, 255, 0.12)",
//                 borderRadius: "30px",
//                 padding: "40px",
//                 backdropFilter: "blur(20px)",
//                 boxShadow: "0 25px 45px rgba(0,0,0,0.3)",
//                 border: "1px solid rgba(255,255,255,0.2)"
//             }}>
//                 {/* 📊 Header Section */}
//                 <div style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: "40px",
//                     flexWrap: "wrap",
//                     gap: "20px"
//                 }}>
//                     <div>
//                         <h1 style={{
//                             fontSize: "42px",
//                             fontWeight: "800",
//                             margin: 0,
//                             background: "linear-gradient(45deg, #00e6e6, #ff4081)",
//                             WebkitBackgroundClip: "text",
//                             WebkitTextFillColor: "transparent",
//                             textShadow: "0 0 30px rgba(0,230,230,0.5)"
//                         }}>
//                             🌍 NGO Dashboard
//                         </h1>
//                         <p style={{ fontSize: "18px", opacity: 0.9, margin: "10px 0 0 0" }}>
//                             Welcome back! Here's your registered users data
//                         </p>
//                     </div>
//                     <button onClick={handleLogout} style={{
//                         padding: "16px 32px",
//                         background: "linear-gradient(45deg, #ff4081, #e040fb)",
//                         border: "none",
//                         borderRadius: "50px",
//                         color: "white",
//                         fontSize: "16px",
//                         fontWeight: "bold",
//                         cursor: "pointer",
//                         boxShadow: "0 10px 30px rgba(255,64,129,0.4)",
//                         transition: "all 0.3s ease"
//                     }}
//                     onMouseEnter={(e) => {
//                         e.target.style.transform = "translateY(-3px)";
//                         e.target.style.boxShadow = "0 15px 40px rgba(255,64,129,0.6)";
//                     }}
//                     onMouseLeave={(e) => {
//                         e.target.style.transform = "translateY(0)";
//                         e.target.style.boxShadow = "0 10px 30px rgba(255,64,129,0.4)";
//                     }}>
//                         🚪 Logout
//                     </button>
//                 </div>

//                 {/* 📈 Stats Cards */}
//                 <div style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//                     gap: "25px",
//                     marginBottom: "40px"
//                 }}>
//                     <div style={{
//                         background: "rgba(255,255,255,0.15)",
//                         padding: "25px",
//                         borderRadius: "20px",
//                         textAlign: "center",
//                         border: "1px solid rgba(255,255,255,0.2)"
//                     }}>
//                         <div style={{ fontSize: "36px", color: "#00e6e6" }}>📊</div>
//                         <h3 style={{ fontSize: "28px", margin: "15px 0 5px 0" }}>
//                             {ngoData.length}
//                         </h3>
//                         <p style={{ opacity: 0.8 }}>Total Users</p>
//                     </div>
//                     <div style={{
//                         background: "rgba(255,255,255,0.15)",
//                         padding: "25px",
//                         borderRadius: "20px",
//                         textAlign: "center",
//                         border: "1px solid rgba(255,255,255,0.2)"
//                     }}>
//                         <div style={{ fontSize: "36px", color: "#ff4081" }}>✅</div>
//                         <h3 style={{ fontSize: "28px", margin: "15px 0 5px 0" }}>
//                             {ngoData.filter(u => u.status === "active").length}
//                         </h3>
//                         <p style={{ opacity: 0.8 }}>Active Users</p>
//                     </div>
//                 </div>

//                 {/* 📋 Users Data Table */}
//                 {error ? (
//                     <div style={{
//                         textAlign: "center",
//                         padding: "60px",
//                         color: "#ff6b6b",
//                         fontSize: "20px",
//                         background: "rgba(255,107,107,0.1)",
//                         borderRadius: "20px",
//                         border: "1px solid rgba(255,107,107,0.3)"
//                     }}>
//                         {error}
//                     </div>
//                 ) : (
//                     <div style={{
//                         background: "rgba(255,255,255,0.1)",
//                         borderRadius: "20px",
//                         overflow: "hidden",
//                         border: "1px solid rgba(255,255,255,0.2)"
//                     }}>
//                         <div style={{
//                             padding: "25px",
//                             background: "rgba(255,255,255,0.2)",
//                             fontSize: "20px",
//                             fontWeight: "600"
//                         }}>
//                             👥 Registered Users List
//                         </div>
//                         <div style={{ overflowX: "auto" }}>
//                             <table style={{
//                                 width: "100%",
//                                 borderCollapse: "collapse"
//                             }}>
//                                 <thead>
//                                     <tr style={{
//                                         background: "rgba(255,255,255,0.25)"
//                                     }}>
//                                         <th style={{
//                                             padding: "20px 15px",
//                                             textAlign: "left",
//                                             fontWeight: "600"
//                                         }}>ID</th>
//                                         <th style={{
//                                             padding: "20px 15px",
//                                             textAlign: "left",
//                                             fontWeight: "600"
//                                         }}>Name</th>
//                                         <th style={{
//                                             padding: "20px 15px",
//                                             textAlign: "left",
//                                             fontWeight: "600"
//                                         }}>Email</th>
//                                         <th style={{
//                                             padding: "20px 15px",
//                                             textAlign: "left",
//                                             fontWeight: "600"
//                                         }}>Phone</th>
//                                         <th style={{
//                                             padding: "20px 15px",
//                                             textAlign: "left",
//                                             fontWeight: "600"
//                                         }}>Status</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {ngoData.map((user, index) => (
//                                         <tr key={index} style={{
//                                             borderBottom: "1px solid rgba(255,255,255,0.1)",
//                                             transition: "background 0.2s"
//                                         }}
//                                         onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
//                                         onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
//                                             <td style={{ padding: "20px 15px" }}>{index + 1}</td>
//                                             <td style={{ padding: "20px 15px" }}>{user.name || "N/A"}</td>
//                                             <td style={{ padding: "20px 15px" }}>{user.email || "N/A"}</td>
//                                             <td style={{ padding: "20px 15px" }}>{user.phone || "N/A"}</td>
//                                             <td style={{ padding: "20px 15px" }}>
//                                                 <span style={{
//                                                     padding: "8px 16px",
//                                                     borderRadius: "25px",
//                                                     fontSize: "14px",
//                                                     fontWeight: "600",
//                                                     background: user.status === "active" ? 
//                                                         "rgba(0,184,148,0.3)" : "rgba(255,107,107,0.3)",
//                                                     color: user.status === "active" ? "#00b894" : "#ff6b6b",
//                                                     border: `1px solid ${user.status === "active" ? "#00b894" : "#ff6b6b"}`
//                                                 }}>
//                                                     {user.status || "Pending"}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default NgoDashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✨ Fixed Earth Logo (No animation conflicts)
const EarthLogo = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#00e6e6"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ 
      filter: "drop-shadow(0 0 20px rgba(0,230,230,0.6))",
      animation: "earthRotate 10s linear infinite"
    }}
  >
    <circle cx="12" cy="12" r="10" stroke="#00e6e6"/>
    <path d="M2 12h20" stroke="#00b894"/>
    <path d="M12 2a15.3 15.3 0 0 1 0 20" stroke="#ff4081"/>
  </svg>
);

const NgoDashboard = () => {
  const [ngoData, setNgoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showData, setShowData] = useState(false);
  const navigate = useNavigate();

  const totalUsers = ngoData.length;

  const fetchNgoData = async () => {
    console.log("🔄 Fetching data...");
    setIsLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem("ngo_token");
      const response = await fetch("https://healthtracker-5.onrender.com/healthtech/registration_user/getregisteruser", {
        method: "GET",
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json" 
        }
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Full response:", result);
        
        const usersArray = result.body || result.data || result || [];
        const userList = Array.isArray(usersArray) ? usersArray : [];
        
        console.log("✅ Processed users:", userList);
        setNgoData(userList);
        setShowData(true);
      } else {
        setError(`Server error: ${response.status}`);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Network error. Check backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ngo_token");
    navigate("/ngo-login");
  };

  return (
    <div style={{
      display: "flex", height: "100vh", width: "100vw",
      fontFamily: "'Poppins', sans-serif",
      background: "linear-gradient(-45deg, #0e1a3d, #1a3a63, #009688, #00e6e6)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 12s ease infinite",
      color: "#e0f7fa",
      overflow: "hidden",
      position: "relative"
    }}>
      {/* Fixed Particle Background */}
      {Array.from({length: 20}, (_, i) => (
        <div 
          key={`particle-${i}`}
          style={{
            position: "absolute",
            width: `${4 + i % 8}px`,
            height: `${4 + i % 8}px`,
            background: `hsl(${(i * 18) % 360}, 70%, 60%)`,
            borderRadius: "50%",
            top: `${(i * 5) % 100}%`,
            left: `${(i * 13) % 100}%`,
            animation: `floatParticle ${4 + (i % 5)}s infinite ease-in-out`,
            animationDelay: `${i * 0.1}s`,
            opacity: 0.6
          }} 
        />
      ))}

      {/* Sidebar */}
      <aside style={{
        background: "linear-gradient(180deg, rgba(0,150,136,0.95) 0%, rgba(0,230,230,0.9) 100%)",
        width: "320px", padding: "50px 30px",
        display: "flex", flexDirection: "column",
        alignItems: "flex-start",
        boxShadow: "5px 0 50px rgba(0,230,230,0.4)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.3)"
      }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          <EarthLogo />
          <div>
            <h1 style={{ 
              fontSize: 28, fontWeight: 900, 
              background: "linear-gradient(45deg, #00e6e6, #ffffff, #ff4081)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
              textShadow: "0 0 30px rgba(0,230,230,0.8)"
            }}>
              NGO Dashboard
            </h1>
            <p style={{ fontSize: 14, opacity: 0.8, margin: 5 }}>Empowering Communities</p>
          </div>
        </div>

        {/* TOTAL USERS */}
        <div style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
          borderRadius: 20, padding: "30px 25px", width: "100%",
          textAlign: "center",
          boxShadow: "0 15px 40px rgba(255,255,255,0.2)",
          border: "1px solid rgba(255,255,255,0.3)",
          animation: "pulseGlow 3s ease-in-out infinite"
        }}>
          <div style={{ fontSize: "10px", color: "#00e6e6", fontWeight: 700, marginBottom: 10 }}>📊 TOTAL</div>
          <h2 style={{ 
            margin: 0, fontSize: "64px", fontWeight: 900, 
            background: "linear-gradient(45deg, #ffffff, #00e6e6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            {totalUsers}
          </h2>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#fff" }}>Active Users</p>
        </div>

        {/* LOAD DATA BUTTON */}
        <button 
          onClick={fetchNgoData}
          disabled={isLoading}
          style={{
            marginTop: 25,
            background: `linear-gradient(45deg, ${isLoading ? '#666' : '#00e6e6'}, ${isLoading ? '#444' : '#009688'})`,
            color: "white", border: "none", borderRadius: 25,
            width: "100%", padding: "18px", fontWeight: 800,
            cursor: isLoading ? "not-allowed" : "pointer", 
            fontSize: "16px",
            boxShadow: `0 8px 30px ${isLoading ? 'rgba(0,0,0,0.3)' : 'rgba(0,230,230,0.5)'}`,
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? "🔄 Loading..." : "📊 Load Users Data"}
        </button>

        <button onClick={handleLogout} style={{
          marginTop: 15,
          background: "linear-gradient(45deg, #ff4081, #e040fb, #ff6b6b)",
          color: "white", border: "none", borderRadius: 25,
          width: "100%", padding: "20px", fontWeight: 800,
          cursor: "pointer", fontSize: "18px",
          boxShadow: "0 10px 40px rgba(255,64,129,0.6)"
        }}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1, overflowY: "auto", padding: "50px 60px",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(25px)"
      }}>
        {error ? (
          <div style={{
            textAlign: "center", fontSize: "28px", color: "#ff6b6b",
            marginTop: 80, padding: "60px",
            background: "rgba(255,107,107,0.1)",
            borderRadius: 25, border: "1px solid rgba(255,107,107,0.3)"
          }}>
            ❌ {error}
          </div>
        ) : isLoading ? (
          <div style={{ textAlign: "center", marginTop: 100 }}>
            <div style={{ 
              fontSize: "64px", 
              marginBottom: "30px",
              animation: "spin 1s linear infinite"
            }}>🔄</div>
            <h3 style={{ fontSize: "24px", color: "#00e6e6" }}>Loading users data...</h3>
          </div>
        ) : showData ? (
          <>
            <h2 style={{ 
              marginBottom: 40, fontWeight: 900, fontSize: "36px",
              background: "linear-gradient(45deg, #00e6e6, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              👥 Registered Users List ({totalUsers})
            </h2>
            
            {totalUsers > 0 ? (
              <div style={{
                background: "rgba(255,255,255,0.12)",
                borderRadius: 25, overflow: "hidden",
                boxShadow: "0 25px 80px rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.2)"
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.2), rgba(0,230,230,0.3))" }}>
                    <tr>
                      <th style={thStyle}>ID</th>
                      <th style={thStyle}>Name</th>
                      <th style={thStyle}>Lastname</th>
                      <th style={thStyle}>Email</th>
                      <th style={thStyle}>Phone</th>
                      <th style={thStyle}>City</th>
                      <th style={thStyle}>Factor Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ngoData.map((user, i) => (
                      <tr key={i} style={{
                        background: i % 2 === 0 ? "rgba(255,255,255,0.08)" : "transparent",
                        transition: "all 0.4s ease",
                        cursor: "pointer"
                      }}>
                        <td style={tdStyle}>{i + 1}</td>
                        <td style={tdStyle}>{user.name || "N/A"}</td>
                        <td style={tdStyle}>{user.lastname || "N/A"}</td>
                        <td style={tdStyle}>{user.email || "N/A"}</td>
                        <td style={tdStyle}>{user.contact_number || "N/A"}</td>
                        <td style={tdStyle}>{user.city || "N/A"}</td>
                        <td style={tdStyle}>{user.factor_type || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{
                textAlign: "center", marginTop: 50, padding: "80px 40px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: 25, border: "2px dashed rgba(255,255,255,0.3)"
              }}>
                <div style={{ fontSize: "80px", marginBottom: 20, opacity: 0.5 }}>📭</div>
                <h3 style={{ color: "#b0bec5", fontSize: "28px" }}>No users found</h3>
                <p style={{ color: "#90a4ae", fontSize: "18px" }}>
                  Your backend returned 0 users. Add some test data!
                </p>
              </div>
            )}
          </>
        ) : (
          <div style={{
            textAlign: "center", marginTop: 100,
            color: "#b0bec5", fontSize: "24px"
          }}>
            <div style={{ fontSize: "80px", marginBottom: 30 }}>📊</div>
            <h3>Click "Load Users Data" button</h3>
            <p style={{ fontSize: "18px", opacity: 0.8 }}>to fetch and display all registered users</p>
          </div>
        )}
      </main>

      <style>{`
        @keyframes gradientShift { 0%,100%{background-position:0%50%}50%{background-position:100%50%} }
        @keyframes earthRotate { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 15px 40px rgba(255,255,255,0.2)}50%{box-shadow:0 0 60px rgba(0,230,230,0.8)} }
        @keyframes floatParticle { 
          0%,100%{transform:translateY(0)rotate(0deg)} 
          33%{transform:translateY(-20px)rotate(120deg)} 
          66%{transform:translateY(-10px)rotate(240deg)} 
        }
      `}</style>
    </div>
  );
};

const thStyle = {
  textAlign: "left", padding: "20px 25px",
  fontWeight: 800, fontSize: 16, color: "#00e6e6",
  userSelect: "none"
};

const tdStyle = {
  padding: "20px 25px", color: "#e0f7fa",
  fontWeight: 600, fontSize: 15
};

export default NgoDashboard;
