// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // 🌟 NGO THEME STYLES: Hope, Transparency, and Global Impact
// const styles = {
//     // ⭐ Modern Container Design (Center aligned)
//     container: {
//         minHeight: "100vh",
//         width: "100vw",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         // Vibrant Gradient: Purple/Blue (Global reach) to Cyan/Teal (Hope)
//         background: "linear-gradient(135deg, #0e1a3d 0%, #1a3a63 50%, #009688 100%)",
//         fontFamily: "'Poppins', sans-serif",
//         position: "relative",
//         overflow: "hidden", 
//         boxSizing: "border-box",
//         padding: "20px",
//     },
//     // ⭐ Soft Glassmorphism Card
//     card: {
//         background: "rgba(255, 255, 255, 0.15)", // हल्का पारदर्शी
//         padding: "45px",
//         borderRadius: "25px",
//         // Soft Shadow for depth
//         boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
//         backdropFilter: "blur(15px)",
//         WebkitBackdropFilter: "blur(15px)",
//         maxWidth: "550px", // Increased width for better form flow
//         width: "100%",
//         zIndex: 10,
//         transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//         boxSizing: "border-box",
//         perspective: '1000px', // For 3D button effect
//     },
//     header: {
//         textAlign: "center", 
//         // Bright Cyan
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
//         // Semi-transparent background
//         background: "rgba(0, 0, 0, 0.3)",
//         boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
//         color: "#e0f7fa", // Very light color for text
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
//         background: "linear-gradient(45deg, #ff4081, #e040fb)", // Pink/Purple blend
//         color: "white",
//         fontSize: "20px",
//         fontWeight: "bold",
//         cursor: "pointer",
//         // Soft lift shadow
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

// // 📝 Signup Fields (आपके @Document के अनुसार)
// const signupFields = [
//     { name: "username", placeholder: "Username (Unique)", type: "text" },
//     { name: "password", placeholder: "Password", type: "password" },
//     { name: "email", placeholder: "Email", type: "email" },
//     { name: "ngoName", placeholder: "NGO Name", type: "text" },
//     { name: "registration_number", placeholder: "Registration Number", type: "text" },
//     { name: "contact_number", placeholder: "Contact Number", type: "text" },
//     { name: "address", placeholder: "Address", type: "text" },
//     { name: "city", placeholder: "City", type: "text" },
// ];

// // 🌍 Floating Elements Data (Representing Global Reach & Impact)
// const floatingElements = [
//     { id: 1, type: 'circle', color: '#00e6e6', size: '80px', top: '15%', left: '10%', duration: '20s', delay: '0s' },
//     { id: 2, type: 'square', color: '#ff4081', size: '100px', top: '75%', left: '80%', duration: '25s', delay: '5s' },
//     { id: 3, type: 'triangle', color: '#e040fb', size: '60px', top: '40%', left: '5%', duration: '15s', delay: '10s' },
//     { id: 4, type: 'circle', color: '#ffc107', size: '120px', top: '25%', left: '65%', duration: '30s', delay: '15s' },
// ];


// export default function NgoSignup() {
//     const [formData, setFormData] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState({ text: "", type: "" });
//     const navigate = useNavigate();

//     // 📝 Form Input Handler
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // ✅ Signup Handler
//     const handleSignup = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage({ text: "", type: "" });

//         const missing = signupFields.find(field => !formData[field.name] || formData[field.name].trim() === "");
//         if (missing) {
//             setLoading(false);
//             return setMessage({ text: `❌ Please fill in the ${missing.placeholder}.`, type: "error" });
//         }
        
//         try {
//             const response = await fetch("http://localhost:8080/healthtech/Ngo/createngo", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData),
//             });
            
//             setLoading(false);

//             if (response.ok) {
//                 setMessage({ text: "✅ Registration Successful! Redirecting to Login...", type: "success" });
                
//                 // ⭐ Redirection to NGO Login Page
//                 setTimeout(() => {
//                     navigate("/ngo-login"); 
//                 }, 1500);

//             } else {
//                 const errorText = await response.text();
//                 let displayError = "Registration failed. Please check your data.";
                
//                 // Backend Error Handling (based on your Java code)
//                 if (errorText.includes("User Is Already Exits")) {
//                     displayError = "Username is already taken. Choose another one.";
//                 } else if (errorText.includes("This Email Is Already User")) {
//                     displayError = "Email address is already registered. Use a new email.";
//                 } else if (errorText.includes("User Email Incorrect")) {
//                     displayError = "Invalid email format. Please enter a valid email.";
//                 } else {
//                     displayError = `Server Error: ${errorText.substring(0, 80)}...`;
//                 }

//                 setMessage({ text: `❌ Failed: ${displayError}`, type: "error" });
//             }
//         } catch (err) {
//             setLoading(false);
//             console.error("Signup error:", err);
//             setMessage({ text: "❌ Network error. Check server status (http://localhost:8080).", type: "error" });
//         }
//     };

//     // 🌐 Global Style Reset (Ensures full screen background)
//     useEffect(() => {
//         // ... (Cleanup code remains the same as before for full height) ...
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
//             {/* 🚀 ANIMATION STYLES */}
//             <style>{`
//             @keyframes floatRotate {
//                 0% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
//                 25% { transform: translate(15vw, -5vh) rotate(45deg); opacity: 0.9; }
//                 50% { transform: translate(0, -10vh) rotate(90deg); opacity: 0.6; }
//                 75% { transform: translate(-10vw, -5vh) rotate(135deg); opacity: 0.9; }
//                 100% { transform: translate(0, 0) rotate(180deg); opacity: 0.6; }
//             }
//             @keyframes inputFocusGlow {
//                 0%, 100% { box-shadow: 0 0 5px #00e6e6, inset 0 2px 4px rgba(0,0,0,0.6); }
//                 50% { box-shadow: 0 0 10px #00e6e6, inset 0 2px 4px rgba(0,0,0,0.6); }
//             }

//             .floating-element {
//                 position: absolute;
//                 background: currentColor;
//                 opacity: 0.2;
//                 animation: floatRotate infinite ease-in-out;
//                 z-index: 1; 
//                 filter: drop-shadow(0 0 10px currentColor);
//             }
            
//             .circle { border-radius: 50%; }
//             .square { border-radius: 20%; }
//             .triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); border-radius: 0; }
            
//             .input-focus:focus {
//                 outline: none;
//                 border: 1px solid #00e6e6;
//                 animation: inputFocusGlow 1.5s infinite alternate;
//             }
//             `}</style>

//             {/* 🌌 FLOATING ELEMENTS (Background Animation) */}
//             {floatingElements.map((element) => (
//                 <div
//                     key={element.id}
//                     className={`floating-element ${element.type}`}
//                     style={{
//                         top: element.top,
//                         left: element.left,
//                         width: element.size,
//                         height: element.size,
//                         animationDuration: element.duration,
//                         animationDelay: element.delay,
//                         color: element.color, // uses color for background and shadow
//                     }}
//                 />
//             ))}

//             {/* 💎 NGO Signup Card */}
//             <div style={cardStyle}>
//                 <h2 style={styles.header}>
//                     🤝 NGO Registration
//                 </h2>

//                 <form onSubmit={handleSignup}>
//                     {signupFields.map(field => (
//                         <input
//                             key={field.name}
//                             style={styles.input}
//                             className="input-focus"
//                             type={field.type}
//                             name={field.name}
//                             placeholder={field.placeholder}
//                             value={formData[field.name] || ""}
//                             onChange={handleChange}
//                             required
//                             disabled={loading}
//                         />
//                     ))}

//                     {/* 🟢 Action Button */}
//                     <button
//                         type="submit"
//                         style={{ ...styles.button, opacity: loading ? 0.8 : 1 }}
//                         onMouseEnter={(e) => handleButtonHover(e, true)}
//                         onMouseLeave={(e) => handleButtonHover(e, false)}
//                         disabled={loading}
//                     >
//                         {loading ? "🔄 REGISTERING..." : "🚀 SIGN UP"}
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🌟 NGO THEME STYLES (same as before)
const styles = {
    // ... (सभी styles same रहेंगे - कोई change नहीं)
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
        maxWidth: "550px",
        width: "100%",
        zIndex: 10,
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxSizing: "border-box",
        perspective: '1000px',
    },
    header: {
        textAlign: "center", 
        color: "#00e6e6", 
        marginBottom: "35px",
        fontSize: "36px",
        fontWeight: "800",
        letterSpacing: "1px",
        textShadow: "0 0 10px rgba(0, 230, 230, 0.6)",
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
    button: {
        width: "100%",
        padding: "18px",
        marginTop: "30px",
        border: "none",
        borderRadius: "12px",
        background: "linear-gradient(45deg, #ff4081, #e040fb)",
        color: "white",
        fontSize: "20px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 6px 20px rgba(255, 64, 129, 0.4)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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

// Signup Fields (same)
const signupFields = [
    { name: "username", placeholder: "Username (Unique)", type: "text" },
    { name: "password", placeholder: "Password", type: "password" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "ngoName", placeholder: "NGO Name", type: "text" },
    { name: "registration_number", placeholder: "Registration Number", type: "text" },
    { name: "contact_number", placeholder: "Contact Number", type: "text" },
    { name: "address", placeholder: "Address", type: "text" },
    { name: "city", placeholder: "City", type: "text" },
];

// Floating Elements (same)
const floatingElements = [
    { id: 1, type: 'circle', color: '#00e6e6', size: '80px', top: '15%', left: '10%', duration: '20s', delay: '0s' },
    { id: 2, type: 'square', color: '#ff4081', size: '100px', top: '75%', left: '80%', duration: '25s', delay: '5s' },
    { id: 3, type: 'triangle', color: '#e040fb', size: '60px', top: '40%', left: '5%', duration: '15s', delay: '10s' },
    { id: 4, type: 'circle', color: '#ffc107', size: '120px', top: '25%', left: '65%', duration: '30s', delay: '15s' },
];

export default function NgoSignup() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    // 📝 Form Input Handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ FIXED SIGNUP HANDLER - IMMEDIATE REDIRECT TO LOGIN
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        // Validation
        const missing = signupFields.find(field => !formData[field.name] || formData[field.name].trim() === "");
        if (missing) {
            setLoading(false);
            return setMessage({ text: `❌ Please fill in the ${missing.placeholder}.`, type: "error" });
        }
        
        try {
            const response = await fetch("https://healthtracker-5.onrender.com/healthtech/Ngo/createngo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            
            setLoading(false);

            if (response.ok) {
                // ✅ SUCCESS MESSAGE + INSTANT REDIRECT TO NGO LOGIN
                setMessage({ text: "✅ Registration Successful! Redirecting...", type: "success" });
                
                // 🚀 IMMEDIATE REDIRECT TO LOGIN PAGE (1.5 second delay for user feedback)
                setTimeout(() => {
                    navigate("/ngo/login");  // ✅ यह आपका NGO Login page route है
                }, 1500);

            } else {
                const errorText = await response.text();
                let displayError = "Registration failed. Please check your data.";
                
                if (errorText.includes("User Is Already Exits")) {
                    displayError = "Username is already taken. Choose another one.";
                } else if (errorText.includes("This Email Is Already User")) {
                    displayError = "Email address is already registered. Use a new email.";
                } else if (errorText.includes("User Email Incorrect")) {
                    displayError = "Invalid email format. Please enter a valid email.";
                } else {
                    displayError = `Server Error: ${errorText.substring(0, 80)}...`;
                }

                setMessage({ text: `❌ Failed: ${displayError}`, type: "error" });
            }
        } catch (err) {
            setLoading(false);
            console.error("Signup error:", err);
            setMessage({ text: "❌ Network error. Check server status (http://localhost:8080).", type: "error" });
        }
    };

    // 🌐 Global Style Reset (same)
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

    // Button/Card Hover Effects (same)
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
            {/* 🚀 ANIMATION STYLES (same) */}
            <style>{`
                @keyframes floatRotate {
                    0% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
                    25% { transform: translate(15vw, -5vh) rotate(45deg); opacity: 0.9; }
                    50% { transform: translate(0, -10vh) rotate(90deg); opacity: 0.6; }
                    75% { transform: translate(-10vw, -5vh) rotate(135deg); opacity: 0.9; }
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
                .input-focus:focus { outline: none; border: 1px solid #00e6e6; animation: inputFocusGlow 1.5s infinite alternate; }
            `}</style>

            {/* 🌌 FLOATING ELEMENTS */}
            {floatingElements.map((element) => (
                <div
                    key={element.id}
                    className={`floating-element ${element.type}`}
                    style={{
                        top: element.top,
                        left: element.left,
                        width: element.size,
                        height: element.size,
                        animationDuration: element.duration,
                        animationDelay: element.delay,
                        color: element.color,
                    }}
                />
            ))}

            {/* 💎 NGO Signup Card */}
            <div style={cardStyle}>
                <h2 style={styles.header}>
                    🤝 NGO Registration
                </h2>

                <form onSubmit={handleSignup}>
                    {signupFields.map(field => (
                        <input
                            key={field.name}
                            style={styles.input}
                            className="input-focus"
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    ))}

                    <button
                        type="submit"
                        style={{ ...styles.button, opacity: loading ? 0.8 : 1 }}
                        onMouseEnter={(e) => handleButtonHover(e, true)}
                        onMouseLeave={(e) => handleButtonHover(e, false)}
                        disabled={loading}
                    >
                        {loading ? "🔄 REGISTERING..." : "🚀 SIGN UP"}
                    </button>
                </form>

                {message.text && (
                    <p style={styles.message(message.type)}>{message.text}</p>
                )}
            </div>
        </div>
    );
}
