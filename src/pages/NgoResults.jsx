// import React, { useState } from "react";

// export default function NgoSearch() {
//   const [city, setCity] = useState("");
//   const [ngoName, setNgoName] = useState(""); // <-- added ngoName input
//   const [loading, setLoading] = useState(false);
//   const [ngos, setNgos] = useState([]);
//   const [error, setError] = useState("");

//   const searchNgos = async () => {
//     setLoading(true);
//     setError("");
//     setNgos([]);

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setError("User not logged in. Token missing.");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(
//         "http://localhost:8080/healthtech/searchNgo/find",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + token,
//           },
//           body: JSON.stringify({
//             ngoName: ngoName, // <-- sending actual ngoName
//             city: city,       // <-- sending actual city
//           }),
//         }
//       );

//       if (!response.ok) {
//         setError("Server error: " + response.status);
//         setLoading(false);
//         return;
//       }

//       const data = await response.json();

//       if (data.content && data.content.length > 0) {
//         setNgos(data.content);
//       } else {
//         setError("No NGOs found.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong while searching NGOs.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>NGO Search</h1>

//       <div style={styles.card}>
        
//         {/* NGO Name Input */}
//         <label style={styles.label}>NGO Name:</label>
//         <input
//           type="text"
//           placeholder="Enter NGO name"
//           value={ngoName}
//           onChange={(e) => setNgoName(e.target.value)}
//           style={styles.input}
//         />

//         {/* City Input */}
//         <label style={styles.label}>City:</label>
//         <input
//           type="text"
//           placeholder="Enter city"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           style={styles.input}
//         />

//         <button onClick={searchNgos} style={styles.button}>
//           Search
//         </button>

//         {loading && <p style={styles.loading}>Searching...</p>}
//         {error && <p style={styles.error}>⚠ {error}</p>}
//       </div>

//       <h2 style={{ marginTop: "30px" }}>Results:</h2>

//       {ngos.length === 0 && !loading && !error && (
//         <p style={styles.noResults}>No NGOs found.</p>
//       )}

//       {/* NGO LIST */}
//       {ngos.map((ngo) => (
//         <div key={ngo.id} style={styles.ngoCard}>
//           <h3>{ngo.ngoName}</h3>
//           <p>
//             <strong>City:</strong> {ngo.city}
//           </p>
//           <p>
//             <strong>Address:</strong> {ngo.address}
//           </p>
//           <p>
//             <strong>Contact:</strong> {ngo.contact_number}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// const styles = {
//   container: { padding: "40px", fontFamily: "Arial" },
//   title: { fontSize: "32px", fontWeight: "bold", marginBottom: "20px" },
//   card: {
//     padding: "20px",
//     borderRadius: "12px",
//     background: "#f4f4f4",
//     width: "400px",
//   },
//   label: { fontWeight: "bold" },
//   input: {
//     width: "100%",
//     padding: "10px",
//     marginTop: "8px",
//     marginBottom: "15px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     padding: "10px 18px",
//     background: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     width: "100%",
//   },
//   loading: { color: "blue", marginTop: "10px" },
//   error: { color: "red", marginTop: "10px" },
//   noResults: { color: "#444", fontStyle: "italic" },
//   ngoCard: {
//     background: "white",
//     padding: "15px",
//     borderRadius: "8px",
//     marginTop: "15px",
//     border: "1px solid #ddd",
//   },
// };





// import React, { useState } from "react";

// export default function NgoSearch() {
//   const [city, setCity] = useState("");
//   const [ngoName, setNgoName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [ngos, setNgos] = useState([]);
//   const [error, setError] = useState("");

//   const searchNgos = async () => {
//     setLoading(true);
//     setError("");
//     setNgos([]);

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setError("❌ Token missing or user not logged in.");
//         setLoading(false);
//         return;
//       }

//       const bodyData = {
//         ngoName: ngoName || "",
//         city: city || "",
//         page: 0,
//         size: 10,
//       };

//       const response = await fetch(
//         "http://localhost:8080/healthtech/searchNgo/find",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + token,
//           },
//           body: JSON.stringify(bodyData),
//         }
//       );

//       if (!response.ok) {
//         setError("❌ Server Error: " + response.status);
//         setLoading(false);
//         return;
//       }

//       const data = await response.json();
//       console.log("API DATA:", data);

//       setNgos(data.content || []);

//       if (!data.content || data.content.length === 0) {
//         setError("⚠ No NGOs found.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("❌ Something went wrong.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: "40px", background: "#222", minHeight: "100vh" }}>

//       <h1 style={{ color: "white" }}>Search NGOs</h1>

//       {/* SEARCH BOX */}
//       <div
//         style={{
//           background: "white",
//           padding: "20px",
//           borderRadius: "10px",
//           width: "400px",
//         }}
//       >
//         <label>NGO Name:</label>
//         <input
//           type="text"
//           value={ngoName}
//           onChange={(e) => setNgoName(e.target.value)}
//           style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
//         />

//         <label>City:</label>
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
//         />

//         <button
//           onClick={searchNgos}
//           style={{
//             width: "100%",
//             padding: "12px",
//             background: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "6px",
//           }}
//         >
//           🔍 Search
//         </button>

//         {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
//         {loading && <p style={{ color: "blue", marginTop: "10px" }}>Searching...</p>}
//       </div>

//       {/* RESULTS */}
//       <h2 style={{ color: "white", marginTop: "30px" }}>Results:</h2>

//       {ngos.length === 0 && !loading && !error ? (
//         <p style={{ color: "#bbb" }}>No results yet. Please search.</p>
//       ) : null}

//       {ngos.map((ngo) => (
//         <div
//           key={ngo.id}
//           style={{
//             background: "white",
//             padding: "18px",
//             marginTop: "15px",
//             borderRadius: "10px",
//             width: "400px",
//           }}
//         >
//           <h3>{ngo.ngoName}</h3>
//           <p><strong>City:</strong> {ngo.city}</p>
//           <p><strong>Address:</strong> {ngo.address}</p>
//           <p><strong>Contact:</strong> {ngo.contact_number}</p>
//         </div>
//       ))}
//     </div>
//   );
// }



// import React, { useState } from "react";

// // एडवांस UI के लिए स्टाइल
// const styles = {
//     // 🚩 FIX 1: Ensure the container takes full viewport height and width
//     container: {
//         padding: "60px 20px", // Reduced horizontal padding for full width feel
//         background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
//         minHeight: "100vh",
//         minWidth: "100vw", // Added minWidth to ensure full page coverage
//         margin: 0, // IMPORTANT: Remove margin
//         boxSizing: "border-box", // IMPORTANT: Include padding/border in element's total width/height
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     },
//     heading: {
//         color: "white",
//         textAlign: "center",
//         marginBottom: "40px",
//         textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
//     },
//     // 🚩 FIX 2: Increased maxWidth for search box to look better on wider screens
//     searchBox: {
//         background: "rgba(255, 255, 255, 0.95)",
//         padding: "30px",
//         borderRadius: "15px",
//         boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
//         maxWidth: "600px", // Increased max-width
//         margin: "0 auto 40px", // Centered
//         transition: "all 0.3s ease-in-out",
//     },
//     label: {
//         display: "block",
//         marginBottom: "8px",
//         fontWeight: "600",
//         color: "#333",
//     },
//     input: {
//         width: "100%",
//         padding: "12px",
//         marginBottom: "20px",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//         boxSizing: "border-box",
//         transition: "border-color 0.3s",
//     },
//     button: {
//         width: "100%",
//         padding: "14px",
//         background: "#007bff",
//         color: "white",
//         border: "none",
//         borderRadius: "8px",
//         cursor: "pointer",
//         fontWeight: "700",
//         textTransform: "uppercase",
//         letterSpacing: "1px",
//         transition: "background 0.3s ease, transform 0.1s ease",
//     },
//     resultsTitle: {
//         color: "white",
//         marginTop: "50px",
//         textAlign: "center",
//     },
//     // 🚩 FIX 3: Allowed NGO cards to take up available space better
//     ngoCardContainer: {
//         display: "flex",
//         flexWrap: "wrap",
//         justifyContent: "center",
//         gap: "25px",
//         marginTop: "20px",
//         padding: "0 20px" // Added padding to prevent cards from touching the edge
//     },
//     ngoCard: {
//         background: "white",
//         padding: "20px",
//         borderRadius: "12px",
//         width: "100%", // Default to 100% width on small screens
//         maxWidth: "350px", // Set max-width for better appearance on large screens
//         boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
//         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//         cursor: "pointer",
//     },
//     ngoCardHover: {
//         transform: "translateY(-5px)",
//         boxShadow: "0 12px 25px rgba(0, 0, 0, 0.3)",
//     },
//     cardTitle: {
//         color: "#2a5298",
//         marginBottom: "10px",
//         borderBottom: "2px solid #007bff",
//         paddingBottom: "5px",
//     },
//     cardText: {
//         margin: "5px 0",
//         fontSize: "14px",
//         color: "#555",
//     },
//     error: {
//         color: "#ff4d4d",
//         marginTop: "15px",
//         textAlign: "center",
//         fontWeight: "600",
//     },
//     loading: {
//         color: "#66ccff",
//         marginTop: "15px",
//         textAlign: "center",
//         fontWeight: "600",
//     },
//     // 🚩 NEW: Styles for the Register Form modal/overlay
//     registerFormOverlay: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         background: 'rgba(0, 0, 0, 0.7)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 1000,
//     },
//     registerForm: {
//         background: 'white',
//         padding: '30px',
//         borderRadius: '15px',
//         maxWidth: '500px',
//         width: '90%',
//         boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
//         position: 'relative',
//     },
//     registerButton: { // Style for the button inside NGO card
//         width: "100%",
//         padding: "10px",
//         background: "#28a745", // Green color for Register
//         color: "white",
//         border: "none",
//         borderRadius: "6px",
//         cursor: "pointer",
//         fontWeight: "600",
//         marginTop: "15px",
//         transition: "background 0.3s ease",
//     }
// };

// export default function NgoSearch() {
//     const [city, setCity] = useState("");
//     const [ngoName, setNgoName] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [ngos, setNgos] = useState([]);
//     const [error, setError] = useState("");
//     const [hoveredCard, setHoveredCard] = useState(null);

//     // 🚩 NEW STATE for Registration
//     const [isRegistering, setIsRegistering] = useState(false);
//     const [currentNgo, setCurrentNgo] = useState(null); // Stores the NGO selected for registration
//     const [registerData, setRegisterData] = useState({ // Matches your Register entity fields
//         ngoId: "", // Will be set automatically
//         email: "",
//         name: "",
//         lastname: "",
//         contact_number: "",
//         factor_type: "",
//         Adar_Card: "",
//         city: "",
//     });
//     const [registerMessage, setRegisterMessage] = useState("");


//     // --- Core Search Logic (Unchanged) ---
//     const searchNgos = async () => {
//         setLoading(true);
//         setError("");
//         setNgos([]);

//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 setError("❌ Token missing or user not logged in. Please log in.");
//                 setLoading(false);
//                 return;
//             }

//             const bodyData = { ngoName: ngoName || "", city: city || "", page: 0, size: 10 };

//             const response = await fetch(
//                 "http://localhost:8080/healthtech/searchNgo/find",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json", Authorization: "Bearer " + token, },
//                     body: JSON.stringify(bodyData),
//                 }
//             );

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 setError("❌ Server Error: " + response.status + " - " + errorText.substring(0, 100) + "...");
//                 setLoading(false);
//                 return;
//             }

//             const data = await response.json();
//             setNgos(data.content || []);

//             if (!data.content || data.content.length === 0) {
//                 setError("⚠ No NGOs found matching your criteria.");
//             }
//         } catch (err) {
//             console.error(err);
//             setError("❌ An unexpected error occurred: " + err.message);
//         }
//         setLoading(false);
//     };


//     // --- Registration Logic (NEW) ---
    
//     // 1. Open Form and Set NGO ID
//     const handleRegisterClick = (ngo) => {
//         setCurrentNgo(ngo);
//         // NGO ID को ऑटोमैटिकली registerData में सेट करें
//         setRegisterData(prevData => ({ ...prevData, ngoId: ngo.id })); 
//         setIsRegistering(true);
//         setRegisterMessage(""); // Clear previous messages
//     };

//     // 2. Handle Form Input
//     const handleRegisterChange = (e) => {
//         setRegisterData({ ...registerData, [e.target.name]: e.target.value });
//     };

//     // 3. Handle Form Submission
//     const handleRegisterSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true); // Re-using loading state for form submission
//         setRegisterMessage("");

//         const token = localStorage.getItem("token");

//         // Simple validation check for all required fields
//         const requiredFields = ['email', 'name', 'lastname', 'contact_number', 'factor_type', 'Adar_Card', 'city', 'ngoId'];
//         for (const field of requiredFields) {
//             if (!registerData[field]) {
//                 setRegisterMessage(`❌ Please fill in the ${field.replace('_', ' ')} field.`);
//                 setLoading(false);
//                 return;
//             }
//         }
        
//         try {
//             const response = await fetch(
//                 "http://localhost:8080/healthtech/registration_user/user_register",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: "Bearer " + token,
//                     },
//                     body: JSON.stringify(registerData),
//                 }
//             );

//             if (response.ok) {
//                 setRegisterMessage(`✅ Successfully registered with ${currentNgo.ngoName}!`);
//                 // Clear form data after success
//                 setRegisterData({
//                     ngoId: "", email: "", name: "", lastname: "", contact_number: "", factor_type: "", Adar_Card: "", city: "",
//                 });
//                 // Optionally close the form after a delay
//                 setTimeout(() => setIsRegistering(false), 3000); 
//             } else {
//                 const errorText = await response.text();
//                 setRegisterMessage(`❌ Registration failed. Server error: ${response.status}. Details: ${errorText.substring(0, 100)}...`);
//             }
//         } catch (err) {
//             console.error(err);
//             setRegisterMessage("❌ An unexpected error occurred during registration.");
//         }
//         setLoading(false);
//     };

//     // --- Global Style Reset (Unchanged) ---
//     React.useEffect(() => {
//         document.body.style.margin = '0';
//         document.body.style.padding = '0';
//         document.documentElement.style.width = '100%';
//         document.documentElement.style.overflowX = 'hidden';
//         return () => {
//             document.body.style.margin = '';
//             document.body.style.padding = '';
//             document.documentElement.style.width = '';
//             document.documentElement.style.overflowX = '';
//         };
//     }, []);

//     // --- Component JSX ---
//     return (
//         <div style={styles.container}>
//             <h1 style={styles.heading}>Search NGOs 🤝</h1>

//             {/* SEARCH BOX (Unchanged) */}
//             <div style={styles.searchBox}>
//                 <label style={styles.label}>NGO Name:</label>
//                 <input
//                     type="text"
//                     value={ngoName}
//                     onChange={(e) => setNgoName(e.target.value)}
//                     style={styles.input}
//                 />
//                 {/* ... (City input and Search button remain the same) ... */}
//                 <label style={styles.label}>City:</label>
//                 <input
//                     type="text"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     style={styles.input}
//                 />
//                 <button
//                     onClick={searchNgos}
//                     style={styles.button}
//                     onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
//                     onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
//                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//                 >
//                     {loading ? "SEARCHING..." : "🔍 SEARCH"}
//                 </button>
//                 {error && <p style={styles.error}>{error}</p>}
//                 {loading && <p style={styles.loading}>Searching for NGOs...</p>}
//             </div>

//             {/* RESULTS (Updated to include Register Button) */}
//             <h2 style={styles.resultsTitle}>Found NGOs: ({ngos.length})</h2>

//             {ngos.length === 0 && !loading && !error ? (
//                 <p style={{ color: "rgba(255, 255, 255, 0.7)", textAlign: "center", marginTop: "20px" }}>
//                     No results yet. Enter criteria and click Search.
//                 </p>
//             ) : null}

//             <div style={styles.ngoCardContainer}>
//                 {ngos.map((ngo, index) => (
//                     <div
//                         key={ngo.id}
//                         style={
//                             hoveredCard === index
//                                 ? { ...styles.ngoCard, ...styles.ngoCardHover }
//                                 : styles.ngoCard
//                         }
//                         onMouseEnter={() => setHoveredCard(index)}
//                         onMouseLeave={() => setHoveredCard(null)}
//                     >
//                         <h3 style={styles.cardTitle}>{ngo.ngoName}</h3>
//                         <p style={styles.cardText}>
//                             <strong>📍 City:</strong> {ngo.city}
//                         </p>
//                         <p style={styles.cardText}>
//                             <strong>🏠 Address:</strong> {ngo.address}
//                         </p>
//                         <p style={styles.cardText}>
//                             <strong>📞 Contact:</strong> {ngo.contact_number}
//                         </p>
//                         <p style={styles.cardText}>
//                             <strong>🆔 Reg. No:</strong> {ngo.registration_number}
//                         </p>
                        
//                         {/* 🚩 NEW: REGISTER BUTTON ADDED */}
//                         <button
//                             style={{ ...styles.registerButton, opacity: loading ? 0.5 : 1 }}
//                             onClick={() => handleRegisterClick(ngo)}
//                             disabled={loading}
//                         >
//                             🤝 Register Now
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {/* 🚩 NEW: REGISTRATION FORM MODAL */}
//             {isRegistering && currentNgo && (
//                 <div style={styles.registerFormOverlay}>
//                     <form style={styles.registerForm} onSubmit={handleRegisterSubmit}>
//                         <h2 style={{...styles.cardTitle, textAlign: 'center'}}>Register for {currentNgo.ngoName}</h2>
//                         <p style={{textAlign: 'center', fontSize: '12px', color: '#888'}}>NGO ID: {currentNgo.id}</p>
                        
//                         {/* Close Button */}
//                         <button 
//                             type="button" 
//                             onClick={() => setIsRegistering(false)} 
//                             style={{position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer'}}
//                         >
//                             &times;
//                         </button>

//                         <div style={{display: 'flex', gap: '10px'}}>
//                             <div style={{flex: 1}}>
//                                 <label style={styles.label}>First Name</label>
//                                 <input style={styles.input} type="text" name="name" value={registerData.name} onChange={handleRegisterChange} required />
//                             </div>
//                             <div style={{flex: 1}}>
//                                 <label style={styles.label}>Last Name</label>
//                                 <input style={styles.input} type="text" name="lastname" value={registerData.lastname} onChange={handleRegisterChange} required />
//                             </div>
//                         </div>

//                         <label style={styles.label}>Email</label>
//                         <input style={styles.input} type="email" name="email" value={registerData.email} onChange={handleRegisterChange} required />

//                         <label style={styles.label}>Contact Number</label>
//                         <input style={styles.input} type="text" name="contact_number" value={registerData.contact_number} onChange={handleRegisterChange} required />

//                         <label style={styles.label}>City</label>
//                         <input style={styles.input} type="text" name="city" value={registerData.city} onChange={handleRegisterChange} required />
                        
//                         <label style={styles.label}>Factor Type</label>
//                         <input style={styles.input} type="text" name="factor_type" value={registerData.factor_type} onChange={handleRegisterChange} required />

//                         <label style={styles.label}>Aadhar Card</label>
//                         <input style={styles.input} type="text" name="Adar_Card" value={registerData.Adar_Card} onChange={handleRegisterChange} required />

//                         <button 
//                             style={{...styles.button, background: '#28a745', marginTop: '10px'}} 
//                             type="submit" 
//                             disabled={loading}
//                         >
//                             {loading ? "SUBMITTING..." : "SUBMIT REGISTRATION"}
//                         </button>
                        
//                         {registerMessage && (
//                             <p style={{...styles.error, color: registerMessage.startsWith('❌') ? 'red' : 'green'}}>
//                                 {registerMessage}
//                             </p>
//                         )}
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// }


//new ngo 

import React, { useState, useEffect } from "react";

// एडवांस UI के लिए स्टाइल (unchanged)
const styles = {
    container: {
        padding: "60px 20px",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        minHeight: "100vh",
        minWidth: "100vw",
        margin: 0,
        boxSizing: "border-box",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
        color: "white",
        textAlign: "center",
        marginBottom: "40px",
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    },
    searchBox: {
        background: "rgba(255, 255, 255, 0.95)",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        maxWidth: "600px",
        margin: "0 auto 40px",
        transition: "all 0.3s ease-in-out",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontWeight: "600",
        color: "#333",
    },
    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxSizing: "border-box",
        transition: "border-color 0.3s",
    },
    buttonContainer: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
    },
    button: {
        flex: 1,
        padding: "14px",
        background: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "1px",
        transition: "background 0.3s ease, transform 0.1s ease",
    },
    cityBaseButton: {
        flex: 1, 
        padding: "14px",
        background: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "1px",
        transition: "background 0.3s ease, transform 0.1s ease",
    },
    resultsTitle: {
        color: "white",
        marginTop: "50px",
        textAlign: "center",
    },
    ngoCardContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "25px",
        marginTop: "20px",
        padding: "0 20px"
    },
    ngoCard: {
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "350px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
    },
    ngoCardHover: {
        transform: "translateY(-5px)",
        boxShadow: "0 12px 25px rgba(0, 0, 0, 0.3)",
    },
    cardTitle: {
        color: "#2a5298",
        marginBottom: "10px",
        borderBottom: "2px solid #007bff",
        paddingBottom: "5px",
    },
    cardText: {
        margin: "5px 0",
        fontSize: "14px",
        color: "#555",
    },
    error: {
        color: "#ff4d4d",
        marginTop: "15px",
        textAlign: "center",
        fontWeight: "600",
    },
    loading: {
        color: "#66ccff",
        marginTop: "15px",
        textAlign: "center",
        fontWeight: "600",
    },
    registerFormOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    registerForm: {
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        position: 'relative',
    },
    registerButton: {
        width: "100%",
        padding: "10px",
        background: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "600",
        marginTop: "15px",
        transition: "background 0.3s ease",
    }
};

export default function NgoSearch() {
    const [city, setCity] = useState("");
    const [ngoName, setNgoName] = useState("");
    const [loading, setLoading] = useState(false);
    const [ngos, setNgos] = useState([]);
    const [error, setError] = useState("");
    const [hoveredCard, setHoveredCard] = useState(null);

    const [isRegistering, setIsRegistering] = useState(false);
    const [currentNgo, setCurrentNgo] = useState(null);
    const [registerData, setRegisterData] = useState({
        ngoId: "",
        email: "",
        name: "",
        lastname: "",
        contact_number: "",
        factor_type: "",
        Adar_Card: "",
        city: "",
    });
    const [registerMessage, setRegisterMessage] = useState("");

    const handleApiResponse = (data) => {
        let results = [];
        
        if (data && data.content && Array.isArray(data.content)) {
            results = data.content;
        } 
        else if (data && data.body && Array.isArray(data.body)) {
            results = data.body; 
        } 
        else if (Array.isArray(data)) {
            results = data;
        }

        if (results.length === 0) {
            setNgos([]);
            setError("⚠ No NGOs found matching the search criteria.");
        } else {
            setNgos(results);
            setError("");
        }
    };


    // --- Core Search Logic (Name & City) - UPDATED VALIDATION ---
    const searchNgos = async () => {
        
        // 🚩 VALIDATION: Name या City दोनों में से एक आवश्यक है
        if (!ngoName.trim() && !city.trim()) {
            setError("❌ Please enter either NGO Name or City for a combined search.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");
        setNgos([]);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("❌ Token missing or user not logged in. Please log in.");
                setLoading(false);
                return;
            }

            const bodyData = { ngoName: ngoName || "", city: city || "", page: 0, size: 10 };

            const response = await fetch(
                "https://healthtracker-5.onrender.com/healthtech/searchNgo/find",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token, },
                    body: JSON.stringify(bodyData),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                setError("❌ Server Error: " + response.status + " - " + errorText.substring(0, 100) + "...");
                setLoading(false);
                return;
            }

            const data = await response.json();
            handleApiResponse(data);

        } catch (err) {
            console.error(err);
            setError("❌ An unexpected error occurred: " + err.message);
        }
        setLoading(false);
    };

    // --- City Base Search Logic (Only City) - UPDATED VALIDATION ---
    const searchCityBaseNgos = async () => {
        
        // 🚩 VALIDATION: City अनिवार्य है
        if (!city.trim()) {
            setError("❌ City name is required for City Base Find.");
            return;
        }

        setLoading(true);
        setError("");
        setNgos([]);

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("❌ Token missing or user not logged in. Please log in.");
                setLoading(false);
                return;
            }

            const url = `https://healthtracker-5.onrender.com/healthtech/searchNgo/saerch/ngocity?City=${encodeURIComponent(city.trim())}`;

            const response = await fetch(url, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `❌ Server Error: ${response.status}`;

                if (response.status === 400 && errorText.includes("City Not Exits")) {
                    errorMessage = "❌ City Not Exists or no NGOs found in this city.";
                } else if (response.status === 403) {
                    errorMessage = "❌ Server Error: 403 Forbidden. Check token/permissions in backend.";
                } else {
                    errorMessage = `❌ Server Error: ${response.status} - ${errorText.substring(0, 100)}...`;
                }
                
                setError(errorMessage);
                setLoading(false);
                return;
            }

            const data = await response.json();
            handleApiResponse(data); 

        } catch (err) {
            console.error(err);
            setError("❌ An unexpected network error occurred: " + err.message);
        }
        setLoading(false);
    };
    // --------------------------------------------------------

    // --- Registration Logic (Unchanged) ---
    const handleRegisterClick = (ngo) => {
        setCurrentNgo(ngo);
        setRegisterData(prevData => ({ ...prevData, ngoId: ngo.id })); 
        setIsRegistering(true);
        setRegisterMessage("");
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setRegisterMessage("");

        const token = localStorage.getItem("token");

        const requiredFields = ['email', 'name', 'lastname', 'contact_number', 'factor_type', 'Adar_Card', 'city', 'ngoId'];
        for (const field of requiredFields) {
            if (!registerData[field]) {
                setRegisterMessage(`❌ Please fill in the ${field.replace('_', ' ')} field.`);
                setLoading(false);
                return;
            }
        }
        
        try {
            const response = await fetch(
                "https://healthtracker-5.onrender.com/healthtech/registration_user/user_register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify(registerData),
                }
            );

            if (response.ok) {
                setRegisterMessage(`✅ Successfully registered with ${currentNgo.ngoName}!`);
                setRegisterData({
                    ngoId: "", email: "", name: "", lastname: "", contact_number: "", factor_type: "", Adar_Card: "", city: "",
                });
                setTimeout(() => setIsRegistering(false), 3000); 
            } else {
                const errorText = await response.text();
                setRegisterMessage(`❌ Registration failed. Server error: ${response.status}. Details: ${errorText.substring(0, 100)}...`);
            }
        } catch (err) {
            console.error(err);
            setRegisterMessage("❌ An unexpected error occurred during registration.");
        }
        setLoading(false);
    };

    // --- Global Style Reset (Unchanged) ---
    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.documentElement.style.width = '100%';
        document.documentElement.style.overflowX = 'hidden';
        return () => {
            document.body.style.margin = '';
            document.body.style.padding = '';
            document.documentElement.style.width = '';
            document.documentElement.style.overflowX = '';
        };
    }, []);

    // --- Component JSX (Unchanged) ---
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Search NGOs 🤝</h1>

            {/* SEARCH BOX */}
            <div style={styles.searchBox}>
                <label style={styles.label}>NGO Name (Optional for Name/City Search):</label>
                <input
                    type="text"
                    value={ngoName}
                    onChange={(e) => setNgoName(e.target.value)}
                    style={styles.input}
                    placeholder="Enter NGO name"
                />
                <label style={styles.label}>City (Required for City Base Find):</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={styles.input}
                    placeholder="Enter city name"
                />

                {/* --- Button Container --- */}
                <div style={styles.buttonContainer}>
                    <button
                        onClick={searchNgos}
                        style={styles.button}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        disabled={loading}
                    >
                        {loading ? "SEARCHING..." : "🔍 SEARCH (Name OR City)"}
                    </button>
                    
                    <button
                        onClick={searchCityBaseNgos}
                        style={styles.cityBaseButton}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        disabled={loading}
                    >
                        {loading ? "SEARCHING..." : "🌍 CITY BASE FIND (City Only)"}
                    </button>
                </div>
                {/* ----------------------------------- */}

                {error && <p style={styles.error}>{error}</p>}
                {loading && <p style={styles.loading}>Searching for NGOs...</p>}
            </div>

            {/* RESULTS */}
            <h2 style={styles.resultsTitle}>Found NGOs: ({ngos.length})</h2>

            {ngos.length === 0 && !loading && !error ? (
                <p style={{ color: "rgba(255, 255, 255, 0.7)", textAlign: "center", marginTop: "20px" }}>
                    No results yet. Enter criteria and click Search.
                </p>
            ) : null}

            <div style={styles.ngoCardContainer}>
                {ngos.map((ngo, index) => (
                    <div
                        key={ngo.id}
                        style={
                            hoveredCard === index
                                ? { ...styles.ngoCard, ...styles.ngoCardHover }
                                : styles.ngoCard
                        }
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <h3 style={styles.cardTitle}>{ngo.ngoName}</h3>
                        <p style={styles.cardText}>
                            <strong>📍 City:</strong> {ngo.city}
                        </p>
                        <p style={styles.cardText}>
                            <strong>🏠 Address:</strong> {ngo.address}
                        </p>
                        <p style={styles.cardText}>
                            <strong>📞 Contact:</strong> {ngo.contact_number}
                        </p>
                        <p style={styles.cardText}>
                            <strong>🆔 Reg. No:</strong> {ngo.registration_number}
                        </p>
                        
                        {/* REGISTER BUTTON */}
                        <button
                            style={{ ...styles.registerButton, opacity: loading ? 0.5 : 1 }}
                            onClick={() => handleRegisterClick(ngo)}
                            disabled={loading}
                        >
                            🤝 Register Now
                        </button>
                    </div>
                ))}
            </div>

            {/* REGISTRATION FORM MODAL */}
            {isRegistering && currentNgo && (
                <div style={styles.registerFormOverlay}>
                    <form style={styles.registerForm} onSubmit={handleRegisterSubmit}>
                        <h2 style={{...styles.cardTitle, textAlign: 'center'}}>Register for {currentNgo.ngoName}</h2>
                        <p style={{textAlign: 'center', fontSize: '12px', color: '#888'}}>NGO ID: {currentNgo.id}</p>
                        
                        {/* Close Button */}
                        <button 
                            type="button" 
                            onClick={() => setIsRegistering(false)} 
                            style={{position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer'}}
                        >
                            &times;
                        </button>

                        <div style={{display: 'flex', gap: '10px'}}>
                            <div style={{flex: 1}}>
                                <label style={styles.label}>First Name</label>
                                <input style={styles.input} type="text" name="name" value={registerData.name} onChange={handleRegisterChange} required />
                            </div>
                            <div style={{flex: 1}}>
                                <label style={styles.label}>Last Name</label>
                                <input style={styles.input} type="text" name="lastname" value={registerData.lastname} onChange={handleRegisterChange} required />
                            </div>
                        </div>

                        <label style={styles.label}>Email</label>
                        <input style={styles.input} type="email" name="email" value={registerData.email} onChange={handleRegisterChange} required />

                        <label style={styles.label}>Contact Number</label>
                        <input style={styles.input} type="text" name="contact_number" value={registerData.contact_number} onChange={handleRegisterChange} required />

                        <label style={styles.label}>City</label>
                        <input style={styles.input} type="text" name="city" value={registerData.city} onChange={handleRegisterChange} required />
                        
                        <label style={styles.label}>Factor Type</label>
                        <input style={styles.input} type="text" name="factor_type" value={registerData.factor_type} onChange={handleRegisterChange} required />

                        <label style={styles.label}>Aadhar Card</label>
                        <input style={styles.input} type="text" name="Adar_Card" value={registerData.Adar_Card} onChange={handleRegisterChange} required />

                        <button 
                            style={{...styles.button, background: '#28a745', marginTop: '10px'}} 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? "SUBMITTING..." : "SUBMIT REGISTRATION"}
                        </button>
                        
                        {registerMessage && (
                            <p style={{...styles.error, color: registerMessage.startsWith('❌') ? 'red' : 'green'}}>
                                {registerMessage}
                            </p>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
}