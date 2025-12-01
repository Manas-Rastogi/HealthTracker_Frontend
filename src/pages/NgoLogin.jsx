// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // 🌟 NGO THEME STYLES (Matching Signup's Modern Aesthetic)
// const styles = {
//     container: {
//         minHeight: "100vh",
//         width: "100vw",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(135deg, #0e1a3d 0%, #1a3a63 50%, #009688 100%)",
//         fontFamily: "'Poppins', sans-serif",
//         position: "relative",
//         overflow: "hidden", 
//         boxSizing: "border-box",
//         padding: "20px",
//     },
//     card: {
//         background: "rgba(255, 255, 255, 0.15)",
//         padding: "45px",
//         borderRadius: "25px",
//         boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
//         backdropFilter: "blur(15px)",
//         WebkitBackdropFilter: "blur(15px)",
//         maxWidth: "450px",
//         width: "100%",
//         zIndex: 10,
//         transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//         boxSizing: "border-box",
//     },
//     header: {
//         textAlign: "center", 
//         color: "#00e6e6",
//         marginBottom: "35px",
//         fontSize: "36px",
//         fontWeight: "800",
//         letterSpacing: "1px",
//         textShadow: "0 0 10px rgba(0, 230, 230, 0.6)",
//     },
//     input: {
//         width: "100%",
//         padding: "16px 20px",
//         marginBottom: "18px",
//         border: "none",
//         borderRadius: "12px",
//         background: "rgba(0, 0, 0, 0.3)",
//         boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
//         color: "#e0f7fa", 
//         fontSize: "17px",
//         boxSizing: "border-box",
//         transition: "all 0.3s",
//     },
//     button: {
//         width: "100%",
//         padding: "18px",
//         marginTop: "30px",
//         border: "none",
//         borderRadius: "12px",
//         background: "linear-gradient(45deg, #ff4081, #e040fb)",
//         color: "white",
//         fontSize: "20px",
//         fontWeight: "bold",
//         cursor: "pointer",
//         boxShadow: "0 6px 20px rgba(255, 64, 129, 0.4)",
//         transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//     },
//     message: (type) => ({
//         padding: "14px",
//         borderRadius: "10px",
//         marginTop: "20px",
//         textAlign: "center",
//         color: type === 'error' ? '#ff4081' : '#00e6e6',
//         background: type === 'error' ? 'rgba(255, 64, 129, 0.15)' : 'rgba(0, 230, 230, 0.15)',
//         fontWeight: "600",
//         border: `1px solid ${type === 'error' ? '#ff4081' : '#00e6e6'}`,
//     }),
// };

// // 🌍 Floating Elements Data (NGO theme)
// const floatingElements = [
//     { id: 1, type: 'circle', color: '#00e6e6', size: '80px', top: '15%', left: '10%', duration: '20s', delay: '0s' },
//     { id: 2, type: 'square', color: '#ff4081', size: '100px', top: '75%', left: '80%', duration: '25s', delay: '5s' },
//     { id: 3, type: 'triangle', color: '#e040fb', size: '60px', top: '40%', left: '5%', duration: '15s', delay: '10s' },
//     { id: 4, type: 'circle', color: '#ffc107', size: '120px', top: '25%', left: '65%', duration: '30s', delay: '15s' },
// ];


// export default function NgoLogin() {
//     const [formData, setFormData] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState({ text: "", type: "" });
//     const navigate = useNavigate();

//     // 📝 Form Input Handler
//     const handleChange = (e) => {
//         // ⭐ FIX: केवल username और password ही capture करें
//         if (e.target.name === 'username' || e.target.name === 'password') {
//             setFormData({ ...formData, [e.target.name]: e.target.value });
//         }
//     };

//     // 🔐 Login Handler (JWT Integration)
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage({ text: "", type: "" });

//         // ⭐ FIX: सुनिश्चित करें कि data structure आपके NgoLogin क्लास से match करे
//         const loginData = {
//             username: formData.username,
//             password: formData.password
//         };
        
//         if (!loginData.username || !loginData.password) {
//             setLoading(false);
//             return setMessage({ text: "❌ Please enter both username and password.", type: "error" });
//         }

//         try {
//             const response = await fetch("http://localhost:8080/healthtech/Ngo/ngologin", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 // ⭐ FIX: Data structure is correct (username, password)
//                 body: JSON.stringify(loginData), 
//             });
            
//             setLoading(false);

//             if (response.ok) {
//                 // ⭐ JWT FIX: JWT को टेक्स्ट के रूप में प्राप्त करें और स्टोर करें
//                 const jwtToken = await response.text(); 
//                 localStorage.setItem("ngo_token", jwtToken); 
                
//                 setMessage({ text: "✅ Login Successful! Accessing NGO Dashboard...", type: "success" });
                
//                 // ⭐ Redirection to NGO Dashboard Page
//                 setTimeout(() => {
//                     navigate("/ngo-dashboard"); // सुनिश्चित करें कि यह आपका NGO डैशबोर्ड रूट है
//                 }, 500);

//             } else {
//                 const errorText = await response.text();
//                 let displayError = "Login failed. Please check credentials.";
                
//                 // Backend Error Handling (based on your Java code: "Incoorect Username Password")
//                 if (errorText.includes("Incoorect Username Password")) {
//                     displayError = "Incorrect Username or Password. Please try again.";
//                 } else {
//                     displayError = `Server Error: ${errorText.substring(0, 80)}...`;
//                 }

//                 setMessage({ text: `❌ Failed: ${displayError}`, type: "error" });
//             }
//         } catch (err) {
//             setLoading(false);
//             console.error("Login error:", err);
//             setMessage({ text: "❌ Network error. Check server status (http://localhost:8080).", type: "error" });
//         }
//     };

//     // 🌐 Global Style Reset
//     useEffect(() => {
//         // ... (Cleanup code remains the same as before) ...
//         const root = document.getElementById('root');
//         document.documentElement.style.height = '100%';
//         document.body.style.height = '100%';
//         document.body.style.margin = '0';
//         document.body.style.padding = '0';
//         document.documentElement.style.overflowY = 'auto'; 
//         document.documentElement.style.overflowX = 'hidden';
//         if (root) {
//             root.style.height = '100%';
//             root.style.width = '100%';
//         }
//         return () => {
//             document.documentElement.style.height = '';
//             document.body.style.height = '';
//             document.body.style.margin = '';
//             document.body.style.padding = '';
//             document.documentElement.style.overflowY = '';
//             document.documentElement.style.overflowX = '';
//             if (root) {
//                 root.style.height = '';
//                 root.style.width = '';
//             }
//         };
//     }, []);
    
//     // 🖱️ Button/Card Hover Effect Logic
//     const cardStyle = {
//         ...styles.card,
//         transform: loading ? 'scale(1.01) rotateX(2deg)' : 'scale(1) rotateX(0deg)',
//         opacity: loading ? 0.9 : 1,
//     };
    
//     const handleButtonHover = (e, isEnter) => {
//         e.currentTarget.style.transform = isEnter ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)';
//         e.currentTarget.style.boxShadow = isEnter ? '0 10px 30px rgba(255, 64, 129, 0.8)' : styles.button.boxShadow;
//     };
    

//     return (
//         <div style={styles.container}>
//             {/* 🚀 ANIMATION STYLES (UI and Animations CSS remains the same) */}
//             <style>{`
//             @keyframes floatRotate {
//                 0% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
//                 50% { transform: translate(10vw, -10vh) rotate(90deg); opacity: 0.6; }
//                 100% { transform: translate(0, 0) rotate(180deg); opacity: 0.6; }
//             }
//             @keyframes inputFocusGlow {
//                 0%, 100% { box-shadow: 0 0 5px #00e6e6, inset 0 2px 4px rgba(0,0,0,0.6); }
//                 50% { box-shadow: 0 0 10px #00e6e6, inset 0 2px 4px rgba(0,0,0,0.6); }
//             }

//             .floating-element { position: absolute; background: currentColor; opacity: 0.2; animation: floatRotate infinite ease-in-out; z-index: 1; filter: drop-shadow(0 0 10px currentColor); }
//             .circle { border-radius: 50%; }
//             .square { border-radius: 20%; }
//             .triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); border-radius: 0; }
            
//             .input-focus:focus {
//                 outline: none; border: 1px solid #00e6e6; animation: inputFocusGlow 1.5s infinite alternate;
//             }
//             `}</style>

//             {/* 🌌 FLOATING ELEMENTS (Background Animation) */}
//             {floatingElements.map((element) => (
//                 <div
//                     key={element.id}
//                     className={`floating-element ${element.type}`}
//                     style={{
//                         top: element.top, left: element.left, width: element.size, height: element.size,
//                         animationDuration: element.duration, animationDelay: element.delay, color: element.color,
//                     }}
//                 />
//             ))}

//             {/* 💎 NGO Login Card */}
//             <div style={cardStyle}>
//                 <h2 style={styles.header}>
//                     🌍 NGO Login
//                 </h2>

//                 <form onSubmit={handleLogin}>
//                     <input
//                         style={styles.input}
//                         className="input-focus"
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
//                         className="input-focus"
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
//                         style={{ ...styles.button, opacity: loading ? 0.8 : 1 }}
//                         onMouseEnter={(e) => handleButtonHover(e, true)}
//                         onMouseLeave={(e) => handleButtonHover(e, false)}
//                         disabled={loading}
//                     >
//                         {loading ? "🔄 AUTHENTICATING..." : "🔓 LOGIN"}
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


//new ngo login + forget password 

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🌟 NGO THEME STYLES (Matching Signup's Modern Aesthetic)
const styles = {
    container: {
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0e1a3d 0%, #1a3a63 50%, #009688 100%)",
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
        overflow: "hidden", 
        boxSizing: "border-box",
        padding: "20px",
    },
    card: {
        background: "rgba(255, 255, 255, 0.15)",
        padding: "45px",
        borderRadius: "25px",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        maxWidth: "450px",
        width: "100%",
        zIndex: 10,
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxSizing: "border-box",
    },
    header: (isForget) => ({
        textAlign: "center", 
        color: "#00e6e6",
        marginBottom: isForget ? "10px" : "35px",
        fontSize: isForget ? "30px" : "36px",
        fontWeight: "800",
        letterSpacing: "1px",
        textShadow: "0 0 10px rgba(0, 230, 230, 0.6)",
    }),
    subHeader: {
        textAlign: "center",
        color: "#cfd8dc",
        marginBottom: "30px",
        fontSize: "16px",
    },
    input: {
        width: "100%",
        padding: "16px 20px",
        marginBottom: "18px",
        border: "none",
        borderRadius: "12px",
        background: "rgba(0, 0, 0, 0.3)",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
        color: "#e0f7fa", 
        fontSize: "17px",
        boxSizing: "border-box",
        transition: "all 0.3s",
    },
    button: (isForget, loading) => ({
        width: "100%",
        padding: "18px",
        marginTop: isForget ? "30px" : "30px",
        border: "none",
        borderRadius: "12px",
        background: loading 
            ? "#00665c" 
            : "linear-gradient(45deg, #ff4081, #e040fb)",
        color: "white",
        fontSize: "20px",
        fontWeight: "bold",
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: loading ? "none" : "0 6px 20px rgba(255, 64, 129, 0.4)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: loading ? 0.8 : 1,
    }),
    linkButton: {
        width: "100%",
        textAlign: "right",
        marginTop: "10px",
        cursor: "pointer",
        color: "#00e6e6",
        fontSize: "14px",
        fontWeight: "500",
        textDecoration: "underline",
        opacity: 0.8,
        transition: "opacity 0.2s",
    },
    backButton: {
        marginTop: '20px',
        color: '#00e6e6',
        fontSize: '14px',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'block',
        textAlign: 'center',
    },
    message: (type) => ({
        padding: "14px",
        borderRadius: "10px",
        marginTop: "20px",
        textAlign: "center",
        color: type === 'error' ? '#ff4081' : '#00e6e6',
        background: type === 'error' ? 'rgba(255, 64, 129, 0.15)' : 'rgba(0, 230, 230, 0.15)',
        fontWeight: "600",
        border: `1px solid ${type === 'error' ? '#ff4081' : '#00e6e6'}`,
    }),
};

// 🌍 Floating Elements Data (NGO theme)
const floatingElements = [
    { id: 1, type: 'circle', color: '#00e6e6', size: '80px', top: '15%', left: '10%', duration: '20s', delay: '0s' },
    { id: 2, type: 'square', color: '#ff4081', size: '100px', top: '75%', left: '80%', duration: '25s', delay: '5s' },
    { id: 3, type: 'triangle', color: '#e040fb', size: '60px', top: '40%', left: '5%', duration: '15s', delay: '10s' },
    { id: 4, type: 'circle', color: '#ffc107', size: '120px', top: '25%', left: '65%', duration: '30s', delay: '15s' },
];


export default function NgoLogin() {
    const [formData, setFormData] = useState({});
    // 🚨 NEW: 'login' या 'forget' view को मैनेज करने के लिए
    const [view, setView] = useState('login'); 
    // 🚨 NEW: Forget Password flow के लिए email state
    const [forgetEmail, setForgetEmail] = useState(""); 

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    // 📝 Form Input Handler (Login View)
    const handleChange = (e) => {
        if (e.target.name === 'username' || e.target.name === 'password') {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // 🚨 NEW: Forget Password Handler - View Switch
    const handleForgetPasswordClick = () => {
        setView('forget');
        setMessage({ text: "", type: "" }); // Clear previous messages
        setForgetEmail(""); // Clear email field
    };
    
    // 🚨 NEW: Back to Login Handler - View Switch
    const handleBackToLogin = () => {
        setView('login');
        setMessage({ text: "", type: "" }); // Clear previous messages
    };

    // 🔐 Login Handler (JWT Integration)
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
            const response = await fetch("https://healthtracker-5.onrender.com/healthtech/Ngo/ngologin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData), 
            });
            
            setLoading(false);

            if (response.ok) {
                const jwtToken = await response.text(); 
                localStorage.setItem("ngo_token", jwtToken); 
                
                setMessage({ text: "✅ Login Successful! Accessing NGO Dashboard...", type: "success" });
                
                setTimeout(() => {
                    navigate("/ngo-dashboard");
                }, 500);

            } else {
                const errorText = await response.text();
                let displayError = "Login failed. Please check credentials.";
                
                if (errorText.includes("Incoorect Username Password")) {
                    displayError = "Incorrect Username or Password. Please try again.";
                } else {
                    displayError = `Server Error: ${errorText.substring(0, 80)}...`;
                }

                setMessage({ text: `❌ Failed: ${displayError}`, type: "error" });
            }
        } catch (err) {
            setLoading(false);
            console.error("Login error:", err);
            setMessage({ text: "❌ Network error. Check server status (https://healthtracker-5).", type: "error" });
        }
    };

    // 📧 NEW: Send Forget Password Email Handler (Forget View)
    const handleSendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        if (!forgetEmail) {
            setLoading(false);
            return setMessage({ text: "❌ Please enter your email address.", type: "error" });
        }

        // Backend Endpoint: /healthtech/Ngo/forget-passwordngo
        const url = `https://healthtracker-5.onrender.com/healthtech/Ngo/forget-passwordngo?email=${encodeURIComponent(forgetEmail)}`;
        
        try {
            // Your backend uses POST with @RequestParam, so we use POST with query params
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" }, 
            });
            
            setLoading(false);

            if (response.ok || response.status === 201) { 
                const resultText = await response.text();
                setMessage({ text: `✅ Success! ${resultText}`, type: "success" });
            } else {
                const errorText = await response.text();
                setMessage({ text: `❌ Failed to send email: ${errorText.substring(0, 100)}`, type: "error" });
            }
        } catch (err) {
            setLoading(false);
            console.error("API Error:", err);
            setMessage({ text: "❌ Network error. Could not connect to the server.", type: "error" });
        }
    };


    // 🌐 Global Style Reset
    useEffect(() => {
        const root = document.getElementById('root');
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.documentElement.style.overflowY = 'auto'; 
        document.documentElement.style.overflowX = 'hidden';
        if (root) {
            root.style.height = '100%';
            root.style.width = '100%';
        }
        return () => {
            document.documentElement.style.height = '';
            document.body.style.height = '';
            document.body.style.margin = '';
            document.body.style.padding = '';
            document.documentElement.style.overflowY = '';
            document.documentElement.style.overflowX = '';
            if (root) {
                root.style.height = '';
                root.style.width = '';
            }
        };
    }, []);
    
    // 🖱️ Button/Card Hover Effect Logic
    const cardStyle = {
        ...styles.card,
        transform: loading ? 'scale(1.01) rotateX(2deg)' : 'scale(1) rotateX(0deg)',
        opacity: loading ? 0.9 : 1,
    };
    
    const handleButtonHover = (e, isEnter) => {
        e.currentTarget.style.transform = isEnter ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = isEnter ? '0 10px 30px rgba(255, 64, 129, 0.8)' : styles.button.boxShadow;
    };
    

    return (
        <div style={styles.container}>
            {/* 🚀 ANIMATION STYLES */}
            <style>{`
            @keyframes floatRotate {
                0% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
                50% { transform: translate(10vw, -10vh) rotate(90deg); opacity: 0.6; }
                100% { transform: translate(0, 0) rotate(180deg); opacity: 0.6; }
            }
            @keyframes inputFocusGlow {
                0%, 100% { box-shadow: 0 0 5px #00e6e6, inset 0 2px 4px rgba(0,0,0,0.6); }
                50% { box-shadow: 0 0 10px #00e6e6, inset 0 2px 4px rgba(0,0,0,0.6); }
            }

            .floating-element { position: absolute; background: currentColor; opacity: 0.2; animation: floatRotate infinite ease-in-out; z-index: 1; filter: drop-shadow(0 0 10px currentColor); }
            .circle { border-radius: 50%; }
            .square { border-radius: 20%; }
            .triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); border-radius: 0; }
            
            .input-focus:focus {
                outline: none; border: 1px solid #00e6e6; animation: inputFocusGlow 1.5s infinite alternate;
            }
            .link-button:hover {
                opacity: 1;
            }
            `}</style>

            {/* 🌌 FLOATING ELEMENTS (Background Animation) */}
            {floatingElements.map((element) => (
                <div
                    key={element.id}
                    className={`floating-element ${element.type}`}
                    style={{
                        top: element.top, left: element.left, width: element.size, height: element.size,
                        animationDuration: element.duration, animationDelay: element.delay, color: element.color,
                    }}
                />
            ))}

            {/* 💎 NGO Login Card */}
            <div style={cardStyle}>
                
                {/* Conditional Rendering based on View State */}
                {view === 'login' ? (
                    // --- LOGIN FORM ---
                    <>
                        <h2 style={styles.header(false)}>
                            🌍 NGO Login
                        </h2>

                        <form onSubmit={handleLogin}>
                            <input
                                style={styles.input}
                                className="input-focus"
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
                                className="input-focus"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password || ""}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                            
                            {/* 🚨 Forget Password Button */}
                            <div 
                                style={styles.linkButton}
                                className="link-button"
                                onClick={loading ? null : handleForgetPasswordClick}
                            >
                                Forgot Password?
                            </div>

                            {/* 🟢 Action Button */}
                            <button
                                type="submit"
                                style={styles.button(false, loading)}
                                onMouseEnter={(e) => handleButtonHover(e, true)}
                                onMouseLeave={(e) => handleButtonHover(e, false)}
                                disabled={loading}
                            >
                                {loading ? "🔄 AUTHENTICATING..." : "🔓 LOGIN"}
                            </button>
                        </form>
                    </>
                ) : (
                    // --- FORGET PASSWORD FORM ---
                    <>
                        <h2 style={styles.header(true)}>
                            🔒 Reset Password
                        </h2>
                        <p style={styles.subHeader}>
                            Enter your registered email to receive the reset link.
                        </p>

                        <form onSubmit={handleSendEmail}>
                            <input
                                style={styles.input}
                                className="input-focus"
                                type="email"
                                placeholder="Registered Email Address"
                                value={forgetEmail}
                                onChange={(e) => setForgetEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                            
                            <button
                                type="submit"
                                style={styles.button(true, loading)}
                                disabled={loading}
                                onMouseEnter={(e) => handleButtonHover(e, true)}
                                onMouseLeave={(e) => handleButtonHover(e, false)}
                            >
                                {loading ? "🔄 SENDING LINK..." : "📧 SEND RESET LINK"}
                            </button>
                        </form>

                        {/* Back to Login Link */}
                        <span 
                            style={styles.backButton}
                            className="link-button"
                            onClick={loading ? null : handleBackToLogin}
                        >
                            ← Back to Login
                        </span>
                    </>
                )}
                

                {/* 💬 Message Display (दोनों views के लिए) */}
                {message.text && (
                    <p style={styles.message(message.type)}>{message.text}</p>
                )}
            </div>
        </div>
    );
}