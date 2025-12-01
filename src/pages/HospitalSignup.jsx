// src/pages/HospitalSignup.jsx
// import React, { useState } from "react";
// import client from "../api/axiosClient.js";
// import { useNavigate } from "react-router-dom";

// export default function HospitalSignup() {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });
//   const [msg, setMsg] = useState("");
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       await client.post("/hospital/hospital_registration", form);
//       setMsg("Hospital registered — please login.");
//       setTimeout(()=>nav("/hospital/login"),1200);
//     } catch (err) {
//       setMsg(err?.response?.data || "Error");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card" style={{maxWidth:480, margin:"20px auto"}}>
//         <h2>Hospital Signup</h2>
//         <form onSubmit={submit} style={{display:"grid", gap:10, marginTop:12}}>
//           <input name="username" onChange={(e)=>setForm({...form, username:e.target.value})} placeholder="Username" required />
//           <input name="email" onChange={(e)=>setForm({...form, email:e.target.value})} placeholder="Email" type="email" required />
//           <input name="password" onChange={(e)=>setForm({...form, password:e.target.value})} placeholder="Password" type="password" required />
//           <button className="nav-btn" type="submit">Register Hospital</button>
//         </form>
//         <p className="small-muted" style={{marginTop:10}}>{msg}</p>
//       </div>
//     </div>
//   );
// }





// import React, { useState, useEffect } from "react";

// // 🎨 एडवांस और रंगीन स्टाइल
// const styles = {
//   container: {
//     // 🚩 FIX 1: Ensure full viewport height and width
//     minHeight: "100vh", 
//     width: "100vw", // 💡 Full viewport width सुनिश्चित करता है
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "linear-gradient(135deg, #4c669f 0%, #1e3c72 100%)", // गहरा नीला/बैंगनी ग्रेडिएंट
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     position: "relative",
//     // 💡 हॉरिजॉन्टल स्क्रॉलबार्स को हटाता है
//     overflow: "hidden", 
//     // बॉक्स साइज़िंग को बॉर्डर-बॉक्स में सेट करना हमेशा एक अच्छा अभ्यास है
//     boxSizing: "border-box", 
//   },
//   glassCard: {
//     background: "rgba(255, 255, 255, 0.15)",
//     padding: "40px",
//     borderRadius: "20px",
//     boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
//     backdropFilter: "blur(10px)",
//     WebkitBackdropFilter: "blur(10px)",
//     border: "1px solid rgba(255, 255, 255, 0.18)",
//     maxWidth: "450px",
//     width: "90%",
//     zIndex: 10,
//     transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
//     boxSizing: "border-box", 
//   },
//   header: {
//     textAlign: "center",
//     color: "white",
//     marginBottom: "30px",
//     fontSize: "24px",
//     fontWeight: "700",
//     textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
//   },
//   input: {
//     width: "100%",
//     padding: "12px 15px",
//     marginBottom: "15px",
//     border: "none",
//     borderRadius: "8px",
//     background: "rgba(255, 255, 255, 0.9)",
//     color: "#333",
//     fontSize: "16px",
//     boxSizing: "border-box",
//     transition: "background 0.3s, box-shadow 0.3s",
//   },
//   button: {
//     width: "100%",
//     padding: "15px",
//     marginTop: "20px",
//     border: "none",
//     borderRadius: "8px",
//     background: "#00cc99", // चमकीला हरा
//     color: "white",
//     fontSize: "18px",
//     fontWeight: "bold",
//     cursor: "pointer",
//     transition: "background 0.3s ease, transform 0.1s ease",
//     boxShadow: "0 4px 10px rgba(0, 204, 153, 0.4)",
//   },
//   switchText: {
//     textAlign: "center",
//     marginTop: "20px",
//     color: "rgba(255, 255, 255, 0.8)",
//   },
//   switchButton: {
//     background: "none",
//     border: "none",
//     color: "#ffc107", // चमकीला पीला
//     cursor: "pointer",
//     fontWeight: "bold",
//     textDecoration: "underline",
//     marginLeft: "5px",
//   },
//   message: (type) => ({
//     padding: "10px",
//     borderRadius: "8px",
//     marginTop: "15px",
//     textAlign: "center",
//     color: type === 'error' ? '#ff4d4d' : '#00cc99',
//     background: type === 'error' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(0, 204, 153, 0.1)',
//     fontWeight: "600",
//     border: `1px solid ${type === 'error' ? '#ff4d4d' : '#00cc99'}`,
//   }),
// };

// // 🏥 Hospital Signup Fields
// const signupFields = [
//   "username", "password", "email", "hospitalName", "registration_number",
//   "hospital_type", "factor_available", "ownership_type", "address", "city"
// ];

// export default function HospitalAuthContainer() {
//   const [isLogin, setIsLogin] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });

//   // --- Utility Functions ---

//   const handleSwitch = () => {
//     setIsLogin(!isLogin);
//     setFormData({});
//     setMessage({ text: "", type: "" });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleResponse = async (response, successMsg, redirect = false) => {
//     setLoading(false);
//     if (response.ok) {
//       const result = await response.text();
//       setMessage({ text: successMsg + (isLogin ? "" : " Now log in!"), type: "success" });
//       setFormData({});
//       
//       if (redirect) {
//         setTimeout(() => {
//           setIsLogin(true);
//           setMessage({ text: "Registration successful! Please log in.", type: "success" });
//         }, 1500);
//       } else if (isLogin) {
//         localStorage.setItem("token", result); 
//         setMessage({ text: "Login Successful! Redirecting...", type: "success" });
//         console.log("JWT Token:", result);
//         // यहाँ आप मुख्य डैशबोर्ड पर रीडायरेक्ट कर सकते हैं
//       }
//     } else {
//       const errorText = await response.text();
//       setMessage({ text: `❌ Failed: ${errorText.substring(0, 150)}`, type: "error" });
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ text: "", type: "" });

//     const missing = signupFields.find(field => !formData[field]);
//     if (missing) {
//       setLoading(false);
//       return setMessage({ text: `❌ Please fill in the ${missing} field.`, type: "error" });
//     }

//     try {
//       const response = await fetch("http://localhost:8080/healthtech/hospital/hospital_registration", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       await handleResponse(response, "Registration successful!", true);
//     } catch (err) {
//       setLoading(false);
//       console.error("Signup error:", err);
//       setMessage({ text: "❌ Network error. Check server status.", type: "error" });
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ text: "", type: "" });

//     const loginData = {
//       username: formData.username,
//       password: formData.password
//     };
//     
//     if (!loginData.username || !loginData.password) {
//       setLoading(false);
//       return setMessage({ text: "❌ Please enter both username and password.", type: "error" });
//     }

//     try {
//       const response = await fetch("http://localhost:8080/healthtech/hospital/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginData),
//       });
//       await handleResponse(response, "Login successful!");
//     } catch (err) {
//       setLoading(false);
//       console.error("Login error:", err);
//       setMessage({ text: "❌ Network error. Check server status.", type: "error" });
//     }
//   };

//   // --- 🚩 FIX 2: Global Style Reset (यह सबसे महत्वपूर्ण फ़िक्स है) ---
//   useEffect(() => {
//     // महत्वपूर्ण: HTML और BODY दोनों को 100% ऊँचाई और चौड़ाई दें
//     document.documentElement.style.height = '100%';
//     document.documentElement.style.width = '100%';
//     document.body.style.height = '100%';
//     document.body.style.width = '100%';

//     // सबसे महत्वपूर्ण: डिफ़ॉल्ट मार्जिन और पैडिंग को हटाएँ
//     document.body.style.margin = '0';
//     document.body.style.padding = '0';
//     
//     // हॉरिजॉन्टल स्क्रॉलिंग को पूरी तरह से रोकें, जो कटने का कारण बनती है
//     document.documentElement.style.overflowX = 'hidden';

//     // अगर आप Vite/CRA का उपयोग कर रहे हैं और आपका रूट #root है:
//     const root = document.getElementById('root');
//     if (root) {
//         root.style.height = '100%';
//         root.style.width = '100%';
//         root.style.margin = '0';
//         root.style.padding = '0';
//     }

//     return () => {
//         // Cleanup: कंपोनेंट अनमाउंट होने पर स्टाइल रीसेट करें
//         document.documentElement.style.height = '';
//         document.documentElement.style.width = '';
//         document.body.style.height = '';
//         document.body.style.width = '';
//         document.body.style.margin = '';
//         document.body.style.padding = '';
//         document.documentElement.style.overflowX = '';
//         if (root) {
//             root.style.height = '';
//             root.style.width = '';
//             root.style.margin = '';
//             root.style.padding = '';
//         }
//     };
//   }, []);

//   // --- Component Render ---
//   const cardStyle = {
//     ...styles.glassCard,
//     transform: loading ? 'scale(1.02)' : 'scale(1)',
//     opacity: loading ? 0.8 : 1,
//   };

//   return (
//     <div style={styles.container}>
//       {/* 🔴 Background Animation Dots (Optional) */}
//       <style>{`
//         @keyframes float {
//           0% { transform: translate(0, 0); }
//           50% { transform: translate(20px, -20px); }
//           100% { transform: translate(0, 0); }
//         }
//       `}</style>
//       
//       {/* इन डॉट्स का overflow अब container के overflow: hidden द्वारा संभाला जाएगा */}
//       <div style={{ position: 'absolute', top: '10%', left: '10%', width: '100px', height: '100px', background: 'radial-gradient(circle, #ffc107 10%, transparent 80%)', borderRadius: '50%', animation: 'float 10s infinite ease-in-out' }}></div>
//       <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: '150px', height: '150px', background: 'radial-gradient(circle, #00cc99 10%, transparent 80%)', borderRadius: '50%', animation: 'float 12s infinite reverse ease-in-out' }}></div>
//       
//       {/* 💳 Glass Card */}
//       <div style={cardStyle}>
//         <h2 style={styles.header}>
//           {isLogin ? "🏥 Hospital Login" : "📝 Hospital Registration"}
//         </h2>

//         <form onSubmit={isLogin ? handleLogin : handleSignup}>
//           
//           {/* Login Fields */}
//           <input
//             style={styles.input}
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username || ""}
//             onChange={handleChange}
//             required
//             disabled={loading}
//           />
//           <input
//             style={styles.input}
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password || ""}
//             onChange={handleChange}
//             required
//             disabled={loading}
//           />

//           {/* Additional Signup Fields */}
//           {!isLogin && signupFields.slice(2).map(field => (
//             <input
//               key={field}
//               style={styles.input}
//               type={field === 'email' ? 'email' : 'text'}
//               name={field}
//               placeholder={field.replace(/([A-Z])/g, ' $1').replace('_', ' ').toUpperCase()}
//               value={formData[field] || ""}
//               onChange={handleChange}
//               required
//               disabled={loading}
//             />
//           ))}

//           {/* 🟢 Action Button */}
//           <button
//             type="submit"
//             style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
//             disabled={loading}
//           >
//             {loading 
//               ? (isLogin ? "LOGGING IN..." : "REGISTERING...")
//               : (isLogin ? "🔓 LOG IN" : "✅ SIGN UP")
//             }
//           </button>
//         </form>

//         {/* 💬 Message Display */}
//         {message.text && (
//           <p style={styles.message(message.type)}>{message.text}</p>
//         )}

//         {/* 🔄 Switch Link */}
//         <p style={styles.switchText}>
//           {isLogin ? "Don't have an account?" : "Already registered?"}
//           <button style={styles.switchButton} onClick={handleSwitch} disabled={loading}>
//             {isLogin ? "Sign Up" : "Log In"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }


//34

// import React, { useState, useEffect } from "react";

// // 🎨 Advanced Medical Theme Styles
// const styles = {
//   container: {
//     minHeight: "100vh", 
//     width: "100vw",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3d 50%, #2d1b69 100%)",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     position: "relative",
//     overflow: "hidden", 
//     boxSizing: "border-box", 
//   },
//   glassCard: {
//     background: "rgba(255, 255, 255, 0.12)",
//     padding: "40px",
//     borderRadius: "24px",
//     boxShadow: "0 25px 45px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
//     backdropFilter: "blur(20px)",
//     WebkitBackdropFilter: "blur(20px)",
//     border: "1px solid rgba(255, 255, 255, 0.2)",
//     maxWidth: "450px",
//     width: "90%",
//     zIndex: 20,
//     transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
//     boxSizing: "border-box",
//   },
//   header: {
//     textAlign: "center",
//     color: "white",
//     marginBottom: "30px",
//     fontSize: "24px",
//     fontWeight: "700",
//     textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
//   },
//   input: {
//     width: "100%",
//     padding: "12px 15px",
//     marginBottom: "15px",
//     border: "none",
//     borderRadius: "8px",
//     background: "rgba(255, 255, 255, 0.9)",
//     color: "#333",
//     fontSize: "16px",
//     boxSizing: "border-box",
//     transition: "background 0.3s, box-shadow 0.3s",
//   },
//   button: {
//     width: "100%",
//     padding: "15px",
//     marginTop: "20px",
//     border: "none",
//     borderRadius: "8px",
//     background: "#00cc99",
//     color: "white",
//     fontSize: "18px",
//     fontWeight: "bold",
//     cursor: "pointer",
//     transition: "background 0.3s ease, transform 0.1s ease",
//     boxShadow: "0 4px 10px rgba(0, 204, 153, 0.4)",
//   },
//   switchText: {
//     textAlign: "center",
//     marginTop: "20px",
//     color: "rgba(255, 255, 255, 0.8)",
//   },
//   switchButton: {
//     background: "none",
//     border: "none",
//     color: "#ffc107",
//     cursor: "pointer",
//     fontWeight: "bold",
//     textDecoration: "underline",
//     marginLeft: "5px",
//   },
//   message: (type) => ({
//     padding: "10px",
//     borderRadius: "8px",
//     marginTop: "15px",
//     textAlign: "center",
//     color: type === 'error' ? '#ff4d4d' : '#00cc99',
//     background: type === 'error' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(0, 204, 153, 0.1)',
//     fontWeight: "600",
//     border: `1px solid ${type === 'error' ? '#ff4d4d' : '#00cc99'}`,
//   }),
// };

// // 🏥 Hospital Signup Fields
// const signupFields = [
//   "username", "password", "email", "hospitalName", "registration_number",
//   "hospital_type", "factor_available", "ownership_type", "address", "city"
// ];

// // 🏥 16 Enhanced 3D Medical Animated Elements
// const medicalElements = [
//   // ❤️ Hearts (1-2)
//   { id: 1, type: 'heart', color: '#ff4757', size: '90px', top: '15%', left: '75%', duration: '6s', delay: '0s' },
//   { id: 2, type: 'heart', color: '#ff6b7a', size: '60px', top: '65%', left: '20%', duration: '8s', delay: '1s' },
  
//   // 🫁 Lungs (3-4)
//   { id: 3, type: 'lungs', color: '#74b9ff', size: '140px', top: '45%', left: '25%', duration: '12s', delay: '2s' },
//   { id: 4, type: 'lungs', color: '#0984e3', size: '110px', top: '35%', left: '80%', duration: '14s', delay: '3s' },
  
//   // 🥚 Kidneys (5-6)
//   { id: 5, type: 'kidney', color: '#00b894', size: '80px', top: '70%', left: '85%', duration: '10s', delay: '4s' },
//   { id: 6, type: 'kidney', color: '#55a3ff', size: '70px', top: '25%', left: '10%', duration: '11s', delay: '5s' },
  
//   // 🦴 Bones (7-8)
//   { id: 7, type: 'bone', color: '#f1c40f', size: '120px', top: '80%', left: '15%', duration: '16s', delay: '6s' },
//   { id: 8, type: 'bone', color: '#f39c12', size: '100px', top: '20%', left: '65%', duration: '18s', delay: '7s' },
  
//   // 🧬 Liver (9-10)
//   { id: 9, type: 'liver', color: '#fdcb6e', size: '130px', top: '10%', left: '40%', duration: '13s', delay: '8s' },
//   { id: 10, type: 'liver', color: '#e17055', size: '100px', top: '55%', left: '5%', duration: '15s', delay: '9s' },
  
//   // 🩸 Blood Cells (11-12)
//   { id: 11, type: 'blood', color: '#d63031', size: '50px', top: '85%', left: '70%', duration: '9s', delay: '10s' },
//   { id: 12, type: 'blood', color: '#e84393', size: '40px', top: '5%', left: '90%', duration: '7s', delay: '11s' },
  
//   // 🏥 Hospital (13-14)
//   { id: 13, type: 'hospital', color: '#00b894', size: '80px', top: '40%', left: '90%', duration: '11s', delay: '12s' },
//   { id: 14, type: 'hospital', color: '#00cec9', size: '70px', top: '75%', left: '45%', duration: '13s', delay: '13s' },
  
//   // 💊 DNA/Medical (15-16)
//   { id: 15, type: 'dna', color: '#a29bfe', size: '60px', top: '30%', left: '15%', duration: '20s', delay: '14s' },
//   { id: 16, type: 'dna', color: '#fd79a8', size: '50px', top: '90%', left: '30%', duration: '17s', delay: '15s' },
// ];

// export default function HospitalAuthContainer() {
//   const [isLogin, setIsLogin] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });

//   // 🔄 Switch between Login/Signup
//   const handleSwitch = () => {
//     setIsLogin(!isLogin);
//     setFormData({});
//     setMessage({ text: "", type: "" });
//   };

//   // 📝 Form Input Handler
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 📨 Response Handler
//   const handleResponse = async (response, successMsg, redirect = false) => {
//     setLoading(false);
//     if (response.ok) {
//       const result = await response.text();
//       setMessage({ text: successMsg + (isLogin ? "" : " Now log in!"), type: "success" });
//       setFormData({});
      
//       if (redirect) {
//         setTimeout(() => {
//           setIsLogin(true);
//           setMessage({ text: "Registration successful! Please log in.", type: "success" });
//         }, 1500);
//       } else if (isLogin) {
//         localStorage.setItem("token", result); 
//         setMessage({ text: "Login Successful! Redirecting...", type: "success" });
//         console.log("JWT Token:", result);
//       }
//     } else {
//       const errorText = await response.text();
//       setMessage({ text: `❌ Failed: ${errorText.substring(0, 150)}`, type: "error" });
//     }
//   };

//   // ✅ Signup Handler
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ text: "", type: "" });

//     const missing = signupFields.find(field => !formData[field]);
//     if (missing) {
//       setLoading(false);
//       return setMessage({ text: `❌ Please fill in the ${missing} field.`, type: "error" });
//     }

//     try {
//       const response = await fetch("http://localhost:8080/healthtech/hospital/hospital_registration", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       await handleResponse(response, "Registration successful!", true);
//     } catch (err) {
//       setLoading(false);
//       console.error("Signup error:", err);
//       setMessage({ text: "❌ Network error. Check server status.", type: "error" });
//     }
//   };

//   // 🔐 Login Handler
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ text: "", type: "" });

//     const loginData = {
//       username: formData.username,
//       password: formData.password
//     };
    
//     if (!loginData.username || !loginData.password) {
//       setLoading(false);
//       return setMessage({ text: "❌ Please enter both username and password.", type: "error" });
//     }

//     try {
//       const response = await fetch("http://localhost:8080/healthtech/hospital/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginData),
//       });
//       await handleResponse(response, "Login successful!");
//     } catch (err) {
//       setLoading(false);
//       console.error("Login error:", err);
//       setMessage({ text: "❌ Network error. Check server status.", type: "error" });
//     }
//   };

//   // 🌐 Global Style Reset
//   useEffect(() => {
//     document.documentElement.style.height = '100%';
//     document.documentElement.style.width = '100%';
//     document.body.style.height = '100%';
//     document.body.style.width = '100%';
//     document.body.style.margin = '0';
//     document.body.style.padding = '0';
//     document.documentElement.style.overflowX = 'hidden';

//     const root = document.getElementById('root');
//     if (root) {
//       root.style.height = '100%';
//       root.style.width = '100%';
//       root.style.margin = '0';
//       root.style.padding = '0';
//     }

//     return () => {
//       document.documentElement.style.height = '';
//       document.documentElement.style.width = '';
//       document.body.style.height = '';
//       document.body.style.width = '';
//       document.body.style.margin = '';
//       document.body.style.padding = '';
//       document.documentElement.style.overflowX = '';
//       if (root) {
//         root.style.height = '';
//         root.style.width = '';
//         root.style.margin = '';
//         root.style.padding = '';
//       }
//     };
//   }, []);

//   const cardStyle = {
//     ...styles.glassCard,
//     transform: loading ? 'scale(1.02)' : 'scale(1)',
//     opacity: loading ? 0.9 : 1,
//   };

//   return (
//     <div style={styles.container}>
//       {/* 🚀 3D MEDICAL ANIMATIONS - 16 ELEMENTS */}
//       <style>{`
//         @keyframes medicalFloat {
//           0%, 100% { 
//             transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); 
//             opacity: 0.6;
//           }
//           25% { 
//             transform: translateY(-20px) translateX(15px) rotate(5deg) scale(1.1); 
//             opacity: 0.9;
//           }
//           50% { 
//             transform: translateY(-10px) translateX(-10px) rotate(-3deg) scale(0.95); 
//             opacity: 0.7;
//           }
//           75% { 
//             transform: translateY(15px) translateX(20px) rotate(8deg) scale(1.05); 
//             opacity: 0.8;
//           }
//         }

//         @keyframes heartPulse {
//           0%, 100% { transform: scale(1); }
//           14% { transform: scale(1.3); }
//           28% { transform: scale(1.5); }
//           42% { transform: scale(1.3); }
//           70% { transform: scale(1.25); }
//         }

//         @keyframes breathing {
//           0%, 100% { transform: scaleX(1) scaleY(1); }
//           50% { transform: scaleX(1.15) scaleY(1.05); }
//         }

//         @keyframes filterWave {
//           0%, 100% { border-radius: 50% 40% 60% 30% / 50% 50% 40% 60%; }
//           50% { border-radius: 40% 60% 30% 50% / 60% 40% 50% 60%; }
//         }

//         @keyframes boneRotate {
//           0%, 100% { transform: rotate(0deg); }
//           50% { transform: rotate(180deg); }
//         }

//         @keyframes liverWave {
//           0%, 100% { clip-path: polygon(0% 45%, 100% 25%, 100% 75%, 0% 55%); }
//           50% { clip-path: polygon(0% 35%, 100% 15%, 100% 85%, 0% 65%); }
//         }

//         @keyframes bloodFlow {
//           0% { transform: translateX(-100px) scale(0.8); opacity: 0; }
//           20% { opacity: 1; }
//           80% { opacity: 1; }
//           100% { transform: translateX(100px) scale(1.2); opacity: 0; }
//         }

//         @keyframes techPulse {
//           0%, 100% { box-shadow: 0 0 20px currentColor; }
//           50% { box-shadow: 0 0 40px currentColor, 0 0 60px currentColor; }
//         }

//         @keyframes dnaSpiral {
//           0% { transform: rotate(0deg) scale(1); }
//           100% { transform: rotate(360deg) scale(1); }
//         }

//         .medical-element {
//           position: absolute;
//           animation: medicalFloat infinite ease-in-out;
//           filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
//           z-index: 1;
//         }

//         .heart { 
//           background: radial-gradient(circle at 30% 30%, #ff4757 20%, transparent 50%), 
//                       radial-gradient(circle at 70% 70%, #ff6b81 20%, transparent 50%);
//           clip-path: polygon(50% 0%, 61% 35%, 95% 35%, 78% 60%, 100% 100%, 45% 85%, 0% 100%, 23% 60%, 6% 35%, 38% 35%);
//           animation: heartPulse 1s infinite, medicalFloat infinite ease-in-out;
//         }

//         .lungs { 
//           background: linear-gradient(45deg, #74b9ff 0%, #0984e3 50%, #6c5ce7 100%);
//           border-radius: 45% 55% 40% 60% / 50% 40% 60% 50%;
//           animation: breathing 3s infinite ease-in-out, medicalFloat infinite ease-in-out;
//         }

//         .kidney { 
//           background: radial-gradient(ellipse, #00b894 30%, #00a085 70%);
//           border-radius: 50% 40% 60% 30% / 60% 50% 40% 60%;
//           animation: filterWave 2s infinite, medicalFloat infinite ease-in-out;
//         }

//         .bone { 
//           background: linear-gradient(135deg, #f1c40f, #f39c12, #e67e22);
//           border-radius: 20% 80% 30% 70% / 40% 60% 50% 80%;
//           animation: boneRotate 4s infinite linear, medicalFloat infinite ease-in-out;
//         }

//         .liver { 
//           background: radial-gradient(ellipse, #fdcb6e 20%, #e17055 60%, #d63031 90%);
//           clip-path: polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
//           animation: liverWave 2.5s infinite ease-in-out, medicalFloat infinite ease-in-out;
//         }

//         .blood { 
//           background: radial-gradient(circle, #d63031 25%, #e84393 70%);
//           border-radius: 50%;
//           animation: bloodFlow linear infinite, medicalFloat infinite ease-in-out;
//         }

//         .hospital {
//           background: conic-gradient(from 0deg, #00b894, #00cec9, #55a630, #00b894);
//           border-radius: 20px;
//           animation: techPulse 2s infinite ease-in-out, medicalFloat infinite ease-in-out;
//           clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
//         }

//         .dna { 
//           background: linear-gradient(45deg, #a29bfe, #fd79a8, #fdcb6e);
//           border-radius: 50% 20% 50% 20% / 30% 50% 30% 50%;
//           animation: dnaSpiral 3s infinite linear, medicalFloat infinite ease-in-out;
//         }
//       `}</style>

//       {/* 🌌 16 ANIMATED MEDICAL ELEMENTS */}
//       {medicalElements.map((element) => (
//         <div
//           key={element.id}
//           className={`medical-element ${element.type}`}
//           style={{
//             top: element.top,
//             left: element.left,
//             width: element.size,
//             height: element.size,
//             animationDuration: `${element.duration}`,
//             animationDelay: element.delay,
//           }}
//         />
//       ))}

//       {/* 💎 Glass Card */}
//       <div style={cardStyle}>
//         <h2 style={styles.header}>
//           {isLogin ? "🏥 Hospital Login" : "📝 Hospital Registration"}
//         </h2>

//         <form onSubmit={isLogin ? handleLogin : handleSignup}>
//           {/* Login Fields */}
//           <input
//             style={styles.input}
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username || ""}
//             onChange={handleChange}
//             required
//             disabled={loading}
//           />
//           <input
//             style={styles.input}
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password || ""}
//             onChange={handleChange}
//             required
//             disabled={loading}
//           />

//           {/* Additional Signup Fields */}
//           {!isLogin && signupFields.slice(2).map(field => (
//             <input
//               key={field}
//               style={styles.input}
//               type={field === 'email' ? 'email' : 'text'}
//               name={field}
//               placeholder={field.replace(/([A-Z])/g, ' $1').replace('_', ' ').toUpperCase()}
//               value={formData[field] || ""}
//               onChange={handleChange}
//               required
//               disabled={loading}
//             />
//           ))}

//           {/* 🟢 Action Button */}
//           <button
//             type="submit"
//             style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
//             disabled={loading}
//           >
//             {loading 
//               ? (isLogin ? "🔄 LOGGING IN..." : "📝 REGISTERING...")
//               : (isLogin ? "🔓 LOGIN" : "✅ SIGN UP")
//             }
//           </button>
//         </form>

//         {/* 💬 Message Display */}
//         {message.text && (
//           <p style={styles.message(message.type)}>{message.text}</p>
//         )}

//         {/* 🔄 Switch Link */}
//         <p style={styles.switchText}>
//           {isLogin ? "👤 Don't have an account?" : "✅ Already registered?"}
//           <button style={styles.switchButton} onClick={handleSwitch} disabled={loading}>
//             {isLogin ? "Sign Up" : "Log In"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // 🎨 Advanced Medical Theme Styles
// const styles = {
//     // ⭐ FIX: Container 
//     container: {
//         minHeight: "100vh",
//         width: "100vw",
//         display: "flex",
//         flexDirection: "column", // Ensure content stacks if needed, but centering still works
//         alignItems: "center", // लंबवत (Vertical) केंद्र
//         justifyContent: "center", // क्षैतिज (Horizontal) केंद्र
//         background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3d 50%, #2d1b69 100%)",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         position: "relative",
//         overflow: "hidden", 
//         boxSizing: "border-box",
//         padding: "20px", // Add padding for small screens
//     },
//     glassCard: {
//         background: "rgba(255, 255, 255, 0.12)",
//         padding: "40px",
//         borderRadius: "24px",
//         boxShadow: "0 25px 45px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
//         backdropFilter: "blur(20px)",
//         WebkitBackdropFilter: "blur(20px)",
//         border: "1px solid rgba(255, 255, 255, 0.2)",
//         maxWidth: "450px",
//         width: "100%", // Ensures it takes full width up to maxWidth on small screens
//         zIndex: 20,
//         transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
//         boxSizing: "border-box",
//     },
//     header: {
//         // ⭐ FIX CONFIRMED: यह पहले से ही Center में है
//         textAlign: "center", 
//         color: "white",
//         marginBottom: "30px",
//         fontSize: "28px", // Slightly increased font size
//         fontWeight: "700",
//         textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
//     },
//     input: {
//         width: "100%",
//         padding: "12px 15px",
//         marginBottom: "15px",
//         border: "none",
//         borderRadius: "8px",
//         background: "rgba(255, 255, 255, 0.9)",
//         color: "#333",
//         fontSize: "16px",
//         boxSizing: "border-box",
//         transition: "background 0.3s, box-shadow 0.3s",
//     },
//     button: {
//         width: "100%",
//         padding: "15px",
//         marginTop: "20px",
//         border: "none",
//         borderRadius: "8px",
//         background: "#00cc99",
//         color: "white",
//         fontSize: "18px",
//         fontWeight: "bold",
//         cursor: "pointer",
//         transition: "background 0.3s ease, transform 0.1s ease",
//         boxShadow: "0 4px 10px rgba(0, 204, 153, 0.4)",
//     },
//     switchText: {
//         textAlign: "center",
//         marginTop: "20px",
//         color: "rgba(255, 255, 255, 0.8)",
//     },
//     switchButton: {
//         background: "none",
//         border: "none",
//         color: "#ffc107",
//         cursor: "pointer",
//         fontWeight: "bold",
//         textDecoration: "underline",
//         marginLeft: "5px",
//     },
//     message: (type) => ({
//         padding: "10px",
//         borderRadius: "8px",
//         marginTop: "15px",
//         textAlign: "center",
//         color: type === 'error' ? '#ff4d4d' : '#00cc99',
//         background: type === 'error' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(0, 204, 153, 0.1)',
//         fontWeight: "600",
//         border: `1px solid ${type === 'error' ? '#ff4d4d' : '#00cc99'}`,
//     }),
// };

// // 🏥 Hospital Signup Fields
// const signupFields = [
//     "username", "password", "email", "hospitalName", "registration_number",
//     "hospital_type", "factor_available", "ownership_type", "address", "city"
// ];

// // 🏥 16 Enhanced 3D Medical Animated Elements (Unchanged)
// const medicalElements = [
//     // ... (Your medicalElements array is lengthy, keeping it collapsed for brevity)
//     { id: 1, type: 'heart', color: '#ff4757', size: '90px', top: '15%', left: '75%', duration: '6s', delay: '0s' },
//     { id: 2, type: 'heart', color: '#ff6b7a', size: '60px', top: '65%', left: '20%', duration: '8s', delay: '1s' },
//     { id: 3, type: 'lungs', color: '#74b9ff', size: '140px', top: '45%', left: '25%', duration: '12s', delay: '2s' },
//     { id: 4, type: 'lungs', color: '#0984e3', size: '110px', top: '35%', left: '80%', duration: '14s', delay: '3s' },
//     { id: 5, type: 'kidney', color: '#00b894', size: '80px', top: '70%', left: '85%', duration: '10s', delay: '4s' },
//     { id: 6, type: 'kidney', color: '#55a3ff', size: '70px', top: '25%', left: '10%', duration: '11s', delay: '5s' },
//     { id: 7, type: 'bone', color: '#f1c40f', size: '120px', top: '80%', left: '15%', duration: '16s', delay: '6s' },
//     { id: 8, type: 'bone', color: '#f39c12', size: '100px', top: '20%', left: '65%', duration: '18s', delay: '7s' },
//     { id: 9, type: 'liver', color: '#fdcb6e', size: '130px', top: '10%', left: '40%', duration: '13s', delay: '8s' },
//     { id: 10, type: 'liver', color: '#e17055', size: '100px', top: '55%', left: '5%', duration: '15s', delay: '9s' },
//     { id: 11, type: 'blood', color: '#d63031', size: '50px', top: '85%', left: '70%', duration: '9s', delay: '10s' },
//     { id: 12, type: 'blood', color: '#e84393', size: '40px', top: '5%', left: '90%', duration: '7s', delay: '11s' },
//     { id: 13, type: 'hospital', color: '#00b894', size: '80px', top: '40%', left: '90%', duration: '11s', delay: '12s' },
//     { id: 14, type: 'hospital', color: '#00cec9', size: '70px', top: '75%', left: '45%', duration: '13s', delay: '13s' },
//     { id: 15, type: 'dna', color: '#a29bfe', size: '60px', top: '30%', left: '15%', duration: '20s', delay: '14s' },
//     { id: 16, type: 'dna', color: '#fd79a8', size: '50px', top: '90%', left: '30%', duration: '17s', delay: '15s' },
// ];


// export default function HospitalAuthContainer() {
//     const [isLogin, setIsLogin] = useState(true); // Changed default to true for typical flow
//     const [formData, setFormData] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState({ text: "", type: "" });
//     const navigate = useNavigate();

//     // 🔄 Switch between Login/Signup
//     const handleSwitch = () => {
//         setIsLogin(!isLogin);
//         setFormData({});
//         setMessage({ text: "", type: "" });
//     };

//     // 📝 Form Input Handler
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // 📨 Response Handler
//     const handleResponse = async (response, successMsg) => {
//         setLoading(false);
//         if (response.ok) {
//             const result = await response.text();
            
//             if (!isLogin) {
//                 // Successful Registration: Switch to Login
//                 setMessage({ text: successMsg + " Now log in!", type: "success" });
//                 setFormData({});
                
//                 setTimeout(() => {
//                     setIsLogin(true);
//                     setMessage({ text: "Registration successful! Please log in.", type: "success" });
//                 }, 1500);
//             } else {
//                 // Successful Login
//                 localStorage.setItem("token", result); 
//                 setMessage({ text: "Login Successful! Redirecting to Dashboard...", type: "success" });
//                 console.log("JWT Token:", result);

//                 // ⭐ REDIRECT TO DASHBOARD ROUTE
//                 setTimeout(() => {
//                     navigate("/hospital-dashboard"); // App.jsx में सेट किया गया रूट
//                 }, 500);
//             }
//         } else {
//             const errorText = await response.text();
//             let displayError = errorText.substring(0, 150);
//             try {
//                 const errorJson = JSON.parse(errorText);
//                 if (errorJson.message) {
//                     displayError = errorJson.message;
//                 }
//             } catch (e) {
//                 // Not a JSON error
//             }
//             setMessage({ text: `❌ Failed: ${displayError}`, type: "error" });
//         }
//     };

//     // ✅ Signup Handler
//     const handleSignup = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage({ text: "", type: "" });

//         const missing = signupFields.find(field => !formData[field]);
//         if (missing && missing !== 'factor_available') { // factor_available is optional for payload default
//             setLoading(false);
//             return setMessage({ text: `❌ Please fill in the ${missing.replace(/([A-Z])/g, ' $1').replace('_', ' ')} field.`, type: "error" });
//         }

//         try {
//             // factor_available के लिए default value सेट करें यदि वह खाली हो
//             const payload = {
//                 ...formData,
//                 factor_available: formData.factor_available || "NO"
//             }

//             const response = await fetch("http://localhost:8080/healthtech/hospital/hospital_registration", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload),
//             });
//             await handleResponse(response, "Registration successful!");
//         } catch (err) {
//             setLoading(false);
//             console.error("Signup error:", err);
//             setMessage({ text: "❌ Network error. Check server status (http://localhost:8080).", type: "error" });
//         }
//     };

//     // 🔐 Login Handler
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage({ text: "", type: "" });

//         const loginData = {
//             username: formData.username,
//             password: formData.password
//         };
        
//         if (!loginData.username || !loginData.password) {
//             setLoading(false);
//             return setMessage({ text: "❌ Please enter both username and password.", type: "error" });
//         }

//         try {
//             const response = await fetch("http://localhost:8080/healthtech/hospital/hospitallogin", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(loginData),
//             });
//             await handleResponse(response, "Login successful!");
//         } catch (err) {
//             setLoading(false);
//             console.error("Login error:", err);
//             setMessage({ text: "❌ Network error. Check server status (http://localhost:8080).", type: "error" });
//         }
//     };

//     // 🌐 Global Style Reset and Fix
//     useEffect(() => {
//         // ⭐ UI CLIPPING और SCROLLING के लिए fix
//         const root = document.getElementById('root');
        
//         // Ensure HTML and Body are set for full height and no weird hidden overflow
//         document.documentElement.style.height = '100%';
//         document.body.style.height = '100%';
//         document.body.style.margin = '0';
//         document.body.style.padding = '0';
//         // HTML पर Scrollbar दिखने दें जब आवश्यक हो
//         document.documentElement.style.overflowY = 'auto'; 
//         document.documentElement.style.overflowX = 'hidden';
//         document.body.style.overflow = ''; 

//         if (root) {
//             root.style.height = '100%';
//             root.style.width = '100%';
//             root.style.margin = '0';
//             root.style.padding = '0';
//         }

//         return () => {
//             // Cleanup styles on unmount
//             document.documentElement.style.height = '';
//             document.body.style.height = '';
//             document.body.style.margin = '';
//             document.body.style.padding = '';
//             document.documentElement.style.overflowY = '';
//             document.documentElement.style.overflowX = '';
//             document.body.style.overflow = '';
//             if (root) {
//                 root.style.height = '';
//                 root.style.width = '';
//                 root.style.margin = '';
//                 root.style.padding = '';
//             }
//         };
//     }, []);

//     const cardStyle = {
//         ...styles.glassCard,
//         transform: loading ? 'scale(1.02)' : 'scale(1)',
//         opacity: loading ? 0.9 : 1,
//     };

//     return (
//         <div style={styles.container}>
//             {/* 🚀 3D MEDICAL ANIMATIONS STYLES */}
//             <style>{`
//             @keyframes medicalFloat {
//                 0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); opacity: 0.6; }
//                 25% { transform: translateY(-20px) translateX(15px) rotate(5deg) scale(1.1); opacity: 0.9; }
//                 50% { transform: translateY(-10px) translateX(-10px) rotate(-3deg) scale(0.95); opacity: 0.7; }
//                 75% { transform: translateY(15px) translateX(20px) rotate(8deg) scale(1.05); opacity: 0.8; }
//             }

//             @keyframes bloodFlow {
//                 0% { transform: translateX(-10vw) scale(0.8) translateY(0px); opacity: 0; }
//                 50% { opacity: 1; transform: translateX(0vw) scale(1.1) translateY(10px); }
//                 100% { transform: translateX(10vw) scale(0.9) translateY(-10px); opacity: 0; }
//             }


//             .medical-element {
//                 position: absolute;
//                 animation: medicalFloat infinite ease-in-out; 
//                 filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
//                 z-index: 1;
//             }

//             @keyframes heartPulse {
//                 0%, 100% { transform: scale(1); }
//                 14% { transform: scale(1.3); }
//                 28% { transform: scale(1.5); }
//                 42% { transform: scale(1.3); }
//                 70% { transform: scale(1.25); }
//             }

//             @keyframes breathing {
//                 0%, 100% { transform: scaleX(1) scaleY(1); }
//                 50% { transform: scaleX(1.15) scaleY(1.05); }
//             }

//             @keyframes filterWave {
//                 0%, 100% { border-radius: 50% 40% 60% 30% / 50% 50% 40% 60%; }
//                 50% { border-radius: 40% 60% 30% 50% / 60% 40% 50% 60%; }
//             }

//             @keyframes boneRotate {
//                 0%, 100% { transform: rotate(0deg); }
//                 50% { transform: rotate(180deg); }
//             }

//             @keyframes liverWave {
//                 0%, 100% { clip-path: polygon(0% 45%, 100% 25%, 100% 75%, 0% 55%); }
//                 50% { clip-path: polygon(0% 35%, 100% 15%, 100% 85%, 0% 65%); }
//             }


//             @keyframes techPulse {
//                 0%, 100% { box-shadow: 0 0 20px currentColor; }
//                 50% { box-shadow: 0 0 40px currentColor, 0 0 60px currentColor; }
//             }

//             @keyframes dnaSpiral {
//                 0% { transform: rotate(0deg) scale(1); }
//                 100% { transform: rotate(360deg) scale(1); }
//             }

//             .heart { 
//                 background: radial-gradient(circle at 30% 30%, #ff4757 20%, transparent 50%), 
//                     radial-gradient(circle at 70% 70%, #ff6b81 20%, transparent 50%);
//                 clip-path: polygon(50% 0%, 61% 35%, 95% 35%, 78% 60%, 100% 100%, 45% 85%, 0% 100%, 23% 60%, 6% 35%, 38% 35%);
//                 animation: heartPulse 1s infinite, medicalFloat infinite ease-in-out;
//             }

//             .lungs { 
//                 background: linear-gradient(45deg, #74b9ff 0%, #0984e3 50%, #6c5ce7 100%);
//                 border-radius: 45% 55% 40% 60% / 50% 40% 60% 50%;
//                 animation: breathing 3s infinite ease-in-out, medicalFloat infinite ease-in-out;
//             }

//             .kidney { 
//                 background: radial-gradient(ellipse, #00b894 30%, #00a085 70%);
//                 border-radius: 50% 40% 60% 30% / 60% 50% 40% 60%;
//                 animation: filterWave 2s infinite, medicalFloat infinite ease-in-out;
//             }

//             .bone { 
//                 background: linear-gradient(135deg, #f1c40f, #f39c12, #e67e22);
//                 border-radius: 20% 80% 30% 70% / 40% 60% 50% 80%;
//                 animation: boneRotate 4s infinite linear, medicalFloat infinite ease-in-out;
//             }

//             .liver { 
//                 background: radial-gradient(ellipse, #fdcb6e 20%, #e17055 60%, #d63031 90%);
//                 clip-path: polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
//                 animation: liverWave 2.5s infinite ease-in-out, medicalFloat infinite ease-in-out;
//             }

//             .blood { 
//                 background: radial-gradient(circle, #d63031 25%, #e84393 70%);
//                 border-radius: 50%;
//                 animation: bloodFlow 5s linear infinite, medicalFloat 10s infinite ease-in-out; 
//             }

//             .hospital {
//                 background: conic-gradient(from 0deg, #00b894, #00cec9, #55a630, #00b894);
//                 border-radius: 20px;
//                 animation: techPulse 2s infinite ease-in-out, medicalFloat infinite ease-in-out;
//                 clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
//             }

//             .dna { 
//                 background: linear-gradient(45deg, #a29bfe, #fd79a8, #fdcb6e);
//                 border-radius: 50% 20% 50% 20% / 30% 50% 30% 50%;
//                 animation: dnaSpiral 3s infinite linear, medicalFloat infinite ease-in-out;
//             }
//             `}</style>

//             {/* 🌌 16 ANIMATED MEDICAL ELEMENTS */}
//             {medicalElements.map((element) => (
//                 <div
//                     key={element.id}
//                     className={`medical-element ${element.type}`}
//                     style={{
//                         top: element.top,
//                         left: element.left,
//                         width: element.size,
//                         height: element.size,
//                         animationDuration: `${element.duration}`,
//                         animationDelay: element.delay,
//                         animationPlayState: 'running', 
//                     }}
//                 />
//             ))}

//             {/* 💎 Glass Card */}
//             <div style={cardStyle}>
//                 <h2 style={styles.header}>
//                     {isLogin ? "🏥 Hospital Login" : "📝 Hospital Registration"}
//                 </h2>

//                 <form onSubmit={isLogin ? handleLogin : handleSignup}>
//                     {/* Login/Signup Fields */}
//                     <input
//                         style={styles.input}
//                         type="text"
//                         name="username"
//                         placeholder="Username"
//                         value={formData.username || ""}
//                         onChange={handleChange}
//                         required
//                         disabled={loading}
//                     />
//                     <input
//                         style={styles.input}
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         value={formData.password || ""}
//                         onChange={handleChange}
//                         required
//                         disabled={loading}
//                     />

//                     {/* Additional Signup Fields */}
//                     {!isLogin && signupFields.slice(2).map(field => {
//                         const placeholder = field.replace(/([A-Z])/g, ' $1').replace('_', ' ').toUpperCase();
                        
//                         // ⭐ FACTOR_AVAILABLE के लिए SELECT ड्रॉपडाउन
//                         if (field === 'factor_available') {
//                             return (
//                                 <select
//                                     key={field}
//                                     style={styles.input}
//                                     name={field}
//                                     value={formData[field] || "NO"}
//                                     onChange={handleChange}
//                                     required
//                                     disabled={loading}
//                                 >
//                                     <option value="" disabled>FACTOR AVAILABLE? (YES/NO)</option>
//                                     <option value="YES">YES</option>
//                                     <option value="NO">NO</option>
//                                 </select>
//                             );
//                         }

//                         // ⭐ बाकी सभी इनपुट
//                         return (
//                             <input
//                                 key={field}
//                                 style={styles.input}
//                                 type={field === 'email' ? 'email' : 'text'}
//                                 name={field}
//                                 placeholder={placeholder}
//                                 value={formData[field] || ""}
//                                 onChange={handleChange}
//                                 required
//                                 disabled={loading}
//                             />
//                         );
//                     })}


//                     {/* 🟢 Action Button */}
//                     <button
//                         type="submit"
//                         style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
//                         disabled={loading}
//                     >
//                         {loading 
//                             ? (isLogin ? "🔄 LOGGING IN..." : "📝 REGISTERING...")
//                             : (isLogin ? "🔓 LOGIN" : "✅ SIGN UP")
//                         }
//                     </button>
//                 </form>

//                 {/* 💬 Message Display */}
//                 {message.text && (
//                     <p style={styles.message(message.type)}>{message.text}</p>
//                 )}

//                 {/* 🔄 Switch Link */}
//                 <p style={styles.switchText}>
//                     {isLogin ? "👤 Don't have an account?" : "✅ Already registered?"}
//                     <button style={styles.switchButton} onClick={handleSwitch} disabled={loading}>
//                         {isLogin ? "Sign Up" : "Log In"}
//                     </button>
//                 </p>
//             </div>
//         </div>
//     );
// }



///signup 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🎨 Advanced Medical Theme Styles
const styles = {
    container: {
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3d 50%, #2d1b69 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: "relative",
        overflow: "hidden", 
        boxSizing: "border-box",
        padding: "20px",
    },
    glassCard: {
        background: "rgba(255, 255, 255, 0.12)",
        padding: "40px",
        borderRadius: "24px",
        boxShadow: "0 25px 45px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        maxWidth: "450px",
        width: "100%",
        zIndex: 20,
        transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        boxSizing: "border-box",
    },
    header: {
        textAlign: "center", 
        color: "white",
        marginBottom: "30px",
        fontSize: "28px",
        fontWeight: "700",
        textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
    },
    input: {
        width: "100%",
        padding: "12px 15px",
        marginBottom: "15px",
        border: "none",
        borderRadius: "8px",
        background: "rgba(255, 255, 255, 0.9)",
        color: "#333",
        fontSize: "16px",
        boxSizing: "border-box",
        transition: "background 0.3s, box-shadow 0.3s",
    },
    button: {
        width: "100%",
        padding: "15px",
        marginTop: "20px",
        border: "none",
        borderRadius: "8px",
        background: "#00cc99", // Teal/Mint button color
        color: "white",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background 0.3s ease, transform 0.1s ease",
        boxShadow: "0 4px 10px rgba(0, 204, 153, 0.4)",
    },
    switchText: {
        textAlign: "center",
        marginTop: "20px",
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: '14px',
    },
    switchButton: {
        background: "none",
        border: "none",
        color: "#ffc107",
        cursor: "pointer",
        fontWeight: "bold",
        textDecoration: "underline",
        marginLeft: "5px",
        fontSize: 'inherit',
        padding: '0',
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
    // ⭐ NEW STYLE FOR FORGET PASSWORD LINK/BUTTON
    forgetPasswordButton: {
        background: "none",
        border: "none",
        color: "rgba(255, 255, 255, 0.6)",
        cursor: "pointer",
        fontSize: "14px",
        textAlign: "right",
        display: "block",
        width: "100%",
        marginTop: "5px",
        marginBottom: "10px",
        transition: "color 0.3s",
        textDecoration: "none",
    }
};

// 🏥 Hospital Signup Fields
const signupFields = [
    "username", "password", "email", "hospitalName", "registration_number",
    "hospital_type", "factor_available", "ownership_type", "address", "city"
];

// 🏥 16 Enhanced 3D Medical Animated Elements (Unchanged)
const medicalElements = [
    { id: 1, type: 'heart', color: '#ff4757', size: '90px', top: '15%', left: '75%', duration: '6s', delay: '0s' },
    { id: 2, type: 'heart', color: '#ff6b7a', size: '60px', top: '65%', left: '20%', duration: '8s', delay: '1s' },
    { id: 3, type: 'lungs', color: '#74b9ff', size: '140px', top: '45%', left: '25%', duration: '12s', delay: '2s' },
    { id: 4, type: 'lungs', color: '#0984e3', size: '110px', top: '35%', left: '80%', duration: '14s', delay: '3s' },
    { id: 5, type: 'kidney', color: '#00b894', size: '80px', top: '70%', left: '85%', duration: '10s', delay: '4s' },
    { id: 6, type: 'kidney', color: '#55a3ff', size: '70px', top: '25%', left: '10%', duration: '11s', delay: '5s' },
    { id: 7, type: 'bone', color: '#f1c40f', size: '120px', top: '80%', left: '15%', duration: '16s', delay: '6s' },
    { id: 8, type: 'bone', color: '#f39c12', size: '100px', top: '20%', left: '65%', duration: '18s', delay: '7s' },
    { id: 9, type: 'liver', color: '#fdcb6e', size: '130px', top: '10%', left: '40%', duration: '13s', delay: '8s' },
    { id: 10, type: 'liver', color: '#e17055', size: '100px', top: '55%', left: '5%', duration: '15s', delay: '9s' },
    { id: 11, type: 'blood', color: '#d63031', size: '50px', top: '85%', left: '70%', duration: '9s', delay: '10s' },
    { id: 12, type: 'blood', color: '#e84393', size: '40px', top: '5%', left: '90%', duration: '7s', delay: '11s' },
    { id: 13, type: 'hospital', color: '#00b894', size: '80px', top: '40%', left: '90%', duration: '11s', delay: '12s' },
    { id: 14, type: 'hospital', color: '#00cec9', size: '70px', top: '75%', left: '45%', duration: '13s', delay: '13s' },
    { id: 15, type: 'dna', color: '#a29bfe', size: '60px', top: '30%', left: '15%', duration: '20s', delay: '14s' },
    { id: 16, type: 'dna', color: '#fd79a8', size: '50px', top: '90%', left: '30%', duration: '17s', delay: '15s' },
];


export default function HospitalAuthContainer() {
    const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'forgetPassword'
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    // 🔄 Switch between views
    const handleSwitch = (view) => {
        setCurrentView(view);
        setFormData({});
        setMessage({ text: "", type: "" });
    };

    // 📝 Form Input Handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 📨 Response Handler (Login/Signup)
    const handleResponse = async (response, successMsg) => {
        setLoading(false);
        if (response.ok) {
            const result = await response.text();
            
            if (currentView === 'signup') {
                // Successful Registration: Switch to Login
                setMessage({ text: successMsg + " Now log in!", type: "success" });
                setFormData({});
                
                setTimeout(() => {
                    setCurrentView('login');
                    setMessage({ text: "Registration successful! Please log in.", type: "success" });
                }, 1500);
            } else if (currentView === 'login') {
                // Successful Login
                localStorage.setItem("token", result); 
                setMessage({ text: "Login Successful! Redirecting to Dashboard...", type: "success" });
                console.log("JWT Token:", result);

                // ⭐ REDIRECT TO DASHBOARD ROUTE
                setTimeout(() => {
                    navigate("/hospital-dashboard");
                }, 500);
            }
        } else {
            const errorText = await response.text();
            let displayError = errorText.substring(0, 150);
            try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.message) {
                    displayError = errorJson.message;
                }
            } catch (e) {
                // Not a JSON error
            }
            setMessage({ text: `❌ Failed: ${displayError}`, type: "error" });
        }
    };

    // ✅ Signup Handler
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        const missing = signupFields.find(field => !formData[field]);
        if (missing && missing !== 'factor_available') {
            setLoading(false);
            return setMessage({ text: `❌ Please fill in the ${missing.replace(/([A-Z])/g, ' $1').replace('_', ' ')} field.`, type: "error" });
        }

        try {
            const payload = {
                ...formData,
                factor_available: formData.factor_available || "NO"
            }

            const response = await fetch("https://healthtracker-5.onrender.com/healthtech/hospital/hospital_registration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            await handleResponse(response, "Registration successful!");
        } catch (err) {
            setLoading(false);
            console.error("Signup error:", err);
            setMessage({ text: "❌ Network error. Check server status (http://localhost:8080).", type: "error" });
        }
    };

    // 🔐 Login Handler
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        const loginData = {
            username: formData.username,
            password: formData.password
        };
        
        if (!loginData.username || !loginData.password) {
            setLoading(false);
            return setMessage({ text: "❌ Please enter both username and password.", type: "error" });
        }

        try {
            const response = await fetch("https://healthtracker-5.onrender.com/healthtech/hospital/hospitallogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });
            await handleResponse(response, "Login successful!");
        } catch (err) {
            setLoading(false);
            console.error("Login error:", err);
            setMessage({ text: "❌ Network error. Check server status (http://localhost:8080).", type: "error" });
        }
    };

    // 🔑 FORGET PASSWORD Handler (NEW)
    const handleForgetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        const email = formData.email;
        if (!email) {
            setLoading(false);
            return setMessage({ text: "❌ Please enter your registered email address.", type: "error" });
        }

        // Backend URL: http://localhost:8080/hospital/forget-passwordhospital?email={email}
        try {
            const response = await fetch(`https://healthtracker-5.onrender.com/healthtech/hospital/forget-passwordhospital?email=${encodeURIComponent(email)}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            
            setLoading(false);
            
            if (response.ok) {
                const result = await response.text();
                setMessage({ 
                    text: `✅ ${result || "Password reset link sent! Check your email."}`, 
                    type: "success" 
                });
                // Optionally switch back to login after a delay
                setTimeout(() => {
                    handleSwitch('login');
                }, 4000); 

            } else {
                const errorText = await response.text();
                let displayError = errorText.substring(0, 150);
                try {
                    const errorJson = JSON.parse(errorText);
                    if (errorJson.message) {
                        displayError = errorJson.message;
                    }
                } catch (e) {}
                setMessage({ text: `❌ Failed to send link: ${displayError}`, type: "error" });
            }

        } catch (err) {
            setLoading(false);
            console.error("Forget Password error:", err);
            setMessage({ text: "❌ Network error. Check server status (http://localhost:8080).", type: "error" });
        }
    };


    // 🌐 Global Style Reset and Fix (Unchanged)
    useEffect(() => {
        const root = document.getElementById('root');
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.documentElement.style.overflowY = 'auto'; 
        document.documentElement.style.overflowX = 'hidden';
        document.body.style.overflow = ''; 

        if (root) {
            root.style.height = '100%';
            root.style.width = '100%';
            root.style.margin = '0';
            root.style.padding = '0';
        }

        return () => {
            document.documentElement.style.height = '';
            document.body.style.height = '';
            document.body.style.margin = '';
            document.body.style.padding = '';
            document.documentElement.style.overflowY = '';
            document.documentElement.style.overflowX = '';
            document.body.style.overflow = '';
            if (root) {
                root.style.height = '';
                root.style.width = '';
                root.style.margin = '';
                root.style.padding = '';
            }
        };
    }, []);

    const cardStyle = {
        ...styles.glassCard,
        transform: loading ? 'scale(1.02)' : 'scale(1)',
        opacity: loading ? 0.9 : 1,
    };
    
    // ----------------------------------------------------
    // 🔑 FORGET PASSWORD VIEW RENDERER
    // ----------------------------------------------------
    const renderForgetPassword = () => (
        <>
            <h2 style={styles.header}>
                🔑 Forgot Password
            </h2>
            <p style={{...styles.switchText, marginBottom: '20px', color: 'rgba(255, 255, 255, 0.9)'}}>
                Enter your registered email address to receive a password reset link.
            </p>

            <form onSubmit={handleForgetPassword}>
                <input
                    style={styles.input}
                    type="email"
                    name="email"
                    placeholder="Registered Email Address"
                    value={formData.email || ""}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                
                <button
                    type="submit"
                    style={{ ...styles.button, background: '#ffc107', boxShadow: '0 4px 10px rgba(255, 193, 7, 0.4)', opacity: loading ? 0.7 : 1 }}
                    disabled={loading}
                >
                    {loading ? "📧 SENDING LINK..." : "SEND RESET LINK"}
                </button>
            </form>

            {message.text && (
                <p style={styles.message(message.type)}>{message.text}</p>
            )}

            <p style={styles.switchText}>
                Remembered your password?
                <button 
                    style={styles.switchButton} 
                    onClick={() => handleSwitch('login')} 
                    disabled={loading}
                >
                    Back to Login
                </button>
            </p>
        </>
    );

    // ----------------------------------------------------
    // 🔓 LOGIN/SIGNUP VIEW RENDERER
    // ----------------------------------------------------
    const renderAuthForm = () => {
        const isLogin = currentView === 'login';

        return (
            <>
                <h2 style={styles.header}>
                    {isLogin ? "🏥 Hospital Login" : "📝 Hospital Registration"}
                </h2>

                <form onSubmit={isLogin ? handleLogin : handleSignup}>
                    {/* Login/Signup Fields */}
                    <input
                        style={styles.input}
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username || ""}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    <input
                        style={styles.input}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password || ""}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    
                    {/* ⭐ FORGET PASSWORD BUTTON (Only visible on Login view) */}
                    {isLogin && (
                         <button 
                            type="button" 
                            style={styles.forgetPasswordButton}
                            onClick={() => handleSwitch('forgetPassword')}
                            disabled={loading}
                        >
                            Forgot Password?
                        </button>
                    )}


                    {/* Additional Signup Fields */}
                    {!isLogin && signupFields.slice(2).map(field => {
                        const placeholder = field.replace(/([A-Z])/g, ' $1').replace('_', ' ').toUpperCase();
                        
                        if (field === 'factor_available') {
                            return (
                                <select
                                    key={field}
                                    style={styles.input}
                                    name={field}
                                    value={formData[field] || "NO"}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                >
                                    <option value="" disabled>FACTOR AVAILABLE? (YES/NO)</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select>
                            );
                        }

                        return (
                            <input
                                key={field}
                                style={styles.input}
                                type={field === 'email' ? 'email' : 'text'}
                                name={field}
                                placeholder={placeholder}
                                value={formData[field] || ""}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        );
                    })}


                    {/* 🟢 Action Button */}
                    <button
                        type="submit"
                        style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
                        disabled={loading}
                    >
                        {loading 
                            ? (isLogin ? "🔄 LOGGING IN..." : "📝 REGISTERING...")
                            : (isLogin ? "🔓 LOGIN" : "✅ SIGN UP")
                        }
                    </button>
                </form>

                {/* 💬 Message Display */}
                {message.text && (
                    <p style={styles.message(message.type)}>{message.text}</p>
                )}

                {/* 🔄 Switch Link */}
                <p style={styles.switchText}>
                    {isLogin ? "👤 Don't have an account?" : "✅ Already registered?"}
                    <button style={styles.switchButton} onClick={() => handleSwitch(isLogin ? 'signup' : 'login')} disabled={loading}>
                        {isLogin ? "Sign Up" : "Log In"}
                    </button>
                </p>
            </>
        );
    };

    return (
        <div style={styles.container}>
            {/* 🚀 3D MEDICAL ANIMATIONS STYLES */}
            <style>{`
            @keyframes medicalFloat {
                0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); opacity: 0.6; }
                25% { transform: translateY(-20px) translateX(15px) rotate(5deg) scale(1.1); opacity: 0.9; }
                50% { transform: translateY(-10px) translateX(-10px) rotate(-3deg) scale(0.95); opacity: 0.7; }
                75% { transform: translateY(15px) translateX(20px) rotate(8deg) scale(1.05); opacity: 0.8; }
            }

            @keyframes bloodFlow {
                0% { transform: translateX(-10vw) scale(0.8) translateY(0px); opacity: 0; }
                50% { opacity: 1; transform: translateX(0vw) scale(1.1) translateY(10px); }
                100% { transform: translateX(10vw) scale(0.9) translateY(-10px); opacity: 0; }
            }


            .medical-element {
                position: absolute;
                animation: medicalFloat infinite ease-in-out; 
                filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
                z-index: 1;
            }

            @keyframes heartPulse {
                0%, 100% { transform: scale(1); }
                14% { transform: scale(1.3); }
                28% { transform: scale(1.5); }
                42% { transform: scale(1.3); }
                70% { transform: scale(1.25); }
            }

            @keyframes breathing {
                0%, 100% { transform: scaleX(1) scaleY(1); }
                50% { transform: scaleX(1.15) scaleY(1.05); }
            }

            @keyframes filterWave {
                0%, 100% { border-radius: 50% 40% 60% 30% / 50% 50% 40% 60%; }
                50% { border-radius: 40% 60% 30% 50% / 60% 40% 50% 60%; }
            }

            @keyframes boneRotate {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(180deg); }
            }

            @keyframes liverWave {
                0%, 100% { clip-path: polygon(0% 45%, 100% 25%, 100% 75%, 0% 55%); }
                50% { clip-path: polygon(0% 35%, 100% 15%, 100% 85%, 0% 65%); }
            }


            @keyframes techPulse {
                0%, 100% { box-shadow: 0 0 20px currentColor; }
                50% { box-shadow: 0 0 40px currentColor, 0 0 60px currentColor; }
            }

            @keyframes dnaSpiral {
                0% { transform: rotate(0deg) scale(1); }
                100% { transform: rotate(360deg) scale(1); }
            }

            .heart { 
                background: radial-gradient(circle at 30% 30%, #ff4757 20%, transparent 50%), 
                    radial-gradient(circle at 70% 70%, #ff6b81 20%, transparent 50%);
                clip-path: polygon(50% 0%, 61% 35%, 95% 35%, 78% 60%, 100% 100%, 45% 85%, 0% 100%, 23% 60%, 6% 35%, 38% 35%);
                animation: heartPulse 1s infinite, medicalFloat infinite ease-in-out;
            }

            .lungs { 
                background: linear-gradient(45deg, #74b9ff 0%, #0984e3 50%, #6c5ce7 100%);
                border-radius: 45% 55% 40% 60% / 50% 40% 60% 50%;
                animation: breathing 3s infinite ease-in-out, medicalFloat infinite ease-in-out;
            }

            .kidney { 
                background: radial-gradient(ellipse, #00b894 30%, #00a085 70%);
                border-radius: 50% 40% 60% 30% / 60% 50% 40% 60%;
                animation: filterWave 2s infinite, medicalFloat infinite ease-in-out;
            }

            .bone { 
                background: linear-gradient(135deg, #f1c40f, #f39c12, #e67e22);
                border-radius: 20% 80% 30% 70% / 40% 60% 50% 80%;
                animation: boneRotate 4s infinite linear, medicalFloat infinite ease-in-out;
            }

            .liver { 
                background: radial-gradient(ellipse, #fdcb6e 20%, #e17055 60%, #d63031 90%);
                clip-path: polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
                animation: liverWave 2.5s infinite ease-in-out, medicalFloat infinite ease-in-out;
            }

            .blood { 
                background: radial-gradient(circle, #d63031 25%, #e84393 70%);
                border-radius: 50%;
                animation: bloodFlow 5s linear infinite, medicalFloat 10s infinite ease-in-out; 
            }

            .hospital {
                background: conic-gradient(from 0deg, #00b894, #00cec9, #55a630, #00b894);
                border-radius: 20px;
                animation: techPulse 2s infinite ease-in-out, medicalFloat infinite ease-in-out;
                clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            }

            .dna { 
                background: linear-gradient(45deg, #a29bfe, #fd79a8, #fdcb6e);
                border-radius: 50% 20% 50% 20% / 30% 50% 30% 50%;
                animation: dnaSpiral 3s infinite linear, medicalFloat infinite ease-in-out;
            }
            `}</style>

            {/* 🌌 16 ANIMATED MEDICAL ELEMENTS */}
            {medicalElements.map((element) => (
                <div
                    key={element.id}
                    className={`medical-element ${element.type}`}
                    style={{
                        top: element.top,
                        left: element.left,
                        width: element.size,
                        height: element.size,
                        animationDuration: `${element.duration}`,
                        animationDelay: element.delay,
                        animationPlayState: 'running', 
                    }}
                />
            ))}

            {/* 💎 Glass Card */}
            <div style={cardStyle}>
                {/* 🔄 RENDER THE CORRECT VIEW */}
                {currentView === 'forgetPassword' 
                    ? renderForgetPassword()
                    : renderAuthForm()
                }
            </div>
        </div>
    );
}