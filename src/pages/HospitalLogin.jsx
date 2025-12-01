
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // 🎨 Advanced Medical Theme Styles (UI untouched)
// const styles = {
//     // ⭐ FIX: Container को पूरी तरह से Center और Responsive बनाया गया
//     container: {
//         minHeight: "100vh",
//         width: "100vw",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center", // लंबवत (Vertical) केंद्र
//         justifyContent: "center", // क्षैतिज (Horizontal) केंद्र
//         background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3d 50%, #2d1b69 100%)",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         position: "relative",
//         overflow: "hidden", 
//         boxSizing: "border-box",
//         padding: "20px",
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
//         width: "100%",
//         zIndex: 20,
//         transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
//         boxSizing: "border-box",
//     },
//     header: {
//         textAlign: "center", 
//         color: "white",
//         marginBottom: "30px",
//         fontSize: "28px",
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

// // 🏥 Medical Animated Elements (Existing)
// const medicalElements = [
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
    
//     // ⭐ NEW DNA ELEMENTS (More Subtle)
//     { id: 17, type: 'dna_spin', color: '#a29bfe', size: '150px', top: '5%', left: '5%', duration: '30s', delay: '0s' },
//     { id: 18, type: 'dna_spin', color: '#a29bfe', size: '180px', top: '70%', left: '55%', duration: '35s', delay: '5s' },

//     // ⭐ NEW NEON PARTICLES (19-22)
//     { id: 19, type: 'particle', color: '#00cc99', size: '15px', top: '10%', left: '50%', duration: '18s', delay: '0s' },
//     { id: 20, type: 'particle', color: '#ffc107', size: '12px', top: '40%', left: '10%', duration: '22s', delay: '4s' },
//     { id: 21, type: 'particle', color: '#74b9ff', size: '18px', top: '80%', left: '90%', duration: '20s', delay: '8s' },
//     { id: 22, type: 'particle', color: '#ff4757', size: '10px', top: '60%', left: '30%', duration: '15s', delay: '12s' },
// ];


// export default function HospitalLogin() {
//     const [formData, setFormData] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState({ text: "", type: "" });
//     const navigate = useNavigate();

//     // 📝 Form Input Handler
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // 📨 Response Handler
//     const handleResponse = async (response, successMsg) => {
//         setLoading(false);
//         if (response.ok) {
//             const result = await response.text();
            
//             // Successful Login
//             localStorage.setItem("token", result); 
//             setMessage({ text: "Login Successful! Redirecting to Dashboard...", type: "success" });
//             console.log("JWT Token:", result);

//             // ⭐ FIX: 500ms के बाद डैशबोर्ड पर रीडायरेक्ट करें
//             setTimeout(() => {
//                 navigate("/hospital-dashboard"); 
//             }, 500);
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
//             const response = await fetch("http://localhost:8080/healthtech/hospital/hospiatllogin", {
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
//         // ... (Cleanup code untouched)
//         const root = document.getElementById('root');
//         document.documentElement.style.height = '100%';
//         document.body.style.height = '100%';
//         document.body.style.margin = '0';
//         document.body.style.padding = '0';
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
//             // ⭐ NEW: DNA HELIX SPIN
//             @keyframes dnaSpin {
//                 0% { transform: rotateY(0deg) rotateZ(0deg) scale(1); opacity: 0.2; }
//                 50% { transform: rotateY(180deg) rotateZ(30deg) scale(1.1); opacity: 0.4; }
//                 100% { transform: rotateY(360deg) rotateZ(0deg) scale(1); opacity: 0.2; }
//             }
//             // ⭐ NEW: PARTICLE FLOAT
//             @keyframes particleFloat {
//                 0% { transform: translate(0, 0) rotate(0deg); opacity: 0.1; }
//                 25% { transform: translate(15vw, 5vh) rotate(45deg); opacity: 0.3; }
//                 50% { transform: translate(0, 10vh) rotate(90deg); opacity: 0.1; }
//                 75% { transform: translate(-10vw, 5vh) rotate(135deg); opacity: 0.3; }
//                 100% { transform: translate(0, 0) rotate(180deg); opacity: 0.1; }
//             }


//             .medical-element {
//                 position: absolute; 
//                 animation: medicalFloat infinite ease-in-out; 
//                 filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3)); 
//                 z-index: 1;
//             }
//             .dna_spin {
//                 background: linear-gradient(90deg, #a29bfe 2%, #fd79a8 98%);
//                 border-radius: 50%;
//                 opacity: 0.3;
//                 animation: dnaSpin infinite ease-in-out;
//                 filter: none; /* No shadow for subtle elements */
//                 transform-style: preserve-3d;
//             }
//             .particle {
//                 background: currentColor;
//                 border-radius: 50%;
//                 box-shadow: 0 0 5px currentColor;
//                 animation: particleFloat infinite linear;
//                 z-index: 0; /* Behind the card */
//                 filter: none;
//             }

//             @keyframes heartPulse { /* ... */ }
//             @keyframes breathing { /* ... */ }
//             @keyframes filterWave { /* ... */ }
//             @keyframes boneRotate { /* ... */ }
//             @keyframes liverWave { /* ... */ }
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
//                 clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
//             }
//             .dna { 
//                 background: linear-gradient(45deg, #a29bfe, #fd79a8, #fdcb6e);
//                 border-radius: 50% 20% 50% 20% / 30% 50% 30% 50%;
//                 animation: dnaSpiral 3s infinite linear, medicalFloat infinite ease-in-out;
//             }
//             `}</style>

//             {/* 🌌 22 ANIMATED MEDICAL ELEMENTS (Including new ones) */}
//             {medicalElements.map((element) => (
//                 <div
//                     key={element.id}
//                     // 'dna_spin' और 'particle' के लिए नए classNames का उपयोग करें
//                     className={`medical-element ${element.type}`} 
//                     style={{
//                         top: element.top,
//                         left: element.left,
//                         width: element.size,
//                         height: element.size,
//                         animationDuration: `${element.duration}`,
//                         animationDelay: element.delay,
//                         animationPlayState: 'running', 
//                         // zIndex को particle के लिए 0 और बाकियों के लिए 1 या 2 में रखें 
//                         zIndex: element.type === 'particle' || element.type === 'dna_spin' ? 0 : 1,
//                         color: element.color // particle के लिए currentColor सेट करें
//                     }}
//                 />
//             ))}

//             {/* 💎 Glass Card */}
//             <div style={cardStyle}>
//                 <h2 style={styles.header}>
//                     🏥 Hospital Login
//                 </h2>

//                 <form onSubmit={handleLogin}>
//                     {/* Login Fields */}
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
                    
//                     {/* 🟢 Action Button */}
//                     <button
//                         type="submit"
//                         style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
//                         disabled={loading}
//                     >
//                         {loading ? "🔄 LOGGING IN..." : "🔓 LOGIN"}
//                     </button>
//                 </form>

//                 {/* 💬 Message Display */}
//                 {message.text && (
//                     <p style={styles.message(message.type)}>{message.text}</p>
//                 )}
//             </div>
//         </div>
//     );
// }



//forget new add 

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🎨 Advanced Medical Theme Styles (UI untouched)
const styles = {
    // ⭐ FIX: Container को पूरी तरह से Center और Responsive बनाया गया
    container: {
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // लंबवत (Vertical) केंद्र
        justifyContent: "center", // क्षैतिज (Horizontal) केंद्र
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
        background: "#00cc99",
        color: "white",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background 0.3s ease, transform 0.1s ease",
        boxShadow: "0 4px 10px rgba(0, 204, 153, 0.4)",
    },
    // ⭐ NEW: Link style
    link: {
        color: '#00cc99',
        fontSize: '14px',
        textAlign: 'center',
        marginTop: '15px',
        cursor: 'pointer',
        fontWeight: '500',
        textDecoration: 'underline',
        display: 'block',
        transition: 'color 0.3s',
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
};

// 🏥 Medical Animated Elements (Existing)
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
    
    // ⭐ NEW DNA ELEMENTS (More Subtle)
    { id: 17, type: 'dna_spin', color: '#a29bfe', size: '150px', top: '5%', left: '5%', duration: '30s', delay: '0s' },
    { id: 18, type: 'dna_spin', color: '#a29bfe', size: '180px', top: '70%', left: '55%', duration: '35s', delay: '5s' },

    // ⭐ NEW NEON PARTICLES (19-22)
    { id: 19, type: 'particle', color: '#00cc99', size: '15px', top: '10%', left: '50%', duration: '18s', delay: '0s' },
    { id: 20, type: 'particle', color: '#ffc107', size: '12px', top: '40%', left: '10%', duration: '22s', delay: '4s' },
    { id: 21, type: 'particle', color: '#74b9ff', size: '18px', top: '80%', left: '90%', duration: '20s', delay: '8s' },
    { id: 22, type: 'particle', color: '#ff4757', size: '10px', top: '60%', left: '30%', duration: '15s', delay: '12s' },
];


export default function HospitalLogin() {
    // ⭐ NEW STATE: tracks the current view (login or forgotPassword)
    const [mode, setMode] = useState('login'); // 'login' | 'forgotPassword'
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    // 📝 Form Input Handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 📨 Response Handler
    const handleResponse = async (response, successMsg) => {
        setLoading(false);
        if (response.ok) {
            // Check if it's a login response (which returns a token)
            if (mode === 'login') {
                const result = await response.text();
                
                // Successful Login
                localStorage.setItem("token", result); 
                setMessage({ text: "Login Successful! Redirecting to Dashboard...", type: "success" });
                console.log("JWT Token:", result);

                // ⭐ FIX: 500ms के बाद डैशबोर्ड पर रीडायरेक्ट करें
                setTimeout(() => {
                    navigate("/hospital-dashboard"); 
                }, 500);
            } else {
                 // Successful Forget Password request
                 setMessage({ text: successMsg, type: "success" });
                 // Optionally switch back to login mode after a delay
                 setTimeout(() => {
                    setMode('login');
                    setMessage({ text: "", type: "" }); // Clear message on mode switch
                 }, 3000);
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
    
    // 🔐 Login Handler (Existing)
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
            const response = await fetch("https://healthtracker-5.onrender.com/healthtech/hospital/hospiatllogin", {
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
    
    // ⭐ NEW: Forget Password Handler
    const handleForgetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        const email = formData.email;
        
        if (!email || !email.includes('@')) {
            setLoading(false);
            return setMessage({ text: "❌ Please enter a valid email address.", type: "error" });
        }
        
        // Note: The backend uses @RequestParam, so we send the email in the query string.
        try {
            const response = await fetch(`https://healthtracker-5.onrender.com/healthtech/hospital/forget-passwordhospital?email=${email}`, {
                method: "POST",
                // No body needed for this endpoint
            });
            await handleResponse(response, "✅ Password reset link sent to your email!");
        } catch (err) {
            setLoading(false);
            console.error("Forget Password error:", err);
            setMessage({ text: "❌ Network error. Could not reach the server.", type: "error" });
        }
    };


    // 🌐 Global Style Reset and Fix (Untouched)
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

    // 🔄 Render Login Form
    const renderLoginForm = () => (
        <form onSubmit={handleLogin}>
            {/* Login Fields */}
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
            
            {/* 🟢 Action Button */}
            <button
                type="submit"
                style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
                disabled={loading}
            >
                {loading ? "🔄 LOGGING IN..." : "🔓 LOGIN"}
            </button>

            {/* ⭐ NEW: Forgot Password Link */}
            <p 
                style={styles.link} 
                onClick={() => {
                    setMode('forgotPassword');
                    setMessage({ text: "", type: "" });
                    setFormData({});
                }}
            >
                Forgot Password?
            </p>
        </form>
    );
    
    // 📧 Render Forgot Password Form
    const renderForgotPasswordForm = () => (
        <form onSubmit={handleForgetPassword}>
            <p style={{ color: 'white', textAlign: 'center', marginBottom: '20px', fontSize: '15px' }}>
                Enter your registered email to receive a password reset link.
            </p>
            {/* Email Field */}
            <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="Hospital Email Address"
                value={formData.email || ""}
                onChange={handleChange}
                required
                disabled={loading}
            />
            
            {/* 📧 Action Button */}
            <button
                type="submit"
                style={{ ...styles.button, opacity: loading ? 0.7 : 1, background: '#ffc107', boxShadow: '0 4px 10px rgba(255, 193, 7, 0.4)' }}
                disabled={loading}
            >
                {loading ? "🔄 SENDING LINK..." : "📧 RESET PASSWORD"}
            </button>

            {/* ⭐ NEW: Back to Login Link */}
            <p 
                style={styles.link} 
                onClick={() => {
                    setMode('login');
                    setMessage({ text: "", type: "" });
                    setFormData({});
                }}
            >
                ← Back to Login
            </p>
        </form>
    );

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
            // ⭐ NEW: DNA HELIX SPIN
            @keyframes dnaSpin {
                0% { transform: rotateY(0deg) rotateZ(0deg) scale(1); opacity: 0.2; }
                50% { transform: rotateY(180deg) rotateZ(30deg) scale(1.1); opacity: 0.4; }
                100% { transform: rotateY(360deg) rotateZ(0deg) scale(1); opacity: 0.2; }
            }
            // ⭐ NEW: PARTICLE FLOAT
            @keyframes particleFloat {
                0% { transform: translate(0, 0) rotate(0deg); opacity: 0.1; }
                25% { transform: translate(15vw, 5vh) rotate(45deg); opacity: 0.3; }
                50% { transform: translate(0, 10vh) rotate(90deg); opacity: 0.1; }
                75% { transform: translate(-10vw, 5vh) rotate(135deg); opacity: 0.3; }
                100% { transform: translate(0, 0) rotate(180deg); opacity: 0.1; }
            }


            .medical-element {
                position: absolute; 
                animation: medicalFloat infinite ease-in-out; 
                filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3)); 
                z-index: 1;
            }
            .dna_spin {
                background: linear-gradient(90deg, #a29bfe 2%, #fd79a8 98%);
                border-radius: 50%;
                opacity: 0.3;
                animation: dnaSpin infinite ease-in-out;
                filter: none; /* No shadow for subtle elements */
                transform-style: preserve-3d;
            }
            .particle {
                background: currentColor;
                border-radius: 50%;
                box-shadow: 0 0 5px currentColor;
                animation: particleFloat infinite linear;
                z-index: 0; /* Behind the card */
                filter: none;
            }

            @keyframes heartPulse { /* ... */ }
            @keyframes breathing { /* ... */ }
            @keyframes filterWave { /* ... */ }
            @keyframes boneRotate { /* ... */ }
            @keyframes liverWave { /* ... */ }
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
                clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            }
            .dna { 
                background: linear-gradient(45deg, #a29bfe, #fd79a8, #fdcb6e);
                border-radius: 50% 20% 50% 20% / 30% 50% 30% 50%;
                animation: dnaSpiral 3s infinite linear, medicalFloat infinite ease-in-out;
            }
            `}</style>

            {/* 🌌 22 ANIMATED MEDICAL ELEMENTS (Including new ones) */}
            {medicalElements.map((element) => (
                <div
                    key={element.id}
                    // 'dna_spin' और 'particle' के लिए नए classNames का उपयोग करें
                    className={`medical-element ${element.type}`} 
                    style={{
                        top: element.top,
                        left: element.left,
                        width: element.size,
                        height: element.size,
                        animationDuration: `${element.duration}`,
                        animationDelay: element.delay,
                        animationPlayState: 'running', 
                        // zIndex को particle के लिए 0 और बाकियों के लिए 1 या 2 में रखें 
                        zIndex: element.type === 'particle' || element.type === 'dna_spin' ? 0 : 1,
                        color: element.color // particle के लिए currentColor सेट करें
                    }}
                />
            ))}

            {/* 💎 Glass Card */}
            <div style={cardStyle}>
                <h2 style={styles.header}>
                    🏥 Hospital {mode === 'login' ? 'Login' : 'Password Reset'}
                </h2>

                {/* 🔄 Conditional Rendering based on Mode */}
                {mode === 'login' ? renderLoginForm() : renderForgotPasswordForm()}

                {/* 💬 Message Display */}
                {message.text && (
                    <p style={styles.message(message.type)}>{message.text}</p>
                )}
            </div>
        </div>
    );
}