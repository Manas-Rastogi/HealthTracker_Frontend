import React, { useState, useEffect } from "react";
// useNavigate को हटा दिया गया है क्योंकि यह स्टैंडअलोन है, लेकिन अगर आप इसे app में integrate करते हैं तो इसे वापस जोड़ सकते हैं।

// 🌟 NGO THEME STYLES (Modern, Animated Aesthetic)
const styles = {
    container: {
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // Vibrant background gradient
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
        // Enhanced Glassmorphism effect
        boxShadow: "0 15px 50px 0 rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        maxWidth: "480px",
        width: "100%",
        zIndex: 10,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        boxSizing: "border-box",
    },
    header: {
        textAlign: "center", 
        color: "#ffc107", // Bright yellow highlight
        marginBottom: "15px",
        fontSize: "36px",
        fontWeight: "900",
        letterSpacing: "1.5px",
        textShadow: "0 0 15px rgba(255, 193, 7, 0.8)",
    },
    subHeader: {
        textAlign: "center",
        color: "#e0f7fa",
        marginBottom: "30px",
        fontSize: "17px",
        fontWeight: "500",
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: '15px'
    },
    input: {
        width: "100%",
        padding: "16px 20px",
        marginBottom: "20px",
        border: "none",
        borderRadius: "12px",
        background: "rgba(0, 0, 0, 0.5)",
        boxShadow: "inset 0 4px 8px rgba(0,0,0,0.9)",
        color: "#e0f7fa", 
        fontSize: "18px",
        boxSizing: "border-box",
        transition: "all 0.3s",
    },
    button: (loading) => ({
        width: "100%",
        padding: "20px",
        marginTop: "35px",
        border: "none",
        borderRadius: "15px",
        // High-energy gradient for main action
        background: loading 
            ? "#00665c" 
            : "linear-gradient(90deg, #ff4081 0%, #e040fb 50%, #ff4081 100%)",
        backgroundSize: '200% 100%', // For gradient animation
        color: "white",
        fontSize: "22px",
        fontWeight: "bold",
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: loading ? "none" : "0 10px 30px rgba(255, 64, 129, 0.8)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: loading ? 0.8 : 1,
    }),
    message: (type) => ({
        padding: "16px",
        borderRadius: "12px",
        marginTop: "25px",
        textAlign: "center",
        // Contrast colors for feedback
        color: type === 'error' ? '#ff4081' : '#00e6e6',
        background: type === 'error' ? 'rgba(255, 64, 129, 0.25)' : 'rgba(0, 230, 230, 0.25)',
        fontWeight: "700",
        border: `2px solid ${type === 'error' ? '#ff4081' : '#00e6e6'}`,
        boxShadow: `0 0 15px ${type === 'error' ? '#ff4081' : '#00e6e6'}`,
    }),
};

// 🌍 Floating Elements Data (NGO theme)
const floatingElements = [
    { id: 1, type: 'circle', color: '#00e6e6', size: '120px', top: '15%', left: '10%', duration: '20s', delay: '0s' },
    { id: 2, type: 'square', color: '#ff4081', size: '150px', top: '75%', left: '80%', duration: '25s', delay: '5s' },
    { id: 3, type: 'triangle', color: '#e040fb', size: '90px', top: '40%', left: '5%', duration: '15s', delay: '10s' },
    { id: 4, type: 'circle', color: '#ffc107', size: '170px', top: '25%', left: '65%', duration: '30s', delay: '15s' },
];


export default function NgoResetPassword() {
    
    const [email, setEmail] = useState(""); 
    const [newPassword, setNewPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });


    // 🔑 Reset Password Handler (Uses the new backend endpoint)
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        // --- Frontend Validation ---
        if (!email || !newPassword || !confirmPassword) {
             setLoading(false);
            return setMessage({ text: "❌ Please fill in all fields.", type: "error" });
        }
        if (newPassword !== confirmPassword) {
            setLoading(false);
            return setMessage({ text: "❌ New passwords do not match.", type: "error" });
        }
        if (newPassword.length < 6) {
            setLoading(false);
            return setMessage({ text: "❌ Password must be at least 6 characters long.", type: "error" });
        }
        
        // Backend endpoint: /Ngo/password-ngo
        const url = `https://healthtracker-5.onrender.com/healthtech/Ngo/password-ngo?email=${encodeURIComponent(email)}&password=${encodeURIComponent(newPassword)}`;
        
        try {
            const response = await fetch(url, {
                method: "POST", // POST request as defined by your controller
                headers: { "Content-Type": "application/json" },
            });

            setLoading(false);

            if (response.ok || response.status === 201) {
                const resultText = await response.text();
                setMessage({ text: `🎉 ${resultText} | Password has been successfully updated.`, type: "success" });
                // Clear fields on success
                setNewPassword("");
                setConfirmPassword("");
            } else if (response.status === 204) {
                 setMessage({ text: "❌ Reset Failed: Please Enter Valid Email. Account not found.", type: "error" });
            } 
            else {
                const errorText = await response.text();
                setMessage({ text: `❌ Reset Failed: ${errorText.substring(0, 100)}`, type: "error" });
            }
        } catch (err) {
            setLoading(false);
            console.error("Reset API Error:", err);
            setMessage({ text: "❌ Network error. Could not connect to the server.", type: "error" });
        }
    };


    // 🌐 Global Style Reset (Important for fullscreen view)
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
        transform: loading ? 'scale(1.01) perspective(1000px) rotateX(2deg)' : 'scale(1) perspective(1000px) rotateX(0deg)',
        opacity: loading ? 0.9 : 1,
    };
    
    const handleButtonHover = (e, isEnter) => {
        e.currentTarget.style.transform = isEnter ? 'translateY(-4px) scale(1.04)' : 'translateY(0) scale(1)';
        e.currentTarget.style.backgroundPosition = isEnter ? '100% 0' : '0% 0';
        e.currentTarget.style.boxShadow = isEnter ? `0 15px 40px rgba(255, 64, 129, 1)` : styles.button().boxShadow;
    };
    

    return (
        <div style={styles.container}>
            {/* 🚀 ANIMATION STYLES */}
            <style>{`
            @keyframes floatRotate {
                0% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
                50% { transform: translate(15vw, -15vh) rotate(180deg); opacity: 0.6; }
                100% { transform: translate(0, 0) rotate(360deg); opacity: 0.6; }
            }
            @keyframes inputFocusGlow {
                0%, 100% { box-shadow: 0 0 10px #00e6e6, inset 0 4px 8px rgba(0,0,0,0.9); }
                50% { box-shadow: 0 0 20px #ffc107, inset 0 4px 8px rgba(0,0,0,0.9); }
            }

            .floating-element { 
                position: absolute; 
                background: currentColor; 
                opacity: 0.2; 
                animation: floatRotate infinite ease-in-out; 
                z-index: 1; 
                filter: drop-shadow(0 0 10px currentColor); 
            }
            .circle { border-radius: 50%; }
            .square { border-radius: 20%; }
            .triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); border-radius: 0; }
            
            .input-focus:focus {
                outline: none; 
                border: 2px solid #00e6e6; 
                animation: inputFocusGlow 2s infinite alternate;
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

            {/* 💎 NGO CARD */}
            <div style={cardStyle}>
                
                <h2 style={styles.header}>
                    🔑 NGO Password Reset
                </h2>
                <p style={styles.subHeader}>
                    Enter your email and set a new, secure password.
                </p>

                <form onSubmit={handleResetPassword}>
                    <input
                        style={styles.input}
                        className="input-focus"
                        type="email"
                        placeholder="Registered Email Address (NGO)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        style={styles.input}
                        className="input-focus"
                        type="password"
                        placeholder="New Password (min 6 characters)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        style={styles.input}
                        className="input-focus"
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                    
                    <button
                        type="submit"
                        style={styles.button(loading)}
                        disabled={loading}
                        onMouseEnter={(e) => handleButtonHover(e, true)}
                        onMouseLeave={(e) => handleButtonHover(e, false)}
                    >
                        {loading ? "🔄 UPDATING PASSWORD..." : "🔑 RESET PASSWORD"}
                    </button>
                </form>
                

                {/* 💬 Message Display */}
                {message.text && (
                    <p style={styles.message(message.type)}>{message.text}</p>
                )}
            </div>
        </div>
    );
}