import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 

// 🎨 Advanced Medical/Tech Theme Styles
const styles = {
    // 🌌 Full Screen Container: Dark, Animated Background
    container: {
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // Attractive dark gradient background
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3d 50%, #2d1b69 100%)",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden", 
        boxSizing: "border-box",
        padding: "20px",
    },
    // 💎 Glass Card (Floating)
    glassCard: {
        background: "rgba(255, 255, 255, 0.15)",
        padding: "40px",
        borderRadius: "24px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        maxWidth: "480px", 
        width: "100%",
        zIndex: 20,
        transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        boxSizing: "border-box",
        animation: 'cardFloat 10s infinite ease-in-out', 
    },
    header: {
        textAlign: "center", 
        color: "white",
        marginBottom: "10px",
        fontSize: "32px",
        fontWeight: "800",
        textShadow: "0 0 10px rgba(0, 255, 204, 0.4)", // Neon glow
    },
    subHeader: {
        textAlign: "center",
        color: "#ccc",
        marginBottom: "30px",
        fontSize: "16px",
        fontWeight: "400",
    },
    // Input field styling (with handling for disabled state)
    input: (disabled) => ({
        width: "100%",
        padding: "14px 18px",
        marginBottom: "20px",
        border: "1px solid transparent", 
        borderRadius: "10px",
        background: disabled ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.95)",
        color: "#222",
        fontSize: "17px",
        boxSizing: "border-box",
        transition: "all 0.3s",
        outline: 'none',
        cursor: disabled ? 'not-allowed' : 'text',
        ':focus': {
            boxShadow: '0 0 0 3px #00cc99, 0 0 10px rgba(0, 204, 153, 0.7)',
            borderColor: '#00cc99',
        }
    }),
    // Button styling (with handling for loading/disabled state)
    button: (loading, disabled) => ({
        width: "100%",
        padding: "16px",
        marginTop: "10px",
        border: "none",
        borderRadius: "10px",
        background: loading || disabled ? "#007a5e" : "#00cc99", // Darker green when disabled/loading
        color: "white",
        fontSize: "19px",
        fontWeight: "bold",
        cursor: loading || disabled ? "not-allowed" : "pointer",
        transition: "background 0.3s ease, transform 0.1s ease, box-shadow 0.3s",
        boxShadow: loading || disabled ? "0 2px 5px rgba(0,0,0,0.4)" : "0 8px 20px rgba(0, 204, 153, 0.5)",
        ':hover': {
            background: loading || disabled ? "#007a5e" : "#00e6a3",
            transform: loading || disabled ? 'scale(1)' : 'translateY(-2px)',
        }
    }),
    message: (type) => ({
        padding: "12px",
        borderRadius: "10px",
        marginTop: "20px",
        textAlign: "center",
        fontWeight: "700",
        fontSize: "16px",
        border: `2px solid ${type === 'error' ? '#ff4d4d' : '#00cc99'}`,
        color: type === 'error' ? '#ff4d4d' : '#00cc99',
        background: type === 'error' ? 'rgba(255, 77, 77, 0.15)' : 'rgba(0, 204, 153, 0.15)',
        transition: 'opacity 0.5s',
        opacity: 1,
    }),
    errorText: {
        color: '#ff4d4d',
        fontSize: '14px',
        marginTop: '-10px',
        marginBottom: '20px',
        fontWeight: '600',
        textAlign: 'left',
    }
};

// 🌌 Background Animated Elements for Medical/Tech theme
const animatedElements = [
    { id: 1, type: 'dna', color: '#a29bfe', size: '150px', top: '10%', left: '5%', duration: '20s', delay: '0s' },
    { id: 2, type: 'heart', color: '#ff4757', size: '80px', top: '70%', left: '85%', duration: '8s', delay: '1s' },
    { id: 3, type: 'pulse', color: '#00cc99', size: '120px', top: '45%', left: '20%', duration: '15s', delay: '2s' },
    { id: 4, type: 'dna', color: '#fd79a8', size: '180px', top: '80%', left: '60%', duration: '25s', delay: '5s' },
    { id: 5, type: 'pulse', color: '#74b9ff', size: '90px', top: '25%', left: '70%', duration: '12s', delay: '8s' },
    { id: 6, type: 'heart', color: '#ff6b7a', size: '100px', top: '5%', left: '90%', duration: '10s', delay: '3s' },
];

// Component definition
export default function HospitalPasswordUpdate() {
    const [searchParams] = useSearchParams();
    const emailFromUrl = searchParams.get('email');

    // State initialization, includes all three fields (Email, New Password, Confirm Password)
    const [passwordData, setPasswordData] = useState({
        email: emailFromUrl || '', // Pre-fill if present in URL
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    // 📝 Input Handler
    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
        if (passwordMatchError && e.target.name === 'confirmPassword') {
            setPasswordMatchError(false);
        }
    };
    
    // 🔐 Password Update Handler with Exponential Backoff
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });

        const { email, newPassword, confirmPassword } = passwordData;

        // Validation Checks
        if (!email || !newPassword || !confirmPassword) {
            return setMessage({ text: "❌ All three fields are required.", type: "error" });
        }
        if (newPassword !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        }
        if (newPassword.length < 6) {
            return setMessage({ text: "❌ Password must be at least 6 characters long.", type: "error" });
        }
        setPasswordMatchError(false);
        setLoading(true);

        // API URL matching your Spring @RequestParam backend:
        const url = `https://healthtracker-5.onrender.com/healthtech/hospital/password-hospital?email=${encodeURIComponent(email)}&password=${encodeURIComponent(newPassword)}`;
        
        const maxRetries = 3;
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                });
                
                setLoading(false);

                if (response.ok || response.status === 201) { // 201 CREATED (Your success status)
                    const resultText = await response.text();
                    setMessage({ text: `🎉 Success! ${resultText}`, type: "success" });
                    // Clear passwords after successful update
                    setPasswordData(prev => ({ ...prev, newPassword: '', confirmPassword: '' })); 
                    return; 
                } else if (response.status === 204) { // NO_CONTENT (Your error status for "Valid Email")
                    const errorText = await response.text();
                    // Display specific error from backend if available, otherwise generic
                    setMessage({ text: `❌ Update Failed: ${errorText.substring(0, 150) || 'Please enter a valid email.'}`, type: "error" });
                    return;
                }
                else {
                    const errorText = await response.text();
                    setMessage({ text: `❌ Server Error (${response.status}): ${errorText.substring(0, 150) || 'An unknown error occurred.'}`, type: "error" });
                    return; 
                }

            } catch (err) {
                attempt++;
                if (attempt >= maxRetries) {
                    setLoading(false);
                    console.error("Password Update error:", err);
                    setMessage({ text: "❌ Network error. Could not connect to the server after multiple attempts.", type: "error" });
                    return; 
                }
                // Exponential Backoff Delay
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
            }
        }
    };

    // 🌐 Global Style Reset (Ensures full screen fill)
    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';
        return () => {
            document.documentElement.style.height = '';
            document.body.style.height = '';
        };
    }, []);

    const cardStyle = {
        ...styles.glassCard,
        transform: loading ? 'scale(1.01) translateY(0)' : 'scale(1) translateY(0)',
        opacity: loading ? 0.9 : 1,
    };
    
    // Check if the form is completely filled and valid to enable the button
    const isFormValid = passwordData.email && passwordData.newPassword && passwordData.confirmPassword && !passwordMatchError;


    return (
        <div style={styles.container}>
            {/* 🚀 CSS ANIMATIONS AND ICONS (Hidden but applied via <style>) */}
            <style>{`
            @keyframes medicalFloat {
                0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.6; }
                50% { transform: translateY(-30px) rotate(10deg) scale(1.1); opacity: 0.8; }
            }
            @keyframes pulseGlow {
                0%, 100% { transform: scale(1); opacity: 0.4; }
                50% { transform: scale(1.2); opacity: 0.8; }
            }
            @keyframes cardFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-15px); }
            }

            .medical-element {
                position: absolute; 
                filter: drop-shadow(0 0 8px currentColor);
                z-index: 1;
                border-radius: 50%;
                opacity: 0.7;
            }
            .dna { 
                background: linear-gradient(45deg, var(--color-code-1), var(--color-code-2));
                animation: medicalFloat var(--duration) infinite ease-in-out var(--delay);
                border-radius: 50% 20% 50% 20% / 30% 50% 30% 50%;
            }
            .heart { 
                background: radial-gradient(circle, var(--color-code-1) 30%, var(--color-code-2) 70%);
                animation: medicalFloat var(--duration) infinite ease-in-out var(--delay), pulseGlow 1.5s infinite;
                clip-path: polygon(50% 0%, 61% 35%, 95% 35%, 78% 60%, 100% 100%, 45% 85%, 0% 100%, 23% 60%, 6% 35%, 38% 35%);
            }
            .pulse {
                background: radial-gradient(circle, var(--color-code-1) 10%, transparent 70%);
                box-shadow: 0 0 20px var(--color-code-1);
                animation: medicalFloat var(--duration) infinite ease-in-out var(--delay), pulseGlow 2s infinite linear;
            }
            `}</style>

            {/* 🌌 Animated Elements Render */}
            {animatedElements.map((element) => (
                <div
                    key={element.id}
                    className={`medical-element ${element.type}`} 
                    style={{
                        '--duration': element.duration,
                        '--delay': element.delay,
                        '--color-code-1': element.color,
                        '--color-code-2': element.color === '#a29bfe' ? '#fd79a8' : (element.color === '#ff4757' ? '#ff6b7a' : '#55a3ff'),
                        top: element.top,
                        left: element.left,
                        width: element.size,
                        height: element.size,
                        zIndex: 1,
                    }}
                />
            ))}

            {/* 💎 Glass Card Form */}
            <div style={cardStyle}>
                <h2 style={styles.header}>
                    🔒 Update Hospital Password
                </h2>
                <p style={styles.subHeader}>
                    Enter your registered email and new password details.
                </p>

                <form onSubmit={handleSubmit}>
                    
                    {/* 1. 📧 Email Field (now fully clickable) */}
                    <label style={{display: 'block', color: '#ccc', marginBottom: '5px', fontSize: '14px'}}>Registered Email</label>
                    <input
                        style={styles.input(!!emailFromUrl)}
                        type="email"
                        name="email"
                        placeholder="Registered Email Address"
                        value={passwordData.email}
                        onChange={handleChange}
                        required
                        disabled={loading || !!emailFromUrl} // Disabled if email comes from URL
                    />

                    {/* 2. New Password Field */}
                    <label style={{display: 'block', color: '#ccc', marginTop: '10px', marginBottom: '5px', fontSize: '14px'}}>New Password (min 6 chars)</label>
                    <input
                        style={styles.input(false)}
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={passwordData.newPassword}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    
                    {/* 3. Confirm Password Field */}
                    <label style={{display: 'block', color: '#ccc', marginTop: '10px', marginBottom: '5px', fontSize: '14px'}}>Confirm New Password</label>
                    <input
                        style={{...styles.input(false), borderColor: passwordMatchError ? '#ff4d4d' : 'transparent'}}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={passwordData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    {passwordMatchError && (
                        <p style={styles.errorText}>
                            Passwords do not match.
                        </p>
                    )}
                    
                    {/* 🟢 Action Button */}
                    <button
                        type="submit"
                        style={styles.button(loading, !isFormValid)}
                        disabled={loading || !isFormValid}
                    >
                        {loading ? "🔄 UPDATING..." : "✅ SET NEW PASSWORD"}
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