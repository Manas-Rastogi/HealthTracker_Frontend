
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function HospitalResults() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const params = new URLSearchParams(location.search);
//   const name = params.get("name") || "";
//   const city = params.get("city") || "";
//   const token = localStorage.getItem("token");

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const payload = { hospitalName: name, city };
//         const res = await fetch("/serachHospital/search", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//           body: JSON.stringify(payload),
//         });

//         if (!res.ok) throw new Error("Backend error");

//         const json = await res.json();
//         setData(json.content || []);
//       } catch (e) {
//         setError("Failed to fetch Hospitals.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHospitals();
//   }, [name, city, token]);

//   return (
//     <div className="min-h-screen bg-[#020617] text-white p-8">
//       <button onClick={() => navigate(-1)} className="mb-4 p-2 bg-white/10 rounded">
//         ← Back
//       </button>

//       <h2 className="text-3xl font-bold mb-4">Hospital Results</h2>
//       <p className="mb-6 text-slate-300">Search: {name} | City: {city}</p>

//       {loading ? (
//         <div>Loading Hospitals...</div>
//       ) : error ? (
//         <div className="text-red-500">{error}</div>
//       ) : data.length === 0 ? (
//         <div>No Hospitals found.</div>
//       ) : (
//         <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {data.map((h, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.05 }}
//               className="p-6 bg-white/10 rounded-xl border border-white/10"
//             >
//               <h3 className="text-xl font-semibold">
//                 {h.hospitalName}
//               </h3>
//               <p className="text-slate-300">{h.city}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";

// // एडवांस UI के लिए स्टाइल (unchanged)
// const styles = {
//     // मुख्य कंटेनर स्टाइल: ग्रेडिएंट बैकग्राउंड और फुल-स्क्रीन कवरेज
//     container: {
//         padding: "60px 20px",
//         background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // गहरा नीला ग्रेडिएंट
//         minHeight: "100vh",
//         minWidth: "100vw",
//         margin: 0,
//         boxSizing: "border-box",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     },
//     heading: {
//         color: "white",
//         textAlign: "center",
//         marginBottom: "40px",
//         textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
//     },
//     // खोज बॉक्स स्टाइल
//     searchBox: {
//         background: "rgba(255, 255, 255, 0.95)",
//         padding: "30px",
//         borderRadius: "15px",
//         boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
//         maxWidth: "600px",
//         margin: "0 auto 40px", // केंद्र में
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
//         background: "#007bff", // नीला बटन
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
//     // हॉस्पिटल कार्ड कंटेनर
//     hospitalCardContainer: {
//         display: "flex",
//         flexWrap: "wrap",
//         justifyContent: "center",
//         gap: "25px",
//         marginTop: "20px",
//         padding: "0 20px"
//     },
//     // हॉस्पिटल कार्ड स्टाइल
//     hospitalCard: {
//         background: "white",
//         padding: "20px",
//         borderRadius: "12px",
//         width: "100%",
//         maxWidth: "380px", // थोड़ी चौड़ाई बढ़ाई
//         boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
//         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//         cursor: "default",
//     },
//     hospitalCardHover: {
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
//     // Register Button Style Removed as per request
// };

// export default function HospitalSearch() {
//     // आवश्यक स्टेट्स
//     const [hospitalName, setHospitalName] = useState("");
//     const [city, setCity] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [hospitals, setHospitals] = useState([]);
//     const [error, setError] = useState("");
//     const [hoveredCard, setHoveredCard] = useState(null); 
    
//     // रजिस्ट्रेशन से संबंधित स्टेट्स हटा दिए गए हैं।


//     // --- कोर सर्च लॉजिक (Dummy Data Removed) ---
//     const searchHospitals = async () => {
//         setLoading(true);
//         setError("");
//         setHospitals([]);

//         try {
//             const token = localStorage.getItem("token");

//             if (!token) {
//                 setError("❌ Token missing or user not logged in. Please log in.");
//                 setLoading(false);
//                 return;
//             }

//             const bodyData = {
//                 hospitalName: hospitalName || "",
//                 city: city || "",
//             };

//             const response = await fetch(
//                 "http://localhost:8080/healthtech/serachHospital/search",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: "Bearer " + token,
//                     },
//                     body: JSON.stringify(bodyData),
//                 }
//             );

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 if (response.status === 403) {
//                      setError("❌ Server Error: 403 Forbidden. Check token/permissions in backend.");
//                 } else {
//                      setError("❌ Server Error: " + response.status + " - " + errorText.substring(0, 100) + "...");
//                 }
//                 setLoading(false);
//                 return;
//             }

//             const data = await response.json();
            
//             // ✅ FIX: अब डमी डेटा नहीं दिखाएगा, सीधे API से मिली content दिखाएगा।
//             if (!data.content || data.content.length === 0) {
//                  setHospitals([]);
//                  setError("⚠ No Hospitals found matching the search criteria.");
//             } else {
//                  setHospitals(data.content || []);
//                  // यदि data.content है, तो error clear कर दें (अगर पहले से कोई warning थी)
//                  setError(""); 
//             }
//         } catch (err) {
//             console.error(err);
//             setError("❌ An unexpected network error occurred: " + err.message);
//         }

//         setLoading(false);
//     };

//     // --- रजिस्ट्रेशन से संबंधित फंक्शन्स हटा दिए गए हैं। ---

//     // --- ग्लोबल स्टाइल रीसेट (Unchanged) ---
//     useEffect(() => {
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


//     // --- कंपोनेंट JSX (UI Register elements removed) ---
//     return (
//         <div style={styles.container}>
//             <h1 style={styles.heading}>Search Hospitals 🏥</h1>

//             {/* खोज बॉक्स */}
//             <div style={styles.searchBox}>
//                 <label style={styles.label}>Hospital Name:</label>
//                 <input
//                     type="text"
//                     value={hospitalName}
//                     onChange={(e) => setHospitalName(e.target.value)}
//                     style={styles.input}
//                 />
//                 <label style={styles.label}>City:</label>
//                 <input
//                     type="text"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     style={styles.input}
//                 />
//                 <button
//                     onClick={searchHospitals}
//                     style={styles.button}
//                     onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
//                     onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
//                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//                     disabled={loading}
//                 >
//                     {loading ? "SEARCHING..." : "🔍 SEARCH HOSPITAL"}
//                 </button>
//                 {error && <p style={styles.error}>{error}</p>}
//                 {loading && <p style={styles.loading}>Searching for Hospitals...</p>}
//             </div>

//             {/* परिणाम */}
//             <h2 style={styles.resultsTitle}>Found Hospitals: ({hospitals.length})</h2>

//             {hospitals.length === 0 && !loading && !error ? (
//                 <p style={{ color: "rgba(255, 255, 255, 0.7)", textAlign: "center", marginTop: "20px" }}>
//                     No results yet. Enter criteria and click Search.
//                 </p>
//             ) : null}

//             <div style={styles.hospitalCardContainer}>
//                 {hospitals.map((hosp, index) => (
//                     <div
//                         key={hosp.id}
//                         style={
//                             hoveredCard === index
//                                 ? { ...styles.hospitalCard, ...styles.hospitalCardHover }
//                                 : styles.hospitalCard
//                         }
//                         onMouseEnter={() => setHoveredCard(index)}
//                         onMouseLeave={() => setHoveredCard(null)}
//                     >
//                         <h3 style={styles.cardTitle}>⭐ {hosp.hospitalName}</h3>
                        
//                         {/* 🚩 FIELDS */}
//                         {/* Note: ये फ़ील्ड्स सीधे API से आने वाले डेटा पर निर्भर करते हैं। 
//                            सुनिश्चित करें कि API रिस्पॉन्स में 'email', 'registration_number' आदि फ़ील्ड्स मौजूद हों। */}
//                         <p style={styles.cardText}>
//                             <strong>📧 Email:</strong> {hosp.email}
//                         </p>
//                         <p style={styles.cardText}>
//                             <strong>🆔 Reg. No:</strong> {hosp.registration_number}
//                         </p>
//                         <p style={styles.cardText}>
//                             <strong>🏥 Type:</strong> {hosp.type || hosp.hospital_type}
//                         </p>
//                         <p style={styles.cardText}>
//                             <strong>🩸 Factor Avail:</strong> {hosp.factor_available}
//                         </p>
//                         <p style={styles.cardText}>
//                             <strong>💼 Ownership:</strong> {hosp.ownership_type}
//                         </p>
//                         <p style={styles.cardText}>
//                             <strong>📍 City:</strong> {hosp.city}
//                         </p>
//                         <p style={styles.cardText}>
//                             <strong>🏠 Address:</strong> {hosp.address}
//                         </p>
//                         <p style={styles.cardText}>
//                             <strong>📞 Contact:</strong> {hosp.contactNumber}
//                         </p>
                        
//                         {/* ❌ रजिस्टर बटन हटा दिया गया है */}
//                     </div>
//                 ))}
//             </div>

//             {/* ❌ रजिस्ट्रेशन फॉर्म मोडल हटा दिया गया है */}
//         </div>
//     );
// }


//new add 

import React, { useState, useEffect } from "react";

// (Styles remain the same)
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
    hospitalCardContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "25px",
        marginTop: "20px",
        padding: "0 20px"
    },
    hospitalCard: {
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "380px", 
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
    },
    hospitalCardHover: {
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
};

export default function HospitalSearch() {
    const [hospitalName, setHospitalName] = useState("");
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [hospitals, setHospitals] = useState([]);
    const [error, setError] = useState("");
    const [hoveredCard, setHoveredCard] = useState(null);

    // ✅ UPDATED: API रिस्पॉन्स हैंडलिंग
    const handleApiResponse = (data) => {
        let results = [];
        
        // केस 1: PagedResponse (/search)
        if (data && data.content && Array.isArray(data.content)) {
            results = data.content;
        } 
        // केस 2: Wrapper object with "body" (Postman Data - /saerch/hospiatlcity)
        else if (data && data.body && Array.isArray(data.body)) {
            results = data.body; 
        } 
        // केस 3: सीधे List<Hospital> (यदि बैकएंड ने wrapper हटा दिया हो)
        else if (Array.isArray(data)) {
            results = data;
        }

        if (results.length === 0) {
            setHospitals([]);
            setError("⚠ No Hospitals found matching the search criteria.");
        } else {
            // यदि परिणाम मिलते हैं, तो error को साफ़ करें
            setHospitals(results);
            setError("");
        }
    };


    // --- कोर सर्च लॉजिक (Name & City) - No change needed here ---
    const searchHospitals = async () => {
        setLoading(true);
        setError("");
        setHospitals([]);

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("❌ Token missing or user not logged in. Please log in.");
                setLoading(false);
                return;
            }

            const bodyData = {
                hospitalName: hospitalName || "",
                city: city || "",
            };

            const response = await fetch(
                "https://healthtracker-5.onrender.com/healthtech/serachHospital/search",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify(bodyData),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `❌ Server Error: ${response.status} - ${errorText.substring(0, 100)}...`;
                if (response.status === 403) {
                    errorMessage = "❌ Server Error: 403 Forbidden. Check token/permissions in backend.";
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

    // --- सिटी बेस सर्च लॉजिक (Only City) ---
    const searchCityBaseHospitals = async () => {
        if (!city.trim()) {
            setError("City name is required for City Base Search.");
            return;
        }

        setLoading(true);
        setError("");
        setHospitals([]);

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("❌ Token missing or user not logged in. Please log in.");
                setLoading(false);
                return;
            }

            const url = `https://healthtracker-5.onrender.com/healthtech/serachHospital/saerch/hospiatlcity?City=${encodeURIComponent(city.trim())}`;

            const response = await fetch(url, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });

            // चूंकि आपका सर्वर 201 (CREATED) रिटर्न कर रहा है, हम 200-299 की रेंज में सभी सफल कोड को ओके मानेंगे।
            // response.ok (200-299) इसे सही ढंग से संभालता है, इसलिए यहां कोई बदलाव की जरूरत नहीं है।
            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `❌ Server Error: ${response.status}`;

                if (response.status === 400 && errorText.includes("City Not Exits")) {
                    errorMessage = "❌ City Not Exists or no hospitals found in this city.";
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
            
            // ✅ UPDATED: यह अपडेटेड handleApiResponse अब data.body से लिस्ट निकाल लेगा।
            handleApiResponse(data); 

        } catch (err) {
            console.error(err);
            setError("❌ An unexpected network error occurred: " + err.message);
        }

        setLoading(false);
    };


    // --- ग्लोबल स्टाइल रीसेट (Unchanged) ---
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


    // --- कंपोनेंट JSX (Unchanged) ---
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Search Hospitals 🏥</h1>

            {/* खोज बॉक्स */}
            <div style={styles.searchBox}>
                <label style={styles.label}>Hospital Name:</label>
                <input
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    style={styles.input}
                    placeholder="Optional: Enter full or partial hospital name"
                />
                <label style={styles.label}>City:</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={styles.input}
                    placeholder="Required: Enter city name"
                />

                {/* --- 🚩 दोनों बटनों के लिए कंटेनर --- */}
                <div style={styles.buttonContainer}>
                    <button
                        onClick={searchHospitals}
                        style={styles.button}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        disabled={loading}
                    >
                        {loading ? "SEARCHING..." : "🔍 SEARCH (Name & City)"}
                    </button>

                    <button
                        onClick={searchCityBaseHospitals}
                        style={styles.cityBaseButton}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        disabled={loading}
                    >
                        {loading ? "SEARCHING..." : "🌍 CITY BASE FIND (Only City)"}
                    </button>
                </div>
                {/* ------------------------------------- */}

                {error && <p style={styles.error}>{error}</p>}
                {loading && <p style={styles.loading}>Searching for Hospitals...</p>}
            </div>

            {/* परिणाम */}
            <h2 style={styles.resultsTitle}>Found Hospitals: ({hospitals.length})</h2>

            {hospitals.length === 0 && !loading && !error ? (
                <p style={{ color: "rgba(255, 255, 255, 0.7)", textAlign: "center", marginTop: "20px" }}>
                    No results yet. Enter criteria and click Search.
                </p>
            ) : null}

            <div style={styles.hospitalCardContainer}>
                {hospitals.map((hosp, index) => (
                    <div
                        key={hosp.id || index} 
                        style={
                            hoveredCard === index
                                ? { ...styles.hospitalCard, ...styles.hospitalCardHover }
                                : styles.hospitalCard
                        }
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <h3 style={styles.cardTitle}>⭐ {hosp.hospitalName}</h3>

                        {/* 🚩 FIELDS - आउटपुट फॉर्मेट */}
                        <p style={styles.cardText}>
                            <strong>📧 Email:</strong> {hosp.email}
                        </p>
                        <p style={styles.cardText}>
                            <strong>🆔 Reg. No:</strong> {hosp.registration_number}
                        </p>
                        <p style={styles.cardText}>
                            <strong>🏥 Type:</strong> {hosp.hospital_type || hosp.type} {/* hospital_type या type का उपयोग करें */}
                        </p>
                        <p style={styles.cardText}>
                            <strong>🩸 Factor Avail:</strong> {hosp.factor_available}
                        </p>
                        <p style={styles.cardText}>
                            <strong>💼 Ownership:</strong> {hosp.ownership_type}
                        </p>
                        <p style={styles.cardText}>
                            <strong>📍 City:</strong> {hosp.city}
                        </p>
                        <p style={styles.cardText}>
                            <strong>🏠 Address:</strong> {hosp.address}
                        </p>
                        <p style={styles.cardText}>
                            <strong>📞 Contact:</strong> {hosp.contactNumber}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}