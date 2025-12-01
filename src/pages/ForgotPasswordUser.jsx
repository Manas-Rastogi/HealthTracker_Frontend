import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ForgotPasswordUser() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    async function handleForgetPassword(e) {
        e.preventDefault();
        setError("");
        setMessage("");
        setBusy(true);

        try {
            // Note: Hum maan rahe hain ki backend http://localhost:8080/healthtech/user/forget-password par email accept karega
            // Aapko is URL ko apne backend endpoint ke hisaab se adjust karna hoga.
            const res = await fetch(`https://healthtracker-5.onrender.com/healthtech/user/forget-passworduser?email=${encodeURIComponent(email)}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Agar aap POST body mein email bhejte hain, toh body: JSON.stringify({ email: email }) use karein.
                // Abhi humne aapke NGO backend example ki tarah @RequestParam use kiya hai.
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Reset link failed (Status: ${res.status}). Response: ${errorText.substring(0, 100)}...`);
            }

            // Backend response ko directly message mein set kar rahe hain.
            const responseText = await res.text();
            setMessage(responseText || `Password reset link sent to ${email}. Check your email.`);
            
            // Optionally, navigate back to login after a delay
            // setTimeout(() => nav("/user/login"), 5000);

        } catch (err) {
            console.error("Forget Password Error:", err);
            setError(err.message || "Failed to send reset link. Please try again.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="laf-root" role="main" aria-labelledby="forgot-password-heading">
            {/* Background elements and styles (Same as UserLogin.jsx) */}
            <div className="laf-bg">
                <div className="blob b1" />
                <div className="blob b2" />
                <div className="blob b3" />
            </div>

            <motion.section 
                className="laf-center" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                style={{ maxWidth: '500px' }} // Center card size adjusted for this form
            >
                <div className="laf-card" role="form" aria-labelledby="forgot-password-heading" style={{ width: '100%', flexDirection: 'column' }}>
                    
                    <header className="laf-head" style={{ width: '100%', textAlign: 'center' }}>
                        <h1 id="forgot-password-heading">Reset Password</h1> 
                        <p className="laf-sub">Enter your email to receive a password reset link.</p>
                    </header>

                    <form className="laf-form" onSubmit={handleForgetPassword} style={{ width: '100%' }}>
                        {error && <div className="laf-error" role="alert">{error}</div>}
                        {message && <div className="laf-success" role="alert">{message}</div>}

                        <label className="laf-label">
                            Email Address
                            <input
                                className="laf-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="registered email address"
                                required
                                aria-label="Email Address"
                            />
                        </label>

                        <div className="laf-actions" style={{ marginTop: '16px' }}>
                            <motion.button type="submit" className="laf-btn laf-primary" whileTap={{ scale: 0.98 }} disabled={busy || message}>
                                {busy ? "Sending..." : "Send Reset Link"}
                            </motion.button>
                            
                            <motion.button type="button" className="laf-btn laf-ghost" whileTap={{ scale: 0.98 }} onClick={() => nav("/user/login")}>
                                Back to Login
                            </motion.button>
                        </div>
                    </form>
                </div>
            </motion.section>

            {/* Scoped styles (Same as before, plus a success style) */}
            <style>{`
            :root{
                --bg1: #04060b;
                --bg2: #071428;
                --muted: #b8c7d9;
                --glass: rgba(255,255,255,0.03);
                --accent-1: #ff6b6b;
                --accent-2: #7c3aed;
                --accent-3: #06b6d4;
            }
            .laf-root {
                min-height: 100vh;
                height: 100vh;
                width: 100vw;
                overflow: hidden;
                background: radial-gradient(circle at 10% 20%, rgba(255,107,107,0.06), transparent 8%),
                            linear-gradient(180deg, var(--bg1), var(--bg2));
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue';
                color: var(--muted);
                position: relative;
            }
            .laf-bg{ position:absolute; inset:0; z-index:0; pointer-events:none;}
            .blob { position:absolute; filter:blur(72px); opacity:0.12; mix-blend-mode:screen; border-radius:40%;}
            .b1{ width:760px; height:760px; left:-220px; top:-220px; background:linear-gradient(135deg,#ff7a7a,#ffb86b); }
            .b2{ width:520px; height:520px; right:-120px; top:-80px; background:linear-gradient(135deg,#7dd3fc,#93c5fd); }
            .b3{ width:360px; height:360px; left:18%; bottom:-110px; background:linear-gradient(135deg,#bbf7d0,#86efac); }
            .laf-center { position:relative; z-index:6; width:100%; max-width:980px; padding:20px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; }
            .laf-card { width:100%; display:flex; gap:22px; padding:18px; border-radius:16px; background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); box-shadow: 0 28px 80px rgba(2,6,23,0.6); border: 1px solid rgba(255,255,255,0.04); backdrop-filter: blur(6px); }
            .laf-head { width:36%; padding:14px 8px; display:flex; flex-direction:column; gap:8px; justify-content:center; }
            .laf-head h1 { margin:0; color:#fff; font-size:28px; letter-spacing:0.2px; }
            .laf-sub { margin:0; color:var(--muted); font-size:13px; }
            .laf-form { width:64%; display:flex; flex-direction:column; gap:12px; padding:4px 6px; }
            .laf-label { display:flex; flex-direction:column; color:var(--muted); font-size:13px; }
            .laf-input { margin-top:8px; padding:12px 14px; border-radius:10px; background: rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04); color:#f8fafc; outline:none; }
            .laf-input::placeholder { color: rgba(255,255,255,0.35); }
            .laf-actions { display:flex; gap:12px; margin-top:6px; align-items:center; }
            .laf-btn { padding:12px 14px; border-radius:10px; border:0; cursor:pointer; font-weight:700; min-width:120px; }
            .laf-primary { background: linear-gradient(90deg, var(--accent-1), #fb7185); color:white; box-shadow: 0 8px 30px rgba(255,107,107,0.12); }
            .laf-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.04); color:var(--muted); }
            .laf-error { background: rgba(255,80,80,0.08); padding:10px 12px; border-radius:10px; color:#ffd2d2; border:1px solid rgba(255,80,80,0.06); }
            
            /* ⭐ NEW SUCCESS MESSAGE STYLE */
            .laf-success { background: rgba(6,182,212,0.1); padding:10px 12px; border-radius:10px; color:#cffafe; border:1px solid rgba(6,182,212,0.1); }

            @media (max-width:980px) {
                .laf-card { flex-direction:column; gap:14px; padding:12px; }
                .laf-head { width:100%; text-align:center; padding:6px 0; }
                .laf-form { width:100%; }
            }
            `}</style>
        </div>
    );
}