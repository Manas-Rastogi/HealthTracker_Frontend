import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ResetPasswordUser() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const floatSlow = { y: [0, -15, 0] };
    const floatDuration = { repeat: Infinity, duration: 4, ease: "easeInOut" };

    async function handlePasswordReset(e) {
        e.preventDefault();
        setError("");
        setMessage("");

        if (password !== confirmPassword) {
            setError("Passwords do not match. Please confirm correctly.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        
        setBusy(true);

        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);

        try {
            const url = `https://healthtracker-5.onrender.com/healthtech/user/password-user`;
            
            const res = await fetch(url, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData.toString(),
            });

            if (res.status === 204) {
                throw new Error("Invalid Email/User Not Found.");
            }

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Password reset failed: ${errorText.substring(0, 100)}`);
            }

            const responseText = await res.text();
            setMessage(responseText || "Password updated successfully!");

            setTimeout(() => nav("/user/login"), 4000);

        } catch (err) {
            console.error("Password Reset Error:", err);
            setError(err.message || "Failed to reset password. Please check network.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="reset-root" role="main" aria-labelledby="reset-heading">
            {/* Background Animations */}
            <div className="reset-bg">
                <motion.div 
                    className="blob b-blue" 
                    animate={{ x: [0, 100, 0], y: [0, -100, 0] }} 
                    transition={floatDuration}
                />
                <motion.div 
                    className="blob b-red" 
                    animate={{ x: [0, -150, 0], y: [0, 50, 0] }} 
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                />
            </div>

            {/* Central Card with Motion */}
            <motion.section 
                className="reset-center" 
                variants={cardVariants}
                initial="hidden" 
                animate="visible"
            >
                <div className="reset-card" role="form">
                    <header className="reset-head">
                        <h1 id="reset-heading">🔐 Secure Password Reset</h1> 
                        <p className="reset-sub">Enter your registered email and new secure password.</p>
                    </header>

                    <form className="reset-form" onSubmit={handlePasswordReset}>
                        {error && <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="reset-error" role="alert">{error}</motion.div>}
                        {message && <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="reset-success" role="alert">{message} Redirecting...</motion.div>}

                        <label className="reset-label">
                            Registered Email
                            <input
                                className="reset-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g. yourname@example.com"
                                required
                            />
                        </label>
                        
                        <label className="reset-label">
                            New Password
                            <input
                                className="reset-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Minimum 6 characters"
                                required
                            />
                        </label>

                        <label className="reset-label">
                            Confirm New Password
                            <input
                                className="reset-input"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter new password"
                                required
                            />
                        </label>

                        <div className="reset-actions">
                            <motion.button 
                                type="submit" 
                                className="reset-btn reset-primary" 
                                whileTap={{ scale: 0.95 }} 
                                disabled={busy || message}
                            >
                                {busy ? "Updating..." : "Update Password"}
                            </motion.button>
                        </div>
                        
                        <button 
                            type="button" 
                            className="reset-link" 
                            onClick={() => nav("/user/login")}
                            disabled={busy || message}
                        >
                            Back to Login
                        </button>
                    </form>
                </div>
            </motion.section>

            {/* FIXED CSS - Complete Layout Solution */}
            <style>{`
                * { box-sizing: border-box; }
                
                :root {
                    --dark-bg: #0a1128;
                    --card-bg: rgba(255, 255, 255, 0.05);
                    --text-color: #f0f4f8;
                    --muted-color: #a0aec0;
                    --primary-color: #4c51bf;
                    --primary-hover: #667eea;
                    --error-color: #e53e3e;
                    --success-color: #38a169;
                    --glass-border: rgba(255, 255, 255, 0.1);
                }

                /* GLOBAL RESET - यह जरूरी है */
                html, body, #root {
                    width: 100%;
                    min-width: 100%;
                    max-width: 100%;
                    margin: 0 !important;
                    padding: 0 !important;
                    overflow-x: hidden !important;
                }

                .reset-root {
                    width: 100vw !important;
                    min-height: 100vh;
                    height: 100vh;
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--dark-bg);
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    color: var(--text-color);
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    overflow: hidden !important;
                    z-index: 9999 !important;
                }

                .reset-bg { 
                    position: absolute; 
                    inset: 0; 
                    z-index: 0; 
                    pointer-events: none; 
                    overflow: hidden;
                }
                
                .blob { 
                    position: absolute; 
                    width: min(400px, 30vw); 
                    height: min(400px, 30vh);
                    border-radius: 50%; 
                    filter: blur(100px); 
                    opacity: 0.25; 
                    transition: all 1s ease-in-out; 
                }
                .b-blue { background: #3182ce; top: 10%; left: 5%; }
                .b-red { 
                    background: #e53e3e; 
                    bottom: 10%; 
                    right: 5%; 
                }

                .reset-center { 
                    position: relative; 
                    z-index: 10; 
                    width: 100%; 
                    max-width: 450px; 
                    padding: 1rem; 
                    margin: 0 1rem;
                    box-sizing: border-box; 
                }

                .reset-card { 
                    background: var(--card-bg); 
                    border-radius: 20px; 
                    padding: 2.5rem 2rem; 
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5); 
                    border: 1px solid var(--glass-border);
                    backdrop-filter: blur(8px);
                    width: 100%;
                }

                .reset-head { text-align: center; margin-bottom: 1.5rem; }
                .reset-head h1 { font-size: clamp(22px, 5vw, 28px); margin: 0; color: #fff; }
                .reset-sub { font-size: 14px; color: var(--muted-color); margin-top: 0.5rem; }

                .reset-form { display: flex; flex-direction: column; gap: 1rem; }
                
                .reset-label { 
                    display: flex; 
                    flex-direction: column; 
                    color: var(--muted-color); 
                    font-size: 13px; 
                    font-weight: 500;
                }

                .reset-input { 
                    margin-top: 0.5rem; 
                    padding: 0.75rem 1rem; 
                    border-radius: 10px; 
                    background: rgba(255, 255, 255, 0.08); 
                    border: 1px solid var(--glass-border); 
                    color: var(--text-color); 
                    outline: none; 
                    transition: border-color 0.3s;
                    font-size: 15px;
                }
                .reset-input:focus { border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(76, 81, 191, 0.1); }
                .reset-input::placeholder { color: rgba(255, 255, 255, 0.3); }

                .reset-actions { margin-top: 1.25rem; }
                .reset-btn { 
                    width: 100%; 
                    padding: 0.875rem; 
                    border-radius: 10px; 
                    border: none; 
                    cursor: pointer; 
                    font-weight: 700; 
                    font-size: 16px;
                    transition: all 0.3s;
                }
                .reset-primary { 
                    background: var(--primary-color); 
                    color: white; 
                    box-shadow: 0 4px 15px rgba(76, 81, 191, 0.3); 
                }
                .reset-primary:hover:not(:disabled) { 
                    background: var(--primary-hover); 
                    transform: translateY(-1px);
                    box-shadow: 0 8px 25px rgba(76, 81, 191, 0.4);
                }
                .reset-primary:disabled { opacity: 0.6; cursor: not-allowed; }

                .reset-error { 
                    background: rgba(229, 62, 62, 0.15); 
                    padding: 0.75rem; 
                    border-radius: 10px; 
                    color: var(--error-color); 
                    border: 1px solid rgba(229, 62, 62, 0.3); 
                    font-size: 14px;
                    text-align: center;
                }

                .reset-success { 
                    background: rgba(56, 161, 105, 0.15); 
                    padding: 0.75rem; 
                    border-radius: 10px; 
                    color: var(--success-color); 
                    border: 1px solid rgba(56, 161, 105, 0.3); 
                    font-size: 14px;
                    text-align: center;
                }

                .reset-link { 
                    background: none; 
                    border: 0; 
                    color: var(--muted-color); 
                    text-decoration: none; 
                    cursor: pointer; 
                    margin-top: 1rem; 
                    font-size: 14px;
                    transition: all 0.3s;
                    text-align: center;
                }
                .reset-link:hover:not(:disabled) { 
                    color: var(--primary-color); 
                    text-decoration: underline;
                }
                .reset-link:disabled { opacity: 0.5; cursor: not-allowed; }

                /* PERFECT RESPONSIVE - हर screen पर काम करेगा */
                @media (max-width: 480px) {
                    .reset-root { padding: 0.5rem; }
                    .reset-center { padding: 0.5rem; margin: 0 0.5rem; }
                    .reset-card { padding: 1.5rem 1rem; }
                    .blob { display: none !important; } /* Mobile पर hide */
                }

                @media (max-width: 768px) {
                    .reset-center { max-width: 90vw; }
                }
            `}</style>
        </div>
    );
}
