// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const hospitalFields = [
//   "hospitalName", "email", "registration_number", "hospital_type", 
//   "factor_available", "ownership_type", "address", "city", "phone", "emergency_contact"
// ];

// export default function HospitalDashboard() {
//   const [hospitalData, setHospitalData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [editMode, setEditMode] = useState(false);
//   const navigate = useNavigate();

//   // 🔄 FETCH HOSPITAL DATA ON LOAD
//   useEffect(() => {
//     fetchHospitalData();
//   }, []);

//   const fetchHospitalData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:8080/healthtech/hospital/profile", {
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setHospitalData(data);
//       }
//     } catch (err) {
//       console.error("Fetch profile error:", err);
//     }
//   };

//   // 💾 UPDATE HOSPITAL DATA
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:8080/healthtech/hospital/update", {
//         method: "PUT",
//         headers: { 
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify(hospitalData),
//       });
      
//       if (response.ok) {
//         setMessage({ text: "✅ Hospital details updated successfully!", type: "success" });
//         setEditMode(false);
//         setTimeout(() => setMessage({ text: "", type: "" }), 3000);
//       } else {
//         setMessage({ text: "❌ Update failed!", type: "error" });
//       }
//     } catch (err) {
//       setMessage({ text: "❌ Network error!", type: "error" });
//     }
//     setLoading(false);
//   };

//   const handleChange = (e) => {
//     setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   // 🎨 DASHBOARD STYLES
//   const styles = {
//     container: {
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       fontFamily: "'Segoe UI', sans-serif",
//       position: "relative",
//       overflow: "hidden",
//     },
//     header: {
//       background: "rgba(255,255,255,0.1)",
//       padding: "20px",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       backdropFilter: "blur(10px)",
//     },
//     dashboardCard: {
//       background: "rgba(255,255,255,0.15)",
//       margin: "20px auto",
//       padding: "30px",
//       borderRadius: "20px",
//       maxWidth: "800px",
//       boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
//       backdropFilter: "blur(15px)",
//     },
//     input: {
//       width: "100%",
//       padding: "12px",
//       margin: "10px 0",
//       border: "none",
//       borderRadius: "8px",
//       background: "rgba(255,255,255,0.9)",
//       color: "#333",
//     },
//     button: {
//       padding: "12px 24px",
//       margin: "5px",
//       border: "none",
//       borderRadius: "8px",
//       fontWeight: "bold",
//       cursor: "pointer",
//     },
//     updateBtn: { background: "#00cc99", color: "white" },
//     editBtn: { background: "#ffc107", color: "#333" },
//     logoutBtn: { background: "#ff4d4d", color: "white" },
//     message: (type) => ({
//       padding: "12px",
//       borderRadius: "8px",
//       margin: "15px 0",
//       textAlign: "center",
//       color: type === 'error' ? '#ff4d4d' : '#00cc99',
//       background: type === 'error' ? 'rgba(255,77,77,0.1)' : 'rgba(0,204,153,0.1)',
//     }),
//   };

//   return (
//     <div style={styles.container}>
//       {/* 🏥 Medical Background Animations (same as login) */}
//       {/* Copy the medicalElements and <style> from login page here */}
      
//       <div style={styles.header}>
//         <h1 style={{ color: "white", margin: 0 }}>🏥 Hospital Dashboard</h1>
//         <button style={{...styles.button, ...styles.logoutBtn}} onClick={handleLogout}>
//           🚪 Logout
//         </button>
//       </div>

//       <div style={styles.dashboardCard}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//           <h2 style={{ color: "white", margin: 0 }}>📋 Hospital Details</h2>
//           <div>
//             {!editMode ? (
//               <button style={{...styles.button, ...styles.editBtn}} onClick={() => setEditMode(true)}>
//                 ✏️ Edit Details
//               </button>
//             ) : (
//               <button style={{...styles.button, ...styles.updateBtn}} onClick={handleUpdate} disabled={loading}>
//                 💾 {loading ? "Updating..." : "Save Changes"}
//               </button>
//             )}
//           </div>
//         </div>

//         <form onSubmit={(e) => e.preventDefault()}>
//           {hospitalFields.map(field => (
//             <div key={field} style={{ marginBottom: "15px" }}>
//               <label style={{ color: "white", fontWeight: "bold", display: "block", marginBottom: "5px" }}>
//                 {field.replace(/([A-Z])/g, ' $1').replace('_', ' ').toUpperCase()}
//               </label>
//               <input
//                 style={styles.input}
//                 type={field === 'email' ? 'email' : 'text'}
//                 name={field}
//                 value={hospitalData[field] || ""}
//                 onChange={handleChange}
//                 disabled={!editMode}
//               />
//             </div>
//           ))}
//         </form>

//         {message.text && (
//           <p style={styles.message(message.type)}>{message.text}</p>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";

// 🎨 Advanced Medical Theme Styles (Reuse from previous component)
const styles = {
    // ... (All styles from the HospitalAuthContainer component)
    container: {
        minHeight: "100vh", 
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3d 50%, #2d1b69 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: "relative",
        overflow: "hidden", 
        boxSizing: "border-box", 
    },
    glassCard: {
        background: "rgba(255, 255, 255, 0.12)",
        padding: "40px",
        borderRadius: "24px",
        boxShadow: "0 25px 45px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        maxWidth: "500px", // Increased size for dashboard
        width: "90%",
        zIndex: 20,
        boxSizing: "border-box",
    },
    header: {
        textAlign: "center",
        color: "white",
        marginBottom: "30px",
        fontSize: "28px", // Larger font
        fontWeight: "700",
        textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
    },
    select: { // Style for the new select input
        width: "100%",
        padding: "12px 15px",
        marginBottom: "20px",
        border: "none",
        borderRadius: "8px",
        background: "rgba(255, 255, 255, 0.9)",
        color: "#333",
        fontSize: "16px",
        boxSizing: "border-box",
        transition: "background 0.3s",
        appearance: 'none', // Remove default arrow
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="rgb(51, 51, 51)" d="M7 10l5 5 5-5z"/></svg>')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 15px center',
    },
    button: {
        width: "100%",
        padding: "15px",
        marginTop: "20px",
        border: "none",
        borderRadius: "8px",
        background: "#00cc99",
        color: "white",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background 0.3s ease, transform 0.1s ease",
        boxShadow: "0 4px 10px rgba(0, 204, 153, 0.4)",
    },
    message: (type) => ({
        padding: "10px",
        borderRadius: "8px",
        marginTop: "15px",
        textAlign: "center",
        color: type === 'error' ? '#ff4d4d' : '#00cc99',
        background: type === 'error' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(0, 204, 153, 0.1)',
        fontWeight: "600",
        border: `1px solid ${type === 'error' ? '#ff4d4d' : '#00cc99'}`,
    }),
    welcomeText: {
        textAlign: "center",
        color: "rgba(255, 255, 255, 0.9)",
        marginBottom: "20px",
        fontSize: "18px",
    },
    // ... (other styles like switchText, switchButton from previous component if needed)
};
// Add the floating medical elements style block here if you want them on this page too.

// 💉 Factor Availability Component
export default function FactorAvailabilityForm({ onLogout }) {
    const [factorStatus, setFactorStatus] = useState("YES"); // Default to YES/NO
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        if (!token) {
            setMessage({ text: "❌ Not authenticated. Please log in.", type: "error" });
            // Ideally, redirect to login page here if the parent component doesn't handle it
        }
    }, [token]);

    // 📝 Handle select change
    const handleChange = (e) => {
        setFactorStatus(e.target.value);
    };

    // 📩 Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        if (!token) {
            setLoading(false);
            return setMessage({ text: "❌ Session expired. Please log in again.", type: "error" });
        }

        try {
            // Your Spring Boot backend endpoint
            const url = `https://healthtracker-5.onrender.com/healthtech/factor_available/factor_yes?factor=${factorStatus}`;

            const response = await fetch(url, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    // JWT Token from successful login is used for authentication
                    "Authorization": `Bearer ${token}` 
                },
                // The factor is sent as a query parameter in your backend code
                // body: JSON.stringify({ factor: factorStatus }), // Not needed if using query param
            });

            setLoading(false);

            if (response.ok) {
                // Assuming your backend returns a success message or a small payload
                const result = await response.text();
                setMessage({ 
                    text: `✅ Success! Factor availability set to: ${factorStatus}. Server Response: ${result.substring(0, 50)}...`, 
                    type: "success" 
                });
            } else if (response.status === 401) {
                // Unauthorized - Token issue
                setMessage({ text: "❌ Unauthorized. Session invalid. Please log in.", type: "error" });
                localStorage.removeItem('token');
                // Optional: Call onLogout if provided
            } else {
                const errorText = await response.text();
                setMessage({ text: `❌ Failed: ${errorText.substring(0, 150)}`, type: "error" });
            }
        } catch (err) {
            setLoading(false);
            console.error("Submission error:", err);
            setMessage({ text: "❌ Network error. Check server status or API URL.", type: "error" });
        }
    };

    const cardStyle = {
        ...styles.glassCard,
        transform: loading ? 'scale(1.02)' : 'scale(1)',
        opacity: loading ? 0.9 : 1,
    };

    return (
        <div style={styles.container}>
            {/* 💎 Glass Card */}
            <div style={cardStyle}>
                <h2 style={styles.header}>
                    💉 Factor Availability
                </h2>
                <p style={styles.welcomeText}>
                    Welcome back! Please update your factor status.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* ⚙️ Select Input for Factor Status */}
                    <label style={{ color: 'white', marginBottom: '8px', display: 'block' }}>
                        Is Factor Available at your Hospital?
                    </label>
                    <select
                        style={styles.select}
                        name="factorStatus"
                        value={factorStatus}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    >
                        <option value="YES">YES - Factor is available</option>
                        <option value="NO">NO - Factor is NOT available</option>
                    </select>

                    {/* 🟢 Action Button */}
                    <button
                        type="submit"
                        style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
                        disabled={loading}
                    >
                        {loading 
                            ? "🔄 SAVING STATUS..."
                            : "💾 SAVE AVAILABILITY"
                        }
                    </button>
                </form>

                {/* 💬 Message Display */}
                {message.text && (
                    <p style={styles.message(message.type)}>{message.text}</p>
                )}

                {/* ➡️ Logout Link (Optional but recommended) */}
                <p style={styles.switchText}>
                    <button 
                        style={styles.switchButton} 
                        onClick={onLogout} 
                        disabled={loading}
                    >
                        Logout
                    </button>
                </p>
            </div>
        </div>
    );
}